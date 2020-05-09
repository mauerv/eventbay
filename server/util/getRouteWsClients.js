const { expressWs } = require('../expressWs.js');

const getRouteWsClients = route => {
  const filteredClients = Array.from(expressWs.getWss().clients).filter(
    sock => sock.route === route
  );
  return filteredClients;
};

module.exports = getRouteWsClients;
