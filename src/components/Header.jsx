import React, { useEffect } from "react";
import { Link, NavLink, Navigate, useNavigate } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import IconButton from "@mui/material/IconButton";
import { useState } from "react";
import "./styles/Header.css";
import sidebaritems from "./SidebarItems/SidebarContent.json";
import { Button } from "@mui/material";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
function Header({ Children }) {
  const logincheck = true;
  const navigate = useNavigate();
  const checklogin = () => {
    if (logincheck === false) {
      navigate("/login");
    }
  };
  useEffect(() => {
    checklogin();
  }, [checklogin]);
  const [sidebar, setSidebar] = useState(false);
  const displaySidebar = () => {
    setSidebar(!sidebar);
  };
  return (
    <div>
      {/* code for Header---------------------- */}
      <div className="w-full fixed overflow-hidden z-10 top-0 flex justify-between bg-[#0f1131] p-3">
        <div className="md:w-[30%] cursor-pointer text-white  w-full font-bold text-2xl">
          School Portal
        </div>
        {/* <div className="md:w-[60%]  w-full items-center text-white  md:flex hidden">
          <NavLink
            to="/aboutus"
            style={({ isActive, isPending }) => {
              return {
                fontWeight: isActive ? "bold" : "",
                color: isActive ? "red" : "white",
              };
            }}
          >
            <div className="md:text-[18px] text-[15px] ml-2 mr-2">AboutUs</div>
          </NavLink>
          <div className="md:text-[18px] text-[15px] ml-2 mr-2">Item</div>
          <div className="md:text-[18px] text-[15px] ml-2 mr-2">Item</div>
        </div> */}
        <div
          className="md:w-[20%]  w-[15%]   flex md:items-center md:content-center 
         justify-end w-full"
        >
          <div className="md:flex hidden mx-2">
            {logincheck === true ? (
              <Button variant="contained" startIcon={<PowerSettingsNewIcon />}>
                Logout
              </Button>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="contained" startIcon={<VpnKeyIcon />}>
                    Login
                  </Button>
                </Link>
              </>
            )}
          </div>
          <div className="mx-2">
            <IconButton onClick={() => displaySidebar()}>
              <FiMenu color="white" />
            </IconButton>
          </div>
        </div>
      </div>
      {/* code for Sidebar------------------------- */}
      <div className="top-[62px] MainContentContainer">
        <div
          className={`sidebar fixed z-1 min-h-[100vh] top-[60px] duration-300    overflow-auto	bg-[#eceedd] ${
            sidebar ? "w-[220px]" : "w-[50px]"
          } `}
        >
          <div>
            {sidebaritems.map((item) => {
              return (
                <NavLink
                  key={item.id}
                  to={item.path}
                  style={({ isActive, isPending }) => {
                    return {
                      fontWeight: isActive ? "bold" : "",
                      color: isActive ? "red" : "black",
                    };
                  }}
                >
                  <div className="flex m-2 items-center w-[200px] hover:bg-[#bebebe] rounded">
                    <div className="m-2">
                      {item.icon && <i className={item.icon}></i>}
                    </div>
                    <div
                      className={`m-2 duration-500 ${!sidebar && "scale-0"}`}
                    >
                      <p>{item.title}</p>
                    </div>
                  </div>
                </NavLink>
              );
            })}
            <div className="  flex m-2 items-center w-[200px] hover:bg-[#bebebe] rounded">
              {logincheck === true ? (
                <>
                  <div className="m-2">
                    <PowerSettingsNewIcon
                      style={{
                        fontSize: 18,
                        fontWeight: "bold",
                      }}
                    />
                  </div>
                  <div className={`m-2 duration-500 ${!sidebar && "scale-0"}`}>
                    <p>Logout</p>
                  </div>
                </>
              ) : (
                <>
                  <Link to="/login">
                    <div className="m-2">
                      <VpnKeyIcon
                        style={{
                          fontSize: 18,
                          fontWeight: "bold",
                        }}
                      />
                    </div>
                    <div
                      className={`m-2 duration-500 ${!sidebar && "scale-0"}`}
                    >
                      <p>Login</p>
                    </div>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
        <div
          className={`mainContent p-2`}
          style={{
            margin: "60px 0px 0px 55px",
          }}
        >
          {Children}
        </div>
      </div>
    </div>
  );
}

export default Header;
