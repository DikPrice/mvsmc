import React from 'react'
import { Route, Switch, BrowserRouter } from "react-router-dom"
import SplashTile from './SplashTile'
import SubmissionIndexContainer from './SubmissionIndexContainer'
import SubmissionShowContainer from './SubmissionShowContainer'
import NewSubmissionContainer from './NewSubmissionContainer'
import ModelIndexContainer from './ModelIndexContainer'
import ModelShowTile from './ModelShowTile'
import EventIndexContainer from './EventIndexContainer'
import NewEventContainer from './NewEventContainer'
import EventShowContainer from './EventShowContainer'

export const App = (props) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={SplashTile} />
        <Route exact path="/submissions" component={SubmissionIndexContainer} />
        <Route exact path="/submissions/new" component={NewSubmissionContainer} />
        <Route exact path="/submissions/:id" component={SubmissionShowContainer} />
        <Route exact path="/models" component={ModelIndexContainer} />
        <Route exact path="/models/:id" component={ModelShowTile} />
        <Route exact path="/events" component={EventIndexContainer} />
        <Route exact path="/events/new" component={NewEventContainer} />
        <Route exact path="/events/:id" component={EventShowContainer} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
