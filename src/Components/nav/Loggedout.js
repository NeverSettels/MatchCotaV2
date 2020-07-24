import React from 'react'
import { Link } from "react-router-dom";
export default function Loggedout() {
    return (
        <div>
            <Link to="/">Home</Link>
          <Link to="/signin">Log in</Link>
          <Link to="/resources">Resources</Link>
        </div>
    )
}
