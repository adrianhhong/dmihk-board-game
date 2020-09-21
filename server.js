const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

io.on("connection", socket => {
  console.log("a user connected");

  socket.emit("customEmit", "Hey!");

  socket.emit("user_message", "yep");

  socket.on("emit_method", msg => {
    console.log("emit_method" + msg);
  });
});

http.listen(3000, () => {
  console.log("listening on *:3000");
});
