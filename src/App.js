import React from "react";
import { Route, Routes } from "react-router-dom";
import Body from "./components/Body";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Account from "./components/Account";
import Support from "./components/Support";
import Viewteacher from "./components/Viewteacher";
import Aboutus from "./components/Aboutus";
import Noutfound from "./components/Noutfound";
import AddCourse from "./components/AddCourse";
import Login from "./components/Login";
import ViewCourseDetail from "./components/ViewCourseDetail";
import AddTeacher from "./components/AddTeacher";
import ProtectedRoute from "./components/ProtectedRoute";
import axios from "axios";

axios.defaults.withCredentials = true;

function App() {
  return (
    <div>
      <Routes>
        {/* ✅ Protected Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Body />
            </ProtectedRoute>
          }
        />
        <Route
          path="/account"
          element={
            <ProtectedRoute>
              <Account />
            </ProtectedRoute>
          }
        />
        <Route
          path="/support"
          element={
            <ProtectedRoute>
              <Support />
            </ProtectedRoute>
          }
        />
        <Route
          path="/viewteacher"
          element={
            <ProtectedRoute>
              <Viewteacher />
            </ProtectedRoute>
          }
        />
        <Route
          path="/aboutus"
          element={
            <ProtectedRoute>
              <Aboutus />
            </ProtectedRoute>
          }
        />
        <Route
          path="/addcourse"
          element={
            <ProtectedRoute>
              <AddCourse />
            </ProtectedRoute>
          }
        />
        <Route
          path="/addteacher"
          element={
            <ProtectedRoute>
              <AddTeacher />
            </ProtectedRoute>
          }
        />
        <Route
          path="/viewcoursedetail/:_id"
          element={
            <ProtectedRoute>
              <ViewCourseDetail />
            </ProtectedRoute>
          }
        />

        {/* 🔓 Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Noutfound />} />
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
}

export default App;
