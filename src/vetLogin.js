import React, { useRef, useState, useEffect } from 'react';
import { apiUrl, doApiGet, doApiGetToken, doApiPostToken } from './services/apiService';
import { checkEmail, checkOnlyNumbers, checkOnlyLetters } from './js/checkData';
import "./css/vetLogin.css";
import { parseJwt } from "./js/data";
import { useHistory } from 'react-router-dom';


function VetLogin(){
    let [registeredVets, setRegisteredVets] = useState([]);

    let [VetId, setVetId] = useState([]);


    const history = useHistory();

    let emailRef = useRef();
    let passwordRef = useRef();

    useEffect(() => {
        let urlToken = apiUrl + 'vets/checkToken';
        let urlUsers = apiUrl + "vets";
    
        if (localStorage[process.env.REACT_APP_LOCLHOST_KEY]) {
         
          let token = parseJwt(localStorage[process.env.REACT_APP_LOCLHOST_KEY]) 
          doApiGetToken(urlUsers)
            .then(data => {
              let count = 0;
              data.map(item => {
                if (item.email === token.email) {
                  count++;
                  history.push("/vetList")
                }
              })

            })
          fetch(urlToken, {
            headers: { 'x-auth-token': localStorage[process.env.REACT_APP_LOCLHOST_KEY] }
          })
            .then(resp => resp.json())
            .then(data => {
              if (data.message !== "ok") {

              }
            })
        }
        else {
          let urlUsers = apiUrl + "vets";
                      doApiGet(urlUsers)
                          .then(data => {
                              setRegisteredVets(data)
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
        let url = apiUrl+'vets/login';

        doApiPostToken(url, bodyData)
            .then(data => {
                //אומר שהצלחנו לקבל טוקן
                if (data.token) {
                    localStorage.setItem(process.env.REACT_APP_LOCLHOST_KEY, data.token);
                    history.push("/vetList")
                }}
               )
    }

    const getId = () => {
        let email = emailRef.current.value;

        let idVet;

        let urlVets = apiUrl + "vets";
        doApiGet(urlVets)
            .then(data => {
                idVet = data.filter(item => {
                    return (item.email === email)
                })
                
                setVetId(idVet)
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
                for (let i = 0; i < registeredVets.length; i++) {
                    if (email === registeredVets[i].email) {
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
     

        if (passwordRef.current.value.length >= 8 && checkOnlyNumbers(passwordRef.current.value) && checkOnlyLetters(passwordRef.current.value)) {
            massagePass.style.color = "pink"
            massagePass.innerHTML = "&#10004;";
            pas = true;
        }
        else {
            if (checkOnlyNumbers(passwordRef.current.value) === false && passwordRef.current.value.length >= 8) {
                massagePass.innerHTML = "only numbers";
            }
            else if (passwordRef.length < 8) {
                massagePass.innerHTML = "less than 8 numbers";
            }
            pas = false;

        }

       



    }
    
    return(
        
        <div className="container-fluid login-container">
                    <div className="row" style={{"margin":"auto", "justifyContent": "center"}}>       
                        <div className="col-md-3 login-form-2">
                            <h3>Vets Login</h3>
                            <form onSubmit={sendLoginForm} onChange={() => getId()}>
                                <div className="form-group" >
                                    <input type="text" className="form-control" id="id_email" ref={emailRef} placeholder="Your Email *"  />
                                    <div className="msg-reg" id="msgEmail"></div></div>
                                <div className="form-group">
                                    <input type="password" className="form-control" id="id_password" ref={passwordRef} placeholder="Your Password *"  />
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

export default VetLogin;