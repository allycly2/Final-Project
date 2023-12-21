import React from "react";
import Calendar from "./Calendar";
import NavBar from "./NavBar";
import "./Calendar.css";
import "./App.css";

function App() {
  return (
    <div className="App">
      <div className="top-navigation-bar">
        <img
          src="https://cdn-icons-png.flaticon.com/512/243/243925.png"
          className="logo"
        ></img>
        <h1>Online Calendar</h1>
      </div>

      <div className="navBar-container">
        <NavBar />
      </div>
      <div className="calendar-container">
        <Calendar />
      </div>
    </div>
  );
}

export default App;
