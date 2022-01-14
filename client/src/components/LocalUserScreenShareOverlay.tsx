import {
  Box,
  HStack,
  IconButton,
  Icon,
} from '@chakra-ui/react'

import {
  Maximize2,
  X,  
} from 'react-feather'

import { TrackPublication } from 'livekit-client'

import { ScreenStreamProps } from './ScreenStream'
import store from '../stores'
import { setFullScreenTrack } from '../stores/UserStore'

interface LocalUserScreenShareOverlayProps extends ScreenStreamProps {
  publication: TrackPublication
}

const LocalUserScreenShareOverlay = ({ participant, publication, onShareScreen = () => {} }: LocalUserScreenShareOverlayProps) => {
  const commonButtonStyles = {
    p: "0.5rem",
    bg: "rgba(0,0,0,0.8)",
    borderRadius: "0",
  }

  const onFocusTrack = () => {
    store.dispatch(setFullScreenTrack({
      identity: participant.identity,
      trackSid: publication.trackSid
    }))
  }

  return (
    <Box 
      w="100%" h="100%" 
      align="center" justify="end"
      bg="rgba(0,0,0,0.5)"
      pos="absolute" left="0" top="0"
      zIndex="2"
      borderRadius="0.5rem">
      <HStack 
        spacing="0" 
        borderWidth="1px" borderColor="cld.separator1" borderLeftRadius="50rem" borderRightRadius="50rem"
        align="center"
        pos="absolute" left="50%" bottom="0.25rem"
        bg="black"
        transform="translateX(-50%)">
        <IconButton 
          icon={<Icon as={X} w="1rem" h="1rem" color="white" />} 
          aria-label="Stop Sharing"
          {...commonButtonStyles}
          borderRightRadius="50rem"
          onClick={onShareScreen} />
        <IconButton 
          icon={<Icon as={Maximize2} w="1rem" h="1rem" color="white" />} 
          aria-label="Maximize screen"
          {...commonButtonStyles}
          borderLeftRadius="50rem"
          onClick={onFocusTrack} />
      </HStack>
    </Box>
  )
}

export default LocalUserScreenShareOverlay