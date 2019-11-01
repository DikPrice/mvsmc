import React, { useState, useEffect } from 'react'

const SelectedTile = props => {
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
        <div className="columns small-8">
          <div>
            {props.model["name"]}
          </div>
        </div>
        <div className="columns small-4">
          {props.model["scale"]}
        </div>
      </div>
      <div className="row columns">
        {modeler["first_name"]} {modeler["last_name"]}
        <hr />
      </div>
    </>
  )
}

export default SelectedTile
