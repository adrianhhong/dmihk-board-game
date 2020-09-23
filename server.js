const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

http.listen(3000, () => {
  console.log("listening on *:3000");
});

// Holds all rooms and data in each room,
let gameData = [];

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
  // When a user creates a room.
  socket.on("createGame", name => {
    let roomIDTemp = makeRoomID(4);
    let duplicateRoomID = gameData.find(room => room.roomID === roomIDTemp);
    while (typeof duplicateRoomID !== "undefined") {
      roomIDTemp = makeRoomID(4);
      duplicateRoomID = gameData.find(room => room.roomID === roomIDTemp);
    }
    gameData.push(new Room(roomIDTemp, [name.trim()], [socket.id], []));
    console.log(gameData);

    socket.emit("gameCreated", "yep");
  });
});
