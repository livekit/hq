import { useParticipant } from "livekit-react"
import React from "react"
import UserStream, { ParticipantProps } from "./UserStream"
import ScreenStream from "./ScreenStream"

const RemoteUserMedia = ({ participant }: ParticipantProps) => {
  const { screenSharePublication } = useParticipant(participant)

  return (
    <React.Fragment>
      <UserStream key={participant.sid} participant={participant} ignoreAudio={true}/>
      { screenSharePublication && <ScreenStream participant={participant} /> }
    </React.Fragment>
  )
}

export default RemoteUserMedia