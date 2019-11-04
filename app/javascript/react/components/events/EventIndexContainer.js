import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom"
import EventTile from './EventTile'


const EventIndexContainer = props => {
  const [events, setEvents] = useState([])
  const [currentUser, setCurrentUser] = useState({})

  const fetchEventList = (url) => {
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
        setEvents(body.events)
        setCurrentUser(body.user)
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`))
  }

  useEffect(() => {
    fetchEventList(`/api/v1/events`)
  }, [])

  let addEvent
  if (currentUser){
    if (currentUser["role"] >= 2){
      addEvent = <Link to='/events/new'>Add Event</Link>
    }
  }

  const eventTiles = events.map(event  => {
    return(
      <EventTile
        key={event["id"]}
        event={event}
      />
    )
  })

  return (
    <div className=" event-list">
      <div className="title row">
        <div className="columns small-12">
          Events
        </div>
      </div>
      <div className="row columns">
        <div className="rows table-header">
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
          <hr />
        </div>
        <div className="scroll-body row columns">
          {eventTiles}
        </div>
        <div className="text-center columns small-12">
          {addEvent}
        </div>
      </div>
    </div>
  )
}

export default EventIndexContainer
