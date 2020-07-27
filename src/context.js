import React, { createContext, useState, useEffect } from 'react'
import firebase from "firebase/app";
export const MyContext = createContext()

function MyProvider(props) {

  const auth = firebase.auth();


  const [state, setState] = useState({
    user: {},
    isLogged: false
  })


  useEffect(() => {
    console.log(firebase.auth());

    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
              console.log("logged in" + user.uid);
        setState({ user, isLogged: true })


      } else {
        setState({ user:{}, isLogged: false })
      }
    });

  }, [auth])


  const setUser = user => {
    setState(prevState => ({
      ...prevState,
      user,
      isLogged: !prevState.isLogged
    }))
  }

  return (
    <MyContext.Provider
      value={{
        state,
        setUser
      }}
    >
      {props.children}
    </MyContext.Provider>
  )
}

export default MyProvider