import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface GameState {
  gameLoaded: boolean,
  loadProgress: number,
  gameServerConnected: boolean,
  gameLaunched: boolean,
}

const initialState = {
  gameLoaded: false,
  loadProgress: 0,
  gameServerConnected: false,
  gameLaunched: false,
} as GameState

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setLoadProgress: (state, action: PayloadAction<number>) => {
      state.loadProgress = action.payload
    },
    setGameLoaded: (state, action: PayloadAction<boolean>) => {
      state.gameLoaded = action.payload
    },
    setGameServerConnected: (state, action: PayloadAction<boolean>) => {
      state.gameServerConnected = action.payload
    },
    setGameLaunched: (state, action: PayloadAction<boolean>) => {
      state.gameLaunched = action.payload
    },
  },
})

export const {
  setLoadProgress,
  setGameLoaded,
  setGameServerConnected,
  setGameLaunched,
} = gameSlice.actions

export default gameSlice.reducer
