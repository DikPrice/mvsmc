import React, { useState } from "react"
import { Redirect } from "react-router-dom"
import { sendData } from './../../../modules/sendData'
import { deleteData } from './../../../modules/deleteData'

const ShowSubmissionTile = props => {
  const [redirect, setRedirect] = useState(false)
  const [errors, setErrors] = useState([])
  const {
    id,
    name, source, scale, description,
    length, width, height,
    first_name, last_name, phone, email,
    created_at, updated_at,
    review
  } = props.submission

  const setSuccessState = (body) =>{
    setRedirect(true)
  }
  const setErrorState = (body) =>{
    setErrors(body)
  }
  const postToMaster = (event) =>{
    event.preventDefault()
    sendData("/api/v1/models", "POST", props.submission, setSuccessState, setErrorState)
  }
  const deleteSubmission = (event) => {
    event.preventDefault()
    deleteData(`/api/v1/submissions/${id}`, setSuccessState, setErrorState)
  }

  if (redirect){
    return < Redirect to='/submissions' />
  }

  let goBack = (event) => {
    event.preventDefault()
    setRedirect(true)
  }


  let edit, submitForReview, showContacts, showTimestamps, transferToMaster, deleteEntry
  if (props.user){
    if (props.user["role"] >= 3){
      deleteEntry = <button className="button" onClick={deleteSubmission}>Delete</button>
    }
    if ((first_name == props.user["first_name"] && last_name == props.user["last_name"]) || (props.user["role"] >= 2)){
      showTimestamps =
      <>
        Created: {props.timestamps.created},<br />Updated: {props.timestamps.updated}
      </>
      if (review === true){
        if (props.user["role"] >= 2){
          edit= <button className="button" onClick={props.edit}>Edit</button>
          transferToMaster= <button className="button create-master" onClick={postToMaster}>
          Create Master</button>
        } else {
          edit = "Model under review"
          submitForReview = ""
        }
      } else {
        edit= <button className="button" onClick={props.edit}>Edit</button>
        submitForReview = <button className="button" onClick={props.forReview}>Submit</button>
        showContacts = <>Phone: {phone} <br /> Email: {email}</>
      }
    }
  }

  return (
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
            {description}
          </div>
        </div>
      </div>
      <div className="row">
        <div className="meta-panel">
          <div className="columns small-12 medium-4">
            <div className="meta">
              Length: {length}",
              Width: {width}",
              Height: {height}"<br />
              {showContacts}
            </div>
          </div>
          <div className="columns small-12 medium-4">
            <div className="meta">
              {showTimestamps}
            </div>
          </div>
          <div className="columns small-12 medium-4">
            <div className="meta">
              <button className="button" onClick={goBack}>Go Back</button>
              {submitForReview}
              {edit}
              {transferToMaster}
              {deleteEntry}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShowSubmissionTile
