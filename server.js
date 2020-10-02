const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

http.listen(3000, () => {
  console.log("Starting server on port 3000");
});

// Holds all rooms and data in each room,
let gameData = [];

class Room {
  constructor(roomID, playerList, socketList, roleList) {
    this.roomID = roomID;
    this.playerList = playerList;
    this.socketList = socketList;
    this.roleList = roleList;
    this.lobbyStates = {
      randomiseForensicScientist: false,
      currentForensicScientist: "",
      addAccomplice: false,
      addWitness: false,
      numberOfCards: 3 // This refers to the index
    };
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
  /**
   * createGame
   * When a user creates a room
   */
  socket.on("createGame", name => {
    let roomIDTemp = makeRoomID(4);
    let duplicateRoomID = gameData.find(room => room.roomID === roomIDTemp);
    while (typeof duplicateRoomID !== "undefined") {
      roomIDTemp = makeRoomID(4);
      duplicateRoomID = gameData.find(room => room.roomID === roomIDTemp);
    }
    gameData.push(new Room(roomIDTemp, [name.trim()], [socket.id], []));
    console.log(`${name.trim()} created a new room: ${roomIDTemp}`);
    console.log(gameData);
    socket.join(roomIDTemp);
    io.to(roomIDTemp).emit("updateLobby", [name.trim()], roomIDTemp);
  });

  /**
   * joinGame
   * When a user tries to join a room
   */
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
          socket.join(room);
          io.to(room).emit(
            "updateLobby",
            gameData[foundRoomIndex]["playerList"],
            room
          );
        }
      }
    }
  });

  /**
   * checkIfRoomExistsWhenJoinByUrl
   * When a user tries to join a game by using the full URL (i.e. by typing the room in the URL)
   */
  socket.on("checkIfRoomExistsWhenJoinByUrl", room => {
    let foundRoomIndex = gameData.findIndex(x => x.roomID == room);
    if (foundRoomIndex == -1) {
      socket.emit("doesRoomExist", 0);
    } else {
      socket.emit("doesRoomExist", 1);
    }
  });

  /**
   * startGame
   * When a user tries to join a room
   */
  socket.on("startGame", room => {});
  /**
   * leaveGame
   * When a user presses the Quit button to leave a room
   */
  socket.on("leaveGame", room => {
    let roomIndex = gameData.findIndex(x => x.roomID == room);
    let deleteIndex = gameData[roomIndex]["socketList"].findIndex(
      x => x == socket.id
    );
    gameData[roomIndex]["playerList"].splice(deleteIndex, 1);
    gameData[roomIndex]["socketList"].splice(deleteIndex, 1);
    socket.leave(room);
    if (
      Array.isArray(gameData[roomIndex]["playerList"]) && // Array exists and is not empty
      gameData[roomIndex]["playerList"].length
    ) {
      io.to(room).emit("updateLobby", gameData[roomIndex]["playerList"], room);
    } else {
      // No one left in the room, so delete it
      gameData.splice(roomIndex, 1);
    }
    console.log(gameData);
  });

  /**
   * disconnect
   * When a user disconnects by some way or another (e.g. exiting the browser)
   */
  socket.on("disconnect", reason => {
    console.log(`${socket.id} disconnected because of ${reason}`);
    let roomIndex = null;
    let deleteIndex = null;
    let roomID = "";
    let socketPartOfRoomAlready = false; // Needs to be checked since sometimes a client disconnects without even joining to a room yet.
    for (const [index, room] of gameData.entries()) {
      let deleteSocketIndex = room["socketList"].findIndex(x => x == socket.id);
      if (deleteSocketIndex != -1) {
        roomIndex = index;
        deleteIndex = deleteSocketIndex;
        roomID = room.roomID;
        socketPartOfRoomAlready = true;
        break;
      }
    }
    if (socketPartOfRoomAlready == true) {
      gameData[roomIndex]["playerList"].splice(deleteIndex, 1);
      gameData[roomIndex]["socketList"].splice(deleteIndex, 1);
      socket.leave(roomID);
      if (
        Array.isArray(gameData[roomIndex]["playerList"]) && // Array exists and is not empty
        gameData[roomIndex]["playerList"].length
      ) {
        io.to(roomID).emit(
          "updateLobby",
          gameData[roomIndex]["playerList"],
          roomID
        );
      } else {
        // No one left in the room, so delete it
        gameData.splice(roomIndex, 1);
      }
      console.log(gameData);
    }
  });

  socket.on("getLobbyState", room => {
    let roomIndex = gameData.findIndex(x => x.roomID == room);
    socket.emit("newLobbyState", gameData[roomIndex].lobbyStates);
  });

  socket.on("setLobbyState", data => {
    let roomIndex = gameData.findIndex(x => x.roomID == data.room);
    gameData[roomIndex].lobbyStates[data.type] = data.state;
    socket.to(data.room).emit("newLobbyState", gameData[roomIndex].lobbyStates);
  });
});
