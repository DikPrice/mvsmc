import React, { useState, useEffect } from "react"
import { Link } from 'react-router-dom'
import ManageEventContainer from './ManageEventContainer'
import EditEventContainer from './EditEventContainer'
import RegistrationIndexContainer from './RegistrationIndexContainer'
import GoogleMapsContainer from '../googlemaps/GoogleMapsContainer'

const EventShowContainer = props => {

  const [ eventInfo, setEventInfo ] = useState({})
  const [showComponent, setShowComponent] = useState ("public")
  const [dates, setDates] = useState({})
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
      setDates(body.dates)
      setCurrentUser(body.user)
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  },[])

  let component = "manage"
  if (showComponent === "manage"){
    component = <ManageEventContainer id={eventId} eventId={eventId} />
  }
  if (showComponent === "edit"){
    component = <EditEventContainer id={eventId} event={eventInfo} goBack={showManager}/>
  }
  if (showComponent === "map"){
    component = <GoogleMapsContainer
      google={{apiKey: "AIzaSyDO3llKxY58ckwDleWJZLGnEU0fbJ4xmGs"}}
      center={{
        lat: 42.81083333,
        lng: -70.87166667
      }}
      zoom={1}
    />
  }
  if (showComponent === "public"){
    component = <RegistrationIndexContainer id={eventId} eventId={eventId} />
  }

  const allowManager = () => {
    event.preventDefault()
    setShowComponent("manage")
  }
  const allowEdit = () => {
    event.preventDefault()
    setShowComponent("edit")
  }
  const showMap = () => {
    event.preventDefault()
    setShowComponent("map")
  }
  const showManifest = () => {
    event.preventDefault()
    setShowComponent("public")
  }

  let showEdit = "", showManager = ""
  if(currentUser){
    if (currentUser.role >= 2){
      showEdit = <button className="button" onClick={allowEdit}>Edit this Event</button>
      showManager = <button className="button" onClick={allowManager}>Allocate Models</button>
    }
  }
  const registrations = <button className="button" onClick={showManifest}>Registered Models</button>

  let showEventDates
  if (dates.start_date === dates.end_date){
    showEventDates = <>Takes place:{dates.start_date}</>
  } else {
    showEventDates = <>Start date: {dates.start_date}<br />
    End date: {dates.end_date}</>
  }

  return (
    <div>
      <div className="show-events">
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
              {showEventDates}
            <hr />
          </div>
          <div className="text-center">
            <button className="button" onClick={showMap}>
              Show Map
            </button>
            {showEdit}<br />
            {showManager}
            {registrations}
          </div>
        </div>
        <div className="columns small-12 medium-8">
          <div className="event-display">
            {component}
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventShowContainer
