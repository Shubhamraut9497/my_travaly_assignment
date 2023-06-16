import React, { useState} from "react";
import "./Flight.css";
import Header from "../Navbar/Header";
import FlightRes from '../FlightResult/FlightRes'
import { MdFlightTakeoff, MdOutlineFlightLand } from "react-icons/md";
import { RxCalendar } from "react-icons/rx";
import Button from "react-bootstrap/Button";
import { format } from "date-fns";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRange } from "react-date-range";



function Flight() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [data,setData]=useState({
    from:"",
    to:""
  })
  
  const [openDate, setOpenDate] = useState(false);
  const searchFlight=()=>{
       setData({
        from:from ,
        to:to,
       })
  }
  console.log(data);
  return (
    <>
      <div className="header2">
        <Header />
      </div>
      <div className="container">
        <div className="row">
          <div className="flight ">
            <div className="flightInput">
              <div className="filghtElement">
                <span className="ico">
                  <MdFlightTakeoff />
                </span>
                <input
                  type="text"
                  className="inputs form-control"
                  placeholder="From"
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                />
              </div>
              <div className="filghtElement">
                <span className="ico">
                  <MdOutlineFlightLand />
                </span>
                <input
                  type="text"
                  className="inputs form-control"
                  placeholder="To"
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                />
              </div>
              <div className="filghtElement">
                <span className="ico">
                  <RxCalendar />
                </span>
                <div
                  onClick={() => {
                    setOpenDate(!openDate);
                  }}
                  className="headerSearch__text form-control"
                >{`${format(date[0].startDate, "MM/dd/yyyy")} to ${format(
                  date[0].endDate,
                  "MM/dd/yyyy"
                )}`}</div>
                {openDate && (
                  <DateRange
                    editableDateInputs={true}
                    onChange={(item) => setDate([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={date}
                    className="date "
                    minDate={new Date()}
                  />
                )}
              </div>
              <Button className="bns" onClick={searchFlight}>
                Search
              </Button>
            </div>
          </div>
        </div>
        <FlightRes from={data.from.charAt(0).toUpperCase()+data.from.slice(1)} to={data.to.charAt(0).toUpperCase()+data.to.slice(1)}/>
        {/* <FlightRes from ={from.capitalize()} to={to.capitalize()}/> */}
      </div>
    </>
  );
}

export default Flight;
