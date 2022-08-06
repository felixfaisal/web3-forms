import React from "react";

const SelectInput = ({
  type = "text",
  placeholder,
  value,
  onChange,
  onBlur,
}) => {
  return (
    <input
      type={type}
      value={value}
      onBlur={onBlur}
      onChange={onChange}
      className="block py-1.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-pink-600 peer"
      placeholder={`Option ${placeholder}`}
    />
  );
};

export default SelectInput;
