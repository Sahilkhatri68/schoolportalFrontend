import React, { useEffect } from "react";
import Header from "./Header";
import { PiStudentBold } from "react-icons/pi";
import { Button, InputLabel, MenuItem, Select } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { API } from "./API/API";
import { ToastContainer, toast } from "react-toastify";

function Body({ Children }) {
  const [totalstudents, setTotalstudents] = useState([]); // state for fetching all students
  const [fetchedclasses, setFetchedclasses] = useState([]); // state for fetching all classes

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [fathersname, setFathersname] = useState("");
  const [dob, setDob] = useState("");
  const [Class, setClass] = useState("");

  // code for fetching all students
  const handleGetTotalStudents = () => {
    axios
      .get(`${API}/getallstudent`)
      .then((res) => {
        // console.log(res);
        setTotalstudents(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // code for fetching all classes
  const handleGetClasses = () => {
    axios
      .get(`${API}/getclass`)
      .then((res) => {
        // console.log(res.data);
        setFetchedclasses(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    handleGetTotalStudents();
    handleGetClasses();
  }, []);

  // code to post data of std
  const handleStudentPostDetails = () => {
    axios
      .post(`${API}/registerStudent`, {
        name: name,
        phone: phone,
        email: email,
        password: password,
        age: age,
        fathersname: fathersname,
        dob: dob,
        class: Class,
      })
      .then((res) => {
        console.log(res);
        if (res.data.status === "success") {
          toast("Student Registered", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        }
        setTimeout(() => {
          window.location.reload(true);
        }, [2000]);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // toatalert

  return (
    <div>
      <Header
        Children={
          <div>
            <div className="my-6 mx-auto px-4 md:px-12">
              <div className="flex flex-wrap -mx-1 lg:-mx-4">
                {/* Column */}
                <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
                  {/* Article */}
                  <article className="p-2 overflow-hidden rounded-lg shadow-lg">
                    <div className="flex items-center ">
                      <div className="w-[60px] bg-red-100 p-2 rounded">
                        <PiStudentBold size={40} className="w-full" />
                      </div>
                      <div className="md:mx-4 mx-2 font-semibold text-[20px]">
                        Total Students : {totalstudents.length}
                      </div>
                    </div>
                  </article>
                  {/* END Article */}
                </div>
                {/* Column */}
                <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
                  {/* Article */}
                  <article className="p-2 overflow-hidden rounded-lg shadow-lg">
                    <div className="flex items-center ">
                      <div className="w-[60px] bg-red-100 p-2 rounded">
                        <PiStudentBold size={40} className="w-full" />
                      </div>
                      <div className="md:mx-4 mx-2 font-semibold text-[20px]">
                        Total Teachers : 10
                      </div>
                    </div>
                  </article>
                  {/* END Article */}
                </div>
                <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
                  {/* Article */}
                  <article className="p-2 overflow-hidden rounded-lg shadow-lg">
                    <div className="flex items-center ">
                      <div className="w-[60px] bg-red-100 p-2 rounded">
                        <PiStudentBold size={40} className="w-full" />
                      </div>
                      <div className="md:mx-4 mx-2 font-semibold text-[20px]">
                        Total Courses : {fetchedclasses.length}
                      </div>
                    </div>
                  </article>
                  {/* END Article */}
                </div>
                {/* END Column */}
              </div>
              {/* add student box */}
              <div className="shadow-lg p-2">
                <div className="font-bold md:text-[25px] text-[15px]">
                  Add Student
                  <hr />
                </div>
                {/* std details box */}
                <div className="mt-4">
                  <form className="w-full">
                    <div className="flex flex-wrap -mx-3 mb-6">
                      <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label
                          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                          htmlFor="grid-last-name"
                        >
                          Student Name
                        </label>
                        <input
                          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          id="name"
                          type="text"
                          placeholder="Doe"
                          name={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                        {/* <p className="text-red-500 text-xs italic">
                          Please fill out this field.
                        </p> */}
                      </div>
                      <div className="w-full md:w-1/2 px-3">
                        <label
                          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                          htmlFor="grid-last-name"
                        >
                          Phone Number
                        </label>
                        <input
                          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          id="phone"
                          type="number"
                          placeholder="XXX487XXX"
                          name={phone}
                          onChange={(e) => setPhone(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                      <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label
                          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                          htmlFor="grid-last-name"
                        >
                          Email
                        </label>
                        <input
                          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          id="email"
                          type="text"
                          placeholder="Doe@gmail.com"
                          name={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                        {/* <p className="text-red-500 text-xs italic">
                          Please fill out this field.
                        </p> */}
                      </div>
                      <div className="w-full md:w-1/2 px-3">
                        <label
                          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                          htmlFor="grid-last-name"
                        >
                          Password
                        </label>
                        <input
                          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          id="password"
                          type="password"
                          placeholder="******************"
                          name={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                      <div className="w-full px-3">
                        <label
                          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Class
                        </label>
                        <select
                          className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          id="grid-state"
                          value={Class}
                          onChange={(e) => setClass(e.target.value)}
                        >
                          <option value="">----Select Class----</option>
                          {fetchedclasses.map((i) => {
                            return (
                              <option key={i._id} value={i._id}>
                                {i.className}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-2">
                      <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label
                          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                          htmlFor="grid-city"
                        >
                          Student Age
                        </label>
                        <input
                          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          id="number"
                          type="number"
                          placeholder="Albuquerque"
                          name={age}
                          onChange={(e) => setAge(e.target.value)}
                        />
                      </div>
                      <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label
                          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                          htmlFor="grid-city"
                        >
                          Father Name
                        </label>
                        <input
                          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          id="father-name"
                          type="text"
                          placeholder="Father name"
                          name={fathersname}
                          onChange={(e) => setFathersname(e.target.value)}
                        />
                      </div>

                      <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label
                          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                          htmlFor="grid-zip"
                        >
                          Student D.O.B
                        </label>
                        <input
                          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          id="grid-zip"
                          type="date"
                          name={dob}
                          onChange={(e) => setDob(e.target.value)}
                        />
                      </div>
                    </div>
                  </form>
                  <div className="md:flex items-center justify-center  mt-8  ">
                    <Button
                      onClick={handleStudentPostDetails}
                      className="w-full"
                      variant="contained"
                    >
                      Save
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        }
      ></Header>
    </div>
  );
}

export default Body;
