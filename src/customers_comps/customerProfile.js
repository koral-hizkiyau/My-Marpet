import React, { useEffect, useState } from 'react';
import '../css/profileCustomer.css';
import { apiUrl, doApiGetToken } from "../services/apiService";
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
import {  parseJwt } from "../js/data";
import NavCustomer from './NavCustomer';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
    backgroundColor: "green"
  },
  button2: {
    margin: theme.spacing(1)
  }
}));
function CustomerProfile(props){
console.log(props);
    let [profileSingle, setProfileSingle] = useState([]);
    const [animals,setAnimals] = useState([]);
    const classes = useStyles();



useEffect(() => {
    let urlUsers = apiUrl + "customers";

    if (localStorage[process.env.REACT_APP_LOCLHOST_KEY]) {
     
      let token = parseJwt(localStorage[process.env.REACT_APP_LOCLHOST_KEY]) 
      doApiGetToken(urlUsers)
        .then(data => {
          data.map(item => {
            if (item.email === token.email) {
                setProfileSingle(item)
                setAnimals(item.id_animal)
            }
          })

        })

    }

        
                  
    
  }, [])


return (
    <div className="container-fluid">
    <div className="main-body">
    <NavCustomer/>
    <br/>
          <nav aria-label="breadcrumb" className="main-breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item active" aria-current="page">Customer Profile</li>
            </ol>
          </nav>
    
           <div className="row gutters-sm">
            <div className="col-md-4 mb-3">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex flex-column align-items-center text-center">
                    <div className="mt-3">
                      <h4>{profileSingle.first_name +" "+ profileSingle.last_name}</h4>
                      <hr/>
                      <p className="text-secondary mb-1">ID Customer: {profileSingle.id_customer}</p>
                      <p className="text-secondary mb-1">Phone: {profileSingle.phone}</p>
                      <p className="text-secondary mb-1">Email: {profileSingle.email}</p>
                      <p className="text-secondary mb-1">Address: {profileSingle.address}</p>
                      <p className="text-secondary mb-1">Registration Date: {moment(profileSingle.registration_date).format('DD/MM/YYYY')}</p>


                    </div>
                  </div>
                </div>
              </div>
          </div>
            <div className="col-md-8">
              <h1 className="header">Pets Customer</h1>
   <table className="table table-dark table-hover">
  <thead>
  <tr className="table-active">
    <th>#</th>
    <th>Chip Number</th>
                        <th>Pet Name</th>
                        <th>Type of Pet</th>
                        <th>Gender</th>
                        <th>Date Of Birth</th>
                        <th>Profile</th>


    </tr>
  </thead>
  <tbody>
    
   {animals.length > 0 ? (animals).map((item,i) => {
     return(
    <tr key={item._id}>
      <th className="align-middle font-weight-bold">{i+1}</th>
      <td className="align-middle font-weight-bold">{item.chip_number}</td>
      <td className="align-middle font-weight-bold">{item.pet_name}</td>
      <td className="align-middle font-weight-bold">{item.type_of_pet}</td>
      <td className="align-middle font-weight-bold">{item.pet_gender}</td> 
      <td className="align-middle font-weight-bold">{item.date_of_birth_pet}</td>
      <td className="align-middle font-weight-bold"><Link to={{ pathname: `/customerProfile/${profileSingle._id}/profilePetCustomer/${item._id}` , state:{profileSingle}}} >
      <Button variant="contained" color="secondary" className={classes.button} >View Pet Profile</Button>
</Link></td>


    </tr>)
   }) : ""}
  </tbody>
</table>


    


</div>
              </div>
               
         
             </div></div>
             
              



            
        

  )



}
export default CustomerProfile;