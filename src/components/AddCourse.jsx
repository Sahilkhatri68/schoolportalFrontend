import React, { useEffect, useState } from "react";
import Header from "./Header";
import { API } from "./API/API";
import axios from "axios";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { Link } from "react-router-dom";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function AddCourse() {
  const [coursedata, setCoursedata] = useState(); //state for getting data
  const [Search, setSearch] = useState(""); //state for course search
  const [searchduration, setSearchduration] = useState(""); //state for duration search
  const [dialogopen, setDialogopen] = useState(false); // state for alertdialog
  const [errorMessage, setErrorMessage] = useState("");

  const [className, setClassName] = useState(""); // state for adding new class
  const [duration, setDuration] = useState(""); // state for adding new class

  const getdata = () => {
    axios
      .get(`${API}/getclass/getclassbystudent`)
      .then((res) => {
        setCoursedata(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getdata();
  }, []);

  // function to open dialogbox
  const handleDialogOpen = () => {
    setErrorMessage(""); // reset error message when dialog opens
    setClassName(""); // reset input fields
    setDuration("");
    setDialogopen(true);
  };
  // function to close dialogbox
  const handleDialogClose = () => {
    setDialogopen(false);
    setErrorMessage("");
  };

  const resetCourseFormData = () => {
    setDialogopen(false);
    setErrorMessage("");
    setClassName("");
    setDuration("");
  };

  // code to add new class
  const handleNewClass = () => {
    setErrorMessage(""); // reset error before request
    axios
      .post(`${API}/addnewclass`, {
        className: className,
        duration: duration,
      })
      .then((res) => {
        if (res.status === 201) {
          resetCourseFormData();
          getdata();
          alert(res.data.message);
        }
      })
      .catch((err) => {
        // Check if backend sent validation error message
        if (err.response && err.response.data && err.response.data.message) {
          setErrorMessage(err.response.data.message);
        } else {
          setErrorMessage("An error occurred while adding the class.");
        }
      });
  };

  // Async delete function with try/catch
  const deletecourse = async (id) => {
    try {
      const res = await axios.delete(`${API}/getclass/getclassbystudent/${id}`);
      if (res.status === 200) {
        alert(res.data.message || "Class deleted successfully");
        getdata(); // Refresh course list after deletion
      } else {
        alert("Failed to delete class");
      }
    } catch (err) {
      console.error("Error deleting class:", err);
      alert("Failed to delete class");
    }
  };

  return (
    <div>
      <Header
        Children={
          <div className="p-2">
            <div className="w-full h-screen  ">
              <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="flex flex-col">
                  <div className="mb-4">
                    <h1 className="text-3xl font-bolder leading-tight text-gray-900">
                      Courses
                    </h1>
                    <hr className="mt-2" />
                  </div>
                  <div className="-mb-2 py-4 flex flex-wrap flex-grow justify-between">
                    <div className="flex items-center py-2">
                      <div>
                        <input
                          className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                          id="inline-search"
                          type="text"
                          placeholder="Search Course"
                          onChange={(e) => setSearch(e.target.value)}
                        />
                        <br />
                        <input
                          className="bg-gray-200 mt-2 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                          id="inline-search-duration"
                          type="text"
                          placeholder="Search Duration"
                          onChange={(e) => setSearchduration(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="flex items-center py-2">
                      <button
                        className="inline-block px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:shadow-outline"
                        onClick={handleDialogOpen}
                      >
                        Add New Course
                      </button>
                    </div>
                  </div>
                  <div className="-my-2 py-2 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                    <div className="align-middle inline-block w-full shadow overflow-x-auto sm:rounded-lg border-b border-gray-200">
                      <table className="min-w-full">
                        <thead>
                          <tr className="bg-[#d8d8d8] border-b border-gray-200 text-xs leading-4 text-gray-700 uppercase font-bold tracking-wider">
                            <th className="px-6 py-3 text-left font-semibold">
                              Course Name
                            </th>
                            <th className="px-6 py-3 text-left font-semibold">
                              Duration
                            </th>
                            <th className="px-6 py-3 text-left font-semibold">
                              Total Students
                            </th>
                            <th className="px-6 py-3 text-left font-semibold">
                              View
                            </th>
                            <th className="px-6 py-3 text-left font-semibold">
                              Delete
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white">
                          {coursedata &&
                            coursedata
                              .filter((i) => {
                                return Search === ""
                                  ? i
                                  : i.className.includes(Search);
                              })
                              .filter((i) => {
                                return searchduration === ""
                                  ? i
                                  : i.duration.includes(searchduration);
                              })
                              .map((i) => {
                                return (
                                  <tr key={i._id}>
                                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                      <div className="text-sm leading-5 text-gray-900">
                                        {i.className}
                                      </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                      <div className="flex items-center">
                                        {i.duration}
                                      </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                      <div className="text-sm leading-5 text-gray-900">
                                        {i.classStudents.length}
                                      </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-no-wrap text-left border-b border-gray-200 text-sm leading-5 font-medium">
                                      <Link
                                        to={`/viewcoursedetail/${i._id}`}
                                        className="text-indigo-600 hover:text-indigo-900 focus:outline-none focus:underline"
                                      >
                                        View
                                      </Link>
                                    </td>
                                    <td className="px-6 py-4 whitespace-no-wrap text-left border-b border-gray-200 text-sm leading-5 font-medium">
                                      <button
                                        className="inline-block px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-red-600 hover:bg-red-800 focus:outline-none focus:shadow-outline"
                                        onClick={() => {
                                          if (
                                            window.confirm(
                                              "Are you sure you want to delete this class?"
                                            )
                                          ) {
                                            deletecourse(i._id);
                                          }
                                        }}
                                      >
                                        Delete
                                      </button>
                                    </td>
                                  </tr>
                                );
                              })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* dialogBox */}
            <div>
              <Dialog
                open={dialogopen}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleDialogClose}
                aria-describedby="alert-dialog-slide-description"
              >
                <DialogTitle>{"Enter New Course"}</DialogTitle>
                <DialogContent>
                  <div>
                    {/* Show error message if any */}
                    {errorMessage && (
                      <div className="text-red-600 font-semibold mb-2">
                        {errorMessage}
                      </div>
                    )}
                    <div className="md:flex m-2 items-center">
                      <div className="md:w-[150px] w-full">Course Name</div>
                      <div className="md:mx-4">
                        <input
                          type="text"
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          value={className}
                          onChange={(e) => setClassName(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="md:flex m-2 items-center">
                      <div className="md:w-[150px] w-full">Course Duration</div>
                      <div className="md:mx-4">
                        <input
                          type="text"
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          value={duration}
                          onChange={(e) => setDuration(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </DialogContent>
                <DialogActions>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={handleDialogClose}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    color="success"
                    onClick={handleNewClass}
                  >
                    Save
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
          </div>
        }
      ></Header>
    </div>
  );
}

export default AddCourse;
