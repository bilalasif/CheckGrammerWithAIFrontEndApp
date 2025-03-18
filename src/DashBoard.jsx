import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { errorToast } from "./utils/utils.js";
import { axiosApiCall } from "./utils/utils.js";

function DashBoard() {
  const navigate = useNavigate();
  const [userInput, setUserInput] = useState("");

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
      <div className="flex justify-between p-4">
        <div></div>
        <h2>DashBoard</h2>
        <button
          className="flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={onSignoutclick}
        >
          sign out
        </button>
      </div>
      <div className="flex flex-col justify-center h-[90vh] gap-5 p-40">
        <div className="bg-[#efefef] h-[200px] rounded-lg">
          <p className="p-5">{userInput}</p>
        </div>
        <textarea
          value={userInput}
          name="users-input"
          id=""
          className="h-[200px] border-1 rounded-lg border-gray-600 focus:outline-none resize-none p-5"
          onChange={(e) => {
            setUserInput(e.target.value);
          }}
        ></textarea>
        <div className="flex justify-center">
          <button className="flex w-40 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            Check Grammar
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default DashBoard;
