import React from "react";
import { Link } from "react-router-dom";
import firebase from "firebase/app";
import { message } from "antd";

export default function Loggedin() {
  function DoSignOut() {
    firebase
      .auth()
      .signOut()
      .then(function () {
        message.success("Successfully signed out!");
      })
      .catch(function (error) {
        message.error(error.message);
      });
  }

  return (
    <div className="nav-bar">
      <img className="nav-img" src="images/dogYellow.svg" alt="dog" />
      <button className="nav-item nav-button" onClick={DoSignOut}>
        Signout
      </button>
      <Link className="nav-item" to="/profile">
        Profile
      </Link>
      <Link className="nav-item" to="/resources">
        Resources
      </Link>
    </div>
  );
}
