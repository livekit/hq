You need to run both the game server (Colyseus-based) and the client application (CRA-based).

---

#### To run the server:

1. create `./server/.env` and add values for the following keys:  
   `LIVEKIT_API_KEY=<YOUR_API_KEY>`  
   `LIVEKIT_API_SECRET=<YOUR_API_SECRET>`  
   `LIVEKIT_WS_URL=wss://your-livekit-server-url`

> Note: You can also run a LiveKit instance locally (see: https://github.com/livekit/livekit-server). [This guide](https://docs.livekit.io/guides/getting-started)
> will help you quickly get started with generating keys. If you run locally, the value for `LIVEKIT_URL` above would be `ws://localhost:7880` by default.

2. `yarn; yarn start` (at the top level)

---

#### To run the client:

1. `cd client`

2. create a `.env` (or `.env.local` if running locally) file at the top level and add values for the following keys:
   `REACT_APP_SERVER_URL=https://url-to-the-game-server-above`

> Note: If you run the game server locally, use `http://localhost:2567` as the value for `REACT_APP_SERVER_URL`

3. `yarn; yarn start`

In a browser, visit `localhost:3000` and you should be placed into a space automatically. Open up multiple browser windows to test pairing with other users or install ngrok and send a link to a friend.

---

_Special thanks to @kevinshen56714 for SkyOffice, from which this sample app is based._
