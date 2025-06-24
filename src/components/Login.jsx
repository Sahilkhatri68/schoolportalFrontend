import React, { useState } from "react";
import axios from "axios";
import { API } from "./API/API";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const navigate = useNavigate();
  const [adminEmail, setAdminEmail] = useState("");
  const [password, setPassword] = useState("");

  const HandleLogin = (e) => {
    e.preventDefault();

    axios
      .post(
        `${API}/login`,
        {
          adminEmail: adminEmail,
          password: password,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        if (res.status === 200) {
          toast.success("Login successful");
          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error(
          err?.response?.data?.message || "Login failed. Please try again."
        );
      });
  };

  return (
    <div>
      <div className="flex items-center min-h-screen p-4 bg-gray-100 justify-center">
        <div className="flex flex-col overflow-hidden justify-center bg-white rounded-md shadow-lg md:flex-row md:flex-1 lg:max-w-screen-md">
          <div className="p-4 py-6 text-white bg-[#0F1131] md:w-80 md:flex-shrink-0 md:flex md:flex-col md:items-center md:justify-evenly">
            <div className="my-3 text-4xl font-bold tracking-wider text-center">
              School Portal
            </div>
            <p className="mt-6 font-normal text-left text-gray-300 md:mt-0">
              <br />
              It's a demo portal. You can access it with:
              <br />
              <br />
              <b>Email</b>: admin123@gmail.com
              <br />
              <b>Password</b>: admin123
              <br />
              <br />
              <span className="text-[15px]">
                If you face any issues, please contact the developer:
                <br />
                <b>
                  <i>sahilkhatriss01@gmail.com</i>
                </b>
              </span>
            </p>
            <p className="mt-6 text-sm text-center text-gray-300">
              Read our{" "}
              <a href="#" className="underline">
                terms
              </a>{" "}
              and{" "}
              <a href="#" className="underline">
                conditions
              </a>
            </p>
          </div>

          <div className="p-5 bg-white md:flex-1">
            <h3 className="my-4 text-2xl font-semibold text-gray-700">
              Account Login
            </h3>
            <form className="flex flex-col space-y-5" onSubmit={HandleLogin}>
              <div className="flex flex-col space-y-1">
                <label
                  htmlFor="email"
                  className="text-sm font-semibold text-gray-500"
                >
                  Email address
                </label>
                <input
                  type="email"
                  id="email"
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  required
                  className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:ring-4 focus:ring-blue-200 focus:outline-none"
                />
              </div>

              <div className="flex flex-col space-y-1">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="text-sm font-semibold text-gray-500"
                  >
                    Password
                  </label>
                  <a
                    href="#"
                    className="text-sm text-blue-600 hover:underline focus:text-blue-800"
                  >
                    Forgot Password?
                  </a>
                </div>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:ring-4 focus:ring-blue-200 focus:outline-none"
                />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="remember"
                  className="w-4 h-4 transition duration-300 rounded focus:ring-2 focus:ring-offset-0 focus:ring-blue-200"
                />
                <label
                  htmlFor="remember"
                  className="text-sm font-semibold text-gray-500"
                >
                  Remember me
                </label>
              </div>

              <button
                type="submit"
                className="w-full px-4 py-2 text-lg font-semibold text-white bg-[#0F1131] rounded-md shadow hover:bg-blue-600 transition-colors duration-300 focus:ring-4 focus:ring-blue-200 focus:outline-none"
              >
                Log in
              </button>

              <div className="flex flex-col space-y-5">
                <span className="flex items-center justify-center space-x-2">
                  <span className="h-px bg-gray-400 w-14" />
                  <span className="font-normal text-gray-500">
                    or login with
                  </span>
                  <span className="h-px bg-gray-400 w-14" />
                </span>
                <div className="flex flex-col space-y-4">
                  <a
                    href="#"
                    className="flex items-center justify-center px-4 py-2 space-x-2 border border-gray-800 rounded-md group hover:bg-gray-800 transition-colors duration-300"
                  >
                    <svg
                      className="w-5 h-5 text-gray-800 fill-current group-hover:text-white"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8 0C3.58 0 0 3.58 0 8c0 3.54..."
                      />
                    </svg>
                    <span className="text-sm font-medium text-gray-800 group-hover:text-white">
                      Github
                    </span>
                  </a>
                  <a
                    href="#"
                    className="flex items-center justify-center px-4 py-2 space-x-2 border border-blue-500 rounded-md group hover:bg-blue-500 transition-colors duration-300"
                  >
                    <svg
                      width={20}
                      height={20}
                      fill="currentColor"
                      className="text-blue-500 group-hover:text-white"
                    >
                      <path d="M6.29 18.251c7.547 0 11.675-6.253..." />
                    </svg>
                    <span className="text-sm font-medium text-blue-500 group-hover:text-white">
                      Twitter
                    </span>
                  </a>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        pauseOnHover
        theme="dark"
      />
    </div>
  );
}

export default Login;
