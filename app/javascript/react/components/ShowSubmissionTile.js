import React from "react"

const ShowSubmissionTile = props => {
  const {
    name, source, scale, description,
    length, width, height,
    first_name, last_name, phone, email,
    created_at, updated_at,
    review
  } = props.submission

  let edit, submitForReview, showContacts, showTimestamps
  if ((first_name == props.user["first_name"] && last_name == props.user["last_name"])
      || (props.user["role"] === 2)){
    if (review === true){
      edit = "Model under review"
      submitForReview = ""
    } else {
    edit= <button className="button" onClick={props.edit}>Edit</button>
    submitForReview = <button className="button" onClick={props.forReview}>Submit</button>
    showContacts = `Phone: ${phone}, Email: ${email}`
    showTimestamps = <>Created: {created_at},<br />Updated: {updated_at}</>
    }
  }

  let transferToMaster
  if (props.user["role"] === 2 && review === true) {
    edit= <button className="button create-master" onClick={props.edit}>Create Master</button>
  }

  return (
    <div className="submission-display">
      <div className="event-card">
        <div className="rows columns small-12 title">
          {name}
        </div>
        <div className="rows columns small-12 details">
          {first_name} {last_name}<br />
          {source}<br />
          {scale}
        </div>
        <div className="rows columns small-12 description">
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
          {submitForReview}
          {edit}
          {transferToMaster}
        </div>
      </div>
    </div>
  )
}

export default ShowSubmissionTile
