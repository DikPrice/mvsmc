import React, { useState, useEffect } from "react"

import ShowSubmissionTile from "./ShowSubmissionTile"
import EditSubmissionContainer from "./EditSubmissionContainer"

const SubmissionShowContainer = props => {

  const [submission, setSubmission] = useState({})
  const [showComponent, setShowComponent] = useState ("show")
  const [currentUser, setCurrentUser] = useState({})

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
      setSubmission(body.model)
      setCurrentUser(body.user)
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  },[])

  const markForReview = () => {
    submission["review"] = true
    debugger
    event.preventDefault()
    fetch(`/api/v1/submissions/${submissionId}`, {
      credentials: "same-origin",
      method: "PATCH",
      body: JSON.stringify({
        submission: submission,
        id: submissionId
      }),
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
      if (body.id) {
        showSubmission(body)
      } else {
        setErrors(body)
      }
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }

  let edit_submission = (event) => {
    setShowComponent("edit")
  }

  let showSubmission = (updatedSubmission) => {
    setShowComponent("show")
    setSubmission(updatedSubmission)
  }

  let component = "show"
  if (showComponent === "show") {
    component = <ShowSubmissionTile
      id={submission.id}
      submission={submission}
      edit={edit_submission}
      user={currentUser}
      forReview={markForReview}
    />
  }
  else {
    component = <EditSubmissionContainer
      id={submission.id}
      submission={submission}
      showUpdates={showSubmission}
    />
  }

  return (
    <div>
      {component}
    </div>
  )
}

export default SubmissionShowContainer
