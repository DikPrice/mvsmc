import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { isEmpty } from 'lodash'

const EditEventContainer = props => {

  const {
    id,
    name, venue, description,
    address, city, state, zip,
    start_date, end_date
  } = props.event

  const [errors, setErrors] = useState({})
  const [redirect, setRedirect] = useState(false)
  const [editEvent, setEditEvent] = useState({
    id: id,
    name: name,
    venue: venue,
    description: description,
    address: address,
    city: city,
    state: state,
    zip: zip,
    start_date: start_date,
    end_date: end_date
  })

  const validForSubmission = () => {
    let submitErrors = {}
    const requiredFields = ["name", "venue", "city", "start_date"]
    requiredFields.forEach(field => {
      if (editEvent[field].trim() === "") {
        submitErrors = {
          ...submitErrors,
          [field]: "can't be blank"
        }
      }
    })

    setErrors(submitErrors)
    return isEmpty(submitErrors)
  }

  const updateEvent = () => {
    event.preventDefault()
    if (validForSubmission()) {
      fetch(`/api/v1/events/${editEvent.id}`, {
        credentials: 'same-origin',
        method: "PATCH",
        body: JSON.stringify(editEvent),
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
        if (body["id"]) {
          setRedirect(true)
        } else {
          setErrors(body)
        }
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`))
    }
  }

  if (redirect) {
    return <Redirect to='/events' />
  }

  const handleInputChange = event => {
    setEditEvent({
      ...editEvent,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  return(
    <div className="event-submission-form">
      <form onSubmit={updateEvent}>
        <div className="row columns">
          <label>
            Event name:
            {errors.name}
            <input
              type="text"
              name="name"
              value={editEvent.name}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div className="row columns">
          <label>
            Venue: {errors.venue}
            <input
              type="text"
              name="venue"
              value={editEvent.venue}
              onChange={handleInputChange}
            />
          </label>
        </div>

        <div  className="row columns">
          Description: {errors.description}
          <textarea
            type="text"
            name="description"
            rows="4"
            columns="50"
            value={editEvent.description}
            onChange={handleInputChange}
          ></textarea>
        </div>

        <div className="row">
          <div className="columns small-12 medium-5">
            <label>
              Address: {errors.address}
              <input
                type="text"
                name="address"
                value={editEvent.address}
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div className="columns small-4 medium-3">
            <label className="">
              City: {errors.city}
              <input
                type="text"
                name="city"
                value={editEvent.city}
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div className="columns small-2 medium-2">
            <label className="">
              State: {errors.state}
              <input
                type="text"
                name="state"
                value={editEvent.state}
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div className="columns small-2">
            <label className="">
              Zip: {errors.zip}
              <input
                type="text"
                name="zip"
                value={editEvent.zip}
                onChange={handleInputChange}
              />
            </label>
          </div>
        </div>

        <div className="row">
          <div className="columns small-6">
            <label className="">
              Starts: {errors.start_date}
              <input
                type="date"
                name="start_date"
                value={editEvent.start_date}
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div className="columns small-6">
            <label className="">
              Ends (optional): {errors.end_date}
              <input
                type="date"
                name="end_date"
                value={editEvent.end_date}
                onChange={handleInputChange}
              />
            </label>
          </div>
        </div>

        <div className="text-center form-footer">
          <input
            className="button"
            type="submit"
            value="Submit"
          />
          <button className="button" onClick={props.goBack}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default EditEventContainer
