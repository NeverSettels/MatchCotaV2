import React, { useState, useContext } from "react";
import { Modal, Button } from "antd";
import DropZone from "../DropZone";
import firebase from "firebase/app";
import { MyContext } from "../../../context";
import { useFirestore } from "react-redux-firebase";
import { v4 } from "uuid";

export default function PetModal() {
  const firestore = useFirestore();
  const [visible, setvisible] = useState(false);
  const [location, setLocation] = useState("");
  const [petName, setPetName] = useState("");
  const [petType, setPetType] = useState("dog");
  const [otherType, setotherType] = useState("");
  const [age, setage] = useState("0-1");
  const [size, setSize] = useState("very small");
  const [gender, setgender] = useState("female");
  const [attributes, setattributes] = useState([]);
  const [personality, setpersonality] = useState([]);
  const [training, settraining] = useState([]);
  const [steralized, setsteralized] = useState(false);
  const [medicalNeeds, setmedicalNeeds] = useState(false);
  const [medicalNeedsdesc, setmedicalNeedsdesc] = useState("NA");
  const [images, setImages] = useState([]);
  const [numImages, setnumImages] = useState(0);
  const context = useContext(MyContext);

  const handleOk = () => {
    let tempPetType = petType;
    if (petType === "other") {
      tempPetType = otherType;
    }
    console.log(context.state.user);
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
    let petObj = {
      poster: context.state.user.uid,
      imageId,
      location,
      petName,
      pettype: tempPetType,
      age,
      size,
      gender,
      attributes,
      personality,
      steralized,
      medicalNeeds,
      medicalNeedsdesc,
      numImages,
      likedBy: [],
    };
    console.log(petObj);
    setvisible(false);
    return firestore.collection("pets").add(Object.assign({}, petObj));
  };

  const addAttribute = (e) => {
    let temp = [...attributes];
    if (e.target.checked) {
      setattributes([...temp, e.target.value]);
    } else {
      let removeIndex = attributes.indexOf(e.target.value);
      temp.splice(removeIndex, 1);
      setattributes([...temp]);
    }
  };
  const addPersonality = (e) => {
    let temp = [...personality];
    if (e.target.checked) {
      setpersonality([...temp, e.target.value]);
    } else {
      let removeIndex = personality.indexOf(e.target.value);
      temp.splice(removeIndex, 1);
      setpersonality([...temp]);
    }
  };
  const addTraining = (e) => {
    let temp = [...training];
    if (e.target.checked) {
      settraining([...temp, e.target.value]);
    } else {
      let removeIndex = training.indexOf(e.target.value);
      temp.splice(removeIndex, 1);
      settraining([...temp]);
    }
  };
  return (
    <>
      <button onClick={() => setvisible(true)}>Add pet</button>
      <Modal
        className="modal"
        visible={visible}
        title="Add pet"
        onOk={handleOk}
        onCancel={() => setvisible(false)}
        footer={[
          <button key="back" onClick={() => setvisible(false)}>
            Return
          </button>,
          <button key="submit" type="primary" onClick={handleOk}>
            Submit
          </button>,
        ]}
      >
        <form>
          <div>
            <h4>
              <section>
                In this section you will list all the pet's characteristics,
                don't forget to be as true as possible in order to find the best
                match for it!
              </section>
            </h4>
          </div>

          <div>
            <h4>
              <section>
                Upload at least three pictures of the pet you're trying to find
                a home for, consider that these images are the first approach
                for the adopters so make them AWESOME, avoid including other
                pets or people in said pictures.
              </section>
            </h4>
          </div>
          <div>
            <DropZone images={images} setImages={setImages} />
          </div>

          <div>
            <p>
              What is the general area where you reside such as city, or
              neigborhood{" "}
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

          <div>
            <p>Whats the little guy's name</p>
            <label for="petName">Name:</label>
            <input
              type="text"
              onChange={(e) => setPetName(e.target.value)}
              placeholder="pet's name"
            />
          </div>

          <div>
            <p>What kind of pet do you have for an adopter?</p>
            <label for="petType">Choose pet type</label>
            <select
              onChange={(e) => setPetType(e.target.value)}
              name="petType"
              id="petType"
            >
              <option value="dog">Dog</option>
              <option value="cat">Cat</option>
              <option value="other">Other</option>
            </select>
            {petType === "other" ? (
              <input
                type="text"
                onChange={(e) => setotherType(e.target.value)}
                placeholder="if 'OTHER' specify here..."
              />
            ) : (
              ""
            )}
          </div>
          <div>
            <p>Please specify the age of the pet</p>
            <label for="age">Choose age</label>
            <select
              onChange={(e) => setage(e.target.value)}
              name="age"
              id="age"
            >
              <option value="0-1">0 - 1 year</option>
              <option value="1-4"> 1 to 4 years </option>
              <option value="4-8"> 4 to 8 years</option>
              <option value="8+">More than 8 years</option>
            </select>
          </div>
          <div>
            <p>Please indicate the size of the pet</p>
            <label for="petSize">Choose size</label>
            <select
              onChange={(e) => setSize(e.target.value)}
              name="petSize"
              id="petSize"
            >
              <option value="very small">Very small</option>
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
              <option value="huge">HUGE</option>
            </select>
          </div>
          <div>
            <label for="gender">Pet's gender</label>
            <select
              onChange={(e) => setgender(e.target.value)}
              name="gender"
              id="gender"
            >
              <option value="female">Female</option>
              <option value="male">Male</option>
            </select>
          </div>

          <div>
            <h4>
              <p>Here select all the attributes that best apply to the pet:</p>
            </h4>
            <p>Sheding and grooming</p>
            <div className="check-group">
              No Sheding:{" "}
              <input
                type="checkbox"
                onChange={(e) => addAttribute(e)}
                name="attributes[]"
                value="No Sheding"
              />
            </div>
            <div className="check-group">
              Some Sheding:{" "}
              <input
                type="checkbox"
                onChange={(e) => addAttribute(e)}
                name="attributes[]"
                value="Some Sheding"
              />
            </div>
            <div className="check-group">
              Heavy Sheding:{" "}
              <input
                type="checkbox"
                onChange={(e) => addAttribute(e)}
                name="attributes[]"
                value="Heavy Sheding"
              />
            </div>
            <div className="check-group">
              No Gromming necessary:{" "}
              <input
                type="checkbox"
                onChange={(e) => addAttribute(e)}
                name="attributes[]"
                value="No Gromming necessary"
              />
            </div>
            <div className="check-group">
              Some Gromming necessary:{" "}
              <input
                type="checkbox"
                onChange={(e) => addAttribute(e)}
                name="attributes[]"
                value="Some Gromming necessary"
              />
            </div>
            <div className="check-group">
              Heavy Gromming necessary:{" "}
              <input
                type="checkbox"
                onChange={(e) => addAttribute(e)}
                name="attributes[]"
                value="Heavy Gromming necessary"
              />
            </div>
          </div>

          <div>
            <h5>
              <p>Personality</p>
            </h5>
            <div className="check-group">
              Needs lots of attention:{" "}
              <input
                type="checkbox"
                onChange={(e) => addPersonality(e)}
                value="Needs lots of attention"
              />
            </div>
            <div className="check-group">
              Is independent:{" "}
              <input
                type="checkbox"
                onChange={(e) => addPersonality(e)}
                value="Is independent"
              />
            </div>
            <div className="check-group">
              Is confident:{" "}
              <input
                type="checkbox"
                onChange={(e) => addPersonality(e)}
                value="Is confident"
              />
            </div>
            <div className="check-group">
              Is shy or nervous:{" "}
              <input
                type="checkbox"
                onChange={(e) => addPersonality(e)}
                value="Is shy or nervous"
              />
            </div>
            <div className="check-group">
              Is playful:{" "}
              <input
                type="checkbox"
                onChange={(e) => addPersonality(e)}
                value="Is playful"
              />
            </div>
            <div className="check-group">
              Is relaxed:{" "}
              <input
                type="checkbox"
                onChange={(e) => addPersonality(e)}
                value="Is relaxed"
              />
            </div>
            <div className="check-group">
              Is protective:{" "}
              <input
                type="checkbox"
                onChange={(e) => addPersonality(e)}
                value="Is protective"
              />
            </div>
            <div className="check-group">
              Is quiet:{" "}
              <input
                type="checkbox"
                onChange={(e) => addPersonality(e)}
                value="Is quiet"
              />
            </div>
            <div className="check-group">
              Makes some noise:{" "}
              <input
                type="checkbox"
                onChange={(e) => addPersonality(e)}
                value="Makes some noise"
              />
            </div>
            <div className="check-group">
              Is noisy:{" "}
              <input
                type="checkbox"
                onChange={(e) => addPersonality(e)}
                value="Is noisy"
              />
            </div>
            <div className="check-group">
              Is great with kids:{" "}
              <input
                type="checkbox"
                onChange={(e) => addPersonality(e)}
                value="Is great with kids"
              />
            </div>
            <div className="check-group">
              Is not great with kids:{" "}
              <input
                type="checkbox"
                onChange={(e) => addPersonality(e)}
                value="Is not great with kids"
              />
            </div>
            <div className="check-group">
              Is great with other pets:{" "}
              <input
                type="checkbox"
                onChange={(e) => addPersonality(e)}
                value="Is great with other pets"
              />
            </div>
            <div className="check-group">
              Is not great with other pets:{" "}
              <input
                type="checkbox"
                onChange={(e) => addPersonality(e)}
                value="Is not great with other pets"
              />
            </div>
          </div>

          <div>
            <h5>
              <p>Training</p>
            </h5>
            <div className="check-group">
              Is house trained:{" "}
              <input
                type="checkbox"
                onChange={(e) => addTraining(e)}
                value="Is house trained"
              />
            </div>
            <div className="check-group">
              Has obidience training:{" "}
              <input
                type="checkbox"
                onChange={(e) => addTraining(e)}
                value="Has obidience training"
              />
            </div>
          </div>

          <div>
            <p>Is your pet sterilized?</p>
            <input
              type="radio"
              name="sterilized"
              onChange={() => setsteralized(true)}
            />
            The pet is already sterilized <br />
            <input
              type="radio"
              name="sterilized"
              onChange={() => setsteralized(false)}
            />
            The pet is not sterilized yet <br />
          </div>

          <div>
            <p>Does the pet have any medical needs? If so, please specify:</p>
            <input
              type="radio"
              name="medicalNeeds"
              onChange={() => {
                setmedicalNeeds(false);
                setmedicalNeedsdesc("NA");
              }}
            />{" "}
            The pet doesn't have any medical needs
            <input
              type="radio"
              name="medicalNeeds"
              onChange={() => setmedicalNeeds(true)}
            />{" "}
            The pet has medical needs
            {medicalNeeds ? (
              <input
                type="text"
                onChange={(e) => setmedicalNeedsdesc(e.target.value)}
                name="ifMedicalNeeds"
                placeholder="specify medical needs here..."
              />
            ) : (
              ""
            )}
          </div>
        </form>
      </Modal>
    </>
  );
}
