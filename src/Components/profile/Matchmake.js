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
  const updateMatched = (toUpdateId, idToadd, alreadyMatched) => {
    return firestore.update(
      { collection: `users`, doc: toUpdateId },
      { matched: [...alreadyMatched, idToadd] }
    );
  };
  const like = (id, likedBy) => {
    console.log(likedBy);
    let myliked = [];
    let theyliked = [];
    let myid = "";
    let myMatched = [];
    let theyMatched = [];
    let theirId = "";
    firestore
      .collection("users")
      .where("userId", "==", context.state.user.uid)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          console.log(doc.id, "==>", doc.data());
          myliked = doc.data().liked;
          myid = doc.id;
          myMatched = doc.data().matches;
        });
        firestore
          .collection("users")
          .where("userId", "==", id)
          .get()
          .then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
              console.log(doc.id, "==>", doc.data());
              theyliked = doc.data().liked;
              theyMatched = doc.data().matches;
              theirId = doc.id;
              ///
            });
            console.log(theyliked);
            console.log(context.state.user.uid);
            if (theyliked.includes(myid)) {
              console.log("match");
              updateLiked(myid, theirId, myliked);
              updateMatched(myid, theirId, myMatched);
              updateMatched(theirId, myid, theyMatched);
              //add to likes and to matches for me
              //add to matches for them
            } else if (myliked.includes(theirId)) {
              console.log("alreadyliked");
            } else {
              console.log("liked");
              console.log(myid);
              updateLiked(myid, theirId, myliked);
            }
          })
          .catch(function (error) {
            console.log("Error getting documents: ", error);

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
