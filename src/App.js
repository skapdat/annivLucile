import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './App.css';
import Home from './Home';
import Admin from './Admin';
class App extends React.Component {

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/admin' component={Admin} />
        </Switch>
      </Router>
    );
  }
}

export default App;
