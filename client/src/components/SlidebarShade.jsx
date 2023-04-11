import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { openSidebar } from "../features/admin/adminSidebarSlice";
const SlidebarShade = () => {
  const { open } = useSelector((state) => state.sidebar);
  const dispatch = useDispatch();
  return (
    <div
      className={`z-10 ${
        open ? "opacity-60 bg-black w-full h-full fixed" : "hidden"
      }`}
      onClick={() => dispatch(openSidebar())}
    ></div>
  );
};

export default SlidebarShade;
