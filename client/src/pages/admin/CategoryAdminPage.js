import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import ModalForm from "../../components/ModalForm";
import SlidebarShade from "../../components/SlidebarShade";
import TableComponent from "../../components/TableComponent";
import UpdateModalForm from "../../components/UpdateModalForm";
import {
  addCategory,
  getCategories,
  updateCategory,
} from "../../features/admin/categorySlice";

const CategoryAdminPage = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const CategoryModal = {
    title: "Category",
    add: function (data) {
      dispatch(addCategory(data));
    },
    update: function (data) {
      dispatch(updateCategory(data));
    },
    fields: [
      {
        name: "name",
        label: "Category Name",
        type: "text",
      },
    ],
  };
  const headers = ["name"];
  return (
    <div className="ml-24 w-full h-full">
      <SlidebarShade />
      <ModalForm dataModal={CategoryModal} />
      <UpdateModalForm dataModal={CategoryModal} />
      <TableComponent
        tableHeaders={headers}
        tableData={categories}
        tableType={"category"}
      />
    </div>
  );
};

export default CategoryAdminPage;
