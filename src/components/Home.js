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

  return (
    <div className="container">
      <header className="jumbotron">
        <MyMap viewMap={true} markers={listings}></MyMap>
      </header>
      <header className="jumbotron">
        <MyTable data={listings}></MyTable>
      </header>

    </div>
  );
};

export default Home;
