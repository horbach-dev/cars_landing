const clients = new Map();

const connectWebsocket = (wss) => {

  wss.on("connection", (ws, req) => {
    let clientId = req.url.slice(1);

    console.log("новое соединение " + clientId);

    clients.set(clientId, ws);

    ws.on("close", function () {
      delete clients[clientId];
    });
  });
};

const notifyWS = (message) => {
  for (let value of clients.values()) {
    value.send(message);
  }
}

module.exports = {
  connectWebsocket,
  notifyWS
};
