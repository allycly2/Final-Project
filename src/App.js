import React from "react";
import Calendar from "./components/Calendar";
import NavBar from "./NavBar";
import "./Calendar.css";
import "./App.css";

function App() {
  return (
    <div className="App">
      <div className="navBar-container">
        <NavBar />
      </div>
      <div className="main">
        <div className="calendar-container">
          <Calendar />
        </div>
      </div>
    </div>
  );
}

export default App;
