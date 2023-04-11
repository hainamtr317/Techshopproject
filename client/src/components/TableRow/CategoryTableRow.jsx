import React from "react";
import { Button, Table } from "flowbite-react";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { openUpdateModal } from "../../features/admin/adminModalSlide";
import { useDispatch } from "react-redux";
import { deleteCategory } from "../../features/admin/categorySlice";
const CategoryTableRow = ({ data }) => {
  const dispatch = useDispatch();
  const deleteHandler = (id) => {
    dispatch(deleteCategory(id));
  };
  return (
    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
      <Table.Cell className=" font-medium text-gray-900 dark:text-white">
        {data.name}
      </Table.Cell>

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

export default CategoryTableRow;
