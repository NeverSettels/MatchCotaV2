import React, { useState, useEffect, useContext } from "react";
import { MyContext } from "../../../context";
import firebase from "firebase/app";
import { Carousel, Collapse } from "antd";

export default function HomeCard(props) {
  const [urls, seturls] = useState([]);
  const context = useContext(MyContext);
  const { home, like, dislike } = props;
  let storage = firebase.storage();
  const getUrls = () => {
    for (let i = 0; i < 3; i++) {
      let refUrl = `src/public/${home.poster}/${home.imageId}/image${i}`;
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
    <div className="card" key={home.id}>
      <Carousel autoplay>
        {urls.map((url, i) => (
          <img key={i} src={url} alt={`image${i}`} />
        ))}
      </Carousel>
      <div>
        <h3>
          This is a {home.hometype} and I {home.ownership}!
        </h3>
        <p>My yard is {home.yard}</p>
        <p>I live with {home.numPeople} other people</p>
        <p>Children in this home are ages: {home.children}</p>
        <p>My employment: {home.employment}</p>
        <p>
          We/I spend aproxmentley {home.freehours} at home every week and have{" "}
          {home.otherPets}
        </p>
        {home.poster !== context.state.user.uid ? (
          <>
            <button onClick={() => like(home.poster, home.likedBy)}>
              like
            </button>
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
  return <div></div>;
}
