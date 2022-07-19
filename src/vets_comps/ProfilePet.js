import React, { useEffect, useState, useContext } from 'react';
import '../css/profileCustomer.css';
import { Link } from 'react-router-dom';
import moment from 'moment';
import {AppContext} from '../context/context';
import Button from '@material-ui/core/Button';
import NavVet from "./NavVet";
import { makeStyles } from '@material-ui/core/styles';
import AddReceipt from './AddReceipt';
const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
    backgroundColor: "green"
  },
}));

function ProfilePet(props){
  const classes = useStyles();

    let [profileSingle, setProfileSingle] = useState([props.location.state.profileSingle]);
    let [animals,setAnimals] = useState(props.location.state.profileSingle.id_animal);
    let [animalId, setAnimalId] = useState(props.match.params.id)
    let [counter,setCounter] = useState(0);
    let [receiptAr,setReceiptAr] = useState(props.location.state.profileSingle.receipts)
    let val = useContext(AppContext)
    let [flag, setFlag] = useState(false);

    const onClickAddPet = () => {
      if(flag) setFlag(false);
      else setFlag(true);
  }

    useEffect(() => { 
      let arr = []; 

                animals.map((item) => {
                    if(animalId === item._id){
                      arr.push(item);
                      val = item;
                         setAnimals(item)                     
                    }                     
                }) 
             const r = receiptAr.filter((item,i) => {
                            if(item.receipt_id === receiptAr.receipt_id){
                            setReceiptAr.push(receiptAr);                  
                    }                     
                }) 

         filterR(animals)

    },[])


const filterR = (animals) => {
  let findAnimal = animals.filter((item) => {
    if(animalId === item._id){
         return item;
                          
    }  
                       
}) 
 let arrReceipt = receiptAr.filter((item,i) => {
                            if(findAnimal[0].receipt_id === item.receipt_id){
                          return item;                  
                    }                     
                }) 

                  setReceiptAr(arrReceipt)
}

  

return (
    <div className="container-fluid">
      <NavVet/>
    <div className="main-body">
  
          <nav aria-label="breadcrumb" className="main-breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><Link to="/vetList">Customers List</Link></li>
              <li className="breadcrumb-item"><Link to={`/profileCustomer/${props.location.state.profileSingle._id}`}>Customer Profile</Link></li>
              <li className="breadcrumb-item active" aria-current="page">Pet Profile</li>

            </ol>
          </nav>
         
           <div className="row gutters-sm">
            <div className="col-md-4 mb-3">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex flex-column align-items-center text-center">
                    <div className="mt-3">
                      <h4>{animals.pet_name}</h4>
                      <hr/>
                      <p className="text-secondary mb-1">Chip Number: {animals.chip_number}</p>
                      <p className="text-secondary mb-1">Gender: {animals.pet_gender}</p>
                      <p className="text-secondary mb-1">Date Of Birth: {animals.date_of_birth_pet}</p>
                      <p className="text-secondary mb-1">Type of Pet: {animals.type_of_pet}</p>
                      <p className="text-secondary mb-1">Registration Date: {moment(animals.registration_date).format('DD/MM/YYYY')}</p>


                    </div>
                  </div>
                </div>
              </div>
          </div>



            <div className="col-md-8">
              <h1 className="header">Receipts</h1>
              <button className='btnAdd' onClick={onClickAddPet} style={{marginBottom:"15px"}}>Add Receipt</button>
            {flag ? <AddReceipt animals={animals} profileSingle={profileSingle} counter={counter} setCounter={setCounter}/> : "" }
   <table className="table table-dark table-hover">
  <thead>
  <tr className="table-active">
    <th>Receipt Number</th>
    <th >Purchase Date</th>
                        <th>Product Type</th>
                        <th>price</th>
                        <th>Note</th>
                        {/* <th>Edit Receipt</th> */}

    </tr>
  </thead>
  <tbody>
      {receiptAr.map((item,i) => {
          return(
 <tr key={item._id}>
 <td className="align-middle font-weight-bold">{item.receipt_number}</td>
 <td className="align-middle font-weight-bold">{moment(item.purcase_date).format('DD/MM/YYYY')}</td>
 <td className="align-middle font-weight-bold">{item.product_type}</td>
 <td className="align-middle font-weight-bold">{item.price} $</td>
 <td className="align-middle font-weight-bold">{item.note}</td>
 {/* <td className="align-middle"><Button variant="contained" color="secondary" className={classes.button} >{"Edit"}</Button></td> */}

 
</tr>
      )})}
     
 
  </tbody>
</table>


    
<td className="align-middle"><Button variant="contained" color="secondary" className={classes.button} onClick={() => window.print()}>{"Print"}</Button></td>


</div>
              </div>
               
          
             
              



             
          </div>
          </div>

  )



}
export default ProfilePet