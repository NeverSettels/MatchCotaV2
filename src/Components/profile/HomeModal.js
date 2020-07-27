import React, { useState, useContext } from "react";
import { Modal, Button } from "antd";
import DropZone from "./DropZone";
import firebase from "firebase/app";
import { MyContext } from "../../context";
import { useFirestore } from "react-redux-firebase";
import { v4 } from "uuid";

export default function HomeModal() {
  const context = useContext(MyContext);
  const [numImages, setnumImages] = useState(0);
  const [images, setImages] = useState([]);
  const [visible, setvisible] = useState(false);
  const [location, setLocation] = useState("");
  const [hometype, sethometype] = useState("dog");
  const [ownership, setownership] = useState("rent");
  const [yard, setyard] = useState("no yard");
  const [numPeople, setNumPeople] = useState(0);
  const [children, setchildren] = useState("no children");
  const [employment, setEmployment] = useState("unemployed");
  const [freehours, setfreehours] = useState(0);
  const [otherPets, setotherPets] = useState(false);
  const [otherpetsnum, setotherpetsnum] = useState(0);

  const handleOk = () => {
    let temphometype = hometype;
    let imageId = v4();
    images.forEach((file, i) => {
      const metadata = {
        contentType: file.type,
      };
      setnumImages((prev) => prev++);
      var blob = new Blob([file], { type: file.type });
      const storageRef = firebase
        .storage()
        .ref(`src/public/${context.state.user.uid}/${imageId}/image${i}`);
      const uploadTask = storageRef.put(blob, metadata);
      uploadTask.on(
        firebase.storage.TaskEvent.STATE_CHANGED,
        function (snapshot) {
          var progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload Progress: " + progress);
        },
        function (error) {
          console.log(error);
          switch (error.code) {
            case "storage/unauthorized":
              console.log("User doesn't have permission to access the object");
              break;
            case "storage/canceled":
              console.log("User canceled the upload");
              break;
            case "storage/unknown":
              console.log(
                "Unknown error occurred, inspect error.serverResponse"
              );
              break;
            default:
              break;
          }
        }
      );
    });
    let homeObj = {
      poster: context.state.user.uid,
      imageId,
      location,
      hometype: temphometype,
      ownership,
      numImages,
      likedBy: [],
    };
    console.log(homeObj);
    setvisible(false);
    return firestore.collection("homes").add(Object.assign({}, homeObj));
  };

  return (
    <>
      <Button type="primary" onClick={() => setvisible(true)}>
        Add pet
      </Button>
      <Modal
        visible={visible}
        title="Add Home"
        onOk={handleOk}
        onCancel={() => setvisible(false)}
        footer={[
          <Button key="back" onClick={() => setvisible(false)}>
            Return
          </Button>,
          <Button key="submit" type="primary" onClick={handleOk}>
            Submit
          </Button>,
        ]}
      >
        <div class="adopterCreateForm">
          <form>
            <div>
              <section>
                <h4>
                  Remember to fill the following information as honestly as
                  possible so that you can connect with a pet that truly meets
                  yours needs.
                </h4>
              </section>
            </div>

            <div>
              <h4>
                <p>
                  Upload some relevant pictures, such as yard, where the pet
                  would reside or simply some of you living space
                </p>
              </h4>
              <div>
                <DropZone images={images} setImages={setImages} />
              </div>

              <br />
            </div>
            <div class="form-group">
              <p>
                What is the general area were you currently reside such as city,
                or neigborhood;
              </p>
              <label for="location">Location</label>
              <input
                type="text"
                onChange={(e) => setLocation(e.target.value)}
                name="location"
                id="location"
                placeholder="state/city/neighbourhood"
              />
            </div>
            <div class="form-group">
              <p>In what type of residence do you currently live?</p>
              <label for="typeHome">Choose home type</label>
              <select
                onChange={(e) => sethometype(e.target.value)}
                name="hometype"
                id="hometype"
              >
                <option value="house">I live in a house</option>
                <option value="apartment">I live in an apartment</option>
              </select>
            </div>
            <div class="form-group">
              <label for="propertyType">Choose property type</label>
              <select
                onChange={(e) => setownership(e.target.value)}
                id="propertyType"
              >
                <option value="rent">I rent</option>
                <option value="own">I own</option>
              </select>
            </div>
            <div class="form-group">
              <p>Please indicate the size of you yard</p>
              <label for="yard">Choose yard size</label>
              <select
                onChange={(e) => {
                  setyard(e.target.value);
                }}
                name="yard"
                id="yard"
              >
                <option value="no yard">I don't have a yard</option>
                <option value="very small">I have a very small yard</option>
                <option value="small">I have a small yard</option>
                <option value="medium">I have a medium yard</option>
                <option value="large">I have a large yard</option>
                <option value="huge">
                  I don't know where my property ends
                </option>
              </select>
            </div>
            <div class="form-group">
              <p>How many people other than youself live in this home?</p>
              <label for="peopleAtHome"></label>
              <input
                type="number"
                onChange={(e) => setNumPeople(e.target.value)}
                placeholder="Number of people"
              />
            </div>
            <div class="form-group">
              <p>
                If any of these are children, what is the age of the youngest?
              </p>
              <select
                onChange={(e) => setchildren(e.target.value)}
                name="childAge"
                id="childAge"
              >
                <option value="no children">I don't have children</option>
                <option value="infant">0-5 years old</option>
                <option value="pre-teen">6-12 years old</option>
                <option value="teen">13 and up</option>
              </select>
            </div>
            <div class="form-group">
              <p>What is you current state of employment?</p>
              <select
                onChange={(e) => setEmployment(e.target.value)}
                name="employmentType"
                id="childAge"
              >
                <option value="unemployed">I'm currently unemployed</option>
                <option value="self-employed"> I'm self-employed</option>
                <option value="retired">I'm retired</option>
                <option value="part-time"> I work part-time</option>
                <option value="full-time">I work full-time</option>
                <option value="student">I'm currently a Student</option>
              </select>
            </div>
            <div class="form-group">
              <p>
                Aproximately how many hours a week are the members of your
                household at home? <br />
                ex: Someone who works full time (40 hours a week) spends 128
                hours at home
              </p>
              <label for="freeHoursPerWeek"></label>
              <input
                onChange={(e) => setfreehours(e.target.value)}
                type="number"
                name="freeHoursPerWeek"
                id="freeHoursPerWeek"
                placeholder="Number of hours"
              />
            </div>
            <div class="form-group">
              <p>Is this your first time owning a pet?</p>
              <input type="radio" name="firstPet" value="true" /> This is my
              first pet
              <br />
              <input type="radio" name="firstPet" value="false" /> I have taken
              care of animals before <br />
            </div>
            <div class="form-group">
              <p>Do you own any other pets?</p>
              <input
                type="radio"
                onChange={() => setotherPets(true)}
                name="otherPets"
                value="true"
              />
              Yes, I have other pets
              <br />
              <input
                type="radio"
                onChange={() => setotherPets(false)}
                name="otherPets"
                value="false"
              />
              No, I don't have other pets <br />
            </div>
            {otherPets ? (
              <div>
                <p>If you have any other pets, how many?</p>
                <label for="numPets"></label>
                <input
                  onChange={(e) => setotherpetsnum(e.target.value)}
                  type="number"
                  name="numPets"
                  id="numPets"
                  placeholder="Number of pets"
                />
              </div>
            ) : (
              ""
            )}
            <br />
            <button type="submit">Save</button>
          </form>
        </div>
      </Modal>
    </>
  );
}
