import React from "react";
import Header from "./Header";
import { PiStudentBold } from "react-icons/pi";

function Body({ Children }) {
  return (
    <div>
      <Header
        Children={
          <div>
            <div className="container my-6 mx-auto px-4 md:px-12">
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
                        Total Students : 10
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
                        Total Courses : 10
                      </div>
                    </div>
                  </article>
                  {/* END Article */}
                </div>
                {/* END Column */}
              </div>
            </div>
          </div>
        }
      ></Header>
    </div>
  );
}

export default Body;
