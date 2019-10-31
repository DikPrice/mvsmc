import React from 'react'
import { Link } from "react-router-dom"

const EventTile = props => {
  return (
    <>
      <tr>
        <td>
          <Link to={`/models/${props.event["id"]}`}>
              {props.event["name"]}
          </Link>
        </td>
        <td>{props.event["venue"]}</td>
        <td>{props.event["city"]}</td>
        <td>{props.event["start_date"]}</td>
      </tr>
    </>
  )
}

export default EventTile
