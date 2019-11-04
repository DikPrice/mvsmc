import React from 'react'
import { Link } from "react-router-dom"

const SubmissionTile = props => {

  let reviewTag ="", status = ""
  if (props.review === true){
    reviewTag = ": Under review"
    status = "under-review"
  }

  return (
    <div className="tiles">
      <div className="rows tile">
        <div className="columns small-6 large-6 name">
          <Link to={`/submissions/${props.id}`}>
            <span className={status}>
              {props.name}{reviewTag}
            </span>
          </Link>
        </div>
        <div className="columns small-2 large-2 scale">
          {props.scale}
        </div>
        <div className="columns small-12 large-4 modeler">
          {props.firstName} {props.lastName}
        </div>
        <div>
          <hr />
        </div>
      </div>
    </div>
  )
}

export default SubmissionTile
