import React, { useState, useEffect } from "react"
import { Redirect } from "react-router-dom"
import { deleteData } from './../../../modules/deleteData'

const ModelShowTile = props => {
  const [redirect, setRedirect] = useState("")
  const [errors, setErrors] = useState([])

  const {
    id,
    name, source, scale, description,
    length, width, height
  } = props.model
  const {
    first_name, last_name, phone, email,
  } = props.modeler

  const setSuccessState = (body) =>{
    setRedirect("/models")
  }
  const setErrorState = (body) =>{
    setErrors(body)
  }

  const deleteModel= (event) => {
    event.preventDefault()
    deleteData(`/api/v1/models/${id}`, setSuccessState, setErrorState)
  }

  if (redirect){
    return < Redirect to={redirect} />
  }

  let goBack = (event) => {
    event.preventDefault()
    setRedirect("/models")
  }

  let printView = (event) => {
    event.preventDefault()
    setRedirect(`/models/print/${id}`)
  }

  let deleteEntry, editEntry
  if (props.currentUser){
    if (props.currentUser["role"] >= 3){
      deleteEntry = <button className="button" onClick={deleteModel}>Delete</button>
      editEntry = <button className="button" onClick={props.editModel}>Edit</button>
    }
  }

  let displayParas
  if (description){
    let paras = description.split("\n")
    displayParas = paras.map(para => {
      return(<p>{para}</p>)
    })
  }

  return (
    <div className="submission-panel">
      <div className="submission-display">
        <div className="row">
          <div className="event-card">
            <div className="rows columns title">
              {name}
            </div>
            <div className="rows columns details">
              {first_name} {last_name}<br />
              {source}<br />
              {scale}
            </div>
            <div className="rows columns description">
              {displayParas}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="meta-panel">
            <div className="columns small-12 medium-4">
              <div className="meta">
              </div>
            </div>
            <div className="columns small-12 medium-4">
              <div className="meta">
              </div>
            </div>
            <div className="columns small-12 medium-4">
              <div className="meta">
                <button className="button" onClick={printView}>Print</button>
                <button className="button" onClick={goBack}>Go Back</button>
                {editEntry}
                {deleteEntry}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModelShowTile
