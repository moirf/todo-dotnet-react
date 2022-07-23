import React, { Component} from 'react';
import { Redirect, Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { NasaSampler } from './components/NasaSampler';
import { Switch } from 'react-router-dom';
import {Error} from './components/Error'

import './custom.css'
import './bootstrap-icons.css'

const api_key = "4N88j5RxdnlaC5FKWhgOW8cYGp4x2ubXBgWQzHYh"

export default class App extends Component {
    constructor(props) {
        super(props)
        this.authService = props.authService
        this.appSettings = props.appSettings
    }
  static displayName = App.name;

  render () {
      return (
          <Layout authService={this.authService}>
            <Switch>
                <Route exact path='/'>
                    <Redirect to='/home' />
                </Route>
                <Route path='/home'>
                      <Home authService={this.authService} appSettings={this.appSettings}/>
                </Route>
                <Route path='/error'>
                    <Error />
                </Route>
            </Switch>
      </Layout>
    );
  }
}
