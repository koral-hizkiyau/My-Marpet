

const initState = {
    submitingType: "basic",
}


export const RegisterReducer = (state = initState, action) => {
    if (action.type === "addData") {
        //setUserDetails(Object.assign(userDetails, tempUserDetails));
        console.log(action);
        return { ...state, ...action.userData, submitingType: action.submitingType }
    }
    else if (action.type === "setPosts") {
        console.log(action);
        return { ...state, ...action.adArr }
    }
    else {
        return state;
    }

    

}