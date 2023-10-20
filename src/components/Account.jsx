import React from "react";
import Header from "./Header";
import { useParams } from "react-router-dom";

function Account() {
  const fetchclassid = useParams();
  return (
    <div>
      <Header Children={<div>Account</div>}></Header>
    </div>
  );
}

export default Account;
