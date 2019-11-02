import React, { useState, useEffect } from "react"
import { Link } from 'react-router-dom'
import ManageEventContainer from './ManageEventContainer'
import EventEditContainer from './EventEditContainer'

const EventShowContainer = props => {

  const [ eventInfo, setEventInfo ] = useState({})
  const [currentUser, setCurrentUser] = useState({})

  let eventId = props.match.params.id

  useEffect(() => {fetch(`/api/v1/events/${eventId}`, {
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
      setEventInfo(body.event)
      setCurrentUser(body.user)
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  },[])

  let selectComponent = <ShowEventContainer id={eventId} eventId={eventId} />
  let selectComponent = <EditEventContainer id={eventId} eventId={eventId} />

  let editEvent
  if (currentUser){
    if (currentUser["role"] === 2){
      editEvent = <Link to='/events/new'>Edit this Event</Link>
    }
  }

  return (
    <div className="event-display">
      <div className="row">
        <div className="event-box columns small-12 medium-4">
         <div className="row event-title">
            {eventInfo["name"]}
          </div>
          <div className="row venue">
          <strong>{eventInfo["venue"]}</strong><br/ >
            {eventInfo["address"]},
            {eventInfo["city"]},
            {eventInfo["state"]},
            {eventInfo["zip"]}
          </div>
          <div className="row event-desc">
            <hr />
            {eventInfo["description"]}
          </div>
          <div className="dates">
            <hr />
            {eventInfo["start_date"]} : {eventInfo["end_date"]}
          </div>
          <div className="row">
            <hr />
            {editEvent}
          </div>
        </div>
        <div className="select-box columns small-12 medium-8">
          {selectComponent}
        </div>
      </div>
    </div>
  )
}

export default EventShowContainer
