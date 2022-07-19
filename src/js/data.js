import { doApiPost, doApiPostToken, apiUrl } from "../services/apiService";
import swal from 'sweetalert';


//פונקצייה שמחשבת גיל
export function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

//פונצקיה שמוחקת לקוח
export const delCustomer = async (_id, item, counterApi, setCounterApi) => {
    swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this customer!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
            let url = apiUrl+'customers/del';
           let data =  doApiPost(url, { del: _id });
        
                if (data.message) {
                    setCounterApi(counterApi + 1)
                    return true;
                }
          swal("Poof! Your customer has been deleted!", {
            icon: "success",
          }).then(()=>{
            window.location.reload(false);

          })
        } else {
          swal("Your customer not deleted!");
        }
      });
 
}

//פונקציה שבודקת את התוכן של הטוקן
export function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};

export const changeStatusPet = async (_id, item,status,setAnimals,profileSingle,setProfileSingle) => {
    swal({
        title: "Are you sure?",
        text: "You change the pet status to dead!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willChange) => {
        if (willChange) {
            item.pet_status = !status;
            profileSingle.id_animal.map(item =>{
                if(item._id === _id){
                     item.status = !false;
                }
                return item;
            })
                
            
           
        let prof = {profileSingle}
        doApiPostToken(apiUrl + "customers/updateStatus",prof)
            .then(data => {
              if (data.message) {
                return true;
            }
            })
          swal("Poof! Your pet status has been changed!", {
            icon: "success",
          }).then(()=>{
            window.location.reload(false);
          })
        } else {
          swal("Your pet status not changed!");
        }
      })
  
                
    }
                    
                

          



