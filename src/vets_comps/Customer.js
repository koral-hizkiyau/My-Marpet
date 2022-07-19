import React from 'react';
import moment from 'moment';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import DeleteIcon from '@material-ui/icons/Delete';
import { delCustomer } from '../js/data';
const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(1),
    },
    button2: {
        margin: theme.spacing(1),
        backgroundColor: "green",
        color: "white",
        '&:hover': {
            backgroundColor: "black",
      }
    }
  }));

function Customer(props) {
    const classes = useStyles();

    return (
<>
            <table className="table table-striped table-light table-hover" style={{marginTop:"15px"}}>
            <thead className='table-dark'>
            <tr>
                    <th className="align-middle"><b>Registration Date</b></th>
                    <th className="align-middle"><b>Email</b></th>
                    <th className="align-middle"><b>First Name </b></th>
                    <th className="align-middle"><b>Last Name</b></th>
                    <th className="align-middle"><b>gender</b></th>
                    <th className="align-middle"><b>Address</b></th>
                    <th className="align-middle"><b>Phone</b></th>
                    <th className="align-middle"><b>Id Customer</b></th>
                    <th className="align-middle"><b>Profile</b></th>
                    <th className="align-middle"><b>Delete Customer</b></th>


                </tr>
               </thead>
                  <tbody>
                    {(props._ar).map(item =>{
                        return(
                            <tr key={item._id}>
                                <td className="align-middle font-weight-bold">{moment(item.registration_date).format('DD/MM/YYYY')}</td>
                                <td className="align-middle font-weight-bold">{item.email}</td>
                                <td className="align-middle font-weight-bold">{item.first_name}</td>
                                <td className="align-middle font-weight-bold">{item.last_name}</td>
                                <td className="align-middle font-weight-bold">{item.gender}</td>
                                <td className="align-middle font-weight-bold">{item.address}</td>
                                <td className="align-middle font-weight-bold">{item.phone}</td>
                                <td className="align-middle font-weight-bold">{item.id_customer}</td>
                                <td className="align-middle font-weight-bold"><Link to={{pathname:`/profileCustomer/${item._id}` , state:{profileSingle: props._ar}}} >
      <Button variant="contained" color="success" className={classes.button2} >View Profile</Button>
</Link></td>
                                 <td className="align-middle">
                                <Button variant="contained" color="secondary" className={classes.button} startIcon={<DeleteIcon /> }onClick={() => delCustomer(item._id, item, props.counterApi, props.setCounterApi)}>Delete</Button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table> 
            </>
    )
}

export default Customer