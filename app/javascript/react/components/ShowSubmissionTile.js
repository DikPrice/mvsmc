import React from "react"

const ShowSubmissionTile = props => {
  const {
    name, source, scale, description,
    length, width, height,
    first_name, last_name, phone, email
  } = props.submission

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
        <div className="columns small-12 large-9">
          Length: {length}",
          Width: {width}",
          Height: {height}"<br />
          Phone: {phone},
          Email: {email}
        </div>
        <div className="columns small-12 large-3">
          <button className="button" onClick={props.edit}>
            Edit
          </button>
        </div>
      </div>
    </div>
  )
}

export default ShowSubmissionTile
