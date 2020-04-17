import React, { Component } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import { withRouter } from 'react-router';
import {connect} from 'react-redux'
// styling
import './App.css';

import Header from '../Header/Header';
import DetailsPage from '../Pages/DetailsPage/DetailsPage';
import EditPage from '../Pages/EditPage/EditPage';
import ListPage from '../Pages/ListPage/ListPage';

class App extends Component {

  // on initial startup route the user to the list page
  componentDidMount() {
    this.props.history.push( '/list' );
  }; // end componentDidMount

  // Renders the entire app on the DOM
  // Sets up routes to different pages
  render() {
    return (
      <div className="App">
        <Header />
        <Router>
          <Route path='/list' component={ ListPage } />
          <Route path='/details' component={ DetailsPage } />
          <Route path='/edit' component={ EditPage } />
        </Router>
      </div>
    );
  }
}

export default connect()(withRouter(App));