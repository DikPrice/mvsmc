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

  const passSortType = event => {
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
      <div className="index-list submission">
        <div className="title row">
          <div className="columns small-8 medium-8">
            Submissions
          </div>
          <form>
            <div className="columns small-4 medium-2">
              <label>
                <select name="sort"
                  value={sort.sort}
                  onChange={passSortType}>
                  <option name="">Sort by</option>
                  <option name="models">Models</option>
                  <option name="modelers">Modelers</option>
                  <option name="newestupdate">Newest Update</option>
                  {findMyModels}
                  {showReadyForReview}
                </select>
              </label>
            </div>
          </form>
        </div>
        <div className="row columns">
          <div className="rows table-header">
            <div className="table-header">
              <div className="columns small-6 large-6">
                Model
              </div>
              <div className="columns small-2 large-2">
                Scale
              </div>
              <div className="columns small-12 large-4">
                Modeler
              </div>
            <hr />
            </div>
          </div>
          <div className="row columns">
            <div className="scroll-body">
              {submissionsTiles}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default SubmissionIndexContainer
