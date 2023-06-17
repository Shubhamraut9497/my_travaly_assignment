import React, { useEffect, useState } from 'react';
import './HotelInfo.css';
import { useLocation } from 'react-router-dom';
import Loader from './components/Loading/Loader';

function HotelInfo() {
  const location = useLocation();
  const propertyCode = location.state.hotelCode;
  console.log(propertyCode);

  const [hotelInfo, setHotelInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const HotelDataFunction = async () => {
      const apiData = await fetch("https://api.mytravaly.com/testing/v1/", {
        method: "POST",
        headers: {
          authtoken: "7eaa8958a9f8047951d1ef23348abc3f",
          visitortoken: "b4ec-0a61-ec83-0454-a4aa-d971-5a7e-6040",
        },
        body: JSON.stringify({
          "action": "getPropertyDetails",
          "getPropertyDetails": {
            "propertyCode": propertyCode,
          }
        })
      });

      const response = await apiData.json();
      setLoading(false);
      setHotelInfo(response);
    };

    HotelDataFunction();
  }, []);

  console.log(hotelInfo);

  return (
    <>
      <div className="searchItem mx-3">
        {loading ? (
          <Loader />
        ) : (
          <container>
            {hotelInfo && hotelInfo.data ? (
              <div className="hotel_details border">
                <div>
                  {hotelInfo.data.propertyImage && (
                    <img
                      src={hotelInfo.data.propertyImage.fullUrl}
                      className="siImg"
                      alt="img"
                    />
                  )}
                </div>
                <div className="mx-3 rightData">
                  <div className="SiDesc">
                    <h1 className="siTitle">{hotelInfo.data.propertyName}</h1>
                    <div>
                        Reviews
                      {`${hotelInfo.data.propertyAddress.street}, ${hotelInfo.data.propertyAddress.zipcode}, ${hotelInfo.data.propertyAddress.map_address}`}
                    </div>
                    <span className="siDistnce">
                      {`${hotelInfo.data.propertyAddress.city}, ${hotelInfo.data.propertyAddress.country}`}
                    </span>
                    <span className="siTaxi">
                      {hotelInfo.data.availableDeals && hotelInfo.data.availableDeals[0]?.headerName}
                    </span>
                    <span className="siSubtitle">
                      {hotelInfo.data.propertyPoliciesAndAmmenities?.data?.cancelPolicy}
                    </span>
                    <span className="sFeature"></span>
                    <span className="siCancel">
                      {hotelInfo.data.googleReview?.data?.arrayOfReviews.map((review) => (
                        <div key={review.author_name}>
                          <div>{review.author_name}</div>
                          <div>url: {review.author_url}</div>
                          <img src={review.profile_photo_url} alt="img" />
                          <div>{review.text}</div>
                        </div>
                      ))}
                    </span>
                    <span className="sCancelOpSub"></span>
                  </div>
                  <div className="siDetail">
                    <div className="siRating">
                      <span>Excellent</span>
                      <button>
                        {hotelInfo.data.googleReview?.data?.overallRating ?? 0}
                      </button>
                    </div>
                    <div className="detailText">
                      <span className="siPrice">
                        {hotelInfo.data.simplPriceList?.simplPrice.displayAmount}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div>No hotel information available</div>
            )}
          </container>
        )}
      </div>
    </>
  );
}

export default HotelInfo;
