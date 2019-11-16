import React from 'react'
import { Link } from "react-router-dom"

const SubmissionTile = props => {
  const { id, name, scale, first_name, last_name, review } = props.submission

  let reviewTag ="", status = ""
  if (review === true){
    reviewTag = ": Under review"
    status = "under-review"
  }

  return (
    <div>
      <div>
        <div className="tile">
          <div className="columns small-6 large-6 name">
            <Link to={`/submissions/${id}`}>
              <span className={status}>
                <strong>{name}{reviewTag}</strong>
              </span>
            </Link>
          </div>
          <div className="columns small-2 large-2 scale">
            {scale}
          </div>
          <div className="columns small-12 large-4 modeler">
            {first_name} {last_name}
          </div>
        </div>
      </div>
      <div className="row">
        <div className="divide">
          <hr />
        </div>
      </div>
    </div>
  )
}

export default SubmissionTile
