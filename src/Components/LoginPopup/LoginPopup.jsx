/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import axios from 'axios';
import './LoginPopup.css';
// import githubIcon from '../../assets/Profile_Icons/iconfinder_github_317712.png';
// import linkedinIcon from '../../assets/Profile_Icons/iconfinder_2018_social_media_popular_app_logo_linkedin_3225190.png';
// import codechefIcon from '../../assets/Profile_Icons/codechef-1324440139527402917_32.png';
// import hackerrankIcon from '../../assets/Profile_Icons/iconfinder_160_Hackerrank_logo_logos_4373234.png';
// import twitterIcon from '../../assets/Profile_Icons/iconfinder_2018_social_media_popular_app_logo_twitter_3225183.png';
// import mediumIcon from '../../assets/Profile_Icons/iconfinder_Circled_Medium_svg5_5279113.png';

class LoginPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      popupError: false,
      popupInvalidEmailIdOrPasswordError: false,
      emailId: '',
      password: '',
      // codechefId: '',
      // hackerrankId: '',
      // twitterId: '',
      // mediumId: '',
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

          // window.location.reload();
        })
        .catch((err) => {
          console.log('Error occured', err);
          // this.setState({ popupInvalidEmailIdOrPasswordError: true });
          // setTimeout(() => {
          //   this.setState({ popupInvalidEmailIdOrPasswordError: false });
          // }, 3000);
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
                  // src={linkedinIcon}
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
