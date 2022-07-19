import React, { useEffect, useState } from 'react';
import '../css/profileCustomer.css';
import { apiUrl,doApiGet } from "../services/apiService";
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
import NavVet from "./NavVet";
import AddPet from './AddPet';
import { changeStatusPet } from '../js/data';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
    backgroundColor: "green",
    color: 'white',
    '&:hover': {
      backgroundColor: "black"
    }
  },
  buttonD: {
    margin: theme.spacing(1),
    backgroundColor: "Red",
    color: 'white',
    '&:hover': {
      backgroundColor: "black"
    }
  },
  button2: {
    margin: theme.spacing(1)
  }
}));
function ProfileCustomer(props){

    let [profileSingle, setProfileSingle] = useState([]);
    const [animals,setAnimals] = useState([]);
    const classes = useStyles();
    let [flag, setFlag] = useState(false);

    useEffect(() => {
        let urlUsers = apiUrl + "customers/profile/" + props.match.params.id;
        doApiGet(urlUsers)
            .then(data => {

                        setProfileSingle(data);
                        setAnimals(data.id_animal);

            })
    }, [])

    const onClickAddPet = () => {
      if(flag) setFlag(false);
      else setFlag(true);
  }


return (
    <div className="container-fluid">
      <NavVet/>
    <div className="main-body">
    
          <nav aria-label="breadcrumb" className="main-breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><Link to="/vetList">Customers List</Link></li>
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
            <button className='btnAdd' onClick={onClickAddPet} style={{marginBottom:"15px"}}>Add Pet</button>
            {flag ? <AddPet profileSingle={profileSingle}/> : "" }
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
                        <th>Pet Status</th>


    </tr>
  </thead>
  <tbody>
   {(animals).map((item,i) => {
     return(
    <tr key={item._id}>
      <th className="align-middle font-weight-bold">{i+1}</th>
      <td className="align-middle font-weight-bold">{item.chip_number}</td>
      <td className="align-middle font-weight-bold">{item.pet_name}</td>
      <td className="align-middle font-weight-bold">{item.type_of_pet}</td>
      <td className="align-middle font-weight-bold">{item.pet_gender}</td> 
      <td className="align-middle font-weight-bold">{item.date_of_birth_pet}</td>
      <td className="align-middle font-weight-bold"><Link to={{ pathname: `/profileCustomer/${profileSingle._id}/profilePet/${item._id}` , state:{profileSingle}}} >
      <Button variant="contained" color="success" className={classes.button}>View Pet Profile</Button>
</Link></td>
<td className="align-middle">
  {item.pet_status ? 
    <Button variant="contained" color="secondary" className={classes.button} onClick={() => changeStatusPet(item._id, item,item.pet_status,setAnimals,profileSingle,setProfileSingle)}>Alive</Button> :
    <Button variant="contained" color="secondary" className={classes.buttonD} onClick={() => changeStatusPet(item._id, item,item.pet_status,setAnimals,profileSingle,setProfileSingle)}>Dead</Button> }

                                </td>

    </tr>)
   })}
  </tbody>
</table>


    


</div>
              </div>
               
     
             
              



            
          </div>
          </div>

  )



}
export default ProfileCustomer