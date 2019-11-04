import React, { useState, useEffect } from 'react'
import ModelTile from './ModelTile'

const ModelIndexContainer = props => {
  const [models, setModels] = useState([])
<<<<<<< HEAD
  const [sort, setSort] = useState("models?sort=modelers")
=======
  const [modelers, setModelers] = useState([])
  const [sort, setSort] = useState({sort: "none"})
>>>>>>> master
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
    fetchModelList(`/api/v1/${sort}`)
  }, [sort])

  let modelsByModeller = "models?sort=modelers"
  if (currentUser){
    modelsByModeller = `modelers/${currentUser['id']}/models`
  }
  const sortOptions = [
    {sortBy: "modelers", url: "models?sort=modelers"},
    {sortBy: "models", url: "models?sort=models"},
    {sortBy: "mymodels", url: modelsByModeller}
  ]

  const passSortType = event => {
    let sortValue = event.currentTarget.value.toLowerCase().replace(' ', '')
    let fetchFrom = sortOptions.find(option => {return option.sortBy === sortValue})
    setSort(fetchFrom.url)
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
              onChange={passSortType}>
              <option name="">Sort by</option>
              <option name="models?sort=models">Models</option>
              <option name="models?sort=modelers">Modelers</option>
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
