import React,{useState,useEffect,useRef} from "react";
import { doApiGet , apiUrl, doApiPostToken} from "../services/apiService";
import {checkForm} from "../js/addCustomer";
import "../css/addCustomer.css";
import swal from 'sweetalert';

function AddCustomer(props){
let [userData, setUserData] = useState([]);

let nameRef =  useRef();let lastRef = useRef();let emailRef = useRef();let phoneRef = useRef();let genderRef = useRef();let dateRef = useRef();let addressRef = useRef();let passwordRef = useRef();let IDRef = useRef();let petnameRef = useRef(); let petfRef = useRef();let petgRef = useRef();  let typeRef = useRef(); let chipnumberRef = useRef();

useEffect(() => {
  document.getElementById("btn").disabled = true;
  document.getElementById("btn").style.backgroundColor = "grey";

}, [])



let sendForm = async(event) => {
    event.preventDefault();
    let bodyData = {
        first_name: event.target.namef.value,
        last_name: event.target.lastf.value,
        email: event.target.emailf.value,
        gender: event.target.genderf.value,
        phone: event.target.phonef.value,
        password: event.target.passf.value,
        address: event.target.addressf.value,
        date_of_birth: event.target.datef.value,
        id_vet: "1505",
        vet_name: "koral hizkiyau",
        id_customer: event.target.idf.value
    }
    let url = apiUrl + "customers/add";
    doApiPostToken(url, bodyData)
        .then(data => {
            if (data.email) {
              swal({
                title: "Customer Add",
                icon: "success",
                button: "OK",
              }).then((value) => {
                document.location.href = "/vetList"
  
              })
                            }
            else if (data.message) {
                alert("There is already customer in this email | phone")

            }

        })
}

    return(
      
        <div className="container py-3">
            <form onSubmit={sendForm} onChange={()=>checkForm(nameRef.current.value,lastRef.current.value,emailRef.current.value,phoneRef.current.value,genderRef.current.value,addressRef.current.value,dateRef.current.value,passwordRef.current.value,IDRef.current.value,props.customerList,props.setCustomerList,setUserData)} >
              <div class="mb-3">
              <div className="msg-reg" id="msgName"></div>
  <input type="text" class="form-control" ref={nameRef} id="namef"  placeholder="First Name"/>
</div>  <div class="mb-3">
<div className="msg-reg" id="msgLast"></div>
  <input type="text" class="form-control" ref={lastRef} id="lastf" placeholder="Last Name"/>
</div>
<div class="mb-3">
<div className="msg-reg" id="msgID"></div>
  <input type="text" class="form-control" ref={IDRef} id="idf" placeholder="Customer ID"/>
</div>
            <div class="mb-3">
            <div className="msg-reg" id="msgEmail"></div>
  <input type="email" class="form-control" ref={emailRef} id="emailf" placeholder="Email"/>
</div>
<div class="mb-3">
<div className="msg-reg" id="msgPhone"></div>
  <input type="tel" pattern="^[+0]{0,2}(91)?[0-9]{10}$"
        class="form-control" ref={phoneRef} placeholder="Phone" id="phonef" required/>
</div>
<div class="mb-3">
<div className="msg-reg" id="msgPassword"></div>
  <input type="password"
        class="form-control" ref={passwordRef} id="passf" placeholder="password" required/>
</div>
<div class="mb-3">
<div className="msg-reg" id="msgGender"></div>
<select class="form-select" id="genderf" aria-label="Default select example" ref={genderRef}>
  <option selected>-Select Gender-</option>
  <option value="Man">Man</option>
  <option value="Women">Women</option>
</select>
</div>
<div class="mb-3">
<div className="msg-reg" id="msgAddress"></div>
  <input type="text" class="form-control" id="addressf" ref={addressRef}  placeholder="Address"/>
</div>
<div class="mb-3"> 
<div className="msg-reg" id="msgDate"></div>
  <input type="date" class="form-control" ref={dateRef} id="datef" placeholder="Date Of Birth"/>
</div>
<button className="btn-register" id="btn" type="submit" >Add Customer</button>

                    </form>
        </div>
        
    )


}
export default AddCustomer;