import React, { useState, useEffect } from "react";
import { FcCalendar } from "react-icons/fc";
import { BsPersonFill } from "react-icons/bs";
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import { addDays } from "date-fns";
import { useNavigate, Link } from "react-router-dom";
import { BiBed } from "react-icons/bi";
import "./SearchBar.css";
import parseJSON from "date-fns/parseJSON/index";

function SearchBar() {
  // this component is basically used to search for a hotel by  city by country and by location
  const navigate = useNavigate();
  const [autoComplete, setAutocomplete] = useState([]);
  const [destination, setDestination] = useState("");

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
  const [openDate, setOpenDate] = useState(false);
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [{ startDate, endDate }] = date;
  const [openOptions, setOpenOptions] = useState(false);
  // In this component i have called a search autocomplete api to suggest user about what he/she is searching
  // i have stored this data in one variable known as autoComplete

  const searchData = async () => {
    const search_data_api = await fetch(
      "https://api.mytravaly.com/testing/v1/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authtoken: "7eaa8958a9f8047951d1ef23348abc3f",
          visitortoken: "b4ec-0a61-ec83-0454-a4aa-d971-5a7e-6040",
        },
        body: JSON.stringify({
          action: "searchAutoComplete",
          searchAutoComplete: {
            inputText: destination.length===0?"ind":destination,
            searchType: [
              "byCity",
              "byState",
              "byCountry",
              "byRandom",
              "byPropertyName", // you can put any searchType from the list
            ],
            limit: 10,
          },
        }),
      }
    );
    const response = await search_data_api.json();
    setAutocomplete(response);
    console.log(response);
  };
  const handleDestination = (e) => {
    const inputText = e.target.value;
    setDestination(e.target.value);
    searchData();
    if (!inputText.includes("calendar") && !inputText.includes("option")) {
      setOpenDate(false);
      setOpenOptions(false);
    }
  };
  const handleSearch = () => {
    navigate("/hotels", { state: { destination, date, options } });
  };

  return (
    <>
      <div className="headerSearch">
        <div className="headerSearchItem">
          <span className="headerIcon">
            <BiBed />
          </span>
          <div className="searchContainer">
            <input
              type="text"
              placeholder="where are you going?"
              className="headerSearchInput"
              value={destination}
              list="browsers"
              id="browser"
              name="browser"
              style={{ width: "100%" }}
              onChange={handleDestination}
            />
            {autoComplete &&
              destination.length >= 2 &&
              autoComplete.data &&
              autoComplete.data.autoCompleteList && (
                <datalist id="browsers" className="dataList_search w-100 mt-3">
                  {autoComplete.data.autoCompleteList.byPropertyName.present &&
                    autoComplete.data.autoCompleteList.byPropertyName.listOfResult.map(
                      (item) => {
                        const propertyName = item.propertyName.toLowerCase();
                        const address = `${item.address.city}, ${item.address.state}`;
                        const searchQuery =
                          item.searchArray.query[0].toLowerCase();
                        if (
                          propertyName.includes(destination.toLowerCase()) ||
                          address.includes(destination.toLowerCase()) ||
                          searchQuery.includes(destination.toLowerCase())
                        ) {
                          return (
                            <option
                              key={item.propertyName}
                              value={item.valueToDisplay}
                            >
                              {item.valueToDisplay}
                            </option>
                          );
                        }
                        return null;
                      }
                    )}
                  {autoComplete.data.autoCompleteList.byStreet.present &&
                    autoComplete.data.autoCompleteList.byStreet.listOfResult.map(
                      (item) => {
                        const street = item.address.street.toLowerCase();
                        const city = item.address.city.toLowerCase();
                        const state = item.address.state.toLowerCase();
                        const country = item.address.country.toLowerCase();
                        const searchQuery = item.searchArray.query.map((q) =>
                          q.toLowerCase()
                        );
                        if (
                          street.includes(destination.toLowerCase()) ||
                          city.includes(destination.toLowerCase()) ||
                          state.includes(destination.toLowerCase()) ||
                          country.includes(destination.toLowerCase()) ||
                          searchQuery.some((q) =>
                            q.includes(destination.toLowerCase())
                          )
                        ) {
                          return (
                            <option
                              key={item.valueToDisplay}
                              value={item.valueToDisplay}
                            >
                              {item.valueToDisplay}
                            </option>
                          );
                        }
                        return null;
                      }
                    )}
                  {autoComplete.data.autoCompleteList.byCountry.present &&
                    autoComplete.data.autoCompleteList.byCountry.listOfResult.map(
                      (item) => {
                        const country = item.address.country.toLowerCase();
                        const searchQuery =
                          item.searchArray.query[0].toLowerCase();
                        if (
                          country.includes(destination.toLowerCase()) ||
                          searchQuery.includes(destination.toLowerCase())
                        ) {
                          return (
                            <option
                              key={item.valueToDisplay}
                              value={item.valueToDisplay}
                            >
                              {item.valueToDisplay}
                            </option>
                          );
                        }
                        return null;
                      }
                    )}
                </datalist>
              )}
          </div>
        </div>
        <div className="headerSearchItem" onClick={() => setOpenOptions(false)}>
          <span className="headerIcon">
            <FcCalendar />
          </span>
          <span
            className="headerSearchText"
            onClick={() => {
              setOpenDate(!openDate);
            }}
          >{`${format(date[0].startDate, "dd-MM-yyyy")} to ${format(
            date[0].endDate,
            "dd-MM-yyyy"
          )}`}</span>
          {openDate && (
            <DateRange
              editableDateInputs={true}
              onChange={(item) => {
                const newDateRange = item.selection;
                const startDate = newDateRange.startDate;
                const endDate = addDays(newDateRange.endDate, 1); // Add 1 day to the end date
                setDate([
                  {
                    ...newDateRange,
                    endDate: endDate,
                  },
                ])
              }}
              moveRangeOnFirstSelection={false}
              ranges={date}
              className="date2"
              minDate={new Date()}
            />
          )}
        </div>
        <div
          className="headerSearchItem"
          onClick={() => {
            setOpenDate(false);
          }}
        >
          <span className="headerIcon">
            <BsPersonFill />
          </span>
          <span
            className="headerSearchText"
            onClick={() => setOpenOptions(!openOptions)}
          >
            {`${options.adult}.adult ${options.children}.children
             ${options.room}.room`}{" "}
          </span>
          {openOptions && (
            <div className="Options">
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
                  <span className="optionCounterNumber">
                    {options.children}
                  </span>
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
            </div>
          )}
        </div>
        <div className="headerSearchItem">
          <button className="headerBtn" onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>
    </>
  );
}

export default SearchBar;
