import React, { useEffect, useState } from "react";
import "./Flights.css";
import {useNavigate} from 'react-router-dom';

function FlightRes(props) {
  const navigate=useNavigate();
  const [value, setValue] = useState([]);
  console.log(props.from,props.to);
  
useEffect(()=>{
    if(props.from && props.to){
    const upcomigFetch = async (from,to) => {
        try {
          const response = await fetch(`https://content.newtonschool.co/v1/pr/63b85b1209f0a79e89e17e3a/flights?from=${from}&&to=${to}`);
          const data = await response.json();
    
          setValue(data);
          
        } catch (err) {
          console.log("errr");
        }
      };
      upcomigFetch(props.from,props.to);
    }
    else{
      const upcomigFetch = async () => {
        try {
          const response = await fetch(`https://content.newtonschool.co/v1/pr/63b85b1209f0a79e89e17e3a/flights`);
          const data = await response.json();
    
          setValue(data);
          
        } catch (err) {
          console.log("errr");
        }
      };
      upcomigFetch();
    }
    
      
},[])

  return(
    <>
      { value.map((flight) => {
       
        return (
          <div className="searchItemss">
            <div className="SiDescs">
                <div className="inns">
                    <div className="heads">
              <h1 className="siTitles">
                {flight.from} To {flight.to}
              </h1>
              </div>
              <div>
              <h1 className="siTitles">Dept time :{" "}{flight.departure.departureTime}{" "}Date : {flight.departure.departureDate}</h1>
              <h1 className="siTitles">Return Time :{" "}{flight.return.returnTime}{" "}Date : {flight.return.returnDate}</h1>
              </div>
              </div>
              <h1 className="siTitles">{flight.airlineName}</h1>
              <span className="siDistnces">500m from center</span>
              <span className="siTaxis">Free Airport Taxi</span>
              <span className="siSubtitle">
                Flight is via {" "}{flight.via}
              </span>
              <span className="sFeature"></span>
              <span className="siCancel">{flight.duration}</span>
              <span className="sCancelOpSub"></span>
            </div>
            <div className="siDetails">
              <div className="siRatings">
                <span>Excellent</span>
                <button>8.9</button>
              </div>
              <div className="detailTexts">
                <span class="siPrices">₹ {flight.price}</span>
                <span class="siTaxOps">Includes Taxes and fees</span>
                <button className="siCbutton"onClick={()=>navigate("/payment")}>Book now</button>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default FlightRes;
