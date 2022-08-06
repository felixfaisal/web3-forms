import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState, useContext } from "react";
import AddForm from "../../components/Form/AddForm";
import FormItem from "../../components/Form/FormItem";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { create } from "ipfs-http-client";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import CoinbaseWalletSDK from "@coinbase/wallet-sdk";
import WalletConnect from "@walletconnect/web3-provider";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "../../constants/addresses";

import AppContext from "../../context";
const axios = require("axios").default;
const client = create("https://ipfs.infura.io:5001/api/v0");

const CreateFormPage = ({ connectWallet }) => {
  const { account } = useContext(AppContext);
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
  const onSubmit = async (e) => {
    e.preventDefault();
    // setFieldTypes(inputFields.filter((input, index) => index != 0));
    // console.log(inputFields);
    // console.log(fieldTypes);
    setAddingField(false);
    setSubmitForm(true);
    /* const added = await client.add(JSON.stringify(fieldTypes));
    const url = `https://ipfs.infura.io/ipfs/${added.path}`;
    // console.log("hey");
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      CONTRACT_ADDRESS,
      CONTRACT_ABI,
      signer
    );
    const fill_the_form_txn = await contract.createTheForm(added.path);
    await fill_the_form_txn.wait(); */
  };

  useEffect(() => { const ipfs_fetch = async () => {
    if(submitForm){
      console.log("Form Types", fieldTypes);
      const added = await client.add(JSON.stringify(fieldTypes));
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      console.log(url);
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        CONTRACT_ABI,
        signer
      );
      const fill_the_form_txn = await contract.createTheForm(added.path);
      await fill_the_form_txn.wait();
    }
  }
  ipfs_fetch();
    
  }, [fieldTypes]);
  useEffect(() => {
    if (submitForm) {
      setFieldTypes(inputFields.filter((input, index) => index != 0));
      // console.log(inputFields);
      // router.push("/form/fill-form");
    }
  }, [inputFields]); 

  return (
    <div className="container mx-auto min-h-screen flex justify-center items-center">
      <div className=" bg-white p-10 rounded w-[500px]">
        <div className="flex justify-end">
          {account ? (
            <span>{account.slice(0, 7) + "..." + account.slice(37, 42)}</span>
          ) : (
            <button
              onClick={connectWallet}
              className="bg-white outline-2 outline-pink-700 outline focus:ring-4 focus:outline-none focus:ring-pink-300 font-medium rounded text-sm w-full sm:w-auto px-5 py-2 text-right"
            >
              Wallet
            </button>
          )}
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
          
        </form>
        <button
            onClick={onSubmit}
            className="text-white bg-pink-700 hover:bg-pink-800 focus:ring-4 focus:outline-none focus:ring-pink-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
          >
            Submit
          </button>
      </div>
    </div>
  );
};

export default CreateFormPage;
