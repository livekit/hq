import { useEffect, useState } from 'react'
import { 
  ConnectionQuality, 
  LocalTrackPublication, 
  ParticipantEvent,
  Track,
} from 'livekit-client'

import AvatarPreview from './AvatarPreview'

import {
  HStack,
  VStack,
  Text,
  Icon,
  IconButton,
  Box,
  Spinner,
} from '@chakra-ui/react'

import {
  Settings,
  Monitor,
} from 'react-feather'
import { LocalParticipant } from 'livekit-client'

import { avatars } from '../characters/avatars'

import { ParticipantMetadata } from './UserStream'


interface LocalUserControlBarProps {
  localParticipant: LocalParticipant,
  onShareScreen?: () => void
}

const LocalUserControlBar = ({ 
  localParticipant: lp,
  onShareScreen = () => {},
}: LocalUserControlBarProps) => {
  const [quality, setQuality] = useState<ConnectionQuality | undefined>()
  const [isSharingScreen, setIsSharingScreen] = useState<boolean>(lp.isScreenShareEnabled)
  const metadata: ParticipantMetadata = lp.metadata ? JSON.parse(lp.metadata) : undefined

  useEffect(() => {
    lp
      .on(ParticipantEvent.ConnectionQualityChanged, q => {
        setQuality(q)
      })
      .on(ParticipantEvent.LocalTrackPublished, (trackPub: LocalTrackPublication) => {
        if (Track.Source.ScreenShare === trackPub.source && lp.isScreenShareEnabled) {
          setIsSharingScreen(true)
        }
      })
      .on(ParticipantEvent.LocalTrackUnpublished, (trackPub: LocalTrackPublication) => {
        if (Track.Source.ScreenShare === trackPub.source && !lp.isScreenShareEnabled) {
          setIsSharingScreen(false)
        }
      })
  }, [])

  if (!metadata) return null

  let b1Color, b2Color, b3Color
  b1Color = b2Color = b3Color = "cld.fg3"
  if (quality) {
    switch(quality) {
      case ConnectionQuality.Excellent:
        b1Color = b2Color = b3Color = "cld.brd-green"
        break;
      case ConnectionQuality.Good:
        b1Color = b2Color = "cld.brd-yellow"
        break;
      case ConnectionQuality.Poor:
        b1Color = "cld.brd-red"
        break;
    }
  }

  return (
    <HStack 
      align="center" 
      justify="space-between"
      bg="cld.bg2"
      pl="1rem"
      pr="1.75rem"
      py="0.75rem"
      borderRadius="11.875rem"
      w="23.75rem"
      shadow="rgb(0 0 0 / 55%) 0px 10px 25px">
        <HStack align="top">
          <AvatarPreview 
            avatar={avatars.get(metadata!.avatarKey)!.img} 
            bgColor="cld.fg3" />
          <VStack spacing="0" align="start">
            <Text 
              textStyle="caption" 
              fontWeight={800} 
              color="cld.fg1">
                {metadata.userName}
            </Text>
            { quality &&
              <Box>
                <HStack align="end" justify="start" spacing="1px">
                  <Box w="4px" h="6px" bg={b1Color} borderRadius="2rem"/>
                  <Box w="4px" h="10px" bg={b2Color} borderRadius="2rem" />
                  <Box w="4px" h="14px" bg={b3Color} borderRadius="2rem" />
                </HStack>
              </Box>
            }
            { !quality &&
              <Spinner w="14px" h="14px" color="cld.fg3" p="0" m="0" />
            }
          </VStack>
        </HStack>
        <HStack spacing="1rem">
          <Icon as={Settings} w="1.5rem" h="1.5rem" color="cld.fg4" />
          <IconButton 
            icon={<Icon as={Monitor} w="1.5rem" h="1.5rem" color={isSharingScreen ? "cld.brd-green" : "cld.fg1"} />}
            aria-label="Share screen"
            onClick={onShareScreen}
          />
        </HStack>
    </HStack>
  )
}

export default LocalUserControlBar