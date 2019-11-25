import React, { useState } from 'react'
import { sendData } from './../../../modules/sendData'

const EditModelTile = props => {

  const {
    id,
    name, source, scale, description,
    length, width, height
  } = props.model
  const {
    first_name, last_name, phone, email,
  } = props.modeler

  const [errors, setErrors] = useState({})
  const [model, setModel] = useState({
    name: name, scale: scale, source: source, description: description,
    length: length, width: width, height: height,
  })
  const [modeler, setModeler] = useState({
    first_name: first_name, last_name: last_name, phone: phone, email: email
  })

  const setSuccessState = (body) =>{
    props.showUpdatedModel(body)
  }
  const setErrorState = (body) =>{
    setErrors(body)
  }
  const postModelEdit= (event) =>{
    event.preventDefault()
    sendData(`/api/v1/models/${id}`, "PATCH", model, setSuccessState, setErrorState)
  }

  const handleInputChange = event => {
    setModel({
      ...model,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  const validForSubmission = () => {
    let submitErrors = {}
    const requiredFields = ["name", "scale"]
    requiredFields.forEach(field => {
      if (model[field].trim() === "") {
        submitErrors = {
          ...submitErrors,
          [field]: "can't be blank"
        }
      }
    })

    setErrors(submitErrors)
    return isEmpty(submitErrors)
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
          Edit model details
        </div>
      </div>
      <form onSubmit={postModelEdit}>
      <div className="row">
        <div className="columns small-12 large-6">

          <div className="row columns">
            <label>
              Model Name:
              {errors.name}
              <input
                type="text"
                name="name"
                value={model.name}
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
                  value={model.scale}
                  onChange={handleInputChange}
                />
              </label>
            </div>
            <div className="columns small-6">
              <label>
                Source: {errors.source}
                <select name="source"
                  value={model.source}
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
                    value={modeler.first_name}
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
                    value={modeler.last_name}
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
                    value={modeler.phone}
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
                    value={modeler.email}
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
                    value={model.length}
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
                    value={model.width}
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
                    value={model.height}
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
            value={model.description}
            onChange={handleInputChange}>
          </textarea>
          Character Count: {description.length}
        </div>
      </div>
    </form>
  </div>
  )
}

export default EditModelTile
