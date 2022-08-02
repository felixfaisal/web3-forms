import AppContext from "../context";
import { useContext } from "react";
export default function Home({
  connectWallet,
  switchAccounts,
  setFormData,
  submitForm,
  setResponse,
}) {
  const { account, formData, response } = useContext(AppContext);
  // console.log(account);
  const data = {
    questions: [
      "Which company is building the video streaming layer",
      "What is decentraland",
      "Name two popular NFT projects",
      "Is an NFT mutable",
    ],
  };
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

        <div className="flex justify-center items-start p-4  m-3 flex-col w-[95%] max-w-[600px] rounded-lg bg-white border-1 border-solid border-gray-400">
          <p className="mb-5">
            Which company is building the video streaming layer
            <span className="text-red-500">*</span>
          </p>
          <input
            type="text"
            className="my-1 border-t-transparent border-l-transparent border-r-transparent border-b-gray-300 border-2 border-solid
            outline-none
            focus:border-b-red-500 transition-colors text-sm
            w-[90%]

            "
            onChange={(e) =>
              setResponse({ ...response, first: e.target.value })
            }
          />
        </div>
        <div className="flex justify-center items-start p-4  m-3 flex-col w-[95%] max-w-[600px] rounded-lg bg-white border-1 border-solid border-gray-400">
          <p className="mb-5">
            What is decentraland
            <span className="text-red-500">*</span>
          </p>
          <input
            type="text"
            className="my-1 border-t-transparent border-l-transparent border-r-transparent border-b-gray-300 border-2 border-solid
            outline-none
            focus:border-b-red-500 transition-colors text-sm
            w-[90%]

            "
            onChange={(e) => setResponse({ ...response, sec: e.target.value })}
          />
        </div>
        <div className="flex justify-center items-start p-4  m-3 flex-col w-[95%] max-w-[600px] rounded-lg bg-white border-1 border-solid border-gray-400">
          <p className="mb-5">
            Name two popular NFT project
            <span className="text-red-500">*</span>
          </p>
          <input
            type="text"
            className="my-1 border-t-transparent border-l-transparent border-r-transparent border-b-gray-300 border-2 border-solid
            outline-none
            focus:border-b-red-500 transition-colors text-sm
            w-[90%]

            "
            onChange={(e) =>
              setResponse({ ...response, third: e.target.value })
            }
          />
        </div>
        <div className="flex justify-center items-start p-4  m-3 flex-col w-[95%] max-w-[600px] rounded-lg bg-white border-1 border-solid border-gray-400">
          <p className="mb-5">
            Is NFT metadata mutable
            <span className="text-red-500">*</span>
          </p>
          <input
            type="text"
            className="my-1 border-t-transparent border-l-transparent border-r-transparent border-b-gray-300 border-2 border-solid
            outline-none
            focus:border-b-red-500 transition-colors text-sm
            w-[90%]

            "
            onChange={(e) =>
              setResponse({ ...response, fourth: e.target.value })
            }
          />
        </div>

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
