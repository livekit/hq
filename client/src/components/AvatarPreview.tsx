import {
  Box,
  BoxProps,
} from '@chakra-ui/react'

interface AvatarPreviewProps {
  avatar: string,
}

const AvatarPreview = ({ avatar, ...props }: AvatarPreviewProps & BoxProps) => (
  <Box 
    borderRadius="50rem"  
    borderColor="white" 
    width="2rem" 
    height="2rem" 
    bgColor="cld.bg2"
    bgImg={`url(${avatar})`} 
    backgroundSize="1.5rem"
    backgroundRepeat="no-repeat"
    backgroundPosition="center 0.25rem"
    {...props} />
)

export default AvatarPreview