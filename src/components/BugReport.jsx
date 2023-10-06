import React from "react";
import Header from "./Header";

function BugReport({ Children }) {
  return (
    <div>
      <Header Children={<div>Bug report</div>}></Header>
    </div>
  );
}

export default BugReport;
