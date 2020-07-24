import React from 'react'
import { Link } from "react-router-dom";
import firebase from "firebase/app";
import { message } from 'antd';

export default function Loggedin() {
    function DoSignOut() {
        firebase.auth().signOut().then(function () {
          message.success("Successfully signed out!");
    
        }).catch(function (error) {
          message.error(error.message);
        });
      }

    return (
        <div>
            <button onClick={DoSignOut}>Signout</button>
            <Link to="/profile">Profile</Link>
            <Link to="/resources">Resources</Link>
        </div>
    )
}
