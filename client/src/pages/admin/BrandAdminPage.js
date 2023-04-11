import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ModalForm from "../../components/ModalForm";
import SlidebarShade from "../../components/SlidebarShade";
import TableComponent from "../../components/TableComponent";
import UpdateModalForm from "../../components/UpdateModalForm";
import {
  addBrand,
  getBrands,
  updateBrand,
} from "../../features/admin/brandSlice";
const BrandAdminPage = () => {
  const dispatch = useDispatch();
  const { brands } = useSelector((state) => state.brand);
  const { updateData } = useSelector((state) => state.modal);

  useEffect(() => {
    dispatch(getBrands());
  }, [dispatch]);

  const BrandModal = {
    title: "Brand",
    add: function (data) {
      dispatch(addBrand(data));
    },
    get: function () {
      dispatch(getBrands());
    },
    update: function (data) {
      dispatch(updateBrand(data));
    },
    fields: [
      {
        name: "name",
        label: "Brand Name",
        type: "text",
        valueData: updateData?.name,
      },
    ],
  };

  const headers = ["name"];
  return (
    <div className="ml-24 w-full h-full">
      <SlidebarShade />
      <ModalForm dataModal={BrandModal} />
      <UpdateModalForm dataModal={BrandModal} />
      <TableComponent
        tableHeaders={headers}
        tableData={brands}
        tableType={"brand"}
      />
    </div>
  );
};

export default BrandAdminPage;
