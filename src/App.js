import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Nav from 'components/Nav';
import Quotes from 'pages/Quotes';
import Videos from 'pages/Videos';

class App extends Component {
  state = {
    token: null
  }

  handleSetToken = (token) => {
    this.setState({ token })
  }

  render() {
    return (
      <>
        <Router style={{ minHeight: '100vh' }}>
          <Nav setToken={this.handleSetToken} />
          {/* <Route path="/bookmarks">
            <Videos />
          </Route> */}
          <Switch>
            <Route path="/">
              <Quotes />
            </Route>
            <Route path="/videos">
              <Videos token={this.state.token} />
            </Route>
            {/* <Route exact path="/">
              <Redirect to="/quotes" />
            </Route> */}
          </Switch>
        </Router>
      </>
    );
  }
}

export default App;
