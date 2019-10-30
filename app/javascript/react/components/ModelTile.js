import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom"

const ModelTile = props => {

  const [modeler, setModeler] = useState({})
  useEffect(() => {fetch(`/api/v1/modelers/${props.model["modeler_id"]}`, {
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
    <>
      <tr>
        <td>
          <Link to={`/models/${props.id}`}>
              {props.model["name"]}
          </Link>
        </td>
        <td>{props.model["scale"]}</td>
        <td>{modeler["first_name"]} {modeler["last_name"]}</td>
      </tr>
    </>
  )
}

export default ModelTile