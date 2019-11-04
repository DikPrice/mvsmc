import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom"

const SelectTile = props => {

  const [modeler, setModeler] = useState({})

  let modelerId = props.model["modeler_id"]
  useEffect(() => {fetch(`/api/v1/modelers/${modelerId}`, {
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
      setModeler(body.modeler)
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  },[])

  return (
    <div>
      <div className="row tile">
        <div className="columns small-6 large-6 name">
          <Link to={`/models/${props.model["id"]}`}>
            {props.model["name"]}
          </Link>
        </div>
        <div className="columns small-2 large-2 scale">
          {props.model["scale"]}
        </div>
        <div className="columns small-12 large-4 modeler">
          {modeler["first_name"]} {modeler["last_name"]}
        </div>
        <div>
          <hr />
        </div>
      </div>
    </div>
  )
}

export default SelectTile
