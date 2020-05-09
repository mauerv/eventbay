const getRouteWsClients = require('./util/getRouteWsClients');

const wsChatHandler = (ws, req) => {
  ws.route = req.path;
  ws.onmessage = msg => {
    const filteredClients = getRouteWsClients(req.path);
    filteredClients.forEach(sock => sock.send(msg.data));
  };
};

const wsRoomsHandler = (ws, req) => {
  ws.route = '/';

  let isAlive = true;

  const doPing = () => {
    if (isAlive) {
      isAlive = false;
      ws.ping('heartbeat');
    }
  };

  setInterval(doPing, 3000);

  ws.on('pong', () => (isAlive = true));

  ws.on('close', () => {
    isAlive = false;
    clearInterval(doPing);
  });
};

module.exports = { wsChatHandler, wsRoomsHandler };
