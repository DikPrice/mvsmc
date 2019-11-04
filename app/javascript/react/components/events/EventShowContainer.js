import React, { useState, useEffect } from "react"
import { Link } from 'react-router-dom'
import ManageEventContainer from './ManageEventContainer'
import EditEventContainer from './EditEventContainer'
import RegistrationIndexContainer from './RegistrationIndexContainer'
import GoogleMapsContainer from '../googlemaps/GoogleMapsContainer'

const EventShowContainer = props => {

  const [ eventInfo, setEventInfo ] = useState({})
  const [showComponent, setShowComponent] = useState ("public")
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
          lat: 42.8111371,
          lng: -70.875609}}
      zoom={8}
    />
  }
  if (showComponent === "public"){
    component = <RegistrationIndexContainer id={eventId} eventId={eventId} goBack={seeRegistrations}/>
  }

  const allowManager = () => {
    setShowComponent("manage")
  }
  const allowEdit = () => {
    setShowComponent("edit")
  }
  const showMap = () => {
    setShowComponent("map")
  }
  const seeRegistrations = () => {
    setShowComponent("public")
  }

  let showEdit = ""
  let showManager = <button className="button" onClick={seeRegistrations}>Registered Models</button>
  if(currentUser){
    if (currentUser.role >= 2){
      showEdit = <button className="button" onClick={allowEdit}>Edit this Event</button>
      showManager = <button className="button" onClick={allowManager}>Allocate Models</button>
    }
  }

  return (
    <div>
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
            <hr />
          </div>
            <button className="button" onClick={showMap}>
              Show Map
            </button>
           {showEdit}
           {showManager}
        </div>
        <div className="columns small-12 medium-8">
          {component}
        </div>
      </div>
    </div>
  )
}

export default EventShowContainer
