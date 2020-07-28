import React, { useContext, useState } from "react";
import { useFirestore } from "react-redux-firebase";
import { MyContext } from "../../context.js";
import { useSelector } from "react-redux";
import { useFirestoreConnect, isLoaded } from "react-redux-firebase";
import PetCard from "./pets/PetCard";

export default function Matchmake(props) {
  let { role } = props;
  const context = useContext(MyContext);
  const firestore = useFirestore();
  const like = (id, likedBy) => {
    console.log(likedBy);
    let myliked = [];
    let theyliked = [];
    firestore
      .collection("users")
      .where("userId", "==", context.state.user.uid)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          console.log(doc.id, "==>", doc.data());
          myliked = doc.data().liked;
        });
      })
      .catch(function (error) {
        console.log("Error getting documents: ", error);
      });
    firestore
      .collection("users")
      .where("userId", "==", id)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          console.log(doc.id, "==>", doc.data());
          theyliked = doc.data().liked;
        });
      })
      .catch(function (error) {
        console.log("Error getting documents: ", error);
      });
    if (theyliked.includes(context.state.user.uid)) {
      console.log("match");
      //add to likes and to matches for me
      //add to matches for them
    } else {
      console.log("liked");
      //addToLikes for me
    }
  };

  useFirestoreConnect([{ collection: "pets" }]);
  const pets = useSelector((state) => state.firestore.ordered.pets);

  useFirestoreConnect([{ collection: "homes" }]);
  const homes = useSelector((state) => state.firestore.ordered.homes);
  if (isLoaded(pets) && isLoaded(homes)) {
    return (
      <div>
        <h1>my Matchmake</h1>
        {role === "home"
          ? pets.map((pet) => <PetCard like={like} pet={pet} />)
          : ""}
      </div>
    );
  } else {
    return <h3>give it a sec</h3>;
  }
}
