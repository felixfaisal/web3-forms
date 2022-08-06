import React, { useEffect, useState } from "react";
import Image from "next/image";
import FormItem from "../Form/FormItem";
import Radio from "../Form/Radio";
import SelectInput from "../Form/SelectInput";

const AddForm = ({
  id,
  setInputFields,
  addingField,
  setAddingField,
  inputFields,
}) => {
  const [fieldName, setFieldName] = useState("");
  const [fieldType, setFieldType] = useState("");
  const [option1, setOption1] = useState({ value: "", label: "" });
  const [option2, setOption2] = useState({ value: "", label: "" });
  const [option3, setOption3] = useState({ value: "", label: "" });
  const onFieldTypeChange = (e) => {
    setFieldType(e.target.value);
  };

  useEffect(() => {
    if (!addingField) {
      if (fieldType === "select") {
        setInputFields([
          ...inputFields,
          {
            id,
            fieldName,
            fieldType,
            options: [option1, option2, option3].filter(
              (option) => option.value !== ""
            ),
          },
        ]);
      } else {
        setInputFields([...inputFields, { id, fieldName, fieldType }]);
      }
      setAddingField(true);
    }
  }, [addingField]);

  return (
    <div className="grid md:grid-cols-3 md:gap-6">
      <div className="relative z-0 mb-6 w-full group">
        <FormItem
          type="text"
          label={"Field Name"}
          name={fieldName}
          value={fieldName}
          onChange={(e) => setFieldName(e.target.value)}
        />
      </div>
      <div className="relative z-0 mb-6 w-full group">
        <div className="flex flex-col">
          <Radio
            name={`field-type-${id}`}
            value="text"
            label="Text"
            checked={fieldType === "text"}
            onChange={onFieldTypeChange}
          />
          <Radio
            name={`field-type-${id}`}
            value="select"
            label="Select"
            checked={fieldType === "select"}
            onChange={onFieldTypeChange}
          />
          <Radio
            name={`field-type-${id}`}
            value="number"
            label="Number"
            checked={fieldType === "number"}
            onChange={onFieldTypeChange}
          />
        </div>
      </div>
      {fieldType === "select" && (
        <>
          <div className="relative z-0 w-full group">
            <SelectInput
              placeholder={"1"}
              value={option1.value}
              onChange={(e) =>
                setOption1({ value: e.target.value, label: e.target.value })
              }
            />
            <SelectInput
              placeholder={"2"}
              value={option2.value}
              onChange={(e) =>
                setOption2({ value: e.target.value, label: e.target.value })
              }
            />
            <SelectInput
              placeholder={"3"}
              value={option3.value}
              onChange={(e) =>
                setOption3({ value: e.target.value, label: e.target.value })
              }
            />
            {/* {options.length > 0 && options.map((option, index) => (
                <SelectInput key={index}  placeholder={index + 2} />
              ))} */}
            {/* <div
            className="flex items-center mb-5 cursor-pointer"
            onClick={() => setAddingOption(false)} 
          >
            <Image
              src={"/icons/add-icon.svg"}
              alt="add-icon"
              width={"18px"}
              height="30px"
            />
            <p className="ml-2 text-sm">Add Options</p>
          </div> */}
          </div>
        </>
      )}
    </div>
  );
};

export default AddForm;
