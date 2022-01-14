import { useState, useEffect } from 'react'

import {
  Participant,
  RemoteTrackPublication,
} from 'livekit-client'

import {
  VideoRenderer,
  AudioRenderer,
  useParticipant,
} from 'livekit-react'

import {
  Box,
  Flex,
} from '@chakra-ui/react'

import { avatars } from '../characters/avatars'

import AvatarPreview from './AvatarPreview'
import ParticipantName from './ParticipantName'
import LocalUserMediaOverlay from './LocalUserMediaOverlay'

export interface ParticipantProps {
  participant: Participant,
  ignoreAudio?: boolean
}

export interface ParticipantMetadata {
  userName: string,
  avatarKey: string,
}

const UserStream = ({ participant, ignoreAudio = false }: ParticipantProps) => {
  const {
    isLocal,
    metadata,
    subscribedTracks,
    cameraPublication: videoPub,
    microphonePublication: audioPub,
  } = useParticipant(participant)

  const [showUserControls, setShowUserControls] = useState<boolean>(false)

  useEffect(() => {
    if (!isLocal) {
      if (videoPub) {
        (videoPub as RemoteTrackPublication).setSubscribed(true)
      }
      if (audioPub && !ignoreAudio) {
        (audioPub as RemoteTrackPublication).setSubscribed(true)
      }

    }
  }, [videoPub, audioPub])

  useEffect(() => {
    return () => {
      if (!isLocal) {
        if (videoPub) {
          (videoPub as RemoteTrackPublication).setSubscribed(false)
        }
        if (audioPub && !ignoreAudio) {
          (audioPub as RemoteTrackPublication).setSubscribed(false)
        }
      }
    }
  }, [])
  
  const md = metadata ? JSON.parse(metadata) : null
  return (
    <Box 
      pos="relative" 
      onMouseEnter={e => setShowUserControls(true)}
      onMouseLeave={e => setShowUserControls(false)}
      w="11.25rem"
      h="7.5rem"
      shadow="rgb(0 0 0 / 35%) 0px 6px 6px"
      borderRadius={ participant.isCameraEnabled ? "0.75rem" : "0.5rem" }>
      
      <Flex 
        w="100%" 
        h="100%" 
        bg="cld.bg2"
        align="center"
        justify="center"
        borderRadius={ participant.isCameraEnabled ? "0.75rem" : "0.5rem" }
        pos="absolute"
        left="0"
        top="0"
        zIndex="0">
        { md && <AvatarPreview avatar={avatars.get(md!.avatarKey)!.img} bgColor="cld.fg3" />}
      </Flex>

      { audioPub && 
        audioPub.track &&
        !ignoreAudio &&

        <AudioRenderer
          track={audioPub.track}
          isLocal={isLocal} />
      } 

      { participant.isCameraEnabled && 
        videoPub && 
        videoPub.track &&

        <VideoRenderer 
          track={videoPub.track} 
          isLocal={isLocal} 
          objectFit='cover'
          width="100%" 
          height="100%" 
          className="video-renderer" />
      }

      <ParticipantName 
        name={md?.userName ?? participant.identity} 
        isMicEnabled={participant.isMicrophoneEnabled} />
      
      { showUserControls && 
        isLocal && 
        
        <LocalUserMediaOverlay participant={participant} /> 
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

export default UserStream