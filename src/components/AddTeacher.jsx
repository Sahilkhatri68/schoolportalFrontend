import React, { useEffect, useState } from "react";
import Header from "./Header";
import { Button } from "@mui/material";
import axios from "axios";
import { API } from "./API/API";
import { ToastContainer, toast } from "react-toastify";

function AddTeacher() {
  const [fetchedclasses, setFetchedclasses] = useState([]);

  const [teachername, setTeachername] = useState("");
  const [teacherage, setTeacherage] = useState("");
  const [teacherPhone, setTeacherPhone] = useState("");
  const [teacheremial, setteacheremial] = useState("");
  const [teacherpassword, setTeacherpassword] = useState("");
  const [teacheraddress, setTeacheraddress] = useState("");
  const [teacherqualification, setTeacherqualification] = useState("");
  const [assignedclass, setAssignedclass] = useState("");

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
    handleGetClasses();
  }, []);

  const validateForm = () => {
    if (
      !teachername ||
      !teacherage ||
      !teacherPhone ||
      !teacheremial ||
      !teacherpassword ||
      !teacheraddress ||
      !teacherqualification ||
      !assignedclass
    ) {
      toast.error("Please fill out all fields", { position: "top-right" });
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(teacheremial)) {
      toast.error("Invalid email format", { position: "top-right" });
      return false;
    }
    if (!/^\d{10}$/.test(teacherPhone)) {
      toast.error("Phone number must be 10 digits", { position: "top-right" });
      return false;
    }
    if (teacherpassword.length < 6) {
      toast.error("Password must be at least 6 characters", {
        position: "top-right",
      });
      return false;
    }
    return true;
  };

  const handleTeacherPostDetails = () => {
    if (!validateForm()) return;

    axios
      .post(`${API}/registerteacher`, {
        teachername,
        teacherage,
        teacherPhone,
        teacheremial,
        teacherpassword,
        teacheraddress,
        teacherqualification,
        assignedclass,
      })
      .then((res) => {
        if (res.data.status === "success") {
          toast.success("Teacher Registered", { position: "top-right" });
          setTimeout(() => {
            window.location.reload(true);
          }, 2000);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something went wrong", { position: "top-right" });
      });
  };

  return (
    <div>
      <Header
        Children={
          <>
            <div className="shadow-lg p-2">
              <div className="font-bold md:text-[25px] text-[15px]">
                Add Teacher
                <hr />
              </div>
              <div className="mt-4">
                <form className="w-full">
                  <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        Teacher Name
                      </label>
                      <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        type="text"
                        placeholder="Doe"
                        value={teachername}
                        onChange={(e) => setTeachername(e.target.value)}
                      />
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        Teacher Age
                      </label>
                      <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        type="number"
                        placeholder="21"
                        value={teacherage}
                        onChange={(e) => setTeacherage(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        Email
                      </label>
                      <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        type="text"
                        placeholder="email@example.com"
                        value={teacheremial}
                        onChange={(e) => setteacheremial(e.target.value)}
                      />
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        Password
                      </label>
                      <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        type="password"
                        placeholder="********"
                        value={teacherpassword}
                        onChange={(e) => setTeacherpassword(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        Class
                      </label>
                      <select
                        className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        value={assignedclass}
                        onChange={(e) => setAssignedclass(e.target.value)}
                      >
                        <option value="">----Select Class----</option>
                        {fetchedclasses.map((i) => (
                          <option key={i._id} value={i._id}>
                            {i.className}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-2">
                    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        Teacher Address
                      </label>
                      <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        type="text"
                        placeholder="123 Main St"
                        value={teacheraddress}
                        onChange={(e) => setTeacheraddress(e.target.value)}
                      />
                    </div>
                    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        Qualification
                      </label>
                      <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        type="text"
                        placeholder="Degree / Diploma"
                        value={teacherqualification}
                        onChange={(e) =>
                          setTeacherqualification(e.target.value)
                        }
                      />
                    </div>
                    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        Phone No.
                      </label>
                      <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        type="text"
                        placeholder="1234567890"
                        value={teacherPhone}
                        onChange={(e) => setTeacherPhone(e.target.value)}
                      />
                    </div>
                  </div>
                </form>
                <div className="md:flex items-center justify-center mt-8">
                  <Button
                    onClick={handleTeacherPostDetails}
                    className="w-full"
                    variant="contained"
                  >
                    Save
                  </Button>
                </div>
              </div>
            </div>
          </>
        }
      />
    </div>
  );
}

export default AddTeacher;
