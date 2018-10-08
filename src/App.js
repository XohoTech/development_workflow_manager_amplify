import React from 'react';
import { withApollo } from 'react-apollo';
import { HashRouter, Route, Switch } from 'react-router-dom';
import AppContainer from './containers/AppContainer/AppContainer';
import './scss/style.css';
import './App.css';
import '@coreui/icons/css/coreui-icons.min.css';

const App = () => (
  <HashRouter>
    <Switch>
      <Route path="/" name="Home" component={AppContainer} />
    </Switch>
  </HashRouter>
);

export default withApollo(App);
