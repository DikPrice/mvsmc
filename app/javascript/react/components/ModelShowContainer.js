import React, { useState, useEffect } from "react"

const ModelShowContainer = props => {

  const [model , setModel] = useState({})
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
      setSubmission(body.model)
      setCurrentUser(body.user)
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  },[])

  return (
    <>
    Model
    </>
  )
}

export default ModelShowContainer
