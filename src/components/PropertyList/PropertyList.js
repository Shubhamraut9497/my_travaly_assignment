import React from "react";
import "./PropertyList.css";
function PropertyList() {
  return (
    <div className="pList">
      <div className="pListItem">
        <img
          src="https://r-xx.bstatic.com/xdata/images/xphoto/300x240/57584488.jpeg?k=d8d4706fc72ee789d870eb6b05c0e546fd4ad85d72a3af3e30fb80ca72f0ba57&o="
          alt="p1"
          className="pListImg"
        />
        <div className='pListTitle'>
            <h2>Hotels</h2>
            <h4>2313 hotels</h4>
        </div>
      </div>
      <div className="pListItem">
        <img
          src="https://r-xx.bstatic.com/xdata/images/hotel/300x240/119467716.jpeg?k=f3c2c6271ab71513e044e48dfde378fcd6bb80cb893e39b9b78b33a60c0131c9&o="
          alt="p1"
          className="pListImg"
        />
        <div className='pListTitle'>
            <h2>Appartments</h2>
            <h4>1213 hotels</h4>
        </div>
      </div>
      <div className="pListItem">
        <img
          src="https://q-xx.bstatic.com/xdata/images/xphoto/300x240/45450084.jpeg?k=f8c2954e867a1dd4b479909c49528531dcfb676d8fbc0d60f51d7b51bb32d1d9&o="
          alt="p1"
          className="pListImg"
        />
        <div className='pListTitle'>
            <h2>Resorts</h2>
            <h4>5313 hotels</h4>
        </div>
      </div>
    </div>
  );
}

export default PropertyList;
