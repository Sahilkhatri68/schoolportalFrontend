import React from "react";
import Header from "./Header";

function Account({ Children }) {
  return (
    <div>
      <Header Children={<div>Account</div>}></Header>
    </div>
  );
}

export default Account;
