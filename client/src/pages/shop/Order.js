import React from "react";
import { useSelector } from "react-redux";
import HistoryTable from "../../components/HistoryPage/HistoryTable";
function Order() {
  return (
    <>
      <div>
        <HistoryTable />
      </div>
    </>
  );
}

export default Order;
