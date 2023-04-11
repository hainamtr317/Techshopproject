import React, { useState } from "react";
import { TextInput, Label } from "flowbite-react";
import { useEffect } from "react";
const ModalTextField = ({ name, label, type, setData, valueData }) => {
  const [valueField, setValueField] = useState("");

  useEffect(() => {
    if (valueData !== undefined) {
      setValueField(valueData);
    }
  }, [valueData]);

  const onChangeHandler = (e) => {
    const { value } = e.target;
    setValueField(value);
    setData((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <div>
      <div className="mb-2 block">
        <Label value={label} className="text-xl" />
      </div>
      <TextInput
        type={type}
        placeholder={`Enter product ${name}`}
        name={name}
        required={true}
        shadow={true}
        onChange={onChangeHandler}
        value={valueField}
      />
    </div>
  );
};

export default ModalTextField;
