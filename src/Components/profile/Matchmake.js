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
  const [matchList, setmatchList] = useState([]);

  useFirestoreConnect([{ collection: "pets" }]);
  const pets = useSelector((state) => state.firestore.ordered.pets);

  useFirestoreConnect([{ collection: "homes" }]);
  const homes = useSelector((state) => state.firestore.ordered.homes);
  if (isLoaded(pets) && isLoaded(homes)) {
    return (
      <div>
        <h1>my Matchmake</h1>
        {role === "home" ? pets.map((pet) => <PetCard pet={pet} />) : ""}
      </div>
    );
  } else {
    return <h3>give it a sec</h3>;
  }
}
