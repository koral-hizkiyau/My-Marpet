let realUrl= process.env.REACT_APP_REAL_URL;

export const apiUrl = realUrl;

export const doApiGet = async (_url) => {
    let resp = await fetch(_url);
    let data = await resp.json();
    return data;
}

export const doApiPost = async (_url, _body) => {
    let resp = await fetch(_url, {
        method: "POST",
        body: JSON.stringify(_body),
        headers: {
            'content-type': "application/json"
        }
    })
    let data = await resp.json()
    console.log("service say:", data)
    return data;
}

export const doPostImgs = (event) => {
 
    let myFile = event;
    
    let data = new FormData();

    //כדי לשנות שם קובץ להוסיף אחרי מיי פייל פסיק ולהעביר את שם הקובץ
    data.append("f", myFile )
    fetch(apiUrl+'/upload', {
        method: "POST",
        body: data
    })
        .then(resp => resp.json())
        .then(data => {
            console.log(data);
        })
        .catch(err => {
            console.log(err)
        })
}




// פוסט עם טוקן
export const doApiPostToken = async (_url, _body) => {
    let resp = await fetch(_url, {
        method: "POST",
        body: JSON.stringify(_body),
        headers: {
            'content-type': "application/json",
            'x-auth-token':localStorage[process.env.REACT_APP_LOCLHOST_KEY]

        }
    })
    let data = await resp.json()
    //console.log("service say:" ,data)
    return data;
}




// גט עם טוקן
export const doApiGetToken = async (_url, _body) => {
    let resp = await fetch(_url, {
        method: "GET",
        body: JSON.stringify(_body),
        headers: {
            'content-type': "application/json",
            'x-auth-token':localStorage[process.env.REACT_APP_LOCLHOST_KEY]

        }
    })
    let data = await resp.json()
    return data;
}


