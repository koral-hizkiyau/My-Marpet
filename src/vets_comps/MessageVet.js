/* eslint-disable array-callback-return */
import { useEffect, useState } from 'react';
import { apiUrl, doApiGet } from '../services/apiService';
import NavVet from './NavVet';
import moment from 'moment';


function MessageVet() {
    let [messageAr, setMessageAr] = useState([]);

    useEffect(() => {
        let messageUrl = apiUrl + "messages";
    
     
          doApiGet(messageUrl)
            .then(data => {
                setMessageAr(data);
              })
    
    
        
    },[])


 
  return (
    <div>
        <NavVet/>
        <h1 style={{marginTop:"2%"}}>Messages</h1>
            <table className="table table-striped table-light table-hover" style={{marginTop:"15px"}}>
            <thead className='table-dark'>
            <tr>
                    <th className="align-middle"><b>#</b></th>
                    <th className="align-middle"><b>Date</b></th>
                    <th className="align-middle"><b>ID</b></th>
                    <th className="align-middle"><b>Email</b></th>
                    <th className="align-middle"><b>Full Name </b></th>
                    <th className="align-middle"><b>Phone</b></th>
                    <th className="align-middle"><b>Subject</b></th>
                    <th className="align-middle"><b>Message</b></th>




                </tr>
               </thead>
               <tbody>
                {messageAr.reverse().map((item,i) => {
                    return(
                        <tr key={item._key}>
                        <td className="align-middle font-weight-bold">{++i}</td>
                        <td className="align-middle font-weight-bold">{moment(item.date_message).format('DD/MM/YYYY')}</td>
                        <td className="align-middle font-weight-bold">{item.id_customer}</td>
                        <td className="align-middle font-weight-bold">{item.email}</td>
                        <td className="align-middle font-weight-bold">{item.first_name +' '+ item.last_name}</td>
                        <td className="align-middle font-weight-bold">{item.phone}</td>
                        <td className="align-middle font-weight-bold">{item.subject}</td>
                        <td className="align-middle font-weight-bold">{item.message_box}</td>
</tr>
                    )
                })}

               </tbody>
               </table>

   </div>
  );
}

export default MessageVet;