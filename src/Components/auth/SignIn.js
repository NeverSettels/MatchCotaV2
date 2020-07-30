import React, { useState } from "react";
import firebase from "firebase/app";
import { message } from "antd";

export default function SignIn() {
  const [signinEmail, setSigninEmail] = useState("");
  const [signinPassword, setSigninPassword] = useState("");

  function doSignIn(event) {
    event.preventDefault();
    firebase
      .auth()
      .signInWithEmailAndPassword(signinEmail, signinPassword)
      .then(function () {
        message.success("Successfully signed in!");
      })
      .catch(function (error) {
        message.error(error.message);
      });
  }
  return (
    <div className="landing">
      <form className="adoption-blurb form">
        <h1>Sign In</h1>
        <input
          onChange={(e) => setSigninEmail(e.target.value)}
          type="text"
          name="email"
          placeholder="Email"
        />
        <input
          onChange={(e) => setSigninPassword(e.target.value)}
          type="password"
          name="password"
          placeholder="Password"
        />
        <button onClick={doSignIn}>Sign In</button>
      </form>
    </div>
  );
}
