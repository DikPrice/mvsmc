//UPdated
import React, { useState, useEffect } from 'react'
import SubmissionTile from './SubmissionTile'
import { fetchData } from './fetchData'

const SubmissionIndexContainer = props => {
  const [submissions, setSubmissions] = useState([])
  const [sort, setSort] = useState("none")
  const [currentUser, setCurrentUser] = useState({})
  const [show, setShow] = useState("list")

  const storeData = (body) =>{
    setSubmissions(body.models)
    setCurrentUser(body.user)
  }
  useEffect(() => {
    fetchData(`/api/v1/submissions?sort=${sort}`, storeData)
  }, [sort])

  const passSortType = event => {
    let sortValue = event.currentTarget.value.toLowerCase().replace(' ', '')
    setSort(sortValue)
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
      event.preventDefault()
      setShow("edit")
    }

    return(
      <SubmissionTile
        key={submission.id}
        submission={submission}
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
