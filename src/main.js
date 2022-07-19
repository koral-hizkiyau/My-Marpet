import React from 'react';
import './App.css';
import Card from 'react-bootstrap/Card';
import petfoot from "./images/petfoot.png"

function Main() {
    return (
        <div>
        <h1 id="demotext" className='py-3' style={{fontFamily: 'Comfortaa, cursive'}}>MyMarpet Veterinary Center</h1>
        <div className="col-md-12 p-2 bd-highlight text-center">

        <Card className="form" bg="light" text="black" alt="" style={{ height: '19rem', backgroundColor: "white", borderColor: "#97BA00" }}>
                    <Card.Body>
                      <Card.Title style={{ fontFamily: 'Comfortaa, cursive' }}><h2  >Have a new pet?!</h2>
                      </Card.Title>
                      <Card.Text>
                        <p className="pet"  style={{fontSize: "20px"}}>Register the animal for our veterinary clinic and he will receive a warm and loving personal treatments. <br/>Our clinic has been around for 20 years with lots of experienced veterinarians<br/> with a love for the profession and professional service 
                        !</p>
                      </Card.Text>
                      <br/><br/>
                      <div className='row container-fluid'>
                      <div className="col-md-4 text-center"></div>
                      <div className="col-md-4 text-center">
                      <a href="tel:+1-212-274-8511">
                      <p className="call" style={{margin:"auto",justifyContent:"center",backgroundColor: "black",color: "white"}}><img src={petfoot} width="25" alt="dog" />  Woof Woof call now!</p></a>
                      </div>                      <div className="col-md-4 text-center"></div>
</div>
                      
                    </Card.Body>
                  </Card>
                  </div>
        <div>
            <div className='row container-fluid'>
  
        <div className="bd-highlight col-md-12 text-center" >
                  <div style={{ float: "center", fontSize: "20px", justifyContent: "flex-end", marginTop: "2%", fontFamily: 'Comfortaa, cursive' }}>
                    <p><b>Location:</b> 200 Centre Street, New York, NY 10013, United States</p>
                    <p><b>Hours:</b> 10-8pm, Tuesdays-Sundays, Closed Mondays</p>
                    <p><b>Phone:</b> 212-274-8511 or 212-274-8542</p>
                    <p><b>Email:</b> info@mymarpet.co.il</p></div></div>
                    {/* <div className='bd-highlight col-md-4 text-center'><Map/></div> */}

            </div>

        </div>
        </div>
        
    );
}

export default Main;
