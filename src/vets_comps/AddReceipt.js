import React,{useState,useEffect,useRef} from "react";
import { doApiGet , apiUrl, doApiPostToken} from "../services/apiService";
import "../css/addCustomer.css";
import swal from 'sweetalert';

function AddReceipt(props){
let [userData, setUserData] = useState([props.profileSingle[0]]);
let [customerList, setCustomerList] = useState([]);
let [countRecipt, setCountRecipt] = useState(0);

let numberRef = useRef();let productRef = useRef();  let PriceRef = useRef(); let noteRef = useRef(); 

useEffect(() => {

    document.getElementById("btn").style.color = "white";
    document.getElementById("btn").style.backgroundColor = "dodgerblue";


  let urlUser = apiUrl+'customers';

  doApiGet(urlUser)
        .then(data => {
            setCustomerList(data);
        })

}, [])



let sendFormReceipt = async(event) => {
    event.preventDefault();
    let bodyData = {
        receipt_id: props.animals.receipt_id,
        receipt_number: event.target.numberf.value,
        product_type: event.target.productf.value,
        price: event.target.pricef.value,
        note: event.target.notef.value 
       }
    // setCountRecipt(countRecipt+1);

console.log(userData[0]);

    let updateUrl = apiUrl + "customers/updateReceipt";


  let arr2 = {user: userData[0], receipt: bodyData}

    doApiPostToken(updateUrl, arr2)
        .then(data => {
            setUserData(data);
            swal({
              title: "Receipt Add",
              icon: "success",
              button: "OK",
            }).then((value) => {
              document.location.href = "/profileCustomer/"+userData[0]._id;

            })

        })
}



    return(
      
        <div className="container py-3">
            <form onSubmit={sendFormReceipt} >
              <div class="mb-3">
              <div className="msg-reg" id="msgnumber"></div>
  <input type="number" class="form-control" ref={numberRef} id="numberf"  placeholder="Receipt Number"/>
</div>  <div class="mb-3">
<div className="msg-reg" id="msgproduct"></div>
  <input type="text" class="form-control" ref={productRef} id="productf" placeholder="Product Type"/>
</div>
<div class="mb-3"> 
<div className="msg-reg" id="msgproce"></div>
  <input type="number" class="form-control" ref={PriceRef} id="pricef" placeholder="Price"/>
</div>
<div class="mb-3"> 
<div className="msg-reg" id="msgproce"></div>
  <input type="text" class="form-control" ref={noteRef} id="notef" placeholder="Note"/>
</div>

<button className="btn-register" id="btn" type="submit">Add Receipt</button>

                    </form>
        </div>
        
    )


}
export default AddReceipt;