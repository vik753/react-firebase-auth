import React from "react";
import fire from "../config/fire";

const Home = (props) => {
  const logoutHandler = (e) => {
    e.preventDefault();
    fire
      .auth()
      .signOut()
      .then(() => {
        alert(`You are logged out!`);
      })
      .catch((err) => {
        const { code, message } = err;
        console.log(`Logout error! Code: ${code}. Message: ${message}`);
        alert(`Logout error! Code: ${code}. Message: ${message}`);
      });
  };

  return (
    <div>
      <h1>You are logged in</h1>
      <button onClick={logoutHandler}>LogOut</button>
    </div>
  );
};

export default Home;
