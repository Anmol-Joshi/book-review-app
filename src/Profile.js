import React from 'react';
import Navbar from './Components/Navbar/Navabar';
import OrderDetails from './Components/OrderDetails/OrderDetails';
import './index.css';
class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    fetch('/api/users/me')
      .then((user) => {
        if (user.status !== 200) {
          window.location = '/';
        }
        return user.json();
      })
      .then((user) => {
        this.setState({ ...user });
      });
  }

  onInput = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onUpdate = () => {
    const { firstName, lastName } = this.state;
    if (firstName === '' || lastName === '') {
      alert('FirstName/LastName cannot be empty');
    } else {
      fetch('/api/users/me', {
        method: 'PUT',
        body: JSON.stringify({ firstName, lastName }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }).then((res) => {
        if (res.status === 204) {
          window.location = '/profile';
        }
      });
    }
  };

  onLogout = () => {
    fetch('/api/sessions/me', {
      method: 'DELETE',
    }).then((res) => {
      if (res.status === 204) {
        window.location = '/';
      }
    });
  };

  render() {
    return (
      <div>
        <Navbar />
        <div className="profile">
          <h3>Profile:</h3>
          <div className="formTitles">Email: {this.state.email}</div>
          <div className="formTitles">
            First Name:{' '}
            <input
              name="firstName"
              onInput={this.onInput}
              value={this.state.firstName || ''}
            ></input>
          </div>
          <div className="formTitles">
            Last Name:{' '}
            <input
              name="lastName"
              onInput={this.onInput}
              value={this.state.lastName || ''}
            ></input>
          </div>
          <div>
            <button className="button" onClick={this.onUpdate}>
              Update
            </button>
          </div>
          <div>
            <button className="button" onClick={this.onLogout}>
              Logout
            </button>
          </div>
        </div>
        <OrderDetails />
      </div>
    );
  }
}

export default Profile;
