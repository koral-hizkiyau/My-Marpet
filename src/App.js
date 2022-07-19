import React, { useEffect, useState } from 'react';
import  Nav  from './nav';
import './App.css';
import { BrowserRouter as Router , Route, Switch} from "react-router-dom";
import Main from './main';
import VetLogin from './vetLogin';
import CustomerLogin from './customerLogin';
import Vets from "./vets";
import VetList from './vets_comps/VetList';
import ProfileCustomer from './vets_comps/ProfileCustomer';
import ProfilePet from './vets_comps/ProfilePet';
import { AppContext } from './context/context';
import { apiUrl,doApiGet } from './services/apiService';
import CustomerProfile from './customers_comps/customerProfile';
import ProfilePetCustomer from './customers_comps/ProfilePetCustomer';
import GraphVet from './vets_comps/GraphVet';
import ContactForm from './customers_comps/ContactForm';
import MessageVet from './vets_comps/MessageVet';


function App() {
  let [contextCustomer, setContextCustomer] = useState([]);

  useEffect(() => {

    let urlCustomers = apiUrl + "customers";
    doApiGet(urlCustomers)
        .then(data => {
          setContextCustomer(data);
        })
}, [])

  return (
      <div className="App">
        <Router>
         <Switch>
            <Route exact path={["/", "/vetLogin", "/customerLogin"]} render={() => {
              return (
                <React.Fragment>
                  <Nav />
                </React.Fragment>
              )
            }
            } />

          </Switch>

          <AppContext.Provider value={contextCustomer}>


          <Route exact path={'/'} component={Main} />
          <Route exact path={'/vetLogin'} component={VetLogin} />
          <Route exact path={'/customerLogin'} component={CustomerLogin} />
          <Route exact path={'/vets/myProfile/:id'} component={Vets} />
          <Route exact path={'/vetList'} component={VetList} />
          <Route exact path={'/graphsVet'} component={GraphVet} />
          <Route exact path={'/profileCustomer/:id'} component={ProfileCustomer} />
          <Route exact path={'/profileCustomer/:id/profilePet/:id'} component={ProfilePet} />
          <Route exact path={'/customerProfile'} component={CustomerProfile} />
          <Route exact path={'/customerProfile/:id/profilePetCustomer/:id'} component={ProfilePetCustomer} />
          <Route exact path={'/customerProfile/contactForm'} component={ContactForm} />
          <Route exact path={'/messages'} component={MessageVet} />





          


          {/* 
          {flagFooter ?
            <Footer />
            : ''
          } */}
          {/* <Footer /> */}

          {/* <Footer /> */}

          </AppContext.Provider>  
                </Router>



      </div>

  );
}

export default App;
