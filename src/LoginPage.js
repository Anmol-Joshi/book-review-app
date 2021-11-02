import React from 'react';
import Navbar from './Components/Navbar/Navabar';
import './index.css';

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: 'test@gmail.com',
      password: 'test',
    };
  }

  componentDidMount() {
    fetch('/api/users/me').then((user) => {
      if (user.status === 200) {
        window.location = '/profile';
      }
    });
  }

  onInput = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onLoginClick = (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    fetch('/api/sessions', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    }).then((res) => {
      if (res.status === 204) {
        window.location = '/profile';
      }
    });
  };

  render() {
    return (
      <div>
        <Navbar />

        <div className="loginPage">
          <h3>Login:</h3>
          <form>
            <div className="formTitles">Email: </div>
            <input
              placeholder="email"
              name="email"
              required
              type="email"
              onInput={this.onInput}
              value={this.state.email}
            ></input>
            <div className="formTitles">Password: </div>
            <input
              placeholder="password"
              name="password"
              required
              type="password"
              onInput={this.onInput}
              value={this.state.password}
            ></input>
            <div>
              <button className="button" onClick={this.onLoginClick}>
                Login
              </button>
              <div>
                New User?<a href="/signup">Signup</a>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default LoginPage;
