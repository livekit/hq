import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface RoomState {
  roomId: string,
  roomName: string,
  roomDescription: string,
  linkedUsers: string[],
}

const initialState = {
  roomId: '',
  roomName: '',
  roomDescription: '',
  linkedUsers: [],
} as RoomState

export const roomSlice = createSlice({
  name: 'room',
  initialState,
  reducers: {
    setJoinedRoomData: (
      state,
      action: PayloadAction<{ id: string; name: string; description: string }>
    ) => {
      state.roomId = action.payload.id
      state.roomName = action.payload.name
      state.roomDescription = action.payload.description
    },

    connectUser: (state, action: PayloadAction<string>) => {
      state.linkedUsers = [...state.linkedUsers, action.payload]
    },

    disconnectUser: (state, action: PayloadAction<string>) => {
      const newLinkedUsers = state.linkedUsers.filter(uid => uid !== action.payload)
      state.linkedUsers = newLinkedUsers
    }
  },
})

export const {
  setJoinedRoomData,
  connectUser,
  disconnectUser,
} = roomSlice.actions

export default roomSlice.reducer
