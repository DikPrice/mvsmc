import React from 'react'
import { Link } from "react-router-dom"

const SubmissionTile = props => {

  let reviewTag ="", status = ""
  if (props.review === true){
    reviewTag = ": Under review"
    status = "under-review"
  }

  return (
    <>
      <tr>
        <td>
          <Link to={`/submissions/${props.id}`}>
            <span className={status}>
              {props.name}{reviewTag}
            </span>
          </Link>
        </td>
        <td>{props.scale}</td>
        <td>{props.firstName} {props.lastName}</td>
      </tr>
    </>
  )
}

export default SubmissionTile
