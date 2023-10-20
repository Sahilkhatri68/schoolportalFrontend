import React, { useEffect, useState } from "react";
import Header from "./Header";
import { useParams } from "react-router-dom";
import axios from "axios";
import { API } from "./API/API";

function ViewCourseDetail() {
  const { _id } = useParams();
  const [fetchedClasswithStd, setFetchedClasswithStd] = useState([]);
  const fetchId = _id;

  //   code to fetch class and std detail from _id
  const getClassWithStdDetails = async () => {
    await axios
      .get(`${API}/getclass/getclassbystudent/${fetchId}`)
      .then((res) => {
        console.log(res);
        setFetchedClasswithStd(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    setTimeout(() => {
      getClassWithStdDetails();
    }, [2000]);
  }, []);

  return (
    <div>
      <Header
        Children={
          <>
            <div>HI</div>
          </>
        }
      ></Header>
    </div>
  );
}

export default ViewCourseDetail;
