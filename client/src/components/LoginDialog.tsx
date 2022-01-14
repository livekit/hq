import { useEffect, useState } from 'react'
import styled from 'styled-components'

import phaserGame from '../PhaserGame'
import Game from '../scenes/Game'
import Bootstrap from '../scenes/Bootstrap'

import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Navigation } from 'swiper'
import 'swiper/swiper.min.css'
import 'swiper/components/navigation/navigation.min.css'

import { useAppSelector, useAppDispatch } from '../hooks'
import { setLoggedIn } from '../stores/UserStore'
import { setVideoConnected } from '../stores/UserStore'

import { avatars } from '../characters/avatars'

import {
  Box,
  Image,
  Center,
  Text,
  Button,
  Flex,
  Icon,
  HStack,
  VStack,
  useToast,
} from '@chakra-ui/react'

import {
  Check,
  AlertTriangle,
} from 'react-feather'

import TextField from './TextField'
import { setPlayerDetails } from '../stores/UserStore'

SwiperCore.use([Navigation])

const Left = styled.div`
  margin-right: 48px;

  --swiper-navigation-size: 24px;

  .swiper-container {
    width: 160px;
    height: 220px;
    border-radius: 8px;
    overflow: hidden;
  }

  .swiper-slide {
    width: 160px;
    height: 220px;
    background: #dbdbe0;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .swiper-slide img {
    display: block;
    width: 95px;
    height: 136px;
    object-fit: contain;
  }
`

export default function LoginDialog() {
  const toast = useToast()
  const [name, setName] = useState<string>('')
  const [avatarIndex, setAvatarIndex] = useState<number>(0)

  const dispatch = useAppDispatch()
  const videoConnected = useAppSelector((state) => state.user.videoConnected)
  
  const game = phaserGame.scene.keys.game as Game
  const bootstrap = phaserGame.scene.keys.bootstrap as Bootstrap

  const onEnterSpace = () => {
    if (name === '') {
      toast({
        title: `Please set your name before entering the space.`,
        status: 'error',
        isClosable: false,
        position: 'top',
      })
    } else {
      const [avatarKey, avatarDetails] = Array.from(avatars.entries())[avatarIndex]
      
      game.registerKeys()
      game.myPlayer.setPlayerName(name)
      game.myPlayer.setPlayerTexture(avatarDetails.name)

      dispatch(setPlayerDetails({
        playerName: name,
        avatarKey: avatarKey,
      }))
      
      dispatch(setLoggedIn(true))
    }
  }

  const onConnectCamera = () => {
    navigator.mediaDevices
      ?.getUserMedia({
        video: true,
        audio: true,
      })
      .then(() => {
        dispatch(setVideoConnected(true))
        bootstrap.network.videoConnected()
      })
      .catch((error) => {
        dispatch(setVideoConnected(false))
        window.alert('No webcam or microphone found, or permission is blocked')
      })
  }

  useEffect(() => {
    const permissionName = 'microphone' as PermissionName
    navigator.permissions.query({ name: permissionName }).then((result) => {
      if (result.state === 'granted') {
        dispatch(setVideoConnected(true))
        bootstrap.network.videoConnected()
      }
    })
  }, [])

  return (
    <Box w="100%" h="100%" bg="cld.bg2">
      <Box 
        pos="fixed"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        bg="cld.bg3"
        borderRadius="1rem"
        py="2.25rem"
        px="3.75rem"
        shadow="rgb(0 0 0 / 25%) 0px 10px 30px">
        <Center>
          <Image src="https://livekit.io/livekit.svg" w="11rem" />
        </Center>
        <Flex my="2.25rem">
          <Left>
            <Text 
              w="10rem" 
              textStyle="h5-mono" 
              color="cld.fg1"
              textAlign="center"
              textTransform="uppercase"
              pb="0.5rem">Select an avatar</Text>
            <Swiper
              // install Swiper modules
              navigation
              spaceBetween={0}
              slidesPerView={1}
              onSlideChange={(swiper) => {
                setAvatarIndex(swiper.activeIndex)
              }}
            >
              {Array.from(avatars.keys()).map(key => {
                const avatar = avatars.get(key)!
                return (
                  <SwiperSlide key={avatar.name}>
                    <img src={avatar.img} alt={avatar.name} />
                  </SwiperSlide>
                )
              })}
            </Swiper>
          </Left>
          <Box w="18.75rem">
            <TextField 
              domId='userName'
              label="Name"
              inputType="text"
              placeholder="parzival"
              value={name}
              onChange={e => setName(e.target.value)}
            />
            {!videoConnected && (
              <Flex 
                direction="column"
                gap="0.1875rem"
                pos="relative"
                mt="1.875rem">
                <HStack align="start" justify="start" pb="1rem">
                  <Icon as={AlertTriangle} w="1rem" h="1rem" color="cld.fg1" mt="3px" />
                  <VStack align="start" spacing="0.25rem">
                    <Text color="cld.fg2" textStyle="h5">Warning</Text>
                    <Text color="cld.fg2" textStyle="body2">No webcam/mic connected</Text>
                  </VStack>
                </HStack>
                <Button onClick={onConnectCamera}>Connect Webcam</Button>
              </Flex>
            )}

            {videoConnected && (
              <HStack mt="1.875rem">
                <Icon as={Check} w="1rem" h="1rem" color="cld.brd-blue" />
                <Text textStyle="body2" color="cld.brd-blue">Webcam connected</Text>
              </HStack>
            )}
          </Box>
        </Flex>
        <Center>
          <Button variant="primary" onClick={onEnterSpace}>Enter Space</Button>
        </Center>
      </Box>
    </Box>
  )
}
