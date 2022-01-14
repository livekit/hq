import { useState, useEffect } from 'react'
import { useAppSelector } from './hooks'

import { Room } from 'livekit-client'

import { GlobalStyles } from '@livekit/livekit-chakra-theme'
import phaserGame from './PhaserGame'
import Bootstrap from './scenes/Bootstrap'
import Game from './scenes/Game'

import {
  Box,
} from '@chakra-ui/react'

import LoginDialog from './components/LoginDialog'
import GameLoading from './components/GameLoading'
import HUD from './components/HUD'

function App() {
  const game = phaserGame.scene.keys.game as Game

  //preload assets and test connecting to lobby
  const gameLoaded = useAppSelector((state) => state.game.gameLoaded)
  const connectedToGameServer = useAppSelector((state) => state.game.gameServerConnected)
  const gameLaunched = useAppSelector((state) => state.game.gameLaunched)
  
  const playerName = useAppSelector((state) => state.user.playerName)
  const avatarKey = useAppSelector((state) => state.user.avatarKey)
  const loggedIn = useAppSelector((state) => state.user.loggedIn)

  const [room, setRoom] = useState<Room | undefined>()
  
  useEffect(() => {
    if (gameLoaded && connectedToGameServer) {
      const bootstrap = phaserGame.scene.keys.bootstrap as Bootstrap
      bootstrap.network
        .joinOrCreatePublic()
        .then(() => bootstrap.launchGame())
        .catch((error) => console.error(error))
    }
  }, [gameLoaded, connectedToGameServer])

  useEffect(() => {
    if (loggedIn) {
      const bootstrap = phaserGame.scene.keys.bootstrap as Bootstrap
      bootstrap.network.startRtc(playerName!, avatarKey!)
        .then(room => {
          setRoom(room)
          game.network.readyToConnect()
        })
    }
  }, [loggedIn])

  let ui: JSX.Element
  if (loggedIn && room) {
    ui = <HUD room={room} />
  } else if (gameLaunched) {
    ui = <LoginDialog />
  } else {
    ui = <GameLoading />
  }

  return (
    <Box pos="absolute" w="100%" h="100%">
      <GlobalStyles />
      {ui}
    </Box>
  )
}

export default App
