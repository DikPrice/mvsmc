import React, { useState, useEffect } from 'react'
import RegisteredTile from './RegisteredTile'

const RegistrationIndexContainer= props => {
  const [eventModels, setEventModels] = useState([])
  const [currentUser, setCurrentUser] = useState({})


  useEffect(() => {
    fetchModelList(`/api/v1/events/${props.eventId}/models`)
  }, [])

  const fetchModelList = (url) => {
    fetch(url, {
      credentials: 'same-origin',
      })
      .then((response) => {
        if (response.ok) {
          return response
        } else {
          let errorMessage = `${response.status} (${response.statusText})`,
            error = new Error(errorMessage)
          throw(error)
        }
      })
      .then(response => response.json())
      .then(body => {
        setEventModels(body.event_models)
        setCurrentUser(body.user)
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`))
  }

  const upDateLists = () => {
    fetchModelList(`/api/v1/events/${props.eventId}/models`)
  }

  const registeredTiles = eventModels.map(model  => {
    return(
      <RegisteredTile
        key={model.id}
        model={model}
      />
    )
  })

  return (
    <div className="row">
      <div className="columns small-12">
        <strong>Registered Models</strong>
        <hr />
        {registeredTiles}
      </div>
    </div>
  )
}

export default RegistrationIndexContainer
