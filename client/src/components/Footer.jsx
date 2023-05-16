import React from "react";
import { BsTelephone } from "react-icons/bs";
import { FiMessageSquare } from "react-icons/fi";
import { FaMapMarkerAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="h-[404px] w-[100%] relative border-t-[1px] mt-20">
      <div className="absolute w-[155px] h-[154px] right-2 top-[-10%] z-[-1]"></div>
      <div className="h-[100%] w-[99%]  grid grid-cols-2">
        <div className="flex flex-col">
          <h1 className="capitalize ml-14 mt-10 text-[20px] sm:text-[25px] md:text-[30px] lg:text-[40px] xl:text-[45px] font-normal ">
            online-shop
          </h1>
          <p className="mx-14 mt-6 font-normal text-[9px] sm:text-[12px] md:text-[14px] lg:text-[16px] xl:text-[18px]  leading-[22px] text-[#504A41]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Blandit
            malesuada dapibus ut pulvinar neque arcu, commodo. Pharetra nisi
            egestas nisi fermentum. Sollicitudin egestas senectus pellentesque
            enim mauris vel odio commodo. Pellentesque orci vestibulum sed in
            molestie consequat.
          </p>
        </div>
        <div className="flex items-center sm:items-center md:items-start md:justify-between flex-col md:flex-row">
          <div className="flex flex-col mt-10 ml-0 md:ml-14 lg:ml-14 xl:ml-14 gap-4 md:gap-8">
            <h1 className="font-medium text-[25px] leading-[30px] capitalize">
              contact us
            </h1>
            <p className="font-normal text-[12px] sm:text-[14px] md:text-[15px] lg:text-[16px] xl:text-[18px]  leading-[22px] flex items-center">
              <BsTelephone className="mr-4" />
              +255 752 186 174
            </p>
            <p className="font-normal text-[12px] sm:text-[14px] md:text-[15px] lg:text-[16px] xl:text-[18px] leading-[22px] flex items-center">
              <FiMessageSquare className="mr-4" />
              hainamtr317@gmail.com
            </p>
            <p className="font-normal text-[12px] sm:text-[14px] md:text-[15px] lg:text-[16px] xl:text-[18px] leading-[22px] flex items-center capitalize">
              <FaMapMarkerAlt className="mr-4" />
              HO CHI MINH City
            </p>
          </div>
          <div className="flex flex-col mt-10 mr-14 gap-4 md:gap-8">
            <h1 className="font-medium text-[25px] leading-[30px] capitalize">
              about us
            </h1>
            <Link
              to="/"
              className="font-normal text-[12px] sm:text-[14px] md:text-[15px] lg:text-[16px] xl:text-[18px] leading-[22px] capitalize"
            >
              support
            </Link>
            <Link
              to="/"
              className="font-normal text-[12px] sm:text-[14px] md:text-[15px] lg:text-[16px] xl:text-[18px] leading-[22px] capitalize"
            >
              privacy & policy
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
