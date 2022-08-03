import "../styles/globals.css";
import AppContext from "../context";
import { useEffect, useState } from "react";
import CoinbaseWalletSDK from "@coinbase/wallet-sdk";
import WalletConnect from "@walletconnect/web3-provider";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "../constants/addresses";
import { create } from "ipfs-http-client";

const client = create("https://ipfs.infura.io:5001/api/v0");
function MyApp({ Component, pageProps }) {
  const [provider, setProvider] = useState();
  const [library, setLibrary] = useState();
  const [account, setAccount] = useState();
  const [network, setNetwork] = useState();
  const [chainId, setChainId] = useState();
  const [formData, setFormData] = useState([]);
  const [response, setResponse] = useState({
    1: "",
    2: "",
    3: "",
    4: "",
  });
  const [isReturningUser, setIsReturningUser] = useState(false);
  const [responseData, setResponseData] = useState({});
  const connectWallet = async () => {
    try {
      const providerOptions = {
        coinbasewallet: {
          package: CoinbaseWalletSDK,
          options: {
            appName: "Web 3 Modal Demo",
          },
        },
        walletconnect: {
          package: WalletConnect,
          options: {
            infuraId: "27e484dcd9e3efcfd25a83a78777cdf1",
          },
        },
      };
      const web3Modal = new Web3Modal({
        providerOptions, // required
      });
      const provider = await web3Modal.connect();
      const library = new ethers.providers.Web3Provider(provider);

      const accounts = await library.listAccounts();
      const network = await library.getNetwork();
      setProvider(provider);
      setLibrary(library);
      if (accounts) setAccount(accounts[0]);
      setNetwork(network);
    } catch (error) {
      console.error(error);
    }
  };

  const getCurrentAccount = async () => {
    window.ethereum.on("accountsChanged", (accounts) => {
      if (accounts.length > 0) {
        setAccount(accounts[0]);
        console.log(account);
      } else {
        setAccount("");
      }
    });
  };

  const getConnectedWallet = async () => {
    const accounts = await ethereum.request({ method: "eth_accounts" });

    if (accounts.length) {
      setAccount(accounts[0]);
    } else {
      console.log("no accounts found");
    }
  };

  const switchAccounts = async () => {
    const walletAddress = await window.ethereum.request({
      method: "eth_requestAccounts",
      params: [
        {
          eth_accounts: {},
        },
      ],
    });

    if (!isReturningUser) {
      // Runs only they are brand new, or have hit the disconnect button
      await window.ethereum.request({
        method: "wallet_requestPermissions",
        params: [
          {
            eth_accounts: {},
          },
        ],
      });
    }
    getCurrentAccount();
  };

  const upload_to_ipfs = async () => {
    const ipfs = await IPFS.create();
    const { cid } = await ipfs.add("Hello World");
    console.info(cid);
  };

  const create_the_form = async () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      CONTRACT_ADDRESS,
      CONTRACT_ABI,
      signer
    );
    const create_form_txn = await contract.createTheForm("0xCid");
    await create_form_txn.wait();
  };

  const fill_the_form = async () => {};

  const is_the_form_filled = async () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      CONTRACT_ADDRESS,
      CONTRACT_ABI,
      signer
    );
    const is_the_form_filled_txn = await contract.isTheFormFilled(1);
    await is_the_form_filled_txn();
  };

  const user_responses = async () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      CONTRACT_ADDRESS,
      CONTRACT_ABI,
      signer
    );
    const user_responses_txn = await contract.myResponses(1);
    await user_responses_txn();
  };

  useEffect(() => {
    getCurrentAccount();
    if (provider?.on) {
      const handleAccountsChanged = (accounts) => {
        setAccount(accounts);
      };

      const handleChainChanged = (chainId) => {
        setChainId(chainId);
      };

      const handleDisconnect = () => {
        disconnect();
        setIsReturningUser(true);
      };

      provider.on("accountsChanged", handleAccountsChanged);
      provider.on("chainChanged", handleChainChanged);
      provider.on("disconnect", handleDisconnect);

      return () => {
        if (provider.removeListener) {
          provider.removeListener("accountsChanged", handleAccountsChanged);
          provider.removeListener("chainChanged", handleChainChanged);
          provider.removeListener("disconnect", handleDisconnect);
        }
      };
    }
  }, [provider]);

  const submitForm = async (e) => {
    try {
      e.preventDefault();
      setFormData([...formData, response]);
      console.log(response);
      const added = await client.add(JSON.stringify(response));
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      console.log(added.path);

      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        CONTRACT_ABI,
        signer
      );
      const fill_the_form_txn = await contract.fillTheForm(added.path, 0);
      await fill_the_form_txn.wait();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getConnectedWallet();
    getCurrentAccount();
  }, []);
  return (
    <AppContext.Provider value={{ account, formData, response, responseData }}>
      <Component
        {...pageProps}
        connectWallet={connectWallet}
        switchAccounts={switchAccounts}
        setFormData={setFormData}
        submitForm={submitForm}
        setResponse={setResponse}
        setResponseData={setResponseData}
      />
    </AppContext.Provider>
  );
}

export default MyApp;
