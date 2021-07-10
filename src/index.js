import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import LoginPage from './LoginPage';
import Profile from './Profile';
import ProductList from './ProductList'
import ProductDetailPage from './ProductDetailPage'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <Router>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route exact path="/" component={LoginPage} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/productlist" component={ProductList} />
          <Route exact path="/productdetailpage/:id" component={ProductDetailPage} />
        </Switch>
    </Router>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
