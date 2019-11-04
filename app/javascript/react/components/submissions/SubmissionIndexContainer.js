import React, { useState, useEffect } from 'react'
import { Redirect } from "react-router-dom"
import SubmissionTile from './SubmissionTile'

const SubmissionIndexContainer = props => {
  const [submissions, setSubmissions] = useState([])
  const [sort, setSort] = useState({sort: "none"})
  const [currentUser, setCurrentUser] = useState({})
  const [show, setShow] = useState("list")

  const fetchModelList = (url) => {
    fetch(url, {
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
        setSubmissions(body.models)
        setCurrentUser(body.user)
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`))
  }

  useEffect(() => {
    fetchModelList(`/api/v1/submissions?sort=${sort.sort}`)
  }, [sort])

  const handleInputChange = event => {
    let sortValue = event.currentTarget.value.toLowerCase().replace(' ', '')
    setSort({
      ...sort,
      [event.currentTarget.name]: sortValue
    })
  }

  let findMyModels, showReadyForReview
  if (currentUser){
    findMyModels = <option name="mymodels">My Models</option>
    if (currentUser["role"] >= 2){
      showReadyForReview = <option name="forreview">Awaiting Review</option>
    }
  }

  const submissionsTiles = submissions.map(submission  => {

    let edit_submission = (event) => {
      setShow("edit")
    }

    return(
      <SubmissionTile
        key={submission.id}
        id={submission.id}
        name={submission .name}
        scale={submission.scale}
        firstName={submission.first_name}
        lastName={submission.last_name}
        review={submission.review}
        edit={edit_submission}
      />
    )
  })

  if ( show === "list"){
    return (
      <div className="submission-list">
        <div className="title row">
<<<<<<< HEAD:app/javascript/react/components/submissions/SubmissionIndexContainer.js
          <div className="columns small-5 medium-4 large-3">
            Submissions
          </div>
          <form>
          <div className="columns small-5 medium-2 large-2">
=======
          <div className="columns small-6 large-3">
            Submissions
          </div>
          <form>
          <div className="columns small-6 large-9">
>>>>>>> master:app/javascript/react/components/SubmissionIndexContainer.js
            <label>
              <select name="sort"
                value={sort.sort}
                onChange={handleInputChange}>
                <option name="">Sort by</option>
                <option name="models">Models</option>
                <option name="modelers">Modelers</option>
                {findMyModels}
                {showReadyForReview}
              </select>
            </label>
          </div>
          </form>
          <hr />
        </div>
<<<<<<< HEAD:app/javascript/react/components/submissions/SubmissionIndexContainer.js
        <div className="scroll-body row columns">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Scale</th>
                <th>Modeler</th>
              </tr>
            </thead>
            <tbody>
              {submissionsTiles}
            </tbody>
          </table>
=======
        <div className="row columns text_center submission-tiles">
          {submissionsTiles}
>>>>>>> master:app/javascript/react/components/SubmissionIndexContainer.js
        </div>
      </div>
    )
  }
}

export default SubmissionIndexContainer
