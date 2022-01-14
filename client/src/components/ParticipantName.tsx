import {
  HStack,
  Text,
  Icon
} from '@chakra-ui/react'

import {
  MicOff,
} from 'react-feather'

interface ParticipantNameProps {
  name: string,
  isMicEnabled?: boolean,
}

const ParticipantName = ({ name, isMicEnabled }: ParticipantNameProps) => {
  return (
    <HStack 
      px="0.5rem" 
      py="0.25rem" 
      borderRadius="0.5rem" 
      bg="rgba(0,0,0,0.5)"
      pos="absolute"
      left="0.5rem"
      top="0.5rem"
      zIndex="3"
      spacing="0.25rem">
      { isMicEnabled !== undefined && !isMicEnabled && <Icon as={MicOff} w="1rem" h="1rem" color="red" /> }
      <Text textStyle="caption" fontWeight="bold" color="white">{name}</Text>
    </HStack>
  )
}

export default ParticipantName