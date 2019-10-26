import React, { useState, useEffect } from "react"


const SubmissionShowContainer = props => {

  const [submission, setSubmission] = useState([])

  let submissionId = props.match.params.id

  useEffect(() => {fetch(`/api/v1/submissions/${submissionId}`, {
    credentials: 'same-origin',
    })
    .then((response) => {
      if (response.ok) {
        return response
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
          error = new Error(errorMessage)
        throw(error)
      }
    })
    .then(response => response.json())
    .then(body => {
      setSubmission(body)
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  },[])

  return (
    <div className="submission-display">
      <div className="event-card">
        <div className="rows columns small-12 title">
          {submission.name}
        </div>
        <div className="rows columns small-12 details">
          {submission.first_name} {submission.last_name}<br />
          {submission.source}<br />
          {submission.scale}    
        </div>
        <div className="rows columns small-12 description">
          {submission.description}
        </div>
      </div>
      <div className="rows columns small-12 meta">
          <hr />
          Length: {submission.length}",
          Width: {submission.width}",
          Height: {submission.height}"<br />
          Phone: {submission.phone},
          Email: {submission.email}
      </div>
    </div>
  )
}

export default SubmissionShowContainer
