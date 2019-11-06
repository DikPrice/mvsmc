import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom"

const SelectTile = props => {
  const [modeler, setModeler] = useState({})
  const [registration, setRegistration] = useState({})
  let modelerId = props.model["modeler_id"]

  useEffect(() => {fetch(`/api/v1/modelers/${modelerId}`, {
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
      setModeler(body.modeler)
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  },[])

  const registerModel = (event) => {
    event.preventDefault()
    fetch("/api/v1/event_registrations", {
      credentials: 'same-origin',
      method: "POST",
      body: JSON.stringify({
        event_id: props.eventId,
        model_id: props.model["id"]
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
    .then(response => {
      if (response.ok) {
        return response
      } else {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw error
      }
    })
    .then(response => response.json())
    .then(body => {
      setRegistration(body.registration)
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))

    props.updateLists()
  }

  return (
    <div className="model-select" onClick={registerModel}>
      <div className="row tile">
        <div className="columns small-8">
          <div className="name">
            <strong>{props.model.name}</strong>
          </div>
        </div>
        <div className="columns small-4 scale">
          {props.model.scale}<br />
        </div>
      </div>
      <div className="row columns">
        <span className=" modeler">
          {modeler["first_name"]} {modeler["last_name"]}
        </span>
      </div>
    </div>
  )
}

export default SelectTile