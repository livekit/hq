import { useAppSelector } from '../hooks'

import {
  Flex,
} from '@chakra-ui/react'

import { RoomProps } from './HUD'
import RemoteUserMedia from './RemoteUserMedia'

const RemoteUsers = ({ room }: RoomProps) => {
  const participants = useAppSelector((state) => state.room.linkedUsers)
  
  return (
    <Flex
      w="100%"
      py="0.5rem"
      px="0"
      direction="row"
      pos="absolute"
      align="center"
      justify="center"
      top="0.5rem"
      gap="1rem"
      overflowX="auto">
      { participants.map(uid => {
        const participant = room.getParticipantByIdentity(uid)
        if (!participant) return null
        return <RemoteUserMedia key={participant.sid} participant={participant} /> 
      }) }
    </Flex>
  )
}

export default RemoteUsers