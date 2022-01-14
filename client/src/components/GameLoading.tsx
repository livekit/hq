import {
  Box,
  Center,
  Spinner,
} from '@chakra-ui/react'

const GameLoading = () => (
  <Box w="100%" h="100%">
    <Center w="100%" h="100%">
      <Spinner />
    </Center>
  </Box>
)

export default GameLoading