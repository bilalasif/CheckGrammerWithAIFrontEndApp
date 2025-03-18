import React, { useState, useEffect } from "react";
import Loader from "./Loader";
import { axiosApiCall } from "../utils/utils";
import { useNavigate } from "react-router-dom";
function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    setLoading(true);
    (async () => {
      try {
        const resp = await axiosApiCall("/me", "get");
        if (resp.status != 200) {
          navigate("/sign-in");
        }
      } catch (error) {
        navigate("/sign-in");
      }
      setLoading(false);
    })();
  }, []);

  if (loading) {
    return (
      <div className="h-screen flex flex-col justify-center items-center">
        <Loader />
      </div>
    );
  }
  return children;
}

export default ProtectedRoute;
