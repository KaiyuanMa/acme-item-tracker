import { bindActionCreators } from "redux";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators } from "./state";
import { Route, Routes, NavLink, HashRouter } from "react-router-dom";
import React from "react";
import Users from "./Users";
import Home from "./Home";
import Things from "./Things";

function App() {
  return (
    <HashRouter>
      <div>
        <ul className="header">
          <p id="title">Item Tracker</p>
          <li>
            <NavLink to="/" activeClassName="selected-nav">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/Users">Users</NavLink>
          </li>
          <li>
            <NavLink to="/Things">things</NavLink>
          </li>
        </ul>
        <div className="content">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/users" element={<Users />} />
            <Route path="/things" element={<Things />} />
          </Routes>
        </div>
      </div>
    </HashRouter>
  );
}

export default App;
