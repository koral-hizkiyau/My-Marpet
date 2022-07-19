import React,{useState,useEffect,useRef} from "react";
import { doApiGet , apiUrl, doApiPostToken} from "../services/apiService";
import {checkFormPet} from "../js/addPet";
import "../css/addCustomer.css";
import swal from 'sweetalert';

function AddPet(props){
let [userData, setUserData] = useState([props.profileSingle]);
let [customerList, setCustomerList] = useState([]);
let [countRecipt, setCountRecipt] = useState(0);

let petnameRef = useRef();let petgenderRef = useRef();  let typeRef = useRef(); let chipnumberRef = useRef(); let petdateRef = useRef();

useEffect(() => {
  document.getElementById("btn").disabled = true;
  document.getElementById("btn").style.backgroundColor = "grey";


  let urlUser = apiUrl+'customers';

  doApiGet(urlUser)
        .then(data => {
            setCustomerList(data);
        })

}, [])



let sendForm = async(event) => {
    event.preventDefault();
    let bodyData = {
    pet_name: event.target.namepf.value,
    chip_number: event.target.chipf.value,
    type_of_pet: event.target.typef.value,
    pet_gender: event.target.genderpf.value,
    date_of_birth_pet: event.target.datepf.value,
    receipt_id: countRecipt,
    pet_status: "true"  }

 

    let updateUrl = apiUrl + "customers/update";


  let arr = {user: userData[0], animal: bodyData}

    doApiPostToken(updateUrl, arr)
        .then(data => {
            setUserData(data)
            swal({
              title: "Pet Add",
              icon: "success",
              button: "OK",
            }).then((value) => {
             document.location.href = "/profileCustomer/"+userData[0]._id;

            })
 

        })
}



    return(
      
        <div className="container py-3">
            <form onSubmit={sendForm} onChange={()=>checkFormPet(petnameRef.current.value,chipnumberRef.current.value,typeRef.current.value,petgenderRef.current.value,petdateRef.current.value,customerList,setCustomerList,setUserData)} >
              <div class="mb-3">
              <div className="msg-reg" id="msgpetname"></div>
  <input type="text" class="form-control" ref={petnameRef} id="namepf"  placeholder="Pet Name"/>
</div>  <div class="mb-3">
<div className="msg-reg" id="msgChip"></div>
  <input type="text" class="form-control" ref={chipnumberRef} id="chipf" placeholder="Chip Number"/>
</div>
<div class="mb-3">
<div className="msg-reg" id="msgType"></div>
<select class="form-select" id="typef" aria-label="Default select example" ref={typeRef}>
  <option selected>-Select Type-</option>
  <option value="Dog">Dog</option>
  <option value="Cat">Cat</option>
</select>
</div>
<div class="mb-3">
<div className="msg-reg" id="msgGenderp"></div>
<select class="form-select" id="genderpf" aria-label="Default select example" ref={petgenderRef}>
  <option selected>-Select Gender-</option>
  <option value="Male">Male</option>
  <option value="Female">Female</option>
</select>
</div>
<div class="mb-3"> 
<div className="msg-reg" id="msgDatep"></div>
  <input type="date" class="form-control" ref={petdateRef} id="datepf" placeholder="Date Of Birth"/>
</div>

<button className="btn-register" id="btn" type="submit">Add Pet</button>

                    </form>
        </div>
        
    )


}
export default AddPet;