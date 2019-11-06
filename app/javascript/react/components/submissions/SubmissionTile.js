import React from 'react'
import { Link } from "react-router-dom"

const SubmissionTile = props => {

  let reviewTag ="", status = ""
  if (props.review === true){
    reviewTag = ": Under review"
    status = "under-review"
  }

  return (
    <div>
      <div>
        <div className="tile">
          <div className="columns small-6 large-6 name">
            <Link to={`/submissions/${props.id}`}>
              <span className={status}>
                <strong>{props.name}{reviewTag}</strong>
              </span>
            </Link>
          </div>
          <div className="columns small-2 large-2 scale">
            {props.scale}
          </div>
          <div className="columns small-12 large-4 modeler">
            {props.firstName} {props.lastName}
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
