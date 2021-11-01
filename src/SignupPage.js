import React from 'react';
import Navbar from './Components/Navbar/Navabar';

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      firstName:'',
      lastName:''
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
    console.log(event.target.value)
    this.setState({ [event.target.name]: event.target.value });
  };

  // onLoginClick = (e) => {
  //   e.preventDefault();
  //   const { email, password } = this.state;
  //   fetch('/api/sessions', {
  //     method: 'POST',
  //     body: JSON.stringify({ email, password }),
  //     headers: {
  //       'Content-type': 'application/json; charset=UTF-8',
  //     },
  //   }).then((res) => {
  //     if (res.status === 204) {
  //       window.location = '/profile';
  //     }
  //   });
  // };

  onSignupClick = (e) => {
    e.preventDefault();
    const { email, password,firstName,lastName } = this.state;
    fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ email, password,firstName,lastName }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    }).then((res) => {
          if (res.status === 204) {
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
            
          }
        })
  };

  render() {
    return (
      <div>
        <Navbar />

        <div className="LoginPage">
          <form>
          <input
              placeholder="First Name"
              name="firstName"
              required
              type="text"
              onInput={this.onInput}
              value={this.state.firstName}
            ></input>
            <input
              placeholder="Last Name"
              name="lastName"
              required
              type="text"
              onInput={this.onInput}
              value={this.state.lastName}
            ></input>
            <input
              placeholder="email"
              name="email"
              required
              type="email"
              onInput={this.onInput}
              value={this.state.email}
            ></input>
            <input
              placeholder="password"
              name="password"
              required
              type="password"
              onInput={this.onInput}
              value={this.state.password}
            ></input>
            <div>
              {/* <input
                type="submit"
                onClick={this.onLoginClick}
                value="Login"
              ></input> */}
              <input
                type="submit"
                onClick={this.onSignupClick}
                value="Sign up"
              ></input>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default LoginPage;
