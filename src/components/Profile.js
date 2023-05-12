import React from "react";
import { Navigate } from 'react-router-dom';
import { useSelector } from "react-redux";

const Profile = () => {

  const { user } = useSelector((state) => state.user);

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>
          Profile
        </h3>
      </header>
    </div>
  );
};

export default Profile;
