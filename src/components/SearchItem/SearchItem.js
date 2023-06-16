import React, { useState, useEffect } from "react";
import "./SearchItem.css";
import { Data } from "../Data/Data";
import { useNavigate } from "react-router-dom";

function SearchItem({ option, date, destination }) {
  const [hotelData, setHotelData] = useState([]);
  // In this component we are trying to show data according to the user requirement like whenever user will search for
  // hotels then he can be able to see on this hotel page
  // const location=useLocation();
  const navigate = useNavigate();
  let search_value = destination;
  const hotelApi = () => {
    fetch(`https://api.mytravaly.com/testing/v1/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authtoken: "7eaa8958a9f8047951d1ef23348abc3f",
        visitortoken: "b4ec-0a61-ec83-0454-a4aa-d971-5a7e-6040",
      },
      body: JSON.stringify({
        action: "getSearchResultListOfHotels",
        getSearchResultListOfHotels: {
          searchCriteria: {
            checkIn: "2023-07-11",
            checkOut: "2023-07-12",
            rooms: 2,
            adults: 2,
            children: 0,
            searchType: "hotelIdSearch",
            searchQuery: ["qyhZqzVt"],
            accommodation: [
              "all",
              "hotel", //allowed "hotel","resort","Boat House","bedAndBreakfast","guestHouse","Holidayhome","cottage","apartment","Home Stay", "hostel","Guest House","Camp_sites/tent","co_living","Villa","Motel","Capsule Hotel","Dome Hotel","all"
            ],
            arrayOfExcludedSearchType: [
              "street", //allowed street, city, state, country
            ],
            highPrice: "3000000",
            lowPrice: "0",
            limit: 5,
            preloaderList: [],
            currency: "INR",
            rid: 0,
          },
        },
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        // setHotelData(data);
        console.log(data);
      });
  };
  useEffect(() => {
    hotelApi();
  }, []);
  // console.log(hotelData);
  const handleButton = () => {};
  return (
    <div>
      {/* {hotelData.data.arrayOfHotelList?.map((hotel) => {
        return (
          <>
            <div className="SiDesc">
              <h1 className="siTitle">{hotel.hotel_name}</h1>
              <span className="siDistnce">500m from center</span>
              <span className="siTaxi">Free Airport Taxi</span>
              <span className="siSubtitle">
                Studio Appartment with Air Comditioning
              </span>
              <span className="sFeature">{hotel.room_type}</span>
              <span className="siCancel">Free Cancelation</span>
              <span className="sCancelOpSub"></span>
            </div>
            <div className="siDetail">
              <div className="siRating">
                <span>Excellent</span>
                <button>{hotel.rating}</button>
              </div>
              <div className="detailText">
                <span className="siPrice">₹ {hotel.price_per_night}</span>
                <span className="siTaxOp">Includes Taxes and fees</span>
                <button
                  className="siCbutton"
                  onClick={() => navigate("/payment")}
                >
                  Book now
                </button>
              </div>
            </div>
          </>
        );
      })} */}
    </div>
  );
}

export default SearchItem;
