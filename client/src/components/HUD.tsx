import {
  Box,
} from '@chakra-ui/react'

import RemoteUsers from './RemoteUsers'
import LocalUserMedia from './LocalUserMedia'
import LocalUserControlBar from './LocalUserControlBar'

import { Room } from 'livekit-client'
import { useAppSelector } from '../hooks'
import FullStreamView from './FullStreamView'
import { useEffect } from 'react'

export interface RoomProps {
  room: Room
}

const HUD = ({ room }: RoomProps) => {
  const fullScreenTrack = useAppSelector((state) => state.user.fullScreenTrack)

  const onShareScreen = () => {
    room.localParticipant.setScreenShareEnabled(!room.localParticipant.isScreenShareEnabled)
  }

  return (
    <Box width="100%" h="100%">
      { fullScreenTrack && 
      
        <FullStreamView 
          room={room}
          participant={room.getParticipantByIdentity(fullScreenTrack.identity)!} 
          trackSid={fullScreenTrack.trackSid} /> 
      }
      <RemoteUsers room={room} />
      <LocalUserMedia 
        room={room} 
        onShareScreen={onShareScreen} />
      <Box
        pos="absolute"
        bottom="1rem"
        left="50%"
        transform="translateX(-50%)"
        zIndex="5">
        <LocalUserControlBar 
          localParticipant={room.localParticipant} 
          onShareScreen={onShareScreen} />
      </Box>
    </Box>
  )
}

export default HUD