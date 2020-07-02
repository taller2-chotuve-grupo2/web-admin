import React, { Component } from 'react'
import AboutPage from '../pages/AboutPage'
import {
  HashRouter,
  Switch,
  Route
} from 'react-router-dom'
import * as login from '../pages/LoginPage'
import HomePage from '../pages/HomePage'
import UsersPage from '../pages/UsersPage'
import MediaPage from '../pages/MediaPage'
import MediaResourcePage from '../pages/MediaResourcePage'

export default class Routes extends Component {
  render () {
    return (
      <div className='body-login'>
        <HashRouter>
          <div>
            <Switch>
              <Route path='/about'>
                <AboutPage />
              </Route>
              <Route path='/home'>
                <HomePage />
              </Route>
              <Route path='/users'>
                <UsersPage />
              </Route>
              <Route name='resource' path='/resources/:id' component={MediaResourcePage} />
              <Route path='/resources'>
                <MediaPage />
              </Route>
              <Route path='/'>
                <login.Login />
              </Route>

            </Switch>
          </div>
        </HashRouter>
      </div>
    )
  }
}
