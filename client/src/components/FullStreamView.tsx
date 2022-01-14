import { Participant, Room, Track } from "livekit-client"
import {
  Box,
  Flex,
  IconButton,
  Icon,
} from '@chakra-ui/react'
import { useParticipant, VideoRenderer } from "livekit-react"
import { useAppSelector } from "../hooks"

import UserStream from './UserStream'
import store from "../stores"
import { setFullScreenTrack } from "../stores/UserStore"
import { useEffect } from "react"

import {
  Minimize2,
} from 'react-feather'

interface FullStreamViewProps {
  room: Room,
  participant: Participant,
  trackSid: string,
}

const FullStreamView = ({ room, participant, trackSid }: FullStreamViewProps) => {
  const { 
    isLocal,
    subscribedTracks,
    publications,
  } = useParticipant(participant)

  const participants = useAppSelector((state) => state.room.linkedUsers)

  const onExitFullScreen = () => {
    store.dispatch(setFullScreenTrack(undefined))
  }

  useEffect(() => {
    return () => {
      store.dispatch(setFullScreenTrack(undefined))
    }
  }, [])

  let pub
  if (isLocal) {
    pub = publications.find(tp => tp.trackSid === trackSid)
  } else {
    pub = subscribedTracks.find(tp => tp.trackSid === trackSid)  
  }

  if (!pub || !pub.track) return null

  return (
    <Box 
      w="100vw" 
      h="100vh"
      pos="absolute"
      left="0" 
      top="0" 
      bg="cld.bg1" 
      zIndex="5">
      
      <Box pos="absolute" right="1rem" top="1rem">
        <IconButton 
          icon={<Icon as={Minimize2} w="1.5rem" h="1.5rem" color="white" />}
          aria-label="Exit fullscreen"
          bg="cld.bg1" 
          borderWidth="1px"
          borderRadius="1rem"
          p="0.5rem"
          borderColor="cld.separator2"
          _hover={{
            borderColor: "cld.fg4",
          }} 
          onClick={onExitFullScreen} />
      </Box>
      
      <Flex w="100%" h="100%" align="center" justify="center">
        <VideoRenderer 
          track={pub.track} 
          isLocal={isLocal && pub.source === Track.Source.Camera} 
          objectFit="contain"
          width="100%"
          height="100%"
          className="full-screen-video" />
        
        <Flex 
          direction="column" 
          justify="center"
          gap="1rem" 
          h="100%"
          px="1rem">
          { participants.map(uid => {
            const participant = room.getParticipantByIdentity(uid)
            if (!participant) return null
            return <UserStream key={participant.sid} participant={participant} ignoreAudio={true} /> 
          }) }
          <UserStream participant={room.localParticipant} ignoreAudio={true} />
        </Flex>
      </Flex>
    </Box>
  )
}

export default FullStreamView