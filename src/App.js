import React from "react";
import { Route, Routes } from "react-router-dom";
import Body from "./components/Body";
import Account from "./components/Account";
import Support from "./components/Support";
import BugReport from "./components/BugReport";
import Aboutus from "./components/Aboutus";
import Noutfound from "./components/Noutfound";
import AddCourse from "./components/AddCourse";
import Login from "./components/Login";
import axios from "axios";
axios.defaults.withCredentials = true;

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Body />}></Route>
        <Route path="/account" element={<Account />}></Route>
        <Route path="/support" element={<Support />}></Route>
        <Route path="/bug" element={<BugReport />}></Route>
        <Route path="/aboutus" element={<Aboutus />}></Route>
        <Route path="/addcourse" element={<AddCourse />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="*" element={<Noutfound />}></Route>
      </Routes>
    </div>
  );
}

export default App;
