import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Home from './components/Home';
import BrainTumorDetection from './components/BrainTumorDetection';
import Results from './components/Results';
import Header from './components/Header';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import reportWebVitals from './reportWebVitals';

const Routing = () => {
  return(
    
    <Router>
      <Header/>
      <Switch>
        <Route exact path = '/' component = {Home}></Route>
        <Route exact path = '/btd' component = {BrainTumorDetection}></Route>
        <Route exact path = '/results' component = {Results}></Route>
      </Switch>
    </Router>
  )
}

ReactDOM.render(<Routing />, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
