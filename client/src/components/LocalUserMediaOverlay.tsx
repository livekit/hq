import {
  Box,
  HStack,
  IconButton,
  Icon,
} from '@chakra-ui/react'
import { LocalParticipant } from 'livekit-client'

import {
  Mic,
  MicOff,
  Video,
  VideoOff,
} from 'react-feather'

import { ParticipantProps } from './UserStream'

const LocalUserMediaOverlay = ({ participant }: ParticipantProps) => {
  const commonButtonStyles = {
    p: "0.5rem",
    bg: "rgba(0,0,0,0.8)",
    borderRadius: "0",
  }

  let [micIcon, micColor] = participant.isMicrophoneEnabled ? [Mic, "white"] : [MicOff, "red"]
  let [camIcon, camColor] = participant.isCameraEnabled ? [Video, "white"] : [VideoOff, "red"]

  return (
    <Box 
      w="100%" 
      h="100%" 
      align="center"
      justify="end"
      bg="rgba(0,0,0,0.5)"
      pos="absolute"
      left="0"
      top="0"
      zIndex="2"
      borderRadius="0.5rem">
      <HStack 
        spacing="0" 
        borderWidth="1px" 
        borderColor="cld.separator1" 
        borderLeftRadius="50rem" 
        borderRightRadius="50rem"
        align="center"
        pos="absolute"
        left="50%"
        bottom="0.25rem"
        transform="translateX(-50%)">
        <IconButton 
          icon={<Icon as={micIcon} w="1rem" h="1rem" color={micColor} />} 
          aria-label="Mute mic"
          {...commonButtonStyles}
          borderLeftRadius="50rem"
          onClick={e => (participant as LocalParticipant).setMicrophoneEnabled(!participant.isMicrophoneEnabled)} />
        <IconButton 
          icon={<Icon as={camIcon} w="1rem" h="1rem" color={camColor} />} 
          aria-label="Mute video"
          {...commonButtonStyles}
          borderRightRadius="50rem"
          onClick={e => (participant as LocalParticipant).setCameraEnabled(!participant.isCameraEnabled)} />
      </HStack>
    </Box>
  )
}

export default LocalUserMediaOverlay