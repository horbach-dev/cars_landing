let WSServer = require("ws").Server;
let server = require("http").createServer();
let app = require("./http-server");
const path = require('path');
const { connectWebsocket } = require("./websocket");
const base = require('./datebase');

const PORT = process.env.PORT || 8000

server.on("request", app);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

async function start() {
  try {
    await base()

    let wss = new WSServer({
      server: server,
    });

    server.listen(PORT, function () {
      console.log(`http/ws server listening on ${PORT}`);
      connectWebsocket(wss);
    });
  } catch (e) {
    console.log(e)
  }
}

return start();
