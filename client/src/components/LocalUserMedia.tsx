import { useEffect } from 'react'
import { useParticipant } from 'livekit-react'

import {
  Room,
} from 'livekit-client'

import { Flex } from "@chakra-ui/react"
import UserStream from './UserStream'
import ScreenStream from './ScreenStream'

interface LocalUserMediaProps {
  room: Room,
  onShareScreen: () => void,
}

const LocalUserMedia = ({ room, onShareScreen }: LocalUserMediaProps) => {
  const { 
    screenSharePublication
  } = useParticipant(room.localParticipant)
  
  useEffect(() => {
    room.localParticipant.enableCameraAndMicrophone()
  }, [])

  return (
    <Flex
      pos="absolute"
      right="1rem"
      bottom="1rem"
      direction="column"
      gap="1rem">
      { screenSharePublication && <ScreenStream participant={room.localParticipant} onShareScreen={onShareScreen} /> }
      <UserStream participant={room.localParticipant} />
    </Flex>
  )
}

export default LocalUserMedia