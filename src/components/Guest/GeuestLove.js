import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import "./GuestLove.css";
import { Link } from "react-router-dom";
import Loader from "../Loading/Loader";
function GeuestLove() {
  const [popular_Stay, setPopular_stay] = useState([]);
  const [select_sort, setSelect_sort] = useState("OUR RECOMMENDATIONS");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const searchData = async () => {
      const data = await fetch("https://api.mytravaly.com/testing/v1/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authtoken: "7eaa8958a9f8047951d1ef23348abc3f",
          visitortoken: "b4ec-0a61-ec83-0454-a4aa-d971-5a7e-6040",
        },
        body: JSON.stringify({
          action: "popularStay",
          popularStay: {
            limit: 10, //maximum 10
            entityType: "Any",
            filter: {
              searchType:
                select_sort === "Popular Hotels" ? "byCity" : "byRandom",
              searchTypeInfo: {
                country: "India",
              },
            },
          },
        }),
      });
      const response = await data.json();
      const sortedData = sortPopularStay(response.data, select_sort);
      setLoading(false);
      setPopular_stay([...sortedData]);
    };
    searchData();
  }, [select_sort]);
  // console.log(popular_Stay);
  // Here is a handleChange function ,when user wants to sort the data according to price then he can select any option

  const handleChange = (e) => {
    setSelect_sort(e.target.value);
  };
  function sortPopularStay(data, sortOption) {
    if (!Array.isArray(data)) {
      console.error("Data is not iterable.");
      return [];
    }
    let sortedData = [...data];

    if (sortOption === "Popular Hotels") {
      sortedData.sort((a, b) =>
        (a.googleReview?.data?.totalUserRating ?? 0) >
        (b.googleReview?.data?.totalUserRating ?? 0)
          ? -1
          : 1
      );
    } else if (sortOption === "Price and Recommended") {
      sortedData.sort((a, b) => {
        const aPrice = parseFloat(a.staticPrice.amount);
        const bPrice = parseFloat(b.staticPrice.amount);
        const aRecommendation = a.recommendationScore;
        const bRecommendation = b.recommendationScore;

        if (aPrice === bPrice) {
          return bRecommendation - aRecommendation;
        }

        return aPrice - bPrice;
      });
    } else if (sortOption === "Price Only") {
      sortedData.sort((a, b) => {
        const aPrice = parseFloat(a.staticPrice.amount);
        const bPrice = parseFloat(b.staticPrice.amount);
        const aRecommendation = a.recommendationScore;
        const bRecommendation = b.recommendationScore;

        if (aPrice === bPrice) {
          return bRecommendation - aRecommendation;
        }

        return aPrice - bPrice;
      });
    }

    return sortedData;
  }

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <label
            htmlFor="sortApi"
            className="text-gray select_tag_heading mx-3"
          >
            Sort by
          </label>
          <select
            className="sortApi mb-3"
            style={{ border: "1px solid orange" }}
            onChange={handleChange}
          >
            <option
              defaultValue={"OUR RECOMMENDATIONS"}
              style={{ color: "orange" }}
            >
              OUR RECOMMENDATIONS
            </option>
            <option value="Popular Hotels">Popular Hotels</option>
            <option value="Price and Recommended">Price and Recommended</option>
            <option value="Price Only">Price Only</option>
          </select>
          <container>
            {popular_Stay.length > 0 &&
              popular_Stay.map((property_data) => {
                return (
                  <div className="Gl mt-3" key={property_data.propertyCode}>
                    <div className="GlItem border ">
                      <img
                        src={property_data.propertyImage}
                        alt="ig"
                        className="glImg w-50 m-3 border-round w-25"
                      />
                      <div className="mt-3">
                        <span className="glName bold">
                          {property_data.propertyName}
                        </span>
                        <div>{property_data.propertyType}</div>
                        <div className="glCity">
                          <div className="w-40">
                            {property_data.propertyAddress.street.length > 30
                              ? property_data.propertyAddress.street.slice(
                                  0,
                                  50
                                )
                              : property_data.propertyAddress.stree}
                          </div>
                          {property_data.propertyAddress.city},
                          {property_data.propertyAddress.state}
                        </div>
                        <div className="glPrice mt-3">
                          {"₹ " + property_data.staticPrice.amount}
                        </div>
                        <div className="glRating mt-3">
                          <button>
                            {property_data.googleReview.data?.overallRating}
                          </button>
                          <div>
                            <div>Excellent</div>
                            <Link
                              to={property_data.propertyUrl}
                              style={{ textDecoration: "none" }}
                            >
                              <Button variant="outline-danger" className="m-3">
                                Book Now
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </container>
        </div>
      )}
    </>
  );
}

export default GeuestLove;
