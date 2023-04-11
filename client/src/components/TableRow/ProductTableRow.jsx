import React from "react";
import { Button, Table } from "flowbite-react";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { openUpdateModal } from "../../features/admin/adminModalSlide";
import { deleteProducts } from "../../features/admin/productSlice";
import { useEffect } from "react";
import { useState } from "react";

const ProductTableRow = ({ data }) => {
  const dispatch = useDispatch();
  const { brands } = useSelector((state) => state.brand);
  const { categories } = useSelector((state) => state.category);
  const [filteredBrand, setFilteredBrand] = useState({});
  const [filteredCategory, setFilteredCategory] = useState({});
  useEffect(() => {
    setFilteredBrand(...brands.filter((brand) => brand._id === data.brand));
    setFilteredCategory(
      ...categories.filter((category) => category._id === data.category)
    );
    // eslint-disable-next-line
  }, []);

  const deleteHandler = (id) => {
    dispatch(deleteProducts(id));
  };
  return (
    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
      <Table.Cell>
        <img
          src={require(`../../Images/${data.img}`)}
          alt={data.name}
          className="max-w-[120px]"
        ></img>
      </Table.Cell>
      <Table.Cell className=" font-medium text-gray-900 dark:text-white">
        {data.name}
      </Table.Cell>
      <Table.Cell>{data.stock}</Table.Cell>

      <Table.Cell>{filteredBrand.name}</Table.Cell>
      <Table.Cell>{filteredCategory.name}</Table.Cell>
      <Table.Cell>{data.price}</Table.Cell>
      <Table.Cell className="flex gap-1">
        <Button color="dark">
          <AiOutlineEdit
            className="text-xl"
            onClick={() => dispatch(openUpdateModal(data))}
          />
        </Button>
        <Button
          color="failure"
          className="inline"
          onClick={() => deleteHandler(data._id)}
        >
          <AiOutlineDelete className="text-xl" />
        </Button>
      </Table.Cell>
    </Table.Row>
  );
};

export default ProductTableRow;
