import React, { useEffect, useState } from "react";
import Header from "./Header";
import { API } from "./API/API";
import axios from "axios";
// mui alert dep
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
  const getdata = () => {
    axios
      .get(`${API}/getclass`)
      .then((res) => {
        setCoursedata(res.data);
        // console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getdata();
  }, []);

  // funtion to open dialogbox
  const handleDialogOpen = () => {
    setDialogopen(true);
  };
  // function to close dialogbox
  const handleDialogClose = () => {
    setDialogopen(false);
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
                          id="inline-searcg"
                          type="text"
                          placeholder="Search Course"
                          onChange={(e) => setSearch(e.target.value)}
                        />
                        <br />
                        <input
                          className="bg-gray-200 mt-2 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                          id="inline-searcg"
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
                        {/* HEAD start */}
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
                            <th className="px-6 py-3 text-left font-semibold"></th>
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
                                        <div className="ml-4">
                                          <div className="text-sm leading-5 font-medium text-gray-900"></div>
                                        </div>
                                      </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                      <div className="text-sm leading-5 text-gray-900">
                                        10
                                      </div>
                                    </td>

                                    <td className="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-200 text-sm leading-5 font-medium">
                                      <Link
                                        to="/"
                                        className="text-indigo-600 hover:text-indigo-900 focus:outline-none focus:underline"
                                      >
                                        Show
                                      </Link>
                                    </td>
                                  </tr>
                                );
                              })}
                        </tbody>
                        {/* BODY end */}
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
                    <div className="md:flex m-2 items-center">
                      <div className="md:w-[150px] w-full">Course Name</div>
                      <div className="md:mx-4">
                        <input
                          type="text"
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                      </div>
                    </div>
                    <div className="md:flex m-2 items-center">
                      <div className="md:w-[150px] w-full">Course Duration</div>
                      <div className="md:mx-4">
                        <input
                          type="text"
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                    onClick={handleDialogClose}
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
