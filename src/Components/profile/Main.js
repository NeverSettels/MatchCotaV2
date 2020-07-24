import React, {useContext,useEffect,useState} from 'react'
import { useFirestore } from 'react-redux-firebase';
import { Redirect } from 'react-router-dom'
// import { message } from 'antd'
import { MyContext } from "../../context.js"

export default function Main() {
  const context = useContext(MyContext)
  const firestore = useFirestore()
  const [role, setrole] = useState()
 

  const getRole = () => {
    let data;
    firestore.collection("users").where("userId", "==", context.state.user.uid).get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          data = doc.data()
        });

        setrole(data.role)
      })
      .catch(function (error) {
        console.log("Error getting documents: ", error);
      });
  }
useEffect(() => {
  if(context.state.isLogged){
    getRole()
  }
}, [context.state.user.uid])

  return (
    <div>
     {context.state.isLogged?'':<Redirect to='signin'/>}
    </div>
  )
}
