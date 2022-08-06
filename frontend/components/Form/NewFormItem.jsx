import { useState } from "react";

const NewFormItem = ({
  type,
  name,
  placeholder,
  label,
  formResponse,
  setFormResponse,
  newValue,
}) => {
  const onBlur = (e) => {
    e.preventDefault();
    setFormResponse({ ...formResponse, [name]: e.target.value });
  };

  return (
    <div className="relative z-0 mb-6 w-full group">
      <input
        defaultValue={formResponse[name]}
        type={type}
        name={`floating_${name}`}
        id={`floating_${name}`}
        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-pink-600 peer"
        placeholder={placeholder}
        onBlur={onBlur}
        value={newValue}
        // onChange={onChange}
      />
      <label
        htmlFor={`floating_${name}`}
        className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-pink-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
      >
        {label}
      </label>
    </div>
  );
};

export default NewFormItem;
