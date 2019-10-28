import React, { useState, useEffect } from 'react'
import { Redirect } from "react-router-dom"
import SubmissionTile from './SubmissionTile'

const SubmissionIndexContainer = props => {
  const [submissions, setSubmissions] = useState([])
  const [sort, setSort] = useState({sort: "none"})
  const [currentUserId, setCurrentUserId] = useState(0)
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
        setCurrentUserId(body.user_id)
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

  let findMyModels  = ""
  if (currentUserId){
    findMyModels = <option name="mymodels">My Models</option>
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
        userId={currentUserId}
        edit={edit_submission}
      />
    )
  })

  if ( show === "list"){
    return (
      <div className="submission-list">
        <div className="title row">
          <div className="columns small-5 large-2">
            Submissions
          </div>
          <form>
          <div className="columns small-5 large-2">
            <label>
              <select name="sort"
                value={sort.sort}
                onChange={handleInputChange}>
                <option name="">Sort by</option>
                <option name="models">Models</option>
                <option name="modelers">Modelers</option>
                {findMyModels}
              </select>
            </label>
          </div>
          </form>
          <hr />
        </div>
        <div className="row columns">
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
        </div>
      </div>
    )
  }
}

export default SubmissionIndexContainer
