import { checkOnlyNumbers, checkOnlyLetters } from './checkData';



// משתנים כדי לבדוק אם הטופס תקין יפתח את הכפתור שליחה
let type=false;
let fname = false, genderv = false,  bDatev = false,chip=false;


export const checkFormPet = (petnameRef,chipnumberRef,typeRef,petgenderRef,petdateRef,customerList,setCustomerList,setUserData) => {
 



    let validFname = checkOnlyLetters(petnameRef);
    let validChip = checkOnlyNumbers(chipnumberRef);
    let massageFnamep = document.getElementById("msgpetname");
    let massageChip = document.getElementById("msgChip");
    let massageType = document.getElementById("msgType");
    let massageGenderp = document.getElementById("msgGenderp");
    let massagebDatep = document.getElementById("msgDatep");

    if (validFname === true) {
        massageFnamep.innerHTML = "&#10004;";
        massageFnamep.style.color = "green";
        fname = true;
    }
    else {
        massageFnamep.innerHTML = validFname;
        massageFnamep.style.color = "red";
        fname = false;
    }
    if (validChip === true) {
        massageChip.innerHTML = "&#10004;";
        massageChip.style.color = "green";
        chip = true;
    }
    else {
        massageChip.innerHTML = validChip;
        massageChip.style.color = "red";
        chip = false;
    }
    if (petgenderRef === "-Select Gender-") {
        genderv = false;
        massageGenderp.style.color = "red";
        massageGenderp.innerHTML = " must";
    }
    else {
        genderv = true;
        massageGenderp.style.color = "green";
        massageGenderp.innerHTML = "&#10004;";
    }
    if (typeRef === "-Select Type-") {
        type = false;
        massageType.style.color = "red";
        massageType.innerHTML = " must";
    }
    else {
        type = true;
        massageType.style.color = "green";
        massageType.innerHTML = "&#10004;";
    }

    if (petdateRef === "") {
        bDatev = false;
        massagebDatep.style.color = "red";
        massagebDatep.innerHTML = " can`t be empty";
    }
    else {
        bDatev = true;
        massagebDatep.style.color = "green";
        massagebDatep.innerHTML = "&#10004;";
    }



    // אם כל הקלטים תקינים העבר את הכפתור למצב פעיל, ושמור את האובייקט של המידע בסטייט
    if ( chip && type  && fname && genderv && bDatev) {
        document.getElementById("btn").disabled = false;
        document.getElementById("btn").style.color = "white";
        document.getElementById("btn").style.backgroundColor = "dodgerblue";



    }


    

    }


