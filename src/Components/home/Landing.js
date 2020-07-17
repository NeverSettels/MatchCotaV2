import React, { useState } from 'react';
import { Link } from "react-router-dom";

export default function Landing() {
  const [displaySignUp, setdisplaySignUp] = useState(false)
  return (
    <div className="landing">
      <div className="adoption blurb">
        <h2>Before Sign Up</h2>
        <p> It is important to note that pet adoption is not something to do on a whim. It is a responsability you're agreeing to for the rest of the pets life. You will be their safety and calm in this world and if you are unable or unwilling to to accept this responsibility <strong>DO NOT ADOPT</strong>. Animals are living beings act accordingly. If your considering becoming a pet parent for the first time take the time to read though some of the links provided below.</p>

        <ul>
          <li><a href="https://www.petmd.com/dog/care/ultimate-guide-responsible-pet-adoption"> The ultimate guide responsible pet adoption</a></li>
          <li><a href="http://americanhumane.org/fact-sheet/are-you-ready-to-own-a-pet/"> Are you ready to adopt a pet?</a></li>
          <li><a href="https://www.bustle.com/articles/176279-11-things-to-consider-before-getting-a-pet-because-its-a-huge-responsibility"> 11 things to consider before getting a pet because its a huge responsibility</a></li>
          <li><a href="https://www.petsforpatriots.org/how-to-adopt-a-pet-for-life/">How to adopt a pet for life</a></li>
        </ul>
        {displaySignUp ? <Link to="/signup"><button>Sign Up</button></Link> :
          <>
            <input onChange={() => setdisplaySignUp(true)} type="checkbox" id="accept" name="accept" />
            <label for="accept"> <strong>I understand that adopting a pet comes with inmense responsibility </strong> </label>
          </>}
      </div>

    </div>
  )
}
