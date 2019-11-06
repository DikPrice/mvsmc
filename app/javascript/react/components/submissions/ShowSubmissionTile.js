import React, {useState } from "react"
import { Redirect } from "react-router-dom"

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

  let uploadToMaster = () => {
    event.preventDefault()
    fetch("/api/v1/models", {
      credentials: 'same-origin',
      method: "POST",
      body: JSON.stringify(props.submission),
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
      debugger
      if (body.result["id"]) {
        setRedirect(true)
      } else {
        setErrors(body)
      }
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }

  if (redirect){
    return < Redirect to='/submissions' />
  }

  let goBack = (event) => {
    event.preventDefault()
    setRedirect(true)
  }

  let edit, submitForReview, showContacts, showTimestamps, transferToMaster
  if (props.user){
    if ((first_name == props.user["first_name"] && last_name == props.user["last_name"]) || (props.user["role"] >= 2)){
      if (review === true){
        if (props.user["role"] >= 2){
          edit= <button className="button" onClick={props.edit}>Edit</button>
          transferToMaster= <button className="button create-master" onClick={uploadToMaster}>Create Master</button>
        } else {
          edit = "Model under review"
          submitForReview = ""
        }
      } else {
        edit= <button className="button" onClick={props.edit}>Edit</button>
        submitForReview = <button className="button" onClick={props.forReview}>Submit</button>
        showContacts = `Phone: ${phone}, Email: ${email}`
        showTimestamps =
        <>
          Created: {props.timestamps.created},<br />Updated: {props.timestamps.updated}
        </>
      }
    }
  }

  return (
    <div className="submission-display">
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
      <hr />
      <div className="rows meta">
        <div className="columns small-12 large-4">
          Length: {length}",
          Width: {width}",
          Height: {height}"<br />
          {showContacts}
        </div>
        <div className="columns small-12 large-4">
          {showTimestamps}
        </div>
        <div className="columns small-12 large-4">
          <button className="button" onClick={goBack}>Go Back</button>
          {submitForReview}
          {edit}
          {transferToMaster}
        </div>
      </div>
    </div>
  )
}

export default ShowSubmissionTile
