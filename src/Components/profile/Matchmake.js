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
  const updateLiked = (toUpdateId, idToadd, alreadyliked) => {
    return firestore.update(
      { collection: `users`, doc: toUpdateId },
      { liked: [...alreadyliked, idToadd] }
    );
  };
  const like = (id, likedBy) => {
    console.log(likedBy);
    let myliked = [];
    let theyliked = [];
    let myid = "";
    firestore
      .collection("users")
      .where("userId", "==", context.state.user.uid)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          console.log(doc.id, "==>", doc.data());
          myliked = doc.data().liked;
          myid = doc.id;
          ///
          firestore
            .collection("users")
            .where("userId", "==", id)
            .get()
            .then(function (querySnapshot) {
              querySnapshot.forEach(function (doc) {
                console.log(doc.id, "==>", doc.data());
                theyliked = doc.data().liked;
                ///
                if (theyliked.includes(context.state.user.uid)) {
                  console.log("match");
                  updateLiked(context.state.user.uid, id, myliked);
                  //add to likes and to matches for me
                  //add to matches for them
                } else if (myliked.includes(id)) {
                  console.log("alreadyliked");
                } else {
                  console.log("liked");
                  console.log(myid);
                  updateLiked(myid, id, myliked);
                }

                ///
              });
            })
            .catch(function (error) {
              console.log("Error getting documents: ", error);
            });

          ////
        });
      })
      .catch(function (error) {
        console.log("Error getting documents: ", error);
      });
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
