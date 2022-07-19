import React, { useEffect, useState } from 'react'
import { apiUrl, doApiGet } from '../services/apiService';
import GraphCustomer from './graphs/GraphCustomer'
import GraphGenderPet from './graphs/GraphGenderPet';
import GraphPets from './graphs/GraphPets';
import GraphReceipts from './graphs/GraphReceipts';
import NavVet from './NavVet';

function GraphVet() {

    let [customers, setCustomers] = useState([]);


    useEffect(() => {
        let urlUsers = apiUrl + "customers";
        doApiGet(urlUsers)
            .then(data => {

                        setCustomers(data);
            })
            




    }, [])
    
const arrp = [];
    customers.map(item => item.id_animal.map(item=> arrp.push(item)))



    return (
        <>
        <NavVet/>
        <div className='container row py-3' style={{margin:"auto",justifyContent:"center"}}>
    <div className='col-lg-6'><GraphCustomer customers={customers} pets={arrp}/></div>
   <div className='col-lg-6'> <GraphPets pets={arrp} /></div>
    </div>
    <div className='container row py-3' style={{margin:"auto",justifyContent:"center"}}>
    <div className='col-lg-6'><GraphGenderPet pets={arrp}/></div>
    <div className='col-lg-6'><GraphReceipts customers={customers}/></div>

    </div>

    </>
  )
}

export default GraphVet;