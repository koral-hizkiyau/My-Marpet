/* eslint-disable array-callback-return */
import { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import { parseJwt } from '../js/data';
import { apiUrl, doApiGetToken, doApiPostToken } from '../services/apiService';
import NavCustomer from './NavCustomer';
import Button from 'react-bootstrap/Button';
import swal from 'sweetalert';
import InputGroup from 'react-bootstrap/InputGroup';

function ContactForm() {
    let [profileSingle, setProfileSingle] = useState([]);
    let [flag , setFlag] = useState(true);

    useEffect(() => {
        let urlUsers = apiUrl + "customers";
    
        if (localStorage[process.env.REACT_APP_LOCLHOST_KEY]) {
         
          let token = parseJwt(localStorage[process.env.REACT_APP_LOCLHOST_KEY]) 
          doApiGetToken(urlUsers)
            .then(data => {
              data.map(item => {
                if (item.email === token.email) {
                    setProfileSingle(item)
                }
              })
    
            })
    
        }
    },[])

    let sendForm = async(event) => {
        event.preventDefault();
        let bodyData = {
            first_name: profileSingle.first_name,
            last_name: profileSingle.last_name,
            email: profileSingle.email,
            phone: profileSingle.phone,
            id_vet: profileSingle.id_vet,
            vet_name: profileSingle.vet_name,
            id_customer: profileSingle.id_customer,
            subject: event.target.subjectf.value,
            message_box: event.target.messagef.value
        }
        
        let url = apiUrl + "messages/add";
        doApiPostToken(url, bodyData)
            .then(data => {
                if (data.email) {
                 
                    swal({
                        title: "Message Sent",
                        icon: "success",
                        button: "OK",
                      }).then((value) => {
                        setFlag(false);

                                            })
                                }
                else if (data.message) {
                    swal({
                        title: "Message not Send",
                        text: "Please fill all the fields",
                        icon: "error",
                        button: "OK",
                      })
                }
    
            })
    }

    const sendAnother = () => {
        setFlag(true);
        window.location.reload();

    }

  return (
    <div><NavCustomer/>
    <h1 style={{marginTop: "3%",backgroundColor:"black",color:"white",padding:"2%"}}>Contact Form</h1>
    {flag ? 
    <Form className='container' style={{width:"40%",marginTop:"5%"}} onSubmit={sendForm} >
    <InputGroup  className="mb-3" controlId="formPlaintextFN">
    <InputGroup.Text style={{fontWeight:"bold",fontSize:"18px",marginRight:"2px"}}>First Name: </InputGroup.Text>
          <Form.Control plaintext readOnly defaultValue={profileSingle.first_name} />
          <InputGroup.Text style={{fontWeight:"bold",fontSize:"18px",marginRight:"2px"}}>Last Name: </InputGroup.Text>
      <Form.Control plaintext readOnly defaultValue={profileSingle.last_name} />
      </InputGroup>
      <InputGroup  className="mb-3" controlId="formPlaintextPhone">
      <InputGroup.Text style={{fontWeight:"bold",fontSize:"18px",marginRight:"2px"}}>Phone Number: </InputGroup.Text>
          <Form.Control plaintext readOnly defaultValue={profileSingle.phone} />
          <InputGroup.Text style={{fontWeight:"bold",fontSize:"18px",marginRight:"2px",marginLeft:"-67px"}}>Email: </InputGroup.Text>
          <Form.Control plaintext readOnly defaultValue={profileSingle.email} />
      </InputGroup>
      <Form.Group className="mb-3" controlId="subjectf">
        <Form.Control type="text" placeholder="Subject" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="messagef">
        <Form.Control as="textarea" rows={3} placeholder="Type your message here..." />
      </Form.Group>
      <Button variant="primary" type="submit">Submit</Button>

    </Form>
    : <div style={{marginTop: "3%",backgroundColor:"black",borderRadius:"50px",marginRight:"30%",marginLeft:"30%",padding:"5%"}}><h2 style={{color:"white"}}>Message Sent Successfully</h2>
    <Button variant="primary" onClick={sendAnother} style={{marginTop:"5%"}}>Send Another Message</Button></div>}
    </div>
  );
}

export default ContactForm;