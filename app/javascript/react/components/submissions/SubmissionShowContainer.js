import React, { useState, useEffect } from "react"
import { Redirect } from 'react-router-dom'
import { fetchData } from './../../../modules/fetchData'
import { sendData } from './../../../modules/sendData'
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

  const setSuccessState = (body) =>{
    setRedirect(true)
  }
  const setErrorState = (body) =>{
    setErrors(body)
  }
  const markForReview= (event) =>{
    event.preventDefault()
    submission["review"] = true
    sendData(`/api/v1/submissions/${submissionId}`, "PATCH", submission, setSuccessState, setErrorState)
  }

  if (redirect === true){
    return <Redirect to='/submissions' />
  }

  let editSubmission = (event) => {
    event.preventDefault()
    setShowComponent("edit")
  }

  let showSubmission = (updatedSubmission) => {
    setShowComponent("show")
    setSubmission(updatedSubmission)
  }

  let component
  if (showComponent === "show") {
    component = <ShowSubmissionTile
      key={submission.id}
      submission={submission}
      edit={editSubmission}
      user={currentUser}
      forReview={markForReview}
      timestamps={timestamps}
    />
  } else {
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
