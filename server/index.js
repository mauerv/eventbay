const express = require('express');
const compression = require('compression');
const path = require('path');
const bodyParser = require('body-parser');
const secure = require('ssl-express-www');
const { app } = require('./expressWs.js');
const { handleTokenRequest } = require('./twilio.js');
const videoRoutes = require('./videoEvent/routes.js');
const audioRoutes = require('./audioEvent/routes.js');

const { wsChatHandler, wsRoomsHandler } = require('./wsHandlers');

app.use(secure);
app.use(compression());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'build')));

app.use('/video', videoRoutes);
app.use('/audio', audioRoutes);

app.get('/token', handleTokenRequest);

app.ws('/chat/:room', wsChatHandler);

app.ws('/', wsRoomsHandler);

app.get('*', (_, res) => res.sendFile(path.join(__dirname, 'build/index.html')));

const port = process.env.PORT || 8081;
app.listen(port, () => console.log(`token server running on ${port}`));
