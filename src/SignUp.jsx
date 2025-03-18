import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { axiosApiCall, errorToast, validateEmail } from "./utils/utils";
import Loader from "./components/Loader";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      try {
        const resp = await axiosApiCall("/me", "get");
        if (resp.status != 200) {
          setIsLoading(false);
          return;
        } else {
          setIsLoading(false);
          navigate("/");
        }
      } catch (error) {
        setIsLoading(false);
        return;
      }
    })();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();

    if (email == "") {
      errorToast("Email cannot be empty");
      return;
    }
    if (!validateEmail(email)) {
      errorToast("Enter a valid email");
      return;
    }
    if (password == "") {
      errorToast("Password cannot be empty");
      return;
    }
    try {
      const resp = await axiosApiCall("/sign-up", "POST", {
        email,
        password,
      });
      console.log("resp", resp);
      if (resp.status == 201) {
        navigate("/");
      } else {
        errorToast("Unable to Sign up");
      }
    } catch (error) {}
  };
  if (isLoading) {
    return (
      <div className="h-screen flex flex-col justify-center items-center">
        <Loader />
      </div>
    );
  }
  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-10 w-auto"
          src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
          alt="Your Company"
        />
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          Sign up
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6">
          <div>
            <label
              for="email"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                type="email"
                name="email"
                id="email"
                autocomplete="email"
                required
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                for="password"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                type="password"
                name="password"
                id="password"
                autocomplete="current-password"
                required
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="cursor-pointer flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={onSubmit}
            >
              Sign Up
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm/6 text-gray-500">
          Already have an account?
          <Link to={"/sign-in"}>
            <span className=" cursor-pointer font-semibold text-indigo-600 hover:text-indigo-500">
              {" "}
              Sign In Now.
            </span>
          </Link>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
}

export default SignUp;
