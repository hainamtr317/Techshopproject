import React from "react";
import { useState } from "react";
import Axios from "../../configs/axiosConfig";
const ForgotPassword = () => {
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");

  const forgotPasswordHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await Axios.post("/api/auth/forgotpassword", { email });
      setSuccess(data);
      setEmail("");
    } catch (error) {
      setError(error.response.data.error);
      setEmail("");
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
          <h1>{success.data}</h1>
        </div>
      )}
      <form
        className="w-[500px] h-[300px] bg-white rounded-xl"
        onSubmit={forgotPasswordHandler}
      >
        <h1 className="text-center text-3xl font-bold my-5">Reset Password</h1>
        <div className="flex flex-col w-[85%] m-auto">
          <div className="flex flex-col gap-y-3">
            <label htmlFor="password" className="font-semibold text-lg">
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
          <button className="bg-white border-2 border-black mt-7 p-2 font-bold rounded-xl hover:bg-slate-400 transition duration-200 ease-linear">
            Send Email
          </button>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
