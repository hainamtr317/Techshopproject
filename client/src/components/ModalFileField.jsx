import React, { useState } from "react";
import { FileInput, Label } from "flowbite-react";
const ModalFileField = ({ name, label, setData }) => {
  const onChangeHandler = (e) => {
    setData((prevState) => ({ ...prevState, [name]: e.target.files[0] }));
  };

  return (
    <div id="fileUpload">
      <div className="mb-2 block">
        <Label htmlFor="file" value={label} />
      </div>
      <FileInput name="image" onChange={onChangeHandler} />
    </div>
  );
};

export default ModalFileField;
