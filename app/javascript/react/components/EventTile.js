import React from 'react'
import { Link } from "react-router-dom"

const EventTile = props => {

  let eventName
  if (props.event["name"].includes("No events")){
    eventName = <>{props.event["name"]}</>
  } else {
    eventName = <Link to={`/events/${props.event["id"]}`}>{props.event["name"]}</Link>
  }

  return (
    <>
      <tr>
        <td>{eventName}</td>
        <td>{props.event["venue"]}</td>
        <td>{props.event["city"]}</td>
        <td>{props.event["start_date"]}</td>
      </tr>
    </>
  )
}

export default EventTile
