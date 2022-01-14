// livekit
import {
  Room,
  VideoPresets,
  RoomState
} from 'livekit-client'

// components
import { ParticipantMetadata } from '../components/UserStream'

import store from '../stores'
import { connectUser, disconnectUser } from '../stores/RoomStore'

class LiveKit {
  static SERVER_URL = process.env.REACT_APP_SERVER_URL
  private room: Room

  get isConnected() {
    return this.room.state === RoomState.Connected
  }

  constructor() {
    this.room = new Room({
      adaptiveStream: true,
      dynacast: true,
      videoCaptureDefaults: {
        resolution: VideoPresets.hd.resolution,
      }
    })
  }

  onShareScreen() {
    if (!this.room) return
    if (!this.room.localParticipant.isScreenShareEnabled) {
      this.room.localParticipant.setScreenShareEnabled(true)
    } else {
      this.room.localParticipant.setScreenShareEnabled(false)
    }
  }

  async connect(
    roomName: string, 
    identity: string, 
    metadata: ParticipantMetadata
  ): Promise<Room | undefined> {
    const res = await fetch(`${LiveKit.SERVER_URL}/token?`, {
      method: 'POST',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        roomName: roomName,
        identity: identity,
        metadata: JSON.stringify(metadata)
      })
    })
    const tokenRes = await res.json()
    
    const room = await this.room.connect(tokenRes.url, tokenRes.token, {
      autoSubscribe: false,
    })
    return room
  }

  updateParticipantName(userName: string) {}

  hasParticipant(userId: string): boolean {
    return this.isConnected && !!this.room.getParticipantByIdentity(userId)
  }

  connectToNewUser(userId: string) {
    console.log("connect to new user with ID: ", userId)

    if (!this.isConnected) {
      throw new Error(`Tried to connect to user with ID: ${userId}, but user is not connected to room.`)
    }

    const participant = this.room.getParticipantByIdentity(userId)
    if (!participant) {
      console.error(`Participant with ID: ${userId} does not exist.`)
      return
    }

    store.dispatch(connectUser(userId))
  }

  disconnectFromUser(userId: string) {
    console.log("removing streams for participant with ID: ", userId)

    if (!this.isConnected) {
      console.error(`Tried to remove user ${userId} streams, but you're not connected to room.`)
      return
    }
    
    store.dispatch(disconnectUser(userId))
  }

  // method to remove video stream (when we are the host of the call)
  deleteVideoStream(userId: string) {
    this.disconnectFromUser(userId)
  }

  // method to remove video stream (when we are the guest of the call)
  deleteOnCalledVideoStream(userId: string) {
    this.disconnectFromUser(userId)
  }
}

export default LiveKit