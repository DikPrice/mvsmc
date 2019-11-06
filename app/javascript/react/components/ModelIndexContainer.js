import React, { useState, useEffect } from 'react'
import ModelTile from './ModelTile'

const ModelIndexContainer = props => {
  const [models, setModels] = useState([])
  const [sort, setSort] = useState("models?sort=modelers")
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
        modeler={currentUser}
      />
    )
  })

  return (
    <div className="index-list model">
      <div className="title row">
        <div className="columns small-8 large-8">
          Model Registry
        </div>
        <form>
          <div className="columns small-4 large-4">
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
      </div>
      <div className="row columns">
        <div className="rows table-header">
          <div className="columns small-6 large-6">
            Model
          </div>
          <div className="columns small-2 large-2">
            Scale
          </div>
          <div className="columns small-12 large-4">
            Modeler
          </div>
        <hr />
        </div>
        <div className="scroll-body row columns">
          {modelTiles}
        </div>
      </div>
    </div>
  )
}

export default ModelIndexContainer
