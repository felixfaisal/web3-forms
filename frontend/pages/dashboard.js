import React from "react";
import AppContext from "../context";
import { useEffect, useContext } from "react";
import Modal from "../components/modal";
const Dashboard = ({ setResponseData, setShowModal, myResponses }) => {
  const { showModal, responseData, responseDataUser } = useContext(AppContext);

  const responsesArray = [
    { formId: 1, cid: "", creator: "0xAgdhh929920" },
    { formId: 2, cid: "", creator: "0xjsjhsg27378hs" },
    { formId: 3, cid: "", creator: "0xhsh72663ggw" },
    { formId: 4, cid: "", creator: "0xysyys663673h" },
    { formId: 5, cid: "", creator: "0xjsjhsg27378hs" },
    { formId: 6, cid: "", creator: "0xhsh72663ggw" },
  ];

  useEffect(() => {
    myResponses();
  }, []);

  console.log(responseDataUser);
  console.log(responseData); //

  return (
    <section className="mb-4">
      <h1 className="text-3xl font-semibold text-center text-red-500 m-6">
        Forms Diary
      </h1>

      <div className="flex justify-center items-center flex-wrap mb-6">
        {responseData.map((response) => {
          return (
            <div
              className="w-[300px] h-[250px] m-4  rounded-xl bg-gray-100"
              key={response[2]}
              onClick={() => {
                console.log(response[1]);
                setShowModal(true);
              }}
            >
              <img
                src="https://images.pexels.com/photos/7130560/pexels-photo-7130560.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt=""
                className="h-[150px] w-[100%]"
              />
              <p className="text-[12px] font-semibold mx-2 text-gray-400 mt-1">
                FORM ID #{response[1]}
              </p>
              <div className="flex justify-end items-start">
                <p className="text-[12px] text-gray-400 font-semibold mx-2 ">
                  CREATED BY
                </p>
              </div>
              <div className="flex justify-end items-center">
                <p className="text-red-500 font-semibold text-md ">
                  {response[2].slice(0, 7) + "..." + response[2].slice(37, 42)}
                </p>
                <img
                  className="bg-gradient-to-b from-red-500 h-7 w-7 rounded-full mx-2 object-cover mt-1 mr-2"
                  src="https://cdn.todayscrypto.news/wp-content/uploads/2022/03/1.polygon-matic-logo.png"
                ></img>
              </div>
            </div>
          );
        })}
      </div>
      <Modal setShowModal={setShowModal} showModal={showModal} />
    </section>
  );
};

export default Dashboard;
