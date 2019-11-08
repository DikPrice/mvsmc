import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom"
import EventTile from './EventTile'


const EventIndexContainer = props => {
  const [events, setEvents] = useState([])
  const [currentUser, setCurrentUser] = useState({})

  useEffect(() => {fetch(`/api/v1/events`, {
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
      setEvents(body.events)
      setCurrentUser(body.user)
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }, [])

  let addNewEvent = <Link to='/events/new'>Add Event</Link>
  if (currentUser){
    if (currentUser.role >= 2){
      addNewEvent = <Link to='/events/new'>Add Event</Link>
    }
  }

  const eventTiles = events.map(event  => {
    return(
      <EventTile
        key={event.id}
        event={event}
      />
    )
  })

  return (
    <div className="event-index-list">
      <div className="title">
          Events
      </div>
      <div className="row">
        <div className="table-header">
          <div className="columns small-6 large-3">
            Event
          </div>
          <div className="columns small-2 large-4">
            Venue
          </div>
          <div className="columns small-12 large-3">
            Location
          </div>
          <div className="columns small-12 large-2">
            When
          </div>
        </div>
      </div>
      <div className="row">
        <hr />
      </div>
      <div className="scroll-body">
        {eventTiles}
      </div>
      <div className="text-center">

      </div>
    </div>
  )
}

export default EventIndexContainer
