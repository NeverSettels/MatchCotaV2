import React, { useState } from "react";
import firebase from "firebase/app";
import { message } from "antd";
import { useFirestore } from "react-redux-firebase";

export default function Header() {
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupConfirmPassword, setSignupConfirmPassword] = useState("");

  const [role, setrole] = useState("home");

  const firestore = useFirestore();

  function doSignUp(event) {
    event.preventDefault();
    console.log("Am I here at all?");
    if (signupPassword === signupConfirmPassword) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(signupEmail, signupPassword)
        .then(function (data) {
          console.log("do i get anything here=>>> ", data.user.uid);

          message.success("successfully signed up!");
          // how create two collections at once
          return firestore
            .collection("users")
            .add({ userId: data.user.uid, role, liked: [], matches: [] });
        })
        .catch(function (error) {
          console.log(error);
          message.error(error.message);
        });
    } else {
      message.error("Passwords do not match");
    }
  }

  return (
    <div className="landing">
      <form className="adoption-blurb form">
        <h1>Sign up</h1>
        <input
          onChange={(e) => setSignupEmail(e.target.value)}
          type="text"
          name="email"
          placeholder="Email"
        />
        <input
          onChange={(e) => setSignupPassword(e.target.value)}
          type="password"
          name="password"
          placeholder="Password"
        />
        <input
          onChange={(e) => setSignupConfirmPassword(e.target.value)}
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
        />
        <label>I am looking for: </label>
        <select onChange={(e) => setrole(e.target.value)} name="role">
          <option value="home"> a new pet for my home</option>
          <option value="pet"> a new home for a pet</option>
        </select>
        <button onClick={doSignUp}>Sign up</button>
      </form>
    </div>
  );
}
