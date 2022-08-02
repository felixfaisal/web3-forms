import React from "react";
import AppContext from "../context";
import { useEffect, useState, useContext } from "react";
import WalletConnect from "@walletconnect/web3-provider";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "../constants/addresses";
const axios = require("axios").default;
const Dashboard = ({ setResponseData }) => {
  const { account, formData, response, responseData } = useContext(AppContext);

  const myResponses = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        CONTRACT_ABI,
        signer
      );
      const responsesData = await contract.myResponses(0);
      let responseHash = responsesData.formData;
      let responseData = await axios.get(
        `https://ipfs.infura.io/ipfs/bafybeibq6q3ddo4ldy3bxjwybpwegszwk2353u5xqjudteiu642b2`
      );

      console.log(responseData.data);
      setResponseData(responseData.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    myResponses();
  }, []);

  return (
    <section>
      <h1>Hello World!</h1>
      <div className="bg-gradient-to-b from-red-500 h-10 w-10 rounded-md"></div>
      <div>
        <p>Q. Which company is building the video streaming layer</p>
        <p>A. {responseData.first} </p>
        <p>A. {responseData.sec} </p>
        <p>A. {responseData.third} </p>
        <p>A. {responseData.fourth} </p>
      </div>
    </section>
  );
};

export default Dashboard;
