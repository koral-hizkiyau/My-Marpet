
// בדיקת תקינות של כתובת מייל
export const checkEmail = (_email) => {
    let gmail = /^[a-z]((?!\.\.)([\w])){1,30}[\w]@[\w]+\.(com|(co\.il))$/i;
    // /^[a-z]((?!\.\.)([\w])){1,30}[\w]@gmail.com$/i;
    let email = /^\w+([-+.']\w+)@\w+([-.]\w+)\.\w+([-.]\w+)*$/i;
    // let tryy = /^[^@\s]+@[^@\s]+\.[^@\s]+$/i;‏

    if (!gmail.test(_email)) {
        return "Invalid email &#10007;";
    }
    return true;
}

// בדיקת תקינות של טלפון נייד
export const checkPhone = (_phone) => {
    let phone = /^05\d([-]{0,1})\d{7}$/;
    if (!phone.test(_phone)) {
        return "Invalid number";
    }
    return true;
}

// בדיקה שהקלט מכיל אותיות בלבד, (קטנות+גדולות+עברית)
export const checkOnlyLetters = (_word) => {
//    let word = /^[A-Za-z]+$/;
    let word = /^[a-z\u0590-\u05fe]+$/i;
    if(!word.test(_word)){
        return " can't have numbers &#10007;";
    }
    return true;
}


//פונקציה שבודקת אם הקלט מכיל רק מספרים
export const checkOnlyNumbers = (_word) => {
    let word = /^\d+$/;
    if(!word.test(_word)){
        return "only numbers";
    }
    return true;
}



