import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeUpdateModal } from "../features/admin/adminModalSlide";
import { Modal, Button } from "flowbite-react";
import { useState } from "react";
import ModalTextField from "./ModalTextField";
import ModalSelectField from "./ModalSelectField";
import { useEffect } from "react";
const UpdateModalForm = ({ dataModal }) => {
  const { updateOpen, updateData } = useSelector((state) => state.modal);
  const [data, setData] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (updateData !== undefined) {
      setData(updateData);
    }

    if (updateOpen === false) {
      setData("");
    }
  }, [updateData, updateOpen]);

  const submitHandling = (e) => {
    e.preventDefault();
    dataModal.update(data);
  };

  return (
    <>
      <Modal
        show={updateOpen}
        onClose={() => dispatch(closeUpdateModal())}
        className="fixed"
      >
        <Modal.Header>Update {dataModal.title}</Modal.Header>
        <form className="flex flex-col gap-4" onSubmit={submitHandling}>
          <Modal.Body>
            {dataModal.fields.map((field, index) => {
              if (field.type === "text") {
                return (
                  <ModalTextField key={index} {...field} setData={setData} />
                );
              }
              if (field.type === "select") {
                return (
                  <ModalSelectField {...field} setData={setData} key={index} />
                );
              }
              if (field.type === "number") {
                return (
                  <ModalTextField key={index} {...field} setData={setData} />
                );
              }
              return <React.Fragment key={index} />;
            })}
          </Modal.Body>
          <Modal.Footer>
            <Button type="submit">Add</Button>
            <Button color="gray" onClick={() => dispatch(closeUpdateModal())}>
              Cancel
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
};

export default UpdateModalForm;
