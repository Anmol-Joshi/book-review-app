import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { FaAngellist } from 'react-icons/fa';
import { GoSignIn } from 'react-icons/go';
<style>
  @import
  url('https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200;0,300;0,400;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,600;1,700;1,800;1,900&display=swap');
</style>;
class Navbar extends React.Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="nav-container">
        <div className="nav-container-main">
          <div className="nav">
            <div className="nav-site-name">
              <Link
                to={`/productlist`}
                style={{ color: '#000', textDecoration: 'none' }}
              >
                <FaAngellist className="site-logo" />
                BestReads
              </Link>
            </div>
            <div className="nav-cart-sign-in">
              <div className="nav-cart">
                <Link
                  to={`/cart`}
                  style={{ color: '#000', textDecoration: 'none' }}
                >
                  Cart
                </Link>
                {/* <GoSignIn /> */}
              </div>
              <div className="nav-sign-in">
                <Link
                  to={`/`}
                  style={{ color: '#000', textDecoration: 'none' }}
                >
                  Sign In
                </Link>
                {/* <GoSignIn /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Navbar;
