import React, { useContext, useEffect, useState } from "react";
import { useFirestore } from "react-redux-firebase";
import { Redirect } from "react-router-dom";
// import { message } from 'antd'
import { MyContext } from "../../context.js";
import PetModal from "./pets/PetModal.js";
import PetDisplay from "./pets/PetDisplay";
import HomeModal from "./homes/HomeModal.js";
import HomeDisplay from "./homes/HomeDisplay.js";
import Matchmake from "./Matchmake.js";
import ProfileNav from "./ProfileNav.js";

export default function Main() {
  const context = useContext(MyContext);
  const firestore = useFirestore();
  const [role, setrole] = useState();
  const [pets, setpets] = useState([]);
  const [homes, sethomes] = useState([]);
  const [view, setView] = useState("mine");

  const getRole = () => {
    let data;
    firestore
      .collection("users")
      .where("userId", "==", context.state.user.uid)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          data = doc.data();
        });

        setrole(data.role);
      })
      .catch(function (error) {
        console.log("Error getting documents: ", error);
      });
  };
  useEffect(() => {
    if (context.state.isLogged) {
      getRole();
      firestore
        .collection("pets")
        .where("poster", "==", context.state.user.uid)
        .get()
        .then(function (querySnapshot) {
          let temp = [...pets];
          querySnapshot.forEach(function (doc) {
            temp = [...temp, { ...doc.data(), id: doc.id }];
            console.log(doc.id, "==>", doc.data());
          });
          setpets(temp);
        })
        .catch(function (error) {
          console.log("Error getting documents: ", error);
        });
      firestore
        .collection("homes")
        .where("poster", "==", context.state.user.uid)
        .get()
        .then(function (querySnapshot) {
          let temp = [...homes];
          querySnapshot.forEach(function (doc) {
            temp = [...temp, { ...doc.data(), id: doc.id }];
            console.log(doc.id, "==>", doc.data());
          });
          sethomes(temp);
        })
        .catch(function (error) {
          console.log("Error getting documents: ", error);
        });
    }
  }, [context.state.user.uid]);

  return (
    <>
      <ProfileNav view={view} role={role} setView={setView} />
      <div className="landing">
        {context.state.isLogged ? "" : <Redirect to="signin" />}
        {view === "mine" ? (
          <>
            {role === "pet" ? <PetModal /> : <HomeModal />}
            {role === "pet" ? (
              <PetDisplay pets={pets} />
            ) : (
              <HomeDisplay homes={homes} />
            )}
          </>
        ) : (
          ""
        )}
        {view === "matchmake" ? <Matchmake role={role} /> : ""}
      </div>
    </>
  );
}
