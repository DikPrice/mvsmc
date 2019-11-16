import React, { useState } from 'react'
import { sendData } from './../../../modules/sendData'

const EditSubmissionContainer = props => {

  for (var index in props.submission){
    if (props.submission[index] == null){
      props.submission[index] = ""
    }
  }

  const {
    id,
    name, source, scale, description,
    length, width, height,
    first_name, last_name, phone, email,
  } = props.submission

  const [errors, setErrors] = useState({})
  const [submission, setSubmission] = useState({
    name: name, scale: scale, source: source, description: description,
    length: length, width: width, height: height,
    first_name: first_name, last_name: last_name, phone: phone, email: email
  })

  const setSuccessState = (body) =>{
    debugger
    props.showUpdates(body)
  }
  const setErrorState = (body) =>{
    setErrors(body)
  }
  const postSubmissionEdit= (event) =>{
    event.preventDefault()
    debugger
    sendData(`/api/v1/submissions/${id}`, "PATCH", submission, setSuccessState, setErrorState)
  }

  // const postSubmissionEdit = (event) => {
  //   event.preventDefault()
  //   fetch(`/api/v1/submissions/${id}`, {
  //     credentials: "same-origin",
  //     method: "PATCH",
  //     body: JSON.stringify({
  //       submission: submission,
  //       id: id
  //     }),
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json"
  //     }
  //   })
  //   .then(response => {
  //     if (response.ok) {
  //       return response
  //     } else {
  //       const errorMessage = `${response.status} (${response.statusText})`
  //       const error = new Error(errorMessage)
  //       throw error
  //     }
  //   })
  //   .then(response => response.json())
  //   .then(body => {
  //     if (body.id) {
  //       props.showUpdates(body)
  //     } else {
  //       setErrors(body)
  //     }
  //   })
  //   .catch(error => console.error(`Error in fetch: ${error.message}`))
  // }

  const handleInputChange = event => {
    setSubmission({
      ...submission,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  const sourceArray = [
    'Kit',
    'Modified kit',
    'Scratch-built',
    'Other'
  ]

  const sourceOptions = sourceArray.map((source) => {
    return (
      <option key={source} name={source}>{source}</option>
    )
  })

  return(
    <div className="submission-form">
      <div className="row columns">
        <div className="form-title">
          Edit your submission
        </div>
      </div>
      <form onSubmit={postSubmissionEdit}>
      <div className="row">
        <div className="columns small-12 large-6">

          <div className="row columns">
            <label>
              Model Name:
              {errors.name}
              <input
                type="text"
                name="name"
                value={submission.name}
                onChange={handleInputChange}
              />
            </label>
          </div>

          <div className="row">
            <div className="columns small-6">
              <label>
                Scale: {errors.scale}
                <input
                  type="text"
                  name="scale"
                  value={submission.scale}
                  onChange={handleInputChange}
                />
              </label>
            </div>
            <div className="columns small-6">
              <label>
                Source: {errors.source}
                <select name="source"
                  value={submission.source}
                  onChange={handleInputChange}>
                  <option name=""></option>
                  {sourceOptions}
                </select>
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
                    value={submission.first_name}
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
                    value={submission.last_name}
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
                    value={submission.phone}
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
                    value={submission.email}
                    onChange={handleInputChange}
                  />
                </label>
              </div>
            </div>

            <div className="row">
              <div className="columns small-4">
                <label>
                  Length: {errors.length}
                  <input
                    type="text"
                    name="length"
                    value={submission.length}
                    onChange={handleInputChange}
                  />
                </label>
              </div>
              <div className="columns small-4">
                <label className="">
                  Width: {errors.width}
                  <input
                    type="text"
                    name="width"
                    value={submission.width}
                    onChange={handleInputChange}
                  />
                </label>
              </div>
              <div className="columns small-4">
                <label className="">
                  Height: {errors.height}
                  <input
                    type="text"
                    name="height"
                    value={submission.height}
                    onChange={handleInputChange}
                  />
                </label>
              </div>
            </div>

            <div className="row">
              <div className="text-center form-footer">
                <input
                  className="button"
                  type="submit"
                  value="Save"
                />
                <button className="button" onClick={props.show}>
                  Cancel
                </button>
              </div>
            </div>
        </div>

        <div className="columns small-12 large-6">
          Description: {errors.description} <br/>
          <textarea
            cols="50"
            rows="15"
            name="description"
            value={submission.description}
            onChange={handleInputChange}>
          </textarea>
        </div>
      </div>
    </form>
  </div>
  )
}

export default EditSubmissionContainer
