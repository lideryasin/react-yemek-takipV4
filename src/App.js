import React, { Component } from 'react';
import { HashRouter, Route, BrowserRouter, Switch, Router } from 'react-router-dom';
import { Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import { CSSTransitionGroup } from 'react-transition-group';
import Home from './container/home';
import Detay from './container/detay';
import Navbar from './components/navbar';
import firebase from 'firebase';
import './App.css';


import createHistory from "history/createBrowserHistory"

const history = createHistory()

const options = {
  position: 'bottom center',
  timeout: 4000,
  offset: '30px',
  transition: 'scale'
}

class App extends Component {

  constructor() {
    super();

    firebase.initializeApp({
      apiKey: "AIzaSyARPen73u2W8KXS-H7uZXDvYziPwzZB2nk",
      authDomain: "istakip-f8bc3.firebaseapp.com",
      databaseURL: "https://istakip-f8bc3.firebaseio.com",
      projectId: "istakip-f8bc3",
      storageBucket: "istakip-f8bc3.appspot.com",
      messagingSenderId: "494518007166"
    })

  }

  render() {
    return (
      <AlertProvider template={AlertTemplate} {...options}>
        <HashRouter >
          <div>
            <Navbar />
            <div>
              <Route exact path="/" component={Home} />
              <Route path="/detay/:id" component={Detay} />
            </div>
          </div>
        </HashRouter>
      </AlertProvider>
    );
  }
}

export default App;
