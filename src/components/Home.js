import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearMessage } from "../slices/message";
import { getAllListings } from "../slices/listings"
import MyTable from "./common/Table";
import MyMap from "./common/Map";
const Home = () => {

  const { listings } = useSelector((state) => state.listings);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearMessage());
    dispatch(getAllListings())
  }, [dispatch]);

  const [selectedMarker, setSelectedMarker] = React.useState([])

  const handleSelectedMakrer = (mooring) =>{
    setSelectedMarker(mooring)
  }

  return (
    <div className="container">
      <header className="jumbotron">
        <MyMap viewMap={true} markers={listings} handleSelectedMarker={handleSelectedMakrer} selectedMarker={selectedMarker}></MyMap>
      </header>
      <header className="jumbotron">
        <MyTable data={[selectedMarker]}></MyTable>
      </header>

    </div>
  );
};

export default Home;
