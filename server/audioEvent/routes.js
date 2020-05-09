var express = require('express');
var router = express.Router();
const { twilioClient } = require('../twilio.js');
const { expressWs } = require('../expressWs.js');
const { broadcastRoomEvent, broadcastParticipantEvent } = require('./broadcastHelpers');

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
  res.set('Content-Type', 'application/json');
  res.send(roomsWithParticipants);
});

router.post('/rooms', async (req, res) => {
  const { roomName } = req.body;

  let callbackUrl = `${process.env.API_TWILIO_CALLBACK_URL}/api/callback`;

  const room = await twilioClient.video.rooms.create({
    uniqueName: roomName,
    statusCallback: callbackUrl,
    maxParticipants: 10,
    type: 'peer-to-peer',
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

module.exports = router;
