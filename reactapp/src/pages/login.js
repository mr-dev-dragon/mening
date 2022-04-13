import React, { useState } from "react";
import "../App.css";
import { Input, Button } from "antd";
import { Navigate } from "react-router-dom";
import { connect } from "react-redux";

function Login(props) {
  const [signUpUsername, setSignUpUsername] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");

  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");

  const [userExists, setUserExists] = useState(false);

  const [listErrorsSignin, setErrorsSignin] = useState([]);
  const [listErrorsSignup, setErrorsSignup] = useState([]);

  var handleSubmitSignup = async () => {
    const data = await fetch("/sign-up", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `usernameFromFront=${signUpUsername}&emailFromFront=${signUpEmail}&passwordFromFront=${signUpPassword}`,
    });

    const body = await data.json();

    if (body.result === true) {
      props.addToken(body.token);
      props.setIsLoggedIn();
      props.userInfo(body.user);
      setUserExists(true);
    } else {
      setErrorsSignup(body.error);
    }
  };

  var handleSubmitSignin = async () => {
    const data = await fetch("/sign-in", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `emailFromFront=${signInEmail}&passwordFromFront=${signInPassword}`,
    });

    const body = await data.json();

    if (body.result === true) {
      props.addToken(body.token);
      props.setIsLoggedIn();
      props.userInfo(body.user);
      setUserExists(true);
    } else {
      setErrorsSignin(body.error);
    }
  };

  if (userExists) {
    return <Navigate to="/" />;
  }

  var tabErrorsSignin = listErrorsSignin.map((error, i) => {
    return <p>{error}</p>;
  });

  var tabErrorsSignup = listErrorsSignup.map((error, i) => {
    return <p>{error}</p>;
  });

  return (
    <>
      <div className="Login-page">
        {/* SIGN-IN */}

        <div className="Sign">
          <h4>Welcome back !</h4>
          <h2>Login to your account</h2>
          <Input
            onChange={(e) => setSignInEmail(e.target.value)}
            className="Login-input"
            placeholder="email"
          />

          <Input.Password
            onChange={(e) => setSignInPassword(e.target.value)}
            className="Login-input"
            placeholder="password"
          />

          {tabErrorsSignin}

          <Button onClick={() => handleSubmitSignin()}>Sign-in</Button>
        </div>

        {/* SIGN-UP */}

        <div className="Sign">
          <h4>Or... just Welcome !</h4>
          <h2>Sign-up to Mening</h2>
          <Input
            onChange={(e) => setSignUpUsername(e.target.value)}
            className="Login-input"
            placeholder="username"
          />

          <Input
            onChange={(e) => setSignUpEmail(e.target.value)}
            className="Login-input"
            placeholder="email"
          />

          <Input.Password
            onChange={(e) => setSignUpPassword(e.target.value)}
            className="Login-input"
            placeholder="password"
          />

          {tabErrorsSignup}

          <Button onClick={() => handleSubmitSignup()} type="primary">
            Sign-up
          </Button>
        </div>
      </div>
    </>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    addToken: function (token) {
      dispatch({ type: "addToken", token: token });
    },
    setIsLoggedIn: function () {
      dispatch({ type: "setIsLoggedIn" });
    },
    userInfo: function (user) {
      dispatch({ type: "userInfo", user: user });
    },
  };
}

export default connect(null, mapDispatchToProps)(Login);
