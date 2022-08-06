import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState, useContext } from "react";
import AddForm from "../../components/Form/AddForm"
import FormItem from "../../components/Form/FormItem";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import AppContext from "../../context";
const CreateFormPage = ({connectWallet}) => {
  const {account}=useContext(AppContext);
  console.log(account);
  const [formTitle, setFormTitle] = useLocalStorage("formTitle", "");
  const [fieldTypes, setFieldTypes] = useLocalStorage("inputFields", []);
  const [inputFields, setInputFields] = useState([
    { fieldName: "", fieldType: "" },
  ]);
  const [addingField, setAddingField] = useState(true);
  const [submitForm, setSubmitForm] = useState(false);
  const router = useRouter();
  const addFields = () => {
    setAddingField(false);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    setAddingField(false);
    setSubmitForm(true);
  };

  useEffect(() => {
    console.log("Form Types", fieldTypes);
},[fieldTypes]);
  
  useEffect(() => {
    if (submitForm) {
      setFieldTypes(inputFields.filter((input, index) => index != 0));
      // router.push("/form/fill-form");
    }
  }, [inputFields]);

  return (
    <div className="container mx-auto min-h-screen flex justify-center items-center">
      <div className=" bg-white p-10 rounded w-[500px]">
        <div className="flex justify-end">
          {
            account?
                     <span>
                  {account.slice(0, 7) + "..." + account.slice(37, 42)}
                  </span>
            : (   <button onClick={connectWallet} className="bg-white outline-2 outline-pink-700 outline focus:ring-4 focus:outline-none focus:ring-pink-300 font-medium rounded text-sm w-full sm:w-auto px-5 py-2 text-right">
            Wallet
          </button>)
          }

        </div>
        <form className="mt-5">
          <FormItem
            type={"text"}
            label="Form Title"
            name={"form-title"}
            placeholder=""
            value={formTitle}
            onChange={(e) => setFormTitle(e.target.value)}
          />
          {inputFields.length > 0 &&
            inputFields.map((field, index) => (
              <AddForm
                key={index}
                id={index}
                setInputFields={setInputFields}
                inputFields={inputFields}
                addingField={addingField}
                setAddingField={setAddingField}
              />
            ))}
          <div
            className="flex items-center mb-5 cursor-pointer"
            onClick={addFields}
          >
            <Image
              src={"/icons/add-icon.svg"}
              alt="add-icon"
              width={"25px"}
              height="30px"
            />
            <p className="ml-2">Add Fields</p>
          </div>
          <button
            onClick={onSubmit}
            className="text-white bg-pink-700 hover:bg-pink-800 focus:ring-4 focus:outline-none focus:ring-pink-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateFormPage;
