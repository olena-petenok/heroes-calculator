import React from 'react';
import ReactDOM from 'react-dom';
// import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import Page from './components/Page/Page';

function App() {
  return ( <Page /> );
  // return (
  //   <Router>
  //     <Switch>
  //       <Route exact path='/'><Page /></Route>
  //       <Route exact path='/ua'><Page language={'ua'} /></Route>
  //       <Route exact path='/ru'><Page language={'ru'} /></Route>
  //       <Route path='*'><Page /></Route>
  //     </Switch>
  //   </Router>
  // );
}

export default App;
