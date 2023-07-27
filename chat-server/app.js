const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io")(server); // http server를 socket.io server로 upgrade

app.get("/", (req, res) => res.sendFile(__dirname + "/index.html"));

// 클라이언트 연결
io.on("connection", socket => {
  const peer = socket.request.connection._peername;
  console.log("New connection from " + JSON.stringify(peer));

  // 메시지 수신
  socket.on("chat message", function(msg) {
    console.log("message: " + JSON.stringify(msg));

    // 메시지를 전송한 클라이언트를 제외한 모든 클라이언트에게 메시지를 전송
    //socket.broadcast.emit('hi');

    // 메시지를 전송한 클라이언트를 포함하여 모든 클라이언트에게 메시지 전송
    io.emit("chat message", msg);
  });

  // 클라이언트 연결 종료
  socket.on("disconnect", function() {
    console.log("user disconnected");
  });

  // force client disconnect from server
  socket.on("forceDisconnect", function() {
    socket.disconnect();
  });
});

server.listen(3000, () => {
  console.log("Socket IO server listening on port 3000");
});
