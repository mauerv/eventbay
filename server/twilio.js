const twilio = require('twilio');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const AccessToken = twilio.jwt.AccessToken;
const VideoGrant = AccessToken.VideoGrant;

const MAX_ALLOWED_SESSION_DURATION = 14400;
const twilioAccountSid = process.env.TWILIO_ACCOUNT_SID;
const twilioApiKeySID = process.env.TWILIO_API_KEY_SID;
const twilioApiKeySecret = process.env.TWILIO_API_KEY_SECRET;
const twilioAuthToken = process.env.TWILIO_AUTH_TOKEN;

const twilioClient = twilio(twilioAccountSid, twilioAuthToken);

const handleTokenRequest = (req, res) => {
  const { identity, roomName } = req.query;
  const token = new AccessToken(twilioAccountSid, twilioApiKeySID, twilioApiKeySecret, {
    ttl: MAX_ALLOWED_SESSION_DURATION,
  });
  token.identity = identity;
  const videoGrant = new VideoGrant({ room: roomName });
  token.addGrant(videoGrant);
  res.send(token.toJwt());
};

module.exports = { twilioClient, handleTokenRequest };
