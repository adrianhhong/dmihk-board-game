const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

http.listen(3000, () => {
  console.log("listening on *:3000");
});

// Holds all rooms and data in each room,
gameData = [];

class Room {
  constructor(roomID, playerList, socketList, roleList) {
    this.roomID = roomID;
    this.playerList = playerList;
    this.socketList = socketList;
    this.roleList = roleList;
  }
}

function makeRoomID(length) {
  let result = "";
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

io.on("connection", socket => {
  socket.on("createGame", name => {
    // If there is no rooms yet, make one
    if (gameData.length == 0) {
      gameData[0] = new Room(makeRoomID(4), [name], [], []); // Add in the socket too
    } else {
      roomIDTemp = makeRoomID(4);
      duplicateRoomID = gameData.find(room => room.roomID === roomIDTemp);
      while (typeof duplicateRoomID !== "undefined") {
        // Try again
        roomIDTemp = makeRoomID(4);
        duplicateRoomID = gameData.find(room => room.roomID === roomIDTemp);
      }
      // Add a new room in.
      gameData.push(new Room(roomIDTemp, [name], [], [])); // Add in the socket too
    }
    console.log(gameData);
  });

  socket.emit("user_message", "yep");
});
