const getRouteWsClients = require('../util/getRouteWsClients');

const broadcastRoomEvent = (name, event) => {
  const filteredClients = getRouteWsClients('/');
  filteredClients.forEach(ws => {
    ws.send(
      JSON.stringify({
        uniqueName: event.RoomName,
        status: event.RoomStatus,
        event: name,
        sid: event.RoomSid,
        roomType: event.roomType,
        participants: [],
        maxParticipants: event.maxParticipants,
      })
    );
  });
};

const broadcastParticipantEvent = (name, event) => {
  const filteredClients = getRouteWsClients('/');
  filteredClients.forEach(ws => {
    ws.send(
      JSON.stringify({
        roomName: event.RoomName,
        event: name,
        sid: event.ParticipantSid,
        identity: event.ParticipantIdentity,
      })
    );
  });
};

module.exports = { broadcastRoomEvent, broadcastParticipantEvent };
