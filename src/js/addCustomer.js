import { checkEmail, checkOnlyNumbers, checkPhone, checkOnlyLetters } from './checkData';
import {getAge} from "./data";



// משתנים כדי לבדוק אם הטופס תקין יפתח את הכפתור שליחה
let password = false, id=false;
let email = false , phone = false, address=false;
let fname = false, genderv = false,  bDatev = false, last=false;


export const checkForm = (nameRef,lastRef,emailRef,phoneRef,genderRef,addressRef,dateRef,passwordRef,IDRef,customerList,setCustomerList,setUserData) => {
    let massageEmail = document.getElementById("msgEmail");


    // בודק שהקלט אימייל תקין
    let validEmail = checkEmail(emailRef);
    if (validEmail === true){
        for (let index = 0; index < customerList.length; index++) {
            if(emailRef === customerList[index].email){
                massageEmail.style.color = "red";
                massageEmail.innerHTML = "The email is in use";
                break;
            }
            else {
                massageEmail.innerHTML = "&#10004;";
                massageEmail.style.color = "green";
                email = true;
            }            
        }
    } 
    

    // בודק שהקלט טלפון תקין
    let validPhone = checkPhone(phoneRef);

    let massagePhone = document.getElementById("msgPhone");
    if (validPhone === true) {
        for (let i = 0; i < customerList.length; i++) {
            if (phoneRef === customerList[i].phone) {
                massagePhone.style.color = "red"
                massagePhone.innerHTML = " The phone is in use";
                break;
            }
            else {
                massagePhone.innerHTML = "&#10004;";
                massagePhone.style.color = "green"
                phone = true;
            }
        }
    }


    // בודק שהקלט סיסמא תקין
    // להוסיף א הבדיקה שאין רק מספרים
    let massagePass = document.getElementById("msgPassword");
    if (passwordRef.length >= 8 && checkOnlyNumbers(passwordRef) && checkOnlyLetters(passwordRef)) {
        massagePass.style.color = "green"
        massagePass.innerHTML = "&#10004;";
        password = true;
    }
    else {
        if (checkOnlyNumbers(passwordRef) === false && passwordRef.length >= 8) {
            massagePass.innerHTML = "only numbers";
        }
        else if (passwordRef.length < 8) {
            massagePass.innerHTML = "less than 8 numbers";
        }
        password = false;
    }

    let validFname = checkOnlyLetters(nameRef);
    let validLast = checkOnlyLetters(lastRef);
    let massageFname = document.getElementById("msgName");
    let massageLast = document.getElementById("msgLast");
    let massageGender = document.getElementById("msgGender");
    let massageAddress = document.getElementById("msgAddress");
    let massagebDate = document.getElementById("msgDate");
    let massageID = document.getElementById("msgID");

    if (validFname === true) {
        massageFname.innerHTML = "&#10004;";
        massageFname.style.color = "green";
        fname = true;
    }
    else {
        massageFname.innerHTML = validFname;
        massageFname.style.color = "red";
        fname = false;
    }
    if (validLast === true) {
        massageLast.innerHTML = "&#10004;";
        massageLast.style.color = "green";
        last = true;
    }
    else {
        massageLast.innerHTML = validLast;
        massageLast.style.color = "red";
        last = false;
    }
    if (genderRef === "-Select Gender-") {
        genderv = false;
        massageGender.style.color = "red";
        massageGender.innerHTML = " must";
    }
    else {
        genderv = true;
        massageGender.style.color = "green";
        massageGender.innerHTML = "&#10004;";
    }

    if (dateRef === "" || getAge(dateRef) < 18) {
        bDatev = false;
        massagebDate.style.color = "red";
        massagebDate.innerHTML = " can`t be empty or under 18";
    }
    else {
        bDatev = true;
        massagebDate.style.color = "green";
        massagebDate.innerHTML = "&#10004;";
    }
    if (addressRef === "") {
        address = false;
        massageAddress.style.color = "red";
        massageAddress.innerHTML = " must";
    }
    else {
        address = true;
        massageAddress.style.color = "green";
        massageAddress.innerHTML = "&#10004;";
    }
    if (IDRef.length !== 9) {
        id = false;
        massageID.style.color = "red";
        massageID.innerHTML = " must be 9 numbers";
    }
    else {
        id = true;
        massageID.style.color = "green";
        massageID.innerHTML = "&#10004;";
    }

    // אם כל הקלטים תקינים העבר את הכפתור למצב פעיל, ושמור את האובייקט של המידע בסטייט
    if (email  && last && phone && address && password && fname && genderv && bDatev) {
        document.getElementById("btn").disabled = false;
        document.getElementById("btn").style.color = "white";
        document.getElementById("btn").style.backgroundColor = "dodgerblue";


        let userObj = {
            email: emailRef,
            phone: phoneRef,
            password: passwordRef,
            first_name: nameRef,
            gender: genderRef,
            date_of_birth: dateRef,
            last_name: lastRef,
            address: addressRef

        };
        setUserData(userObj);

    }


    

    }


