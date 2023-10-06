import React, { useEffect, useState } from "react";
import Header from "./Header";
import { API } from "./API/API";
import axios from "axios";

function AddCourse() {
  const [coursedata, setCoursedata] = useState();
  const getdata = () => {
    axios
      .get(`${API}`)
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
                      <input
                        className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                        id="inline-searcg"
                        type="text"
                        placeholder="Search"
                      />
                    </div>
                    <div className="flex items-center py-2">
                      <a
                        href=""
                        className="inline-block px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:shadow-outline"
                      >
                        Add New Course
                      </a>
                    </div>
                  </div>
                  <div className="-my-2 py-2 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                    <div className="align-middle inline-block w-full shadow overflow-x-auto sm:rounded-lg border-b border-gray-200">
                      <table className="min-w-full">
                        {/* HEAD start */}
                        <thead>
                          <tr className="bg-gray-50 border-b border-gray-200 text-xs leading-4 text-gray-500 uppercase tracking-wider">
                            <th className="px-6 py-3 text-left font-medium">
                              Course Name
                            </th>
                            <th className="px-6 py-3 text-left font-medium">
                              Duration
                            </th>
                            <th className="px-6 py-3 text-left font-medium">
                              Total Students
                            </th>
                            <th className="px-6 py-3 text-left font-medium"></th>
                          </tr>
                        </thead>
                        <tbody className="bg-white">
                          {coursedata &&
                            coursedata.map((i) => {
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
                                    <a
                                      href="#"
                                      className="text-indigo-600 hover:text-indigo-900 focus:outline-none focus:underline"
                                    >
                                      Show
                                    </a>
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
          </div>
        }
      ></Header>
    </div>
  );
}

export default AddCourse;
