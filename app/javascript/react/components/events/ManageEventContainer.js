import React, { useState, useEffect } from 'react'
import SelectTile from './SelectTile'
import SelectedTile from './SelectedTile'

const ManageEventContainer = props => {
  const [models, setModels] = useState([])
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
        setModels(body.models)
        setEventModels(body.event_models)
        setCurrentUser(body.user)
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`))
  }

  const upDateLists = () => {
    fetchModelList(`/api/v1/events/${props.eventId}/models`)
  }

  const selectTiles = models.map(model  => {
    return(
      <SelectTile
        key={model.id}
        model={model}
        eventId={props.eventId}
        updateLists={upDateLists}
      />
    )
  })
  const selectedTiles = eventModels.map(model  => {
    return(
      <SelectedTile
        key={model.id}
        model={model}
        eventId={props.eventId}
        updateLists={upDateLists}
      />
    )
  })

  return (
    <div className="row">
      <div className="select columns small-12 medium-6">
        <div className="event-index-list select">
          <div className="title row columns">
            Available Models
          </div>
          <div className="event-scroll-body select-list">
            {selectTiles}
          </div>
        </div>
      </div>
      <div className="select columns small-12 medium-6">
        <div className="event-index-list select">
          <div className="title row columns">
            Registered Models
          </div>
          <div className="event-scroll-body selected-list">
            {selectedTiles}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ManageEventContainer
