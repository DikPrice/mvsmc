import React from 'react'
import { Route, Switch, BrowserRouter } from "react-router-dom"
import SplashTile from './SplashTile'
import SubmissionIndexContainer from './submissions/SubmissionIndexContainer'
import SubmissionShowContainer from './submissions/SubmissionShowContainer'
import NewSubmissionContainer from './submissions/NewSubmissionContainer'
import ModelIndexContainer from './ModelIndexContainer'
import ModelShowTile from './ModelShowTile'
import ModelPrintTile from './ModelPrintTile'
import EventIndexContainer from './events/EventIndexContainer'
import NewEventContainer from './events/NewEventContainer'
import EventShowContainer from './events/EventShowContainer'

import GoogleMapsContainer from './googlemaps/GoogleMapsContainer'

export const App = (props) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={SplashTile} />
        <Route exact path="/submissions" component={SubmissionIndexContainer} />
        <Route exact path="/submissions/new" component={NewSubmissionContainer} />
        <Route exact path="/submissions/:id" component={SubmissionShowContainer} />
        <Route exact path="/models" component={ModelIndexContainer} />
        <Route exact path="/models/print/:id" component={ModelPrintTile} />
        <Route exact path="/models/:id" component={ModelShowTile} />
        <Route exact path="/events" component={EventIndexContainer} />
        <Route exact path="/events/new" component={NewEventContainer} />
        <Route exact path="/events/:id" component={EventShowContainer} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
