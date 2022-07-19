import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom"

import { apiUrl, doApiGetToken } from "../services/apiService";
import Nav from 'react-bootstrap/Nav'
import { parseJwt } from "../js/data";

function NavVet() {
    let [tok, setTok] = useState(0);
    let [vet_ar, setVetArr] = useState([]);

    
    useEffect(() => {
       

        if (localStorage[process.env.REACT_APP_LOCLHOST_KEY]) {
            let urlVet = apiUrl + "vets";

            doApiGetToken(urlVet)
                .then(data => {
                    let token = parseJwt(localStorage[process.env.REACT_APP_LOCLHOST_KEY])
                    setTok(token);
                    // eslint-disable-next-line array-callback-return
                    data.filter(item => {
                        if (item._id === token._id) {
                            setVetArr(item);
                        }
                    })

                })
        }



    }, [localStorage[process.env.REACT_APP_LOCLHOST_KEY]])






        const logoutVet = () => {
            localStorage.removeItem(process.env.REACT_APP_LOCLHOST_KEY);
            document.location.href = "/"
        }
    
    



    return (
        <div id="sticky-nav" className="navbar navbar-expand-lg bg-light navbar-light nav-sticky" style={{marginRight: "50%",borderRadius:"20px"}}>
            <div className="container-fluid" style={{"justifyContent":"center"}}>

                <Nav title={<b>{vet_ar.first_name}</b>} id="basic-nav-dropdown" style={{ fontSize: "18px", marginLeft: "-11px" }}>
                    <Link id="drop" className="nav-item nav-link" to={`/vets/myProfile/${tok._id}`} style={{ fontSize: "18px", color: "black" }}>My Profile</Link>
                    <Link id="drop" className="nav-item nav-link" to="/vetList" style={{ fontSize: "18px", color: "black" }}>Vet List</Link>
                    <Link id="drop" className="nav-item nav-link" to="/messages" style={{ fontSize: "18px", color: "black" }}>Messages</Link>
                    <Link id="drop" className="nav-item nav-link" to="/graphsVet" style={{ fontSize: "18px", color: "black" }}>Customer Data</Link>
                    <Link id="drop" className="nav-item nav-link" onClick={logoutVet} style={{ fontSize: "18px", color: "black" }}>Sign Out</Link>
                </Nav>






              
    </div></div>



    )
}

export default NavVet;