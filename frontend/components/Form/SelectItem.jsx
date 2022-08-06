import React from "react";
import Select from "react-select";

const SelectItem = ({
  name,
  selectedOptions,
  options,
  formResponse,
  setFormResponse,
}) => {
  return (
    <div className="mb-8">
      <p className="text-sm mb-4">{name}</p>
      <Select
        value={selectedOptions}
        onChange={(e) => {
          setFormResponse({ ...formResponse, [name]: e.value });
        }}
        options={options}
      />
    </div>
  );
};

export default SelectItem;
