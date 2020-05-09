const express = require('express');
const expressWs = require('express-ws')(express());
const app = expressWs.app;

module.exports = { app, expressWs };
