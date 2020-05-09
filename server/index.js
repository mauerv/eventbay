const express = require('express');
const compression = require('compression');
const path = require('path');
const expressWs = require('express-ws')(express());
const app = expressWs.app;
const bodyParser = require('body-parser');
const secure = require('ssl-express-www');
const { twilioClient, handleTokenRequest } = require('./twilio.js');
app.use(secure);
app.use(compression());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'build')));

app.get('/token', (req, res) => {
  const { identity, roomName } = req.query;
  const token = new AccessToken(twilioAccountSid, twilioApiKeySID, twilioApiKeySecret, {
    ttl: MAX_ALLOWED_SESSION_DURATION,
  });
  token.identity = identity;
  const videoGrant = new VideoGrant({ room: roomName });
  token.addGrant(videoGrant);
  res.send(token.toJwt());
});

const getRouteWsClients = route => {
  const filteredClients = Array.from(expressWs.getWss().clients).filter(
    sock => sock.route === route
  );
  return filteredClients;
};

app.ws('/chat/:room', (ws, req) => {
  ws.route = req.path;
  ws.onmessage = msg => {
    const filteredClients = getRouteWsClients(req.path);
    filteredClients.forEach(sock => sock.send(msg.data));
  };
});

app.ws('/', (ws, req) => {
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
});

app.get('*', (_, res) => res.sendFile(path.join(__dirname, 'build/index.html')));

const port = process.env.PORT || 8081;
app.listen(port, () => console.log(`token server running on ${port}`));
