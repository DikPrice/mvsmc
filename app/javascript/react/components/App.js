import React from 'react'
import { Route, Switch, BrowserRouter } from "react-router-dom"
import SubmissionIndexContainer from './SubmissionIndexContainer'
import SubmissionShowContainer from './SubmissionShowContainer'
import NewSubmissionContainer from './NewSubmissionContainer'
import ModelIndexContainer from './ModelIndexContainer'
import ModelShowTile from './ModelShowTile'

export const App = (props) => {
  return (

    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={SubmissionIndexContainer} />
        <Route exact path="/submissions" component={SubmissionIndexContainer} />
        <Route exact path="/submissions/new" component={NewSubmissionContainer} />
        <Route exact path="/submissions/:id" component={SubmissionShowContainer} />
        <Route exact path="/models" component={ModelIndexContainer} />
        <Route exact path="/models/:id" component={ModelShowTile} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
