import React, { useEffect, useState } from 'react';
import { doApiGet ,apiUrl} from '../services/apiService';
import Customer from './Customer';
import "../css/vetList.css";
import NavVet from './NavVet';
import AddCustomer from './AddCustomer';

function VetList() {
    let [flag, setFlag] = useState(false);
    let [customerList, setCustomerList] = useState([])
    let [counterApi, setCounterApi] = useState(0)

    useEffect(() => {

        let urlCustomers = apiUrl + "customers";
        doApiGet(urlCustomers)
        .then(data => {
            setCustomerList(data)
        }
            
            )
    },[counterApi])

    const onClickAddCustomer = () => {
        if(flag) setFlag(false);
        else setFlag(true);
    }

    return (
        <div className="container-fluid">
            <NavVet/>
            <br/>
            <h1 className='head'>Customers List:</h1>
            <br/>
            <button className="btnAdd" onClick={onClickAddCustomer}>Add Customer</button>
            {flag ? <AddCustomer customerList={customerList} counterApi={counterApi} setCounterApi={setCounterApi} /> : "" }
            <Customer _ar={customerList} counterApi={counterApi} setCounterApi={setCounterApi}/>
           
            </div>
    )
}

export default VetList