"use client";
import React, { useEffect } from "react";
import axios from "axios";

const FirstDashboard = (session: any) => {
  useEffect(() => {
    const api = axios.create({
      baseURL: "http://localhost:8080/api/v1", // API giả lập
    });

    api.interceptors.response.use(
      function onFulfilled(response) {
        console.log("Response Success:", response);
        return response;
      },
      function onRejected(error) {
        if (error?.response?.status === 401) {
          console.log("401 Error Log: Unauthorized access");
        }
        console.log("Response error:", error);
        return Promise.reject(error);
      }
    );

    // Gửi request thử nghiệm
    api
      .delete("/variant") // API sẽ trả về mã 200 nếu thành công
      .then((response) => {
        console.log("Data in firstdash board:", response.data);
      })
      .catch((error) => {
        console.log("Caught an error:", error);
      });
  }, []);

  return (
    <div>
      <h1>Test Axios Interceptor</h1>
    </div>
  );
};

export default FirstDashboard;
