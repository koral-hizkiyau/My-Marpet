import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import { BrowserRouter as Router, Link } from "react-router-dom";
import logo from "./images/logo.jpg"
function Nav(){



   

    return(
       <div>
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="/">
        <img
          alt=""
          src={logo}
          width="30"
          height="30"
          className="d-inline-block align-top"
        />{' '}
      My Marpet
      </Navbar.Brand>
      <Link to="/customerLogin" className="nav-item nav-link">Customers Login</Link>
      <Link to="/vetLogin" className="nav-item nav-link">Vets Login</Link>

      
  </Navbar>
       </div>      


    )}








    


export default Nav;