import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState, useContext } from "react";
import NewFormItem from "../../components/Form/NewFormItem";
import SelectItem from "../../components/Form/SelectItem";
import AppContext from "../../context";
import { ethers } from "ethers";
import { create } from "ipfs-http-client";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "../../constants/addresses";
const axios = require("axios").default;
const client = create("https://ipfs.infura.io:5001/api/v0");

import { useLocalStorage } from "../../hooks/useLocalStorage";

const FillForm = ({
  connectWallet,
  setFormMetadata,
  setFormMetadataLoading,
  getCurrentAccount,
}) => {
  const { account } = useContext(AppContext);

  const [formTitle, setFormTitle] = useLocalStorage("formTitle", "");
  const [fieldTypes, setFieldTypes] = useState([]);
  const [inputFields, setInputFields] = useState([]);
  const [formResponse, setFormResponse] = useState({});
  const [selectedOptions, setSelectedOptions] = useState("");
  const [userResponses, setUserResponses] = useLocalStorage(
    "userResponses",
    ""
  );
  const [newValue, setNewValue] = useState("");
  const router = useRouter();
  console.log(router);

  useEffect(() => {
    setInputFields(fieldTypes);
    const fetchForm = async (formId) => {
      try {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          CONTRACT_ADDRESS,
          CONTRACT_ABI,
          signer
        );
        const contractFormMetadata = await contract.MetaData(formId);
        const formMetadataResponse = await axios.get(
          `https://ipfs.infura.io/ipfs/${contractFormMetadata.CID}`
        );
        if (formMetadataResponse) {
          setFormMetadata(formMetadataResponse.data);
          setFormMetadataLoading(false);
        }
        getCurrentAccount();
        setInputFields(formMetadataResponse.data);
        // console.log(formMetadataResponse.data[0]);
        // console.log(fieldTypes);
      } catch (error) {
        console.log(error);
      }
    };
    fetchForm(11);
  }, []);

  const onSubmit = async(e) => {
    /* e.preventDefault();
    setUserResponses([...userResponses, formResponse]);
    localStorage.removeItem("inputFields");
    localStorage.removeItem("formTitle");
    // console.log("form Response: ", formResponse);
    const added = await client.add(JSON.stringify(fieldTypes));
    const url = `https://ipfs.infura.io/ipfs/${added.path}`;
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      CONTRACT_ADDRESS,
      CONTRACT_ABI,
      signer
    );
    const fill_the_form_txn = await contract.fillForm(added.path, 7);
    await fill_the_form_txn.wait(); */
    try {
      e.preventDefault();
      setUserResponses([...userResponses, formResponse]);
      localStorage.removeItem("inputFields");
      localStorage.removeItem("formTitle");
      console.log("form Response: ", formResponse);
      // router.push('/form/responses')
      const added = await client.add(JSON.stringify(formResponse));
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      console.log(added.path);

      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        CONTRACT_ABI,
        signer
      );
      const fill_the_form_txn = await contract.fillForm(added.path, 11);
      await fill_the_form_txn.wait();
    } catch (error) {
      console.log(error);
    }
    // router.push('/form/responses')
  };

  return (
    <div className="container mx-auto min-h-screen flex justify-center items-center">
      <div className=" bg-white p-10 rounded w-[500px]">
        <div className="flex justify-end">
          {account ? (
            <span>{account.slice(0, 7) + "..." + account.slice(37, 42)}</span>
          ) : (
            <button
              className="bg-white outline-2 outline-pink-700 outline focus:ring-4 focus:outline-none focus:ring-pink-300 font-medium rounded text-sm w-full sm:w-auto px-5 py-2 text-right"
              onClick={connectWallet}
            >
              Wallet
            </button>
          )}
        </div>
        <form className="mt-5">
          <p className="text-2xl text-center mb-8">{formTitle}</p>
          {inputFields.map((field, index) =>
            field.fieldType !== "select" ? (
              <NewFormItem
                key={index}
                type={field.fieldType}
                label={field.fieldName}
                name={field.fieldName}
                value={newValue}
                formResponse={formResponse}
                setFormResponse={setFormResponse}
              />
            ) : (
              <SelectItem
                name={field.fieldName}
                options={field.options}
                value={selectedOptions}
                formResponse={formResponse}
                setFormResponse={setFormResponse}
              />
            )
          )}
          <a
            onMouseUp={onSubmit}
            className="text-white bg-pink-700 hover:bg-pink-800 focus:ring-4 focus:outline-none focus:ring-pink-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
          >
            Submit
          </a>
        </form>
      </div>
    </div>
  );
};

export default FillForm;
