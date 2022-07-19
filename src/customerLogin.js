import React, { useRef, useState, useEffect } from 'react';
import "./css/customerLogin.css";
import { apiUrl, doApiGet, doApiGetToken, doApiPostToken } from './services/apiService';
import { checkEmail, checkOnlyNumbers, checkOnlyLetters } from './js/checkData';
import { parseJwt } from "./js/data";
import { useHistory } from 'react-router-dom';

function CustomerLogin(){

    let [registeredCustomer, setRegisteredCustomer] = useState([]);

    let [CusomterId, setCustomerId] = useState([]);

    let myform = useRef(null);
    const history = useHistory();


    let emailCRef = useRef();
    let passwordCRefRef = useRef();

    useEffect(() => {
        let urlToken = apiUrl + 'customers/checkToken';
        let urlUsers = apiUrl + "customers";
    
        if (localStorage[process.env.REACT_APP_LOCLHOST_KEY]) {
         
          let token = parseJwt(localStorage[process.env.REACT_APP_LOCLHOST_KEY]) 
          //בודק אם האימייל הוא מנהל או משתמש רגיל
          doApiGetToken(urlUsers)
            .then(data => {
              let count = 0;
              data.map(item => {
                if (item.email === token.email) {
                  count++;
                  history.push("/customerProfile")
                }
              })
            //   if (count === 0) history.push("/")

            })
          fetch(urlToken, {
            headers: { 'x-auth-token': localStorage[process.env.REACT_APP_LOCLHOST_KEY] }
          })
            .then(resp => resp.json())
            .then(data => {
              if (data.message !== "ok") {
                //אם הטוקן לא תקין או שלא קיבלנו אישור
                // history.push("/")
              }
            })
        }
        else {
          let urlUsers = apiUrl + "customers";
                      doApiGet(urlUsers)
                          .then(data => {
                              setRegisteredCustomer(data)
                          })
      
            
                      
        }
        //אם יש עדכון בלוקאל סטורג
      }, [localStorage[process.env.REACT_APP_LOCLHOST_KEY]])

     

    const sendLoginForm = (event) => {
        event.preventDefault();

        let bodyData = {
            email: event.target.id_email.value,
            password: event.target.id_password.value
        }
        let url = apiUrl+'customers/login';
        doApiPostToken(url, bodyData)
            .then(data => {
                //אומר שהצלחנו לקבל טוקן
                if (data.token) {
                    localStorage.setItem(process.env.REACT_APP_LOCLHOST_KEY, data.token);
                    history.push("/customerProfile")
                }}
               )
    }

    const getId = () => {
        let email = emailCRef.current.value;

        let idCustomer;

        let urlCustomer = apiUrl + "customers";
        doApiGet(urlCustomer)
            .then(data => {
                idCustomer = data.filter(item => {
                    return (item.email === email)
                })
                
                setCustomerId(idCustomer)
            })
            sendEmails(email);


    }
    let pas = false;
    let em2 = false;
    let em3=false;
    const sendEmails = (email) => {

        let massageEmail = document.getElementById("msgEmail");
        let massagePass = document.getElementById("msgPass");

        let validE = checkEmail(email)

        // בודק שהקלט אימייל תקין
        if (validE === true ) {
            if (em2===false) {
                for (let i = 0; i < registeredCustomer.length; i++) {
                    if (email === registeredCustomer[i].email) {
                        console.log(registeredCustomer[i]);
                        massageEmail.innerHTML = "&#10004;";
                        massageEmail.style.color = "pink";
                        em3=true;
                        break;
                    }
                    else {
                        massageEmail.style.color = "red";
                        massageEmail.innerHTML = " The email not found";
                    }
                }
            }
          
        }
     

        if (passwordCRefRef.current.value.length >= 8 && checkOnlyNumbers(passwordCRefRef.current.value) && checkOnlyLetters(passwordCRefRef.current.value)) {
            massagePass.style.color = "pink"
            massagePass.innerHTML = "&#10004;";
            pas = true;
        }
        else {
            if (checkOnlyNumbers(passwordCRefRef.current.value) === false && passwordCRefRef.current.value.length >= 8) {
                massagePass.innerHTML = "only numbers";
            }
            else if (passwordCRefRef.length < 8) {
                massagePass.innerHTML = "less than 8 numbers";
            }
            pas = false;

        }

       



    }
    


    return(  
        <div className="container-fluid login-container">
        <div className="row" style={{"margin":"auto", "justifyContent": "center"}}>       
            <div className="col-md-3 login-form-1">
            <h3>Customers Login</h3>
                <form onSubmit={sendLoginForm} onChange={() => getId()}>
                    <div className="form-group" >
                        <input type="text" className="form-control" id="id_email" ref={emailCRef} placeholder="Your Email *"  />
                        <div className="msg-reg" id="msgEmail"></div></div>
                    <div className="form-group">
                        <input type="password" className="form-control" id="id_password" ref={passwordCRefRef} placeholder="Your Password *"  />
                        <div className="msg-reg" id="msgPass"></div></div>
                    <div className="form-group">
                        <input type="submit" className="btnSubmit" value="Login"  />
                    </div>
                    <div className="form-group">

                    </div>
                </form>
            </div>
        </div>
    </div>

    )
}

export default CustomerLogin;