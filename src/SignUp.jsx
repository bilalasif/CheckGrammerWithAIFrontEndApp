import React from "react";
import { Link } from "react-router-dom";

function SignUp() {
  return (
    <div>
      <label htmlFor="email">Email: </label>
      <input
        type="text"
        name="email"
        id="email"
        placeholder="Enter Email to Sign Up"
      />
      <label htmlFor="password">Password:</label>
      <input
        type="password"
        name="password"
        id="password"
        placeholder="Enter Password to Sign Up"
      />
      <button>submit</button>

      <Link to={"/sign-in"}>
        <button>sign in</button>
      </Link>
    </div>
  );
}

export default SignUp;
