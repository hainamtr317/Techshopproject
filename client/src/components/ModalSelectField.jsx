import React from "react";
import { Label, Select } from "flowbite-react";
const ModalSelectField = ({ name, label, setData, options }) => {
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData((prevState) => ({ ...prevState, [name]: value }));
  };
  return (
    <div>
      <div className="mb-2 block">
        <Label value={`Select ${label}`} />
      </div>
      <Select name={name} required={true} onChange={onChangeHandler}>
        <option defaultChecked>Select {label}</option>
        {options.map((option) => (
          <option key={option._id} value={option._id}>
            {option.name}
          </option>
        ))}
      </Select>
    </div>
  );
};

export default ModalSelectField;
