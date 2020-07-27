import React, {useContext,useEffect,useState} from 'react'
import { useFirestore } from 'react-redux-firebase';
import { Redirect } from 'react-router-dom'
// import { message } from 'antd'
import { MyContext } from "../../context.js"
import PetModal from './PetModal.js';
import PetDisplay from './PetDisplay'


export default function Main() {
  const context = useContext(MyContext)
  const firestore = useFirestore()
  const [role, setrole] = useState()
  const [pets, setpets] = useState([])


 
 

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
    firestore.collection("pets").where("poster", "==", context.state.user.uid).get()
      .then(function (querySnapshot) {
        let temp = [...pets];
        querySnapshot.forEach(function (doc) {
          temp = [...temp, { ...doc.data(), id: doc.id }];
          console.log(doc.id, '==>', doc.data());
        });
        setpets(temp);
      })
      .catch(function (error) {
        console.log("Error getting documents: ", error);
      });
  }
}, [context.state.user.uid])

  return (
    <div>
     {context.state.isLogged?'':<Redirect to='signin'/>}
     {role==='pet'? <PetModal/>:''}
     {role==='pet'? <PetDisplay pets={pets}/>:''}
    </div>
  )
}
