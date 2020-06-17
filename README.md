# EventBay
Run events that you can't run in any other platform. Multi-threaded by default, you complete autonomy for users.

# Setup

- You need to create a .env file at the root of the project and fill the following enviroment variables:

  - TWILIO_ACCOUNT_SID
  - TWILIO_API_KEY_SID
  - TWILIO_API_KEY_SECRET
  - TWILIO_AUTH_TOKEN

- You also need to run an ngrok tunnel to the port 8081 `ngrok http 8081` or similar, for Twilio's API to reach localhost. You need to get the https url that ngrok gives you and use it in the following .env variable.

  - API_TWILIO_CALLBACK_URL=https://123example.ngrok.io

# To Run

- `npm install && npm run`
