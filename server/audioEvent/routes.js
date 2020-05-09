app.get('/api/rooms', async (req, res) => {
  const rooms = await client.video.rooms.list({ limit: 20 });
  const roomsWithParticipants = await Promise.all(
    rooms.map(async room => {
      let participants = await client.video
        .rooms(room.uniqueName)
        .participants.list({ status: 'connected' }, (err, participants) => participants);
      room.participants = participants;
      return room;
    })
  );
  res.set('Content-Type', 'application/json');
  res.send(roomsWithParticipants);
});

app.post('/api/rooms', async (req, res) => {
  const { roomName } = req.body;

  let callbackUrl = `${process.env.API_TWILIO_CALLBACK_URL}/api/callback`;

  const room = await client.video.rooms.create({
    uniqueName: roomName,
    statusCallback: callbackUrl,
    maxParticipants: 10,
    type: 'peer-to-peer',
  });

  res.send(roomName);
});

app.post('/api/callback', async (req, res) => {
  const eventName = req.body.StatusCallbackEvent;
  const eventData = req.body;

  switch (eventName) {
    case 'room-created':
      const roomData = await client.video.rooms(eventData.RoomName).fetch();
      eventData.maxParticipants = roomData.maxParticipants;
      broadcastRoomEvent(eventName, eventData, expressWs.getWss());
      break;
    case 'room-ended':
      broadcastRoomEvent(eventName, eventData, expressWs.getWss());
      break;
    case 'participant-connected':
      broadcastParticipantEvent(eventName, eventData, expressWs.getWss());
      break;
    case 'participant-disconnected':
      broadcastParticipantEvent(eventName, eventData, expressWs.getWss());
      break;
    default:
      res.end();
  }
});

const getRouteWsClients = route => {
  const filteredClients = Array.from(expressWs.getWss().clients).filter(
    sock => sock.route === route
  );
  return filteredClients;
};

const broadcastRoomEvent = (name, event, wss) => {
  const filteredClients = getRouteWsClients('/');
  filteredClients.forEach(ws => {
    ws.send(
      JSON.stringify({
        uniqueName: event.RoomName,
        status: event.RoomStatus,
        event: name,
        sid: event.RoomSid,
        participants: [],
        maxParticipants: event.maxParticipants,
      })
    );
  });
};

const broadcastParticipantEvent = (name, event, wss) => {
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
