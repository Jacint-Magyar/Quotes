import React, { Component } from 'react'
import { NavLink } from "react-router-dom";
import styled from 'styled-components'
// import SocialButton from 'components/SocialButton';
// import GoogleLogin from 'react-google-login';

class Nav extends Component {
  // handleSocialLogin = (user) => {
  //   console.log(user)
  // }

  // handleSocialLoginFailure = (err) => {
  //   console.error(err)
  // }

  responseGoogle = (response) => {
    console.log(response);
    this.props.setToken(response.accessToken)
  }

  render() {
    return (
      <Navigation>
        <NavLink to="/bookmarks" activeClassName="active">
          Bookmarks
        </NavLink>
        <NavLink to="/quotes" activeClassName="active">
          Quotes
        </NavLink>
        <NavLink to="/videos" activeClassName="active">
          Videos
        </NavLink>
        {/* <SocialButton
          provider="google"
          appId='16066200897-5bvu3k7gdgfugodqp864r478fqg0krj8.apps.googleusercontent.com'
          onLoginSuccess={this.handleSocialLogin}
          onLoginFailure={this.handleSocialLoginFailure}
        >
          Login with Google
        </SocialButton> */}
        {/* <GoogleLogin
          clientId="16066200897-5bvu3k7gdgfugodqp864r478fqg0krj8.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={this.responseGoogle}
          onFailure={this.responseGoogle}
        /> */}
      </Navigation>
    )
  }
}

export default Nav

const Navigation = styled.nav`
  position: absolute;
  top: 0;
  left: 50%;
  width: 100%;
  transform: translateX(-50%);
  height: 64px;
  display: flex;
  justify-content: space-evenly;
  padding: 12px 24px;
  z-index: 1000;

  a {
    color: white;
    font-size: 20px;
    line-height: 30px;
    text-transform: uppercase;
    text-shadow: ${props => props.theme.ts};
    position: relative;

    &.active {

      &:after {
        content: "";
        display: block;
        position: absolute;
        left: 0;
        width: 100%;
        height: 2px;
        background-color: white;
        box-shadow: ${props => props.theme.ts};
    }
  }
`