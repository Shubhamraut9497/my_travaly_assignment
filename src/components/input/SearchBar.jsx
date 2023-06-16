import React, { useEffect, useState } from "react";
import { FcCalendar } from "react-icons/fc";
import { BsPersonFill } from "react-icons/bs";
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { BiBed } from "react-icons/bi";
import "./SearchBar.css";


function SearchBar() {
// Search bar component is basically for selecting handle Search operation which is performed by user 
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const [openDate, setOpenDate] = useState(false);
  const [options, setOptions] = useState({
    adult: 2,
    children: 0,
    room: 1,
  });

  const handleOption = (name, oper) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: oper === "i" ? options[name] + 1 : options[name] - 1,
      };
    });
  };
  
  const [openOptions, setOpenOptions] = useState(false);
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
 

  const handleSearch = () => {
    if(search.length)
    navigate("/hotels", { state: { search, date, options } });
  };

  return (
    <>
      <div className="headerSearch">
        <div className="headerSearchItem">
          <span className="headerIcon">
            <BiBed />
          </span>
          <input
            type="text"
            placeholder="where are you going?"
            className="headerSearchInput"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div id="suggestions-container">{search && (<div>hello</div>)}</div>
        </div>
        <div className="headerSearchItem">
          <span className="headerIcon">
            <FcCalendar />
          </span>
          <span
            className="headerSearchText"
            onClick={() => {
              setOpenDate(!openDate);
            }}
          >{`${format(date[0].startDate, "MM/dd/yyyy")} to ${format(
            date[0].endDate,
            "MM/dd/yyyy"
          )}`}</span>
          {openDate && (
            <DateRange
              editableDateInputs={true}
              onChange={(item) => setDate([item.selection])}
              moveRangeOnFirstSelection={false}
              ranges={date}
              className="date2"
              minDate={new Date()}
            />
          )}
        </div>
        <div className="headerSearchItem">
          <span className="headerIcon">
            <BsPersonFill />
          </span>
          <span className="headerSearchText" onClick={() => setOpenOptions(!openOptions)}>
            {`${options.adult}.adult ${options.children}.children
             ${options.room}.room`}{" "}
          </span>
          {openOptions && <div className="Options">
            <div className="optionItems">

              <span className="optionText">Adult</span>
              <div className="optionCounter">
                <button
                  className="optionCouterButton"
                  disabled={options.adult <= 1}
                  onClick={() => handleOption("adult", "d")}
                >
                  -
                </button>
                <span className="optionCounterNumber">{options.adult}</span>
                <button
                  className="optionCouterButton"
                  onClick={() => handleOption("adult", "i")}
                >
                  +
                </button>
              </div>
            </div>
            <div className="optionItems">
              <span className="optionText">Children</span>
              <div className="optionCounter">
                <button
                  className="optionCouterButton"
                  disabled={options.children <= 0}
                  onClick={() => handleOption("children", "d")}
                >
                  -
                </button>
                <span className="optionCounterNumber">{options.children}</span>
                <button
                  className="optionCouterButton"
                  onClick={() => handleOption("children", "i")}
                >
                  +
                </button>
              </div>
            </div>
            <div className="optionItems">
              <span className="optionText">Room</span>
              <div className="optionCounter">
                <button
                  className="optionCouterButton"
                  disabled={options.room <= 1}
                  onClick={() => handleOption("room", "d")}
                >
                  -
                </button>
                <span className="optionCounterNumber">{options.room}</span>
                <button
                  className="optionCouterButton"
                  onClick={() => handleOption("room", "i")}
                >
                  +
                </button>
              </div>
            </div>
          </div>}
        </div>
        <div className="headerSearchItem">
          <button className="headerBtn" onClick={handleSearch}>Search</button>
        </div>
      </div>
    </>
  );
}

export default SearchBar;
