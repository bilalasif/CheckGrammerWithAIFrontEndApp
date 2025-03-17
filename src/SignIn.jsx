import React from "react";
import { Link } from "react-router-dom";

function SignIn() {
  return (
    <div>
      <label htmlFor="email">Email: </label>
      <input
        type="text"
        name="email"
        id="email"
        placeholder="Enter your Email to Sign in"
      />
      <label htmlFor="password">Password:</label>
      <input
        type="password"
        name="password"
        id="password"
        placeholder="Enter your Password to Sign in"
      />
      <button>submit</button>

      <Link to={"/sign-up"}>
        <button>sign up</button>
      </Link>
    </div>
  );
}

export default SignIn;
