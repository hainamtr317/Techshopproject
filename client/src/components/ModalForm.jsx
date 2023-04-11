import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeModal, openModal } from "../features/admin/adminModalSlide";
import { Modal, Button, Spinner } from "flowbite-react";
import { useState } from "react";
import ModalTextField from "./ModalTextField";
import ModalSelectField from "./ModalSelectField";
import ModalFileField from "./ModalFileField";

function ModalForm({ dataModal }) {
  const [data, setData] = useState({});
  const isLoadingProduct = useSelector((state) => state.product.isLoading);
  const isLoadingBrand = useSelector((state) => state.brand.isLoading);
  const isLoadingCategory = useSelector((state) => state.category.isLoading);
  const { open } = useSelector((state) => state.modal);
  const dispatch = useDispatch();
  const submitHandling = async (e) => {
    e.preventDefault();
    await dataModal.add(data);
    setData({});
  };
  return (
    <>
      <div className="flex justify-center my-4">
        <Button
          className="mx-auto"
          color="dark"
          onClick={() => dispatch(openModal())}
        >
          Add {dataModal.title}
        </Button>
      </div>
      <Modal
        show={open}
        onClose={() => dispatch(closeModal())}
        className="fixed"
      >
        <Modal.Header>Add {dataModal.title}</Modal.Header>
        <form
          className="flex flex-col gap-4"
          onSubmit={(e) => submitHandling(e)}
        >
          <Modal.Body>
            {(isLoadingProduct || isLoadingBrand || isLoadingCategory) && (
              <Spinner aria-label="Extra small spinner example" size="xs" />
            )}

            {!isLoadingProduct &&
              !isLoadingBrand &&
              !isLoadingCategory &&
              dataModal.fields.map((field, index) => {
                if (field.type === "text") {
                  return (
                    <ModalTextField key={index} {...field} setData={setData} />
                  );
                }
                if (field.type === "select") {
                  return (
                    <ModalSelectField
                      {...field}
                      setData={setData}
                      options={field.options}
                      key={index}
                    />
                  );
                }
                if (field.type === "number") {
                  return (
                    <ModalTextField key={index} {...field} setData={setData} />
                  );
                }
                if (field.type === "file") {
                  return (
                    <ModalFileField key={index} {...field} setData={setData} />
                  );
                }
                return <React.Fragment key={index} />;
              })}
          </Modal.Body>
          <Modal.Footer>
            <Button type="submit">Add</Button>
            <Button color="gray" onClick={() => dispatch(closeModal())}>
              Cancel
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
}

export default ModalForm;
