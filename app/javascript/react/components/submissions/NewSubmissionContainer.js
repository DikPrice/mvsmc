import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { isEmpty } from 'lodash'

const NewSubmissionContainer = props => {
  const [errors, setErrors] = useState({})
  const [shouldRedirect, setShouldRedirect] = useState(false)
  const [newSubmission, setNewSubmission] = useState({
    name: "",
    scale: "",
    source: "",
    description: "",
    length: "",
    width: "",
    height: "",
    first_name: "",
    last_name: "",
    phone: "",
    email: ""
  })

  const sourceArray = [
    'Kit',
    'Modified kit',
    'Scratch-built',
    'Other'
  ]

  const validForSubmission = () => {
    let submitErrors = {}
    const requiredFields = ["name", "scale", "first_name", "last_name"]
    requiredFields.forEach(field => {
      if (newSubmission[field].trim() === "") {
        submitErrors = {
          ...submitErrors,
          [field]: "can't be blank"
        }
      }
    })

    setErrors(submitErrors)
    return isEmpty(submitErrors)
  }

  const postNewSubmission = () => {
    event.preventDefault()
    if (validForSubmission()) {
      fetch("/api/v1/submissions", {
        credentials: 'same-origin',
        method: "POST",
        body: JSON.stringify(newSubmission),
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
          setShouldRedirect(true)
        } else {
          setErrors(body)
        }
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`))
    }
  }

  if (shouldRedirect) {
    return <Redirect to='/submissions' />
  }

  const handleInputChange = event => {
    setNewSubmission({
      ...newSubmission,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  const clearForm = event => {
    event.preventDefault()
    setNewSubmission({
      name: "",
      scale: "",
      source: "",
      description: "",
      length: "",
      width: "",
      height: "",
      first_name: "",
      last_name: "",
      phone: "",
      email: ""
    })
    setErrors({})
  }

  const sourceOptions = sourceArray.map((source) => {
    return (
      <option key={source} name={source}>{source}</option>
    )
  })

  let duplicateError = ""
  if (errors.result === "duplicate"){
    duplicateError = " : Model already exists"
  }

  return(
    <div className="submission-form">
      <form onSubmit={postNewSubmission}>
        <div className="row columns">
          <div className="form-title">
            New Model Submission
            <span id="duplicate">{duplicateError}</span>
          </div>
        </div>
        <div className="row">
          <div className="columns small-12 large-8">
            <label>
              Model Name:
              {errors.name}
              <input
                type="text"
                name="name"
                value={newSubmission.name}
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div className="columns small-6 large-2">
            <label>
              Scale: {errors.scale}
              <input
                type="text"
                name="scale"
                value={newSubmission.scale}
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div className="columns small-6 large-2">
            <label>
              Source: {errors.source}
              <select name="source"
                value={newSubmission.source}
                onChange={handleInputChange}>
                <option name=""></option>
                {sourceOptions}
              </select>
            </label>
          </div>
        </div>

        <div  className="row columns">
          <label>
            Description: {errors.description}
            <input
              type="text"
              name="description"
              value={newSubmission.description}
              onChange={handleInputChange}
            />
          </label>
        </div>

        <div className="row">
          <div className="columns small-12 medium-3">
            Model overall dimensions:<br />
            (Inluding bases and cases)
          </div>
          <div className="columns small-4 medium-3">
            <label>
              Length: {errors.length}
              <input
                type="text"
                name="length"
                value={newSubmission.length}
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div className="columns small-4 medium-3">
            <label className="">
              Width: {errors.width}
              <input
                type="text"
                name="width"
                value={newSubmission.width}
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div className="columns small-4 medium-3">
            <label className="">
              Height: {errors.height}
              <input
                type="text"
                name="height"
                value={newSubmission.height}
                onChange={handleInputChange}
              />
            </label>
          </div>
        </div>

        <div className="row">
          <div className="columns small-6">
            <label className="">
              First Name: {errors.first_name}
              <input
                type="text"
                name="first_name"
                value={newSubmission.first_name}
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div className="columns small-6">
            <label className="">
              Last Name: {errors.last_name}
              <input
                type="text"
                name="last_name"
                value={newSubmission.last_name}
                onChange={handleInputChange}
              />
            </label>
          </div>
        </div>

        <div className="row">
          <div className="columns small-6">
            <label className="">
              Phone: {errors.phone}
              <input
                type="text"
                name="phone"
                value={newSubmission.phone}
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div className="columns small-6">
            <label className="">
              Email: {errors.email}
              <input
                type="text"
                name="email"
                value={newSubmission.email}
                onChange={handleInputChange}
              />
            </label>
          </div>
        </div>

        <div className="text-center form-footer">
          <input
            className="button"
            type="submit"
            value="Save"
          />
          <button className="button" onClick={clearForm}>
            Clear
          </button>
        </div>
      </form>
    </div>
  )
}

export default NewSubmissionContainer
