import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../features/auth/authSlice";
const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const dispatch = useDispatch();
  const { isSuccess, errorMessage } = useSelector((state) => state.auth);
  const registerHandler = (e) => {
    e.preventDefault();

    if (password !== confirm_password) {
      setPassword("");
      setConfirmPassword("");
      setTimeout(() => {
        setError("");
      }, 5000);
      return setError("Passwords do not match");
    }

    dispatch(register({ username, email, password }));

    if (errorMessage) {
      setError(errorMessage);
      setTimeout(() => {
        setError("");
      }, 5000);
    }

    if (isSuccess.success && !errorMessage) {
      setSuccess(isSuccess.data);
      setTimeout(() => {
        setSuccess("");
      }, 10000);
    }
  };

  return (
    <div className="bg-auth-code bg-cover w-screen h-screen flex justify-center items-center relative">
      <form
        className="w-[500px] h-[570px] bg-white rounded-xl "
        onSubmit={registerHandler}
      >
        {error && (
          <div className="text-center bg-red-400 rounded-lg p-2 opacity-70 top-36 w-[500px] absolute">
            <h1>{error}</h1>
          </div>
        )}
        {success && (
          <div className="text-center bg-green-400 rounded-lg p-2 opacity-70 top-36 w-[500px] absolute">
            <h1>{success}</h1>
          </div>
        )}
        <h1 className="text-center text-sky-700  text-3xl font-bold my-5">
          Sign Up
        </h1>
        <div className="flex flex-col w-[85%] m-auto">
          <div className="flex flex-col gap-y-3">
            <label htmlFor="email" className="font-semibold text-lg">
              Email
              <sup className="text-red-700 text font-bold">*</sup>
            </label>

            <input
              type="email"
              className="border-[1px] border-gray-400 h-10 rounded-lg p-2"
              placeholder="Enter the email"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>

          <div className="flex flex-col gap-y-3 mt-5">
            <label htmlFor="username" className="font-semibold text-lg">
              Username
              <sup className="text-red-700 text font-bold">*</sup>
            </label>

            <input
              type="text"
              className="border-[1px] border-gray-400 h-10 rounded-lg p-2"
              placeholder="Enter the username"
              required
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </div>

          <div className="flex flex-col gap-y-3 mt-5">
            <label htmlFor="password" className="font-semibold text-lg">
              Password
              <sup className="text-red-700 text font-bold">*</sup>
            </label>

            <input
              type="password"
              className="border-[1px] border-gray-400 h-10 rounded-lg p-2"
              placeholder="Enter password"
              autoComplete="off"
              required
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <div className="flex flex-col gap-y-3 mt-5">
            <label htmlFor="password" className="font-semibold text-lg">
              Confirm Password
              <sup className="text-red-700 text font-bold">*</sup>
            </label>

            <input
              type="password"
              className="border-[1px] border-gray-400 h-10 rounded-lg p-2"
              placeholder="Enter confirmed password"
              autoComplete="off"
              required
              value={confirm_password}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
            />
          </div>
          <button className="bg- white border-2 border-black mt-7 p-2 font-bold rounded-xl hover:text-white hover:bg-sky-400 transition duration-200 ease-linear">
            Sign Up
          </button>

          <div className="mt-3">
            Already have an account?{" "}
            <Link to="/auth/login" className="text-blue-600">
              Sign In
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;
