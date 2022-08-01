import "../styles/globals.css";
import AppContext from "../context";
import { useEffect, useState } from "react";
import CoinbaseWalletSDK from "@coinbase/wallet-sdk";
import WalletConnect from "@walletconnect/web3-provider";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
function MyApp({ Component, pageProps }) {
  const [provider, setProvider] = useState();
  const [library, setLibrary] = useState();
  const [account, setAccount] = useState();
  const [network, setNetwork] = useState();
  const [chainId, setChainId] = useState();
  const [formData, setFormData] = useState([]);
  const [response, setResponse] = useState({ 1: "", 2: "", 3: "", 4: "" });
  const [isReturningUser, setIsReturningUser] = useState(false);
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

  const submitForm = (e) => {
    e.preventDefault();
    setFormData([...formData, response]);
    console.log(response);
  };

  useEffect(() => {
    getConnectedWallet();
    getCurrentAccount();
  }, []);
  return (
    <AppContext.Provider value={{ account, formData, response }}>
      <Component
        {...pageProps}
        connectWallet={connectWallet}
        switchAccounts={switchAccounts}
        setFormData={setFormData}
        submitForm={submitForm}
        setResponse={setResponse}
      />
    </AppContext.Provider>
  );
}

export default MyApp;
