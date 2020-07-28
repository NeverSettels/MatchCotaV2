import React, { useState, useEffect, useContext } from "react";
import { MyContext } from "../../../context";
import firebase from "firebase/app";
import { Carousel } from "antd";
export default function PetCard(props) {
  const [urls, seturls] = useState([]);
  const context = useContext(MyContext);
  const { pet, like, dislike } = props;
  let storage = firebase.storage();
  const getUrls = () => {
    for (let i = 0; i < 3; i++) {
      let refUrl = `src/public/${pet.poster}/${pet.imageId}/image${i}`;
      let tempreference = storage.ref(refUrl);
      tempreference
        .getDownloadURL()
        .then((url) => {
          console.log("something =>", url);
          seturls((prev) => [...prev, url]);
        })
        .catch(function (error) {
          console.log(error);
          // A full list of error codes is available at
          // https://firebase.google.com/docs/storage/web/handle-errors
          switch (error.code) {
            case "storage/object-not-found":
              // File doesn't exist
              break;

            case "storage/unauthorized":
              // User doesn't have permission to access the object
              break;

            case "storage/canceled":
              // User canceled the upload
              break;

            case "storage/unknown":
              // Unknown error occurred, inspect the server response
              break;
            default:
              break;
          }
        });
    }
  };

  useEffect(() => {
    getUrls();
  }, []);

  return (
    <div key={pet.id}>
      <Carousel autoplay>
        {urls.map((url, i) => (
          <img key={i} src={url} alt={`image${i}`} />
        ))}
      </Carousel>
      <h2>{pet.petName}</h2>
      {pet.poster !== context.state.user.uid ? (
        <>
          <button onClick={() => like(pet.id, pet.likedBy)}>like</button>
        </>
      ) : (
        ""
      )}
    </div>
  );
}
