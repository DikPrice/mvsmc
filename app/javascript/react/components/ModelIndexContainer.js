import React, { useState, useEffect } from 'react'
import { Redirect } from "react-router-dom"
import ModelTile from './ModelTile'

const ModelIndexContainer = props => {
  const [models, setModels] = useState([])
  const [sort, setSort] = useState({sort: "none"})
  const [currentUser, setCurrentUser] = useState({})

  const fetchModelList = (url) => {
    fetch(url, {
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
        setModels(body.models)
        setCurrentUser(body.user)
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`))
  }

  useEffect(() => {
    fetchModelList(`/api/v1/models?sort=${sort.sort}`)
  }, [sort])

  const handleInputChange = event => {
    let sortValue = event.currentTarget.value.toLowerCase().replace(' ', '')
    setSort({
      ...sort,
      [event.currentTarget.name]: sortValue
    })
  }

  let findMyModels
  if (currentUser){
    findMyModels = <option name="mymodels">My Models</option>
  }

  const modelTiles = models.map(model  => {
    return(
      <ModelTile
        key={model["id"]}
        model={model}
      />
    )
  })

  return (
    <div className="submission-list">
      <div className="title row">
        <div className="columns small-5 large-2">
          Model Registry
        </div>
        <form>
        <div className="columns small-5 large-2">
          <label>
            <select name="sort"
              value={sort.sort}
              onChange={handleInputChange}>
              <option name="">Sort by</option>
              <option name="models">Models</option>
              <option name="modelers">Modelers</option>
              {findMyModels}
            </select>
          </label>
        </div>
        </form>
        <hr />
      </div>
      <div className="row columns">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Scale</th>
              <th>Modeler</th>
            </tr>
          </thead>
          <tbody>
            {modelTiles}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ModelIndexContainer
