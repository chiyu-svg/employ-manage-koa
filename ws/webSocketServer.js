const WebSocket = require("ws");
const JWT = require("../util/JWT");
const wss = new WebSocket.WebSocketServer({ port: 8080 });

wss.on('connection', function connection(ws, req) {
  const myUrl = new URL(req.url, "http://localhost:3000");
  const token = myUrl.searchParams.get("token");
  const playload = JWT.verify(token);
  ws.user = playload;
  ws.send(getAllList(wss, ws));

  ws.on('error', console.error);

  ws.on('message', function message(data) {
    const message = JSON.parse(data);
    if(message.messageType === MessageType.PrivateChat) {
      toPrivate(wss, message.user, message.message);
    }
  });
});

const MessageType = {
  GroupList: 0,
  GroupChat: 1,
  PrivateChat: 2
}

function genMessage(messageType, user, message) {
  return JSON.stringify({
    messageType,
    user,
    message
  })
}

function getAllList(wss, ws) {
  const userList = [];
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN && client !== ws) {
      userList.push(client.user.username);
    }
  });
  return genMessage(MessageType.GroupList, null, userList);
}
function toPrivate(wss, to, message) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN && client.user.username === to) {
      message = genMessage(MessageType.PrivateChat, to, message);
      client.send(message);
    }
  });
}