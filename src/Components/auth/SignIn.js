import React, { useState } from 'react'
import firebase from "firebase/app";
import { message } from 'antd';

export default function SignIn() {

  const [signinEmail, setSigninEmail] = useState("")
  const [signinPassword, setSigninPassword] = useState("")

  function doSignIn() {
    firebase.auth().signInWithEmailAndPassword(signinEmail, signinPassword).then(function () {
      message.success("Successfully signed in!");
    }).catch(function (error) {
      message.error(error.message);
    });
  }
  return (
    <div>
      <h1>Sign In</h1>
      <form >
        <input onChange={e => setSigninEmail(e.target.value)} type='text' name='email' placeholder='Email' />
        <input onChange={e => setSigninPassword(e.target.value)} type='password' name='password' placeholder='Password' />
        <button onClick={doSignIn} >Sign In</button>
      </form>
    </div>
  )
}
