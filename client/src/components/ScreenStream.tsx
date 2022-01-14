import { useState, useEffect } from 'react'
import {
  Box,
} from '@chakra-ui/react'

import { Participant, RemoteTrackPublication } from 'livekit-client'
import { 
  useParticipant,
  VideoRenderer,
} from 'livekit-react'
import { ParticipantProps } from './UserStream'
import ParticipantName from './ParticipantName'
import LocalUserScreenShareOverlay from './LocalUserScreenShareOverlay'
import AvatarPreview from './AvatarPreview'

import { avatars } from '../characters/avatars'
import FocusTrackOverlay from './FocusTrackOverlay'

export interface ScreenStreamProps extends ParticipantProps {
  onShareScreen?: () => void,
}

const ScreenStream = ({ participant, onShareScreen = () => {} }: ScreenStreamProps) => {
  const {
    isLocal,
    metadata,
    screenSharePublication,
  } = useParticipant(participant)

  const [showUserControls, setShowUserControls] = useState<boolean>(false)

  useEffect(() => {
    if (!isLocal && screenSharePublication) {
      (screenSharePublication as RemoteTrackPublication).setSubscribed(true)
    }
  }, [screenSharePublication])

  useEffect(() => {
    return () => {
      if (!isLocal && screenSharePublication) {
        (screenSharePublication as RemoteTrackPublication).setSubscribed(false)
      }
    }
  }, [])

  const md = metadata ? JSON.parse(metadata) : null
  let participantName = md?.userName ?? participant.identity
  if (participantName.endsWith('s')) {
    participantName += "' screen"
  } else {
    participantName += "'s screen"
  }

  return (
    <Box 
      pos="relative" 
      onMouseEnter={e => setShowUserControls(true)}
      onMouseLeave={e => setShowUserControls(false)}
      w="11.25rem"
      h="7.5rem"
      shadow="rgb(0 0 0 / 35%) 0px 6px 6px"
      borderRadius="0.75rem">
      
      <Box 
        w="100%" 
        h="100%" 
        bg="cld.bg2"
        align="center"
        justify="center"
        borderRadius="0.75rem"
        pos="absolute"
        left="0"
        top="0"
        zIndex="0" />

      { participant.isScreenShareEnabled && 
        screenSharePublication && 
        screenSharePublication.track &&

        <VideoRenderer 
          track={screenSharePublication.track} 
          isLocal={false} 
          objectFit='cover'
          width="100%" 
          height="100%" 
          className="video-renderer" />
      }

      <ParticipantName name={participantName} />
      
      { showUserControls &&
        !isLocal &&
        screenSharePublication &&
        
        <FocusTrackOverlay 
          participant={participant} 
          publication={screenSharePublication} />
      }

      { showUserControls && 
        isLocal && 
        screenSharePublication &&
        
        <LocalUserScreenShareOverlay 
          participant={participant} 
          publication={screenSharePublication} 
          onShareScreen={onShareScreen} /> 
      }

      { participant.isCameraEnabled && 
        md && 

        <AvatarPreview 
          avatar={avatars.get(md.avatarKey)!.img} 
          pos="absolute"
          right="-0.5rem"
          bottom="-0.5rem"
          zIndex="4"
          w="1.8rem"
          h="1.8rem"
          backgroundSize="1.25rem" />
      }
    </Box>
  )
}

export default ScreenStream