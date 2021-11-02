/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import axios from 'axios';
import './LoginPopup.css';

class LoginPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      popupError: false,
      popupInvalidEmailIdOrPasswordError: false,
      emailId: '',
      password: '',
    };
  }

  handleSubmit = () => {
    const postData = {
      email: this.state.emailId,
      password: this.state.password,
    };
    if (this.state.email === '') {
      this.setState({ popupError: true });
      setTimeout(() => {
        this.setState({ popupError: false });
      }, 3000);
    } else {
      console.log(postData);
      axios
        .post('api/sessions/', postData)
        .then((res) => {
          if (res.status === 204) {
            this.props.popupControl(false);
            this.props.handlePayment();
          } else {
            this.setState({ popupInvalidEmailIdOrPasswordError: true });
            setTimeout(() => {
              this.setState({ popupInvalidEmailIdOrPasswordError: false });
            }, 3000);
          }
        })
        .catch((err) => {
          console.log('Error occured', err);
        });
    }
  };

  render() {
    return (
      <div className="homepagepopup-background">
        <div className="homepagepopup-popup-container">
          <div className="homepagepopup-popup-container-header">
            <div className="homepagepopup-form-header">Sign in</div>
          </div>
          <hr className="homepagepopup-popup-sub-hr" />
          <div className="homepagepopup-popup-container-body">
            <div className="homepagepopup-profile-element">
              <div className="homepagepopup-profile-element-heading">
                <img
                  className="homepagepopup-profile-element-heading-icon"
                  // src={githubIcon}
                  alt=""
                />
                <label
                  className="homepagepopup-profile-element-heading-text"
                  htmlFor="Github"
                >
                  Email
                </label>
              </div>
              <input
                type="text"
                onChange={(e) => this.setState({ emailId: e.target.value })}
                value={this.state.githubId}
                id="github-id"
                className="homepagepopup-profile-element-input"
                name="Github"
              />
            </div>
            <div className="homepagepopup-profile-element">
              <div className="homepagepopup-profile-element-heading">
                <img
                  className="homepagepopup-profile-element-heading-icon"
                  alt=""
                />
                <label
                  className="homepagepopup-profile-element-heading-text"
                  htmlFor="Linkedin"
                >
                  Password
                </label>
              </div>
              <input
                type="text"
                onChange={(e) => this.setState({ password: e.target.value })}
                value={this.state.linkedinId}
                id="linkedin-id"
                className="homepagepopup-profile-element-input"
                name="Linkedin"
              />
            </div>
          </div>
          <hr className="homepagepopup-popup-sub-hr" />
          <div className="homepagepopup-popup-container-footer">
            <br />
            {this.state.popupError && (
              <span className="homepagepopup-popup-error">
                *Email/Password cannot be empty
              </span>
            )}
            {this.state.popupInvalidEmailIdOrPasswordError && (
              <span className="homepagepopup-popup-error">
                *Github id incorrect
              </span>
            )}
            <input
              onClick={() => this.props.popupControl(false)}
              type="button"
              className="homepagepopup-popup-cancel-btn"
              id="popup-close"
              value="Cancel"
            />
            <input
              onClick={this.handleSubmit}
              type="button"
              className="homepagepopup-popup-submit-btn"
              value="Submit"
            />
          </div>
        </div>
      </div>
    );
  }
}
export default LoginPopup;
