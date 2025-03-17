import React from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { errorToast } from "./utils/utils.js";
import { axiosApiCall } from "./utils/utils.js";

function DashBoard() {
  const navigate = useNavigate();
  const onSignoutclick = async () => {
    try {
      const resp = await axiosApiCall("/sign-out", "POST");
      console.log("resp", resp);
      if (resp.status == 200) {
        navigate("/sign-in");
      } else {
        errorToast("Unable to Sign out");
      }
    } catch (error) {}
  };
  return (
    <div>
      DashBoard
      <button onClick={onSignoutclick}>sign out</button>
      <ToastContainer />
    </div>
  );
}

export default DashBoard;
