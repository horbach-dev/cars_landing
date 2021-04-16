import api from "./api";

export const WS_FIND_NEW_CAR = "findNewCarMessage";

let handlers = [];

const server = "ws://194.58.90.109:82/";
const local = "ws://localhost:8000";

export function subscribe(event, handler) {
  if (!handlers[event]) {
    handlers[event] = [];
  }

  handlers[event].push(handler);
}

export function unsubscribe(event, handler) {
  handlers[event] = handlers[event].filter((h) => h !== handler);
}

function publish(event, data) {
  if (!handlers[event] || handlers[event].length < 1) {
    return;
  }

  handlers[event].forEach((handler) => {
    handler(data);
  });
}

export const connectToWebsocket = (id) => {
  return api.webSocketConnect(id).ready.then((res) => {
    if (!res.data) return
    let socket = new WebSocket(res.data.url);

    socket.onmessage = function (event) {
      let incoming = JSON.parse(event.data);
      publish(incoming.type, incoming.data);
    };
  });
};
