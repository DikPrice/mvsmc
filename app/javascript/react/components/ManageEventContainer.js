import React, { useState, useEffect } from 'react'
import SelectTile from './SelectTile'
import SelectedTile from './SelectedTile'

const ManageEventContainer = props => {
  const [models, setModels] = useState([])
  const [eventModels, setEventModels] = useState([])
  const [currentUser, setCurrentUser] = useState({})


  useEffect(() => {
    fetchModelList(`/api/v1/models`)
    fetchAssignedModelList(`/api/v1/events/${props.eventId}/models`)
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
        setModels(body.models)
        setCurrentUser(body.user)
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`))
  }

  const fetchAssignedModelList = (url) => {
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
        setEventModels(body.models)
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`))
  }

  const selectModelForEvent = () => {
  }

  const selectTiles = models.map(model  => {
    return(
      <SelectTile
        key={model.id}
        model={model}
        eventId={props.eventId}
        selectModel={selectModelForEvent}
      />
    )
  })
  const selectedTiles = eventModels.map(model  => {
    return(
      <SelectedTile
        key={model.id}
        model={model}
        eventId={props.eventId}
      />
    )
  })

  return (
    <div className="row">
      <div className="columns small-6">
        <strong>Available Models</strong>
        <hr />
        {selectTiles}
      </div>
      <div className="columns small-6">
        <strong>Registered Models</strong>
        <hr />
        {selectedTiles}
      </div>
    </div>
  )
}

export default ManageEventContainer
