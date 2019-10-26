import React, { useState, useEffect } from 'react'

import SubmissionTile from './SubmissionTile'

const SubmissionIndexContainer = props => {
  const [submissions, setSubmissions] = useState([])

  useEffect(() => {fetch("/api/v1/submissions", {
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
      setSubmissions(body)
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }, [])

  const submissionsTiles = submissions.map(submission  => {
    return(
      <SubmissionTile
        key={submission.id}
        id={submission.id}
        name={submission .name}
        scale={submission.scale}
      />
    )
  })

  return (
    <div className=" row submission-list">
      <div className="columns small-12">
        <p>Submissions</p>
        <hr />
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Scale</th>
            </tr>
          </thead>
          <tbody>
            {submissionsTiles}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default SubmissionIndexContainer
