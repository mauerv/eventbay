var express = require('express');
var router = express.Router();
const { twilioClient } = require('../twilio.js');
const { expressWs } = require('../expressWs.js');
const twilioRoomOptions = require('./twilioRoomOptions');
const getCustomRoomType = require('./getCustomRoomType');

router.get('/rooms', async (req, res) => {
  const rooms = await twilioClient.video.rooms.list({ limit: 20 });
  const roomsWithParticipants = await Promise.all(
    rooms.map(async room => {
      let participants = await twilioClient.video
        .rooms(room.uniqueName)
        .participants.list({ status: 'connected' }, (err, participants) => participants);
      room.participants = participants;
      return room;
    })
  );
  const roomsWithCustomRoomTypes = roomsWithParticipants.map(room => {
    room.roomType = getCustomRoomType(room.type, room.maxParticipants);
    return room;
  });
  res.set('Content-Type', 'application/json');
  res.send(roomsWithCustomRoomTypes);
});

router.post('/rooms', async (req, res) => {
  const { roomName, roomType } = req.body;
  const { type, maxParticipants } = twilioRoomOptions(roomType);

  let callbackUrl = `${process.env.API_TWILIO_CALLBACK_URL}/video/callback`;

  const room = await twilioClient.video.rooms.create({
    uniqueName: roomName,
    statusCallback: callbackUrl,
    maxParticipants,
    type,
  });

  res.send(roomName);
});

router.post('/callback', async (req, res) => {
  const eventName = req.body.StatusCallbackEvent;
  const eventData = req.body;

  switch (eventName) {
    case 'room-created':
      const roomData = await twilioClient.video.rooms(eventData.RoomName).fetch();
      eventData.maxParticipants = roomData.maxParticipants;
      eventData.roomType = getCustomRoomType(roomData.type, roomData.maxParticipants);
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
        roomType: event.roomType,
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

module.exports = router;
