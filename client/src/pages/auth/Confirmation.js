import React from "react";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Axios from "../../configs/axiosConfig";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { MdError } from "react-icons/md";
const Confirmation = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const confirmRegistration = async () => {
      try {
        const { data } = await Axios.get(
          `api/auth/confirmregister/${params.confirmToken}`
        );
        setSuccess(data.data);
        if (success) {
          setTimeout(() => {
            navigate("/auth/login");
          }, 5000);
        }
      } catch (error) {
        setError(error.response.data.error);
      }
    };
    confirmRegistration();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="bg-neutral-200 w-screen h-screen flex justify-center items-center relative">
      <div className="w-[550px] h-72 bg-white mb-60 rounded-xl flex flex-col justify-center items-center">
        <span className="relative mb-6">
          {success && (
            <IoMdCheckmarkCircle className="text-[150px] text-green-400 relative duration-500 animate-pulse" />
          )}
          {error && !success && (
            <MdError className="text-[150px] text-red-700 relative duration-500 animate-pulse" />
          )}
        </span>

        <h1 className="font-sans font-bold text-4xl text-gray-600">
          {!error ? "Confirmed Email Successfully" : error}
        </h1>
      </div>
    </div>
  );
};

export default Confirmation;
