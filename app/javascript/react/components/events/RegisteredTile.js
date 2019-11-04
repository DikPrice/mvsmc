import React, { useState, useEffect } from 'react'

const RegisteredTile = props => {
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
    <>
      <div className="row">
        <div className="columns small-5">
          {props.model["name"]}
        </div>
        <div className="columns small-3">
          {props.model["scale"]}
        </div>
        <div className="columns small-4">
          {modeler["first_name"]} {modeler["last_name"]}
        </div>
      </div>
      <div className="row">
        <hr />
      </div>
    </>
  )
}

export default RegisteredTile
