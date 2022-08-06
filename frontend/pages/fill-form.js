import AppContext from "../context";
import { useContext, useEffect } from "react";
import { ethers } from "ethers";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "../constants/addresses";
const axios = require("axios").default;

import Loader from "../components/loader";
export default function Form({
  connectWallet,
  switchAccounts,
  submitForm,
  setResponse,
  setFormMetadata,
  setFormMetadataLoading,
  getCurrentAccount,
}) {
  const { account, response, formMetadata, formMetadataLoading } =
    useContext(AppContext);

  useEffect(() => {
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
      } catch (error) {
        console.log(error);
      }
    };
    fetchForm(1);
  }, [formMetadataLoading, account]);
  console.log(formMetadata);

  return (
    <main className="flex justify-center items-center  p-3 m-3 flex-col">
      <form
        action=""
        className="flex justify-center items-center p-2 m-3 rounded-lg w-[98vw]  max-w-[750px] flex-col"
      >
        <div className="flex justify-center items-start border-2  border-solid p-4  m-3 flex-col w-[95%] max-w-[600px] rounded-lg border-t-8 border-t-red-500 border-l-transparent border-b-transparent border-r-transparent bg-white">
          <h2 className="text-4xl mb-2">Quiz on NFTs</h2>
          <p className="mb-2 text-sm mt-1">
            This form takes submissions for a quiz on NFTs
          </p>
          <div className="bg-gray-300 h-[1px] w-[100%] mb-2"></div>
          <p className="text-sm font-semibold">
            {account ? (
              account.length ? (
                <span>
                  {account.slice(0, 7) + "..." + account.slice(37, 42)}
                  <span
                    className="pl-2 text-sm text-blue-500 cursor-pointer"
                    onClick={switchAccounts}
                  >
                    switch account
                  </span>
                </span>
              ) : (
                <span
                  className="text-md text-blue-500 cursor-pointer"
                  onClick={connectWallet}
                >
                  connect wallet
                </span>
              )
            ) : (
              <span
                className="text-md text-blue-500 cursor-pointer"
                onClick={connectWallet}
              >
                connect wallet
              </span>
            )}
          </p>
          <p className="text-red-500 text-sm mt-1">*Required</p>
        </div>

        {!formMetadataLoading ? (
          <>
            <div className="flex justify-center items-start p-4  m-3 flex-col w-[95%] max-w-[600px] rounded-lg bg-white border-1 border-solid border-gray-400">
              {formMetadata.length ? (
                <p className="mb-5">
                  {formMetadata[0][0]}
                  <span className="text-red-500">*</span>
                </p>
              ) : (
                ""
              )}

              <input
                type="text"
                className="my-1 border-t-transparent border-l-transparent border-r-transparent border-b-gray-300 border-2 border-solid
            outline-none
            focus:border-b-red-500 transition-colors text-sm
            w-[90%]

            "
                onChange={(e) =>
                  setResponse({ ...response, 1: e.target.value })
                }
              />
            </div>
            <div className="flex justify-center items-start p-4  m-3 flex-col w-[95%] max-w-[600px] rounded-lg bg-white border-1 border-solid border-gray-400">
              {formMetadata.length ? (
                <p className="mb-5">
                  {formMetadata[1][0]}
                  <span className="text-red-500">*</span>
                </p>
              ) : (
                ""
              )}
              <input
                type="text"
                className="my-1 border-t-transparent border-l-transparent border-r-transparent border-b-gray-300 border-2 border-solid
            outline-none
            focus:border-b-red-500 transition-colors text-sm
            w-[90%]

            "
                onChange={(e) =>
                  setResponse({ ...response, 2: e.target.value })
                }
              />
            </div>
            <div className="flex justify-center items-start p-4  m-3 flex-col w-[95%] max-w-[600px] rounded-lg bg-white border-1 border-solid border-gray-400">
              {formMetadata.length ? (
                <p className="mb-5">
                  {formMetadata[2][0]}
                  <span className="text-red-500">*</span>
                </p>
              ) : (
                ""
              )}
              <input
                type="text"
                className="my-1 border-t-transparent border-l-transparent border-r-transparent border-b-gray-300 border-2 border-solid
            outline-none
            focus:border-b-red-500 transition-colors text-sm
            w-[90%]

            "
                onChange={(e) =>
                  setResponse({ ...response, 3: e.target.value })
                }
              />
            </div>
          </>
        ) : (
          <Loader />
        )}

        <div className="flex justify-start items-center w-[98%] max-w-[600px]">
          {account ? (
            account.length ? (
              <button
                type="submit"
                className="p-2  m-3 bg-red-500 py-1 px-3 rounded-md text-white font-semibold hover:bg-red-600 relative -left-1 md:relative md:-left-3"
                onClick={(e) => submitForm(e)}
              >
                Submit
              </button>
            ) : (
              ""
            )
          ) : (
            ""
          )}
        </div>
      </form>
      <footer className="mt-3">
        <p className="text-sm text-gray-500">
          Form was created by{" "}
          {/* {account.slice(0, 7) + "..." + account.slice(37, 42)}{" "} */}
        </p>
        <p className="text-xl mt-3 text-gray-500 font-semibold text-center">
          <i>3FORMS</i>
        </p>
      </footer>
    </main>
  );
}
