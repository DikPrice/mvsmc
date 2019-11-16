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
    <div>
      <div className="rows">
        <div className="tile">
          <div className="columns small-12 large-3">
            <div className="name">
              <strong>{eventName}</strong>
            </div>
          </div>
          <div className="columns small-12 large-4 venue">
            {props.event["venue"]}
          </div>
          <div className="columns small-12 large-3 location">
            {props.event["city"]}
          </div>
          <div className="columns small-12 large-2 when">
            {props.event["start_date"]}
          </div>
        </div>
      </div>
      <div>
        <hr />
      </div>
    </div>
  )
}

export default EventTile
