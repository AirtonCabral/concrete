import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Home from "./views/Home/Home";
import Person from "./views/Person/Person";
import NotFound from './views/NotFound/NotFound';

import './App.css'
function App() {
  return (
    <>
      <Router>
        <Route path="/" exact component={Home} />
        <Route path="/Person/" component={Person} />
        <Route path="/NotFound" component={NotFound} />
      </Router>
    </>
  );
}

export default App;
