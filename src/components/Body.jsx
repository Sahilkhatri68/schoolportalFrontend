import React, { useEffect, useState } from "react";
import Header from "./Header";
import { PiStudentBold } from "react-icons/pi";
import { Button } from "@mui/material";
import axios from "axios";
import { API } from "./API/API";
import { ToastContainer, toast } from "react-toastify";

function Body({ Children }) {
  const [totalstudents, setTotalstudents] = useState([]); // all students
  const [fetchedclasses, setFetchedclasses] = useState([]); // all classes

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [fathersname, setFathersname] = useState("");
  const [dob, setDob] = useState("");
  const [Class, setClass] = useState("");

  // Validation error state
  const [errors, setErrors] = useState({});

  // Fetch students
  const handleGetTotalStudents = () => {
    axios
      .get(`${API}/getallstudent`)
      .then((res) => {
        setTotalstudents(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Fetch classes
  const handleGetClasses = () => {
    axios
      .get(`${API}/getclass`)
      .then((res) => {
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

  // Validation function
  const validate = () => {
    const newErrors = {};

    if (!name.trim()) newErrors.name = "Name is required.";
    if (!phone.trim()) newErrors.phone = "Phone is required.";
    else if (!/^\d{10}$/.test(phone))
      newErrors.phone = "Phone must be 10 digits.";

    if (!email.trim()) newErrors.email = "Email is required.";
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email))
      newErrors.email = "Invalid email address.";

    if (!password) newErrors.password = "Password is required.";
    else if (password.length < 6)
      newErrors.password = "Password must be at least 6 characters.";

    if (!age) newErrors.age = "Age is required.";
    else if (Number(age) <= 0) newErrors.age = "Age must be positive.";

    if (!fathersname.trim())
      newErrors.fathersname = "Father's name is required.";

    if (!dob) newErrors.dob = "Date of birth is required.";

    if (!Class) newErrors.Class = "Please select a class.";

    setErrors(newErrors);

    // Return true if no errors
    return Object.keys(newErrors).length === 0;
  };

  // Post student details with validation
  const handleStudentPostDetails = () => {
    if (!validate()) {
      toast.error("Please fix the errors before submitting.", {
        position: "top-right",
        autoClose: 2000,
        theme: "dark",
      });
      return;
    }

    axios
      .post(`${API}/registerStudent`, {
        name,
        phone,
        email,
        password,
        age,
        fathersname,
        dob,
        class: Class,
      })
      .then((res) => {
        if (res.data.status === "success") {
          toast.success("Student Registered", {
            position: "top-right",
            autoClose: 2000,
            theme: "dark",
          });
          setTimeout(() => {
            window.location.reload(true);
          }, 2000);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Registration failed. Please try again.", {
          position: "top-right",
          autoClose: 2000,
          theme: "dark",
        });
      });
  };

  return (
    <div>
      <Header
        Children={
          <div>
            <ToastContainer />
            <div className="my-6 mx-auto px-4 md:px-12">
              <div className="flex flex-wrap -mx-1 lg:-mx-4">
                {/* Stats Articles */}
                <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
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
                </div>
                <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
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
                </div>
                <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
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
                </div>
              </div>
              {/* Add Student Form */}
              <div className="shadow-lg p-2">
                <div className="font-bold md:text-[25px] text-[15px]">
                  Add Student
                  <hr />
                </div>
                <div className="mt-4">
                  <form className="w-full" onSubmit={(e) => e.preventDefault()}>
                    <div className="flex flex-wrap -mx-3 mb-6">
                      <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label
                          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                          htmlFor="name"
                        >
                          Student Name
                        </label>
                        <input
                          className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${
                            errors.name ? "border-red-500" : "border-gray-200"
                          } rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white ${
                            errors.name
                              ? "focus:border-red-500"
                              : "focus:border-gray-500"
                          }`}
                          id="name"
                          type="text"
                          placeholder="Doe"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                        {errors.name && (
                          <p className="text-red-500 text-xs italic">
                            {errors.name}
                          </p>
                        )}
                      </div>
                      <div className="w-full md:w-1/2 px-3">
                        <label
                          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                          htmlFor="phone"
                        >
                          Phone Number
                        </label>
                        <input
                          className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${
                            errors.phone ? "border-red-500" : "border-gray-200"
                          } rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white ${
                            errors.phone
                              ? "focus:border-red-500"
                              : "focus:border-gray-500"
                          }`}
                          id="phone"
                          type="text"
                          placeholder="1234567890"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                        />
                        {errors.phone && (
                          <p className="text-red-500 text-xs italic">
                            {errors.phone}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                      <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label
                          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                          htmlFor="email"
                        >
                          Email
                        </label>
                        <input
                          className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${
                            errors.email ? "border-red-500" : "border-gray-200"
                          } rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white ${
                            errors.email
                              ? "focus:border-red-500"
                              : "focus:border-gray-500"
                          }`}
                          id="email"
                          type="email"
                          placeholder="Doe@gmail.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                        {errors.email && (
                          <p className="text-red-500 text-xs italic">
                            {errors.email}
                          </p>
                        )}
                      </div>
                      <div className="w-full md:w-1/2 px-3">
                        <label
                          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                          htmlFor="password"
                        >
                          Password
                        </label>
                        <input
                          className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${
                            errors.password
                              ? "border-red-500"
                              : "border-gray-200"
                          } rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white ${
                            errors.password
                              ? "focus:border-red-500"
                              : "focus:border-gray-500"
                          }`}
                          id="password"
                          type="password"
                          placeholder="******************"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        {errors.password && (
                          <p className="text-red-500 text-xs italic">
                            {errors.password}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                      <div className="w-full px-3">
                        <label
                          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                          htmlFor="class"
                        >
                          Class
                        </label>
                        <select
                          className={`block appearance-none w-full bg-gray-200 border ${
                            errors.Class ? "border-red-500" : "border-gray-200"
                          } text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white ${
                            errors.Class
                              ? "focus:border-red-500"
                              : "focus:border-gray-500"
                          }`}
                          id="class"
                          value={Class}
                          onChange={(e) => setClass(e.target.value)}
                        >
                          <option value="">----Select Class----</option>
                          {fetchedclasses.map((i) => (
                            <option key={i._id} value={i._id}>
                              {i.className}
                            </option>
                          ))}
                        </select>
                        {errors.Class && (
                          <p className="text-red-500 text-xs italic">
                            {errors.Class}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                      <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label
                          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                          htmlFor="age"
                        >
                          Student Age
                        </label>
                        <input
                          className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${
                            errors.age ? "border-red-500" : "border-gray-200"
                          } rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white ${
                            errors.age
                              ? "focus:border-red-500"
                              : "focus:border-gray-500"
                          }`}
                          id="age"
                          type="number"
                          placeholder="Age"
                          value={age}
                          onChange={(e) => setAge(e.target.value)}
                        />
                        {errors.age && (
                          <p className="text-red-500 text-xs italic">
                            {errors.age}
                          </p>
                        )}
                      </div>
                      <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label
                          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                          htmlFor="fathersname"
                        >
                          Father Name
                        </label>
                        <input
                          className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${
                            errors.fathersname
                              ? "border-red-500"
                              : "border-gray-200"
                          } rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white ${
                            errors.fathersname
                              ? "focus:border-red-500"
                              : "focus:border-gray-500"
                          }`}
                          id="fathersname"
                          type="text"
                          placeholder="Father name"
                          value={fathersname}
                          onChange={(e) => setFathersname(e.target.value)}
                        />
                        {errors.fathersname && (
                          <p className="text-red-500 text-xs italic">
                            {errors.fathersname}
                          </p>
                        )}
                      </div>

                      <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label
                          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                          htmlFor="dob"
                        >
                          Student D.O.B
                        </label>
                        <input
                          className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${
                            errors.dob ? "border-red-500" : "border-gray-200"
                          } rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white ${
                            errors.dob
                              ? "focus:border-red-500"
                              : "focus:border-gray-500"
                          }`}
                          id="dob"
                          type="date"
                          value={dob}
                          onChange={(e) => setDob(e.target.value)}
                        />
                        {errors.dob && (
                          <p className="text-red-500 text-xs italic">
                            {errors.dob}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="md:flex items-center justify-center  mt-8  ">
                      <Button
                        onClick={handleStudentPostDetails}
                        className="w-full"
                        variant="contained"
                        // disabled={Object.keys(errors).length > 0}
                      >
                        Save
                      </Button>
                    </div>
                  </form>
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
