import http from 'http'
import express from 'express'
import cors from 'cors'
import { Server, LobbyRoom } from 'colyseus'
import { monitor } from '@colyseus/monitor'
import { RoomType } from '../types/Rooms'

import { AccessToken } from 'livekit-server-sdk'
import { SkyOffice } from './rooms/SkyOffice'

require('dotenv').config()

const API_KEY = process.env.LIVEKIT_API_KEY
const API_SECRET = process.env.LIVEKIT_API_SECRET
const RTC_URL = process.env.LIVEKIT_WS_URL

// import socialRoutes from "@colyseus/social/express"

const port = Number(process.env.PORT || 2567)
const app = express()

app.use(cors())
app.use(express.json())
// app.use(express.static('dist'))

const server = http.createServer(app)
const gameServer = new Server({
  server,
})

// register room handlers
gameServer.define(RoomType.LOBBY, LobbyRoom)
gameServer.define(RoomType.PUBLIC, SkyOffice, {
  name: 'Public Lobby',
  description: 'For making friends and familiarizing yourself with the controls',
  password: null,
  autoDispose: false,
})
gameServer.define(RoomType.CUSTOM, SkyOffice).enableRealtimeListing()

/**
 * Register @colyseus/social routes
 *
 * - uncomment if you want to use default authentication (https://docs.colyseus.io/server/authentication/)
 * - also uncomment the import statement
 */
// app.use("/", socialRoutes);

// register colyseus monitor AFTER registering your room handlers
app.use('/colyseus', monitor())

app.post('/token', (req: any, res: any) => {
  const room = req.body.roomName
  const identity = req.body.identity
  const metadata = req.body.metadata

  const at = new AccessToken(API_KEY, API_SECRET, {
    identity,
  })
  at.addGrant({ 
    roomJoin: true, 
    room,
  })
  if (metadata) {
    at.metadata = metadata
  }
  
  res.json({
    token: at.toJwt(),
    url: RTC_URL,
  })
})

gameServer.listen(port)
console.log(`Listening on ws://localhost:${port}`)
