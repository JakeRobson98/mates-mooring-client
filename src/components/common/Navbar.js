import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../slices/auth";
import { Link } from "react-router-dom";

export default function Navbar() {

    const { authenticated, token } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
  
    const logOut = useCallback(() => {
      dispatch(logout());
    }, [dispatch]);
  
    useEffect(() => {
      
    }, [logOut]);


    



  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark">
          
            <div className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to={"/home"} className="nav-link">
                  Home
                </Link>
              </li>
            </div>
   
          {authenticated ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/newListing"} className="nav-link">
                New Listing
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                Profile
                </Link>
              </li>
              <li className="nav-item">
                <a href="/logout" className="nav-link" onClick={logOut}>
                  Log out
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Sign Up
                </Link>
              </li>
            </div>
          )}
  </nav>
  )
}
