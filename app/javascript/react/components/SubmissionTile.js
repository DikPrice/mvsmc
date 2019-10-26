import React from 'react'
import { Link } from "react-router-dom"

const SubmissionTile = props => {

  return (
    <>
      <tr>
        <td>
          <Link to={`/submissions/${props.id}`}>
            {props.name}
          </Link>
        </td>
        <td>{props.scale}</td>      
      </tr>
    </>
  )
}

export default SubmissionTile
