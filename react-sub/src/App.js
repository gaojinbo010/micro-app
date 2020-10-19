import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './views/Home';
// import logo from './logo.svg';

const About = lazy(() => import('./views/About'));

function App() {
  return (
    <div className="App">
      <Router basename={window.__POWERED_BY_QIANKUN__ ? '/react-sub' : '/'}>
        <nav>
          <Link to="/">Home</Link> | 
          <Link to="/about">About</Link>
        </nav>
        <Suspense fallback={null}>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/about" component={About} />
          </Switch>
        </Suspense>
      </Router>
      <h1>app nav</h1>
    </div>
  );
}

export default App;
