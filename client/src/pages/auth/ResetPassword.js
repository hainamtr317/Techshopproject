import React, { useState } from "react";
import Axios from "../../configs/axiosConfig";
import { useParams, Link } from "react-router-dom";
const ResetPassword = () => {
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [confimPass, setConfirmPass] = useState("");
  const [password, setPassword] = useState("");
  const params = useParams();
  const resetPasswordHandler = async (e) => {
    e.preventDefault();
    if (password !== confimPass) {
      setPassword("");
      setConfirmPass("");
      setTimeout(() => {
        setError("");
      }, 5000);
      setError("Passwords aren't correct");
      return setError("Passwords don't match");
    }

    try {
      const { data } = await Axios.put(
        `api/auth/resetpassword/${params.resetToken}`,
        { password }
      );
      console.log();
      setSuccess(data);
    } catch (error) {
      console.log(error);
      setError(error.response.data.error);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };
  return (
    <div className="bg-neutral-200 w-screen h-screen flex justify-center items-center relative">
      {error && (
        <div className="text-center bg-red-400 rounded-lg p-2 opacity-70 translate-y-[-320px] w-[500px] absolute">
          <h1>{error}</h1>
        </div>
      )}
      {success && (
        <div className="text-center bg-green-400 rounded-lg p-2 opacity-70 translate-y-[-320px] w-[500px] absolute">
          <h1>
            {success.data}. Click here to login{" "}
            <Link to="/auth/login" className="text-blue-600">
              Login
            </Link>
          </h1>
        </div>
      )}
      <form
        className="w-[500px] h-[380px] bg-white rounded-xl"
        onSubmit={resetPasswordHandler}
      >
        <h1 className="text-center text-3xl font-bold my-5">Reset Password</h1>
        <div className="flex flex-col w-[85%] m-auto">
          <div className="flex flex-col gap-y-3">
            <label htmlFor="password" className="font-semibold text-lg">
              Password
              <sup className="text-red-700 text font-bold">*</sup>
            </label>

            <input
              type="password"
              className="border-[1px] border-gray-400 h-10 rounded-lg p-2"
              placeholder="Enter your new password"
              required
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <div className="flex flex-col gap-y-3 mt-4">
            <label htmlFor="password" className="font-semibold text-lg">
              Confirm Password
              <sup className="text-red-700 text font-bold">*</sup>
            </label>

            <input
              type="password"
              className="border-[1px] border-gray-400 h-10 rounded-lg p-2"
              placeholder="Confirm Password"
              required
              value={confimPass}
              onChange={(e) => {
                setConfirmPass(e.target.value);
              }}
            />
          </div>
          <button className="bg- white border-2 border-black mt-7 p-2 font-bold rounded-xl hover:bg-slate-400 transition duration-200 ease-linear">
            Send Email
          </button>
        </div>
      </form>
    </div>
  );
};

export default ResetPassword;
