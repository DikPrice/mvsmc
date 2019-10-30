import React, { useState, useEffect } from "react"

const ModelShowTile = props => {
  const [model , setModel] = useState({})
  const [modeler , setModeler] = useState({})
  const [currentUser, setCurrentUser] = useState({})

  let modelId = props.match.params.id

  useEffect(() => {fetch(`/api/v1/models/${modelId}`, {
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
      debugger
      setModel(body.model)
      setModeler(body.modeler)
      setCurrentUser(body.user)
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  },[])

  return (
    <div className="submission-display">
      <div className="event-card">
        <div className="rows columns small-12 title">
          {name}
        </div>
        <div className="rows columns small-12 details">
          {modeler["first_name"]} {modeler["last_name"]}<br />
          {model["source"]}<br />
          {model["scale"]}
        </div>
        <div className="rows columns small-12 description">
          {model["description"]}
        </div>
      </div>
    </div>
  )
}

export default ModelShowTile
