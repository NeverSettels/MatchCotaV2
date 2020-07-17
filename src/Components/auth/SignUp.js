import React, { useState } from "react";
import firebase from "firebase/app";
import { message } from 'antd';
import { useFirestore } from 'react-redux-firebase'



export default function Header() {
  const [signupEmail, setSignupEmail] = useState("")
  const [signupPassword, setSignupPassword] = useState("")
  const [signupConfirmPassword, setSignupConfirmPassword] = useState("")

  const [role, setrole] = useState("Role1")

  const firestore = useFirestore()

  function doSignUp() {
    if (signupPassword === signupConfirmPassword) {
      firebase.auth().createUserWithEmailAndPassword(signupEmail, signupPassword).then(function (data) {
        console.log("do i get anything here=>>> ", data.user.uid)

        message.success("successfully signed up!");
        // how create two collections at once
        return firestore.collection('users').add({ userId: data.user.uid, role, liked: [] })
      }).catch(function (error) {
        message.error(error.message);
      });
    } else {
      message.error("Passwords do not match");
    }
  }


  return (
    <div>

      <h1>Sign up</h1>
      <form >
        <input onChange={e => setSignupEmail(e.target.value)} type='text' name='email' placeholder='Email' />
        <input onChange={e => setSignupPassword(e.target.value)} type='password' name='password' placeholder='Password' />
        <input onChange={e => setSignupConfirmPassword(e.target.value)} type='password' name='confirmPassword' placeholder='Confirm Password' />


        <select onChange={e => setrole(e.target.value)} name="role">
          <option value="Role1">Role1</option>
          <option value="Role2">Role2</option>
        </select>
        <button onClick={doSignUp}>Sign up</button>
      </form>



    </div>
  )
}

