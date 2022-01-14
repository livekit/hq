import 'regenerator-runtime/runtime'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import { ChakraProvider } from '@chakra-ui/react'
import theme from '@livekit/livekit-chakra-theme'

import './index.scss'
import './PhaserGame'
import App from './App'
import store from './stores'

require('dotenv').config()

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <Provider store={store}>
        <App />
      </Provider>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
