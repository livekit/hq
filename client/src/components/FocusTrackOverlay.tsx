import {
  Box,
  Icon,
  Center,
} from '@chakra-ui/react'
import { Participant, TrackPublication } from 'livekit-client'

import {
  Maximize2,
} from 'react-feather'
import store from '../stores'
import { setFullScreenTrack } from '../stores/UserStore'

interface FocusTrackOverlayProps {
  participant: Participant,
  publication: TrackPublication
}

const FocusTrackOverlay = ({ participant, publication }: FocusTrackOverlayProps) => {

  const onFocusTrack = () => {
    store.dispatch(setFullScreenTrack({
      identity: participant.identity,
      trackSid: publication.trackSid
    }))
  }

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
      borderRadius="0.5rem"
      cursor="pointer"
      onClick={onFocusTrack}>
      <Center h="100%">
        <Icon as={Maximize2} w="1.5rem" h="1.5rem" color="cld.fg1" />
      </Center>
    </Box>
  )
}

export default FocusTrackOverlay