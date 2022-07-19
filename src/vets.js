import React, { useEffect, useState } from 'react';
import { apiUrl, doApiGetToken } from "./services/apiService";
import NavVet from './vets_comps/NavVet';

function Vets(props){
   let [profileVets, setProfileVets] = useState([]);


   useEffect(() => {
    let urlvets = apiUrl + "vets/profile/614ee9aae1edaf306de39feb";   
          doApiGetToken(urlvets)
          .then(data => {
            setProfileVets(data);
          })   
}, [])

return (
<>
<NavVet/>

 <div className="clearfix">
        <div className="row">
            <div className="col-md-4 animated fadeIn d-flex justify-content-center" style={{margin: "auto"}} key={profileVets._id}>
              <div className="card">
                <div className="card-body">
                  <div className="avatar">
                    <img
                      src={apiUrl + "images/" + profileVets.image}
                      className="card-img-top"
                      alt="img"
                    />
                  </div>
                  <h5 className="card-title">
                    {profileVets.first_name +
                      " " +
                      profileVets.last_name}
                  </h5>
                  <p><b>Email:</b> {profileVets.email}  <b>ID:</b> {profileVets.id_vet}</p>
                  <p></p>
                  <p className="card-text"><b>License Number:</b> {profileVets.license_number} 
                  <b> Phone:</b> {profileVets.phone}
                   </p>
                    <span className="phone"> <b>Address:</b> {profileVets.address}</span>
                  
                </div>
              </div>
            </div>
          
        </div>
       
      </div> 

</>
)


}



export default Vets