import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom"

import { apiUrl, doApiGetToken } from "../services/apiService";
import Nav from 'react-bootstrap/Nav'

function NavCustomer() {
    let [tok, setTok] = useState(0);
    let [vet_ar, setVetArr] = useState([]);

    let linkArray = ["/vet"];
    
    // useEffect(() => {
       

    //     if (localStorage["tok"]) {
    //         let urlVet = apiUrl + "vets";

    //         doApiGetToken(urlVet)
    //             .then(data => {
    //                 let token = parseJwt(localStorage["tok"])
    //                 setTok(token);
    //                 data.filter(item => {
    //                     if (item._id === token._id) {
    //                         setVetArr(item);
    //                     }
    //                 })
    //                 pageChange(window.location.pathname)

    //             })
    //     }



    // }, [localStorage["tok"]])



    // const pageChange = (after) => {

    //     linkArray.map(item => {          
    //         if (item === after) {
    //             document.getElementById(after).classList.add("active-n");
    //             document.getElementById(after).style["color"] = "#ff4dc4";
    //         }
    //         else{
    //             document.getElementById(item).classList.remove("active-n");
    //             document.getElementById(item).removeAttribute("style");
    //         }

        // })


        const logoutVet = () => {
            localStorage.removeItem('tokMyMarpet');
            document.location.href = "/"
        }
    
    



    return (
        <div id="sticky-nav" className="navbar navbar-expand-lg bg-light navbar-light nav-sticky" style={{marginRight: "60%",borderRadius:"20px"}}>
            <div className="container-fluid" style={{"justifyContent":"center"}}>
            <Link id="drop" className="nav-item nav-link" to="/customerProfile" style={{ fontSize: "18px", color: "black" }}>Customer Profile</Link>
            <Link id="drop" className="nav-item nav-link" to="/customerProfile/contactForm" style={{ fontSize: "18px", color: "black" }}>Contact Form</Link>
                <Nav title={<b>{vet_ar.first_name}</b>} id="basic-nav-dropdown" style={{ fontSize: "18px", marginLeft: "-11px" }}>
                    <Link id="drop" className="nav-item nav-link" onClick={logoutVet} style={{ fontSize: "18px", color: "black" }}>Sign Out</Link>
                </Nav>






              
    </div></div>



    )
}

export default NavCustomer;