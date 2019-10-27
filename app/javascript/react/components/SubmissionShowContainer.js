import React, { useState, useEffect } from "react"

import ShowSubmissionTile from "./ShowSubmissionTile"
import EditSubmissionContainer from "./EditSubmissionContainer"

const SubmissionShowContainer = props => {

  const [submission, setSubmission] = useState([])
  const [showComponent, setShowComponent] = useState ("show")

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

  let edit_submission = (event) => {
    setShowComponent("edit")
  }

  let show_submission = (id) => {
    setShowComponent("show")
  }

  let component = "show"
  if (showComponent === "show") {
    component = <ShowSubmissionTile
      id={submission.id}
      submission={submission}
      edit={edit_submission}/>
  }
  else {
    component = <EditSubmissionContainer
      id={submission.id}
      submission={submission}
      show={show_submission}/>
  }

  return (
    <div>
      {component}
    </div>
  )
}

export default SubmissionShowContainer
