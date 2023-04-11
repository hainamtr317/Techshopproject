import React from "react";
import { Table } from "flowbite-react";
import ProductTableRow from "./TableRow/ProductTableRow";
import BrandTableRow from "./TableRow/BrandTableRow";
import CategoryTableRow from "./TableRow/CategoryTableRow";
const TableComponent = ({ tableData, tableHeaders, tableType }) => {
  return (
    <Table className="font-bold" hoverable={true}>
      <Table.Head>
        {tableHeaders.map((header, index) => (
          <Table.HeadCell key={index}>{header}</Table.HeadCell>
        ))}
        <Table.HeadCell>
          <span className="sr-only">Action</span>
        </Table.HeadCell>
      </Table.Head>
      <Table.Body className="divide-y">
        {tableType === "product" &&
          tableData.map((row) => <ProductTableRow key={row._id} data={row} />)}
        {tableType === "brand" &&
          tableData.map((row) => <BrandTableRow key={row._id} data={row} />)}
        {tableType === "category" &&
          tableData.map((row) => <CategoryTableRow key={row._id} data={row} />)}
      </Table.Body>
    </Table>
  );
};

export default TableComponent;
