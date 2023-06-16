import React, { useState, useEffect } from "react";
import "./SearchItem.css";
import { useNavigate} from "react-router-dom";

function SearchItem({ options, registration_date, destination }) {
  const [hotelData, setHotelData] = useState([]);

  // In this component we are trying to show data according to the user requirement like whenever user will search for
  // hotels then he can be able to see on this hotel page
  // const location=useLocation();
  let startDate =
    registration_date[0].startDate.getFullYear() +
    "-" +
    registration_date[0].startDate.getMonth() +
    "-" +
    registration_date[0].startDate.getDate();
  let endDate =
    registration_date[0].endDate.getFullYear() +
    "-" +
    registration_date[0].endDate.getMonth() +
    "-" +
    registration_date[0].endDate.getDate();

  const hotelApi = async () => {
    const searchHotelData = await fetch(
      `https://api.mytravaly.com/testing/v1/`,
      {
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
              rooms: options.room,
              adults: options.adult,
              children: options.children,
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
      }
    );
    const response = await searchHotelData.json();
    // console.log(response);
    const hotelList = response?.data?.arrayOfHotelList || [];
    setHotelData(hotelList);
  };
  useEffect(() => {
    hotelApi();
  }, []);
  console.log(hotelData);
  return (
    <>
      <div className="searchItem mx-3">
        {hotelData?.map((hotel) => {
          return (
            <>
              <container>
                <div className="hotel_details border">
                  <div>
                    <img
                      src={hotel.propertyImage.fullUrl}
                      className="siImg"
                      alt="img"
                    />
                  </div>
                  <div className="mx-3 rightData ">
                    <div className="SiDesc">
                      <h1 className="siTitle">{hotel.propertyName}</h1>
                      <div>
                        {hotel.propertyAddress.street +
                          "," +
                          hotel.propertyAddress.zipcode}
                      </div>
                      <span className="siDistnce">
                        {hotel.propertyAddress.city +
                          "," +
                          hotel.propertyAddress.country}
                      </span>
                      <span className="siTaxi">
                        {hotel.availableDeals[0].headerName}
                      </span>
                      <span className="siSubtitle">
                        Studio Appartment with Air Comditioning
                      </span>
                      <span className="sFeature"></span>
                      <span className="siCancel">Free Cancelation</span>
                      <span className="sCancelOpSub"></span>
                    </div>
                    <div className="siDetail">
                      <div className="siRating">
                        <span>Excellent</span>
                        <button>
                          {hotel.googleReview?.data?.overallRating ?? 0}
                        </button>
                      </div>
                      <div className="detailText">
                        <span className="siPrice">
                          {hotel.simplPriceList.simplPrice.displayAmount}
                        </span>
                        <span className="siTaxOp">Includes Taxes and fees</span>
                        <button className="siCbutton">Book now</button>
                      </div>
                    </div>
                  </div>
                </div>
              </container>
            </>
          );
        })}
      </div>
    </>
  );
}

export default SearchItem;
