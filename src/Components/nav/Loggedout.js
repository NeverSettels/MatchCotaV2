import React from "react";
import { Link } from "react-router-dom";
export default function Loggedout() {
  return (
    <div className="nav-bar">
      <img className="nav-img" src="images/dogYellow.svg" alt="dog" />
      <Link className="nav-item" to="/">
        Home
      </Link>
      <Link className="nav-item" to="/signin">
        Log in
      </Link>
      <Link className="nav-item" to="/resources">
        Resources
      </Link>
    </div>
  );
}
