import React, {useContext} from 'react';
import {MyContext} from "../../context";
import Loggedin from './Loggedin';
import Loggedout from './Loggedout';


export default function NavBar() {
const context = useContext(MyContext)
  return (
    <nav>
      {context.state.isLogged? <Loggedin/>:<Loggedout></Loggedout>}
    </nav>
  )
}
