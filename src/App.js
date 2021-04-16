import React, { useEffect } from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

import './App.scss';
import Home from "./Home";

import {createBrowserHistory} from 'history'

function App() {

  useEffect(() => {
    window.setAdmin = () => {
      localStorage.setItem('admin_token', 'tokenizer')
    }
  }, [])

  return (
    <Router history={createBrowserHistory()}>
      <Switch>
        <Route exact path='/' component={Home} />
      </Switch>
    </Router>
  );
}

export default App;
