import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { sanitizeId } from '../util'
import { BackgroundMode } from '../../../types/BackgroundMode'

import phaserGame from '../PhaserGame'
import Bootstrap from '../scenes/Bootstrap'

interface PlayerDetails {
  playerName: string,
  avatarKey: string,
}

interface TrackDetails {
  identity: string,
  trackSid: string,
}

interface UserState extends PlayerDetails {
  backgroundMode: BackgroundMode,
  sessionId: string,
  videoConnected: boolean,
  loggedIn: boolean,
  playerNameMap: Map<string, string>,
  fullScreenTrack?: TrackDetails,
}

const initialState = {
  backgroundMode: getInitialBackgroundMode(),
  sessionId: '',
  videoConnected: false,
  loggedIn: false,
  playerNameMap: new Map<string, string>(),
} as UserState

export function getInitialBackgroundMode() {
  const currentHour = new Date().getHours()
  return currentHour > 6 && currentHour <= 18 ? BackgroundMode.DAY : BackgroundMode.NIGHT
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    toggleBackgroundMode: (state) => {
      const newMode =
        state.backgroundMode === BackgroundMode.DAY ? BackgroundMode.NIGHT : BackgroundMode.DAY

      state.backgroundMode = newMode
      const bootstrap = phaserGame.scene.keys.bootstrap as Bootstrap
      bootstrap.changeBackgroundMode(newMode)
    },
    setSessionId: (state, action: PayloadAction<string>) => {
      state.sessionId = action.payload
    },
    setVideoConnected: (state, action: PayloadAction<boolean>) => {
      state.videoConnected = action.payload
    },
    setLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.loggedIn = action.payload
    },
    setPlayerDetails: (state, action: PayloadAction<PlayerDetails>) => {
      state.playerName = action.payload.playerName
      state.avatarKey = action.payload.avatarKey
    },
    setPlayerNameMap: (state, action: PayloadAction<{ id: string; name: string }>) => {
      state.playerNameMap.set(sanitizeId(action.payload.id), action.payload.name)
    },
    removePlayerNameMap: (state, action: PayloadAction<string>) => {
      state.playerNameMap.delete(sanitizeId(action.payload))
    },
    setFullScreenTrack: (state, action: PayloadAction<TrackDetails | undefined>) => {
      state.fullScreenTrack = action.payload
    }
  },
})

export const {
  toggleBackgroundMode,
  setSessionId,
  setVideoConnected,
  setLoggedIn,
  setPlayerDetails,
  setPlayerNameMap,
  removePlayerNameMap,
  setFullScreenTrack,
} = userSlice.actions

export default userSlice.reducer
