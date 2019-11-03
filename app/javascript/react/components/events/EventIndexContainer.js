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
    if (currentUser["role"] === 2){
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
    <div className="submission-list">
      <div className="row columns">
        <table>
          <thead>
            <tr>
              <th>Events</th>
            </tr>
          </thead>
          <tbody>
            {eventTiles}
          </tbody>
        </table>
        <div className="columns small-12">
        <hr />
          {addEvent}
        </div>
      </div>
    </div>
  )
}

export default EventIndexContainer
