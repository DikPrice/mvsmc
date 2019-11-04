import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { isEmpty } from 'lodash'

const NewEventContainer = props => {
  const [errors, setErrors] = useState({})
  const [redirect, setRedirect] = useState(false)
  const [newEvent, setNewEvent] = useState({
    name: "",
    venue: "",
    description: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    start_date: "",
    end_date: ""
  })

  const validForSubmission = () => {
    let submitErrors = {}
    const requiredFields = ["name", "venue", "city", "start_date"]
    requiredFields.forEach(field => {
      if (newEvent[field].trim() === "") {
        submitErrors = {
          ...submitErrors,
          [field]: "can't be blank"
        }
      }
    })

    setErrors(submitErrors)
    return isEmpty(submitErrors)
  }

  const postNewEvent = () => {
    debugger
    event.preventDefault()
    if (validForSubmission()) {
      fetch("/api/v1/events", {
        credentials: 'same-origin',
        method: "POST",
        body: JSON.stringify(newEvent),
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
        if (body.result["id"]) {
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
    setNewEvent({
      ...newEvent,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  const clearForm = event => {
    event.preventDefault()
    setNewEvent({
      name: "",
      venue: "",
      description: "",
      address: "",
      city: "",
      state: "",
      zip: "",
      start_date: "",
      end_date: ""
    })
    setErrors({})
  }

  return(
    <div className="submission-form">
      <form onSubmit={postNewEvent}>
        <div className="row columns">
          <div className="form-title">
            Create a new event
          </div>
        </div>
        <div className="row">
          <div className="columns small-12 large-6">
            <label>
              Event name:
              {errors.name}
              <input
                type="text"
                name="name"
                value={newEvent.name}
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div className="columns small-12 large-6">
            <label>
              Venue: {errors.venue}
              <input
                type="text"
                name="venue"
                value={newEvent.venue}
                onChange={handleInputChange}
              />
            </label>
          </div>
        </div>

        <div  className="row columns">
          Description: {errors.description}
          <textarea
            type="text"
            name="description"
            rows="5"
            columns="50"
            value={newEvent.description}
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
                value={newEvent.address}
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
                value={newEvent.city}
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
                value={newEvent.state}
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
                value={newEvent.zip}
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
                value={newEvent.start_date}
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
                value={newEvent.end_date}
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
          <button className="button" onClick={clearForm}>
            Clear
          </button>
        </div>
      </form>
    </div>
  )
}

export default NewEventContainer
