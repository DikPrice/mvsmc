import React, { useState, useEffect } from "react"
import { Redirect } from 'react-router-dom'
import { fetchData } from './../../../modules/fetchData'
import ShowSubmissionTile from "./ShowSubmissionTile"
import EditSubmissionContainer from "./EditSubmissionContainer"

const SubmissionShowContainer = props => {

  const [submission, setSubmission] = useState({})
  const [showComponent, setShowComponent] = useState ("show")
  const [currentUser, setCurrentUser] = useState({})
  const [timestamps, setTimestamps] = useState({})
  const [redirect, setRedirect] = useState(false)

  let submissionId = props.match.params.id

  const storeData = (body) =>{
    setSubmission(body.model)
    setTimestamps(body.timestamps)
    setCurrentUser(body.user)
  }
  useEffect(() => {
    fetchData(`/api/v1/submissions/${submissionId}`, storeData)
  }, [])

  const markForReview = () => {
    event.preventDefault()
    submission["review"] = true
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
        setRedirect(true)
      } else {
        setErrors(body)
      }
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }

  if (redirect === true){
    return <Redirect to='/submissions' />
  }

  let edit_submission = (event) => {
    event.preventDefault()
    setShowComponent("edit")
  }

  let showSubmission = (updatedSubmission) => {
    setShowComponent("show")
    setSubmission(updatedSubmission)
  }

  let component = "show"
  if (showComponent === "show") {
    component = <ShowSubmissionTile
      key={submission.id}
      submission={submission}
      edit={edit_submission}
      user={currentUser}
      forReview={markForReview}
      timestamps={timestamps}
    />
  }
  else {
    component = <EditSubmissionContainer
      key={submission.id}
      submission={submission}
      showUpdates={showSubmission}
    />
  }

  return (
    <div className="submission-panel">
      {component}
    </div>
  )
}

export default SubmissionShowContainer
