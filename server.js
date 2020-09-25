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
    console.log(`${name} created a new room: ${roomIDTemp}`);
    console.log(gameData);
    socket.join(roomIDTemp);

    io.to(roomIDTemp).emit("updateLobby", name, roomIDTemp);
  });

  socket.on("joinGame", (name, room) => {
    // If room is not found, notify user.
    let foundRoomIndex = gameData.findIndex(x => x.roomID == room);
    if (foundRoomIndex == -1) {
      console.log(`${name} tried to join ${room} which does not exist`);
      socket.emit("roomNotFound");
    } else {
      // If user's name is the same as another user's name, notify user.
      let duplicateNameIndex = gameData[foundRoomIndex]["playerList"].findIndex(
        x => x == name
      );
      if (duplicateNameIndex != -1) {
        console.log(`${name} tried to join ${room} with a duplicate name`);
        socket.emit("duplicateNameFound");
      } else {
        // If there is already 12 players in room, the room is full, notify user.
        if (gameData[foundRoomIndex]["playerList"].length == 12) {
          console.log(`${name} tried to join ${room}. The room is full`);
          socket.emit("roomIsFull");
        } else {
          // If all checks succeed, push the user into the room and notify everyone in lobby.
          gameData[foundRoomIndex]["playerList"].push(name);
          gameData[foundRoomIndex]["socketList"].push(socket.id);
          console.log(`${name} has joined ${room}`);
          console.log(gameData);
          io.to(room).emit(
            "updateLobby",
            gameData[foundRoomIndex]["playerList"],
            room
          );
        }
      }
    }
  });
});
