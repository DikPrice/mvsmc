import React from 'react'
import { Route, Switch, BrowserRouter } from "react-router-dom"
import SubmissionIndexContainer from './SubmissionIndexContainer'
import SubmissionShowContainer from './SubmissionShowContainer'
import NewSubmissionContainer from './NewSubmissionContainer'

export const App = (props) => {
  return (

    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={SubmissionIndexContainer} />
        <Route exact path="/submissions" component={SubmissionIndexContainer} />
        <Route exact path="/submissions/new" component={NewSubmissionContainer} />
        <Route exact path="/submissions/:id" component={SubmissionShowContainer} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
