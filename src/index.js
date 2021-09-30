import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import LoginPage from './LoginPage';
import Profile from './Profile';
import ProductList from './ProductList';
import ProductDetailPage from './ProductDetailPage';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import CartDetailPage from './CartDetailPage';

function App() {
  return (
    <div className="main-div">
      <Router>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/" component={ProductList} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/productlist" component={ProductList} />
          <Route
            exact
            path="/productdetailpage/:id"
            component={ProductDetailPage}
          />
          <Route exact path="/cart" component={CartDetailPage} />
        </Switch>
      </Router>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
