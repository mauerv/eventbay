# EventBay
## What is it?
An open source platform to host your own online club or meetups. The platform looks to empower communities by giving them the ability of holding many different audio or video conversations, or "threads" at the same time.
No longer do you need to have 200 people on the same Zoom room, or have to manage some hacky way for your admins to "move around" the asistants over a few breakout rooms.
People joining EventBay events have complete autonomy to jump around as they see fit.
## Features
- Large SFU based rooms with screen sharing and SFU. 
- Smaller 4 person rooms (P2P and E2E encrypted).
- 10 Person Audio Rooms (P2P and E2E encrypted).
- Named Audio Conversations "Lets talk about X subject" (P2P and E2E encrypted).
## Demos
Audio Conversations Deploy: [https://audiodemo.eventbay.io/](https://audiodemo.eventbay.io/)
Video + Audio Rooms Deploy: [https://startuplounge.online/](https://startuplounge.online/)
## How to run it.
Right now it's using Twilio's tech stack so you will need a twilio API and some funds to run it. If enough interest develops, I can rework it to make everything work P2P with our own (or your own) STUN and TURN servers driving the cost down significantly.  

### 1- Setup Twilio Callback Function.
You need a tunnel for Twilio to reach your localhost to communicate SDK events.
`npm install -g ngrok`. After that you can run `ngrok http 8081` to create a tunnel to your local port 8081.
Create a .env file at the root of the project. Add the https url you got from ngrok into a  variable `API_TWILIO_CALLBACK_URL=https://example-url.ngrok.io`

### 2- Setup Twilio Enviroment Variables.
You need to create a twilio account and fill out this 4 enviroment variables:
  - TWILIO_ACCOUNT_SID
  - TWILIO_API_KEY_SID
  - TWILIO_API_KEY_SECRET
  - TWILIO_AUTH_TOKEN
 
### 3- Running It
- `npm install && npm run` should do the trick.

## Work in Progress
- [ ] Adding ERC20 Token Auth to the communities/events.
