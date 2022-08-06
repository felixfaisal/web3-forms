import React from "react";

const Radio = ({ name, value, label, onChange, checked }) => {
  return (
    <div className="flex items-center mb-4">
      <input
        id={name}
        type="radio"
        name={name}
        value={value}
        onChange={onChange}
        className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-pink-300 dark:focus:ring-pink-600 dark:focus:bg-pink-600 dark:bg-gray-700 dark:border-gray-600"
        checked={checked}
      />
      <label
        htmlFor={name}
        className="block ml-2 text-sm font-medium text-gray-900"
      >
        {label}
      </label>
    </div>
  );
};

export default Radio;
