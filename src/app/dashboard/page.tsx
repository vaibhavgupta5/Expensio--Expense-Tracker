import Sidebar from "@/components/Sidebar";
import React from "react";
import { FaPiggyBank, FaPlaneDeparture, FaRupeeSign } from "react-icons/fa";
function Dashboard() {
  return (
    <div className="flex h-full w-full bg-[#0D1117] ">
      <Sidebar />

      <div className="p-8 h-[100vh] w-full flex flex-col">
        <div className="w-[100%] flex h-[40%] m-2 ml-0">
          <div className="w-[60%] h-full m-2 bg-[#161B22] rounded-md flex justify-start items-start  border-solid border-[1px] border-[#30363D]"></div>

          <div className="w-[40%] h-full m-2 bg-[#161B22] rounded-md flex justify-start items-start  border-solid border-[1px] border-[#30363D]"></div>
        </div>

        <div className="w-[100%] flex h-[20%] m-2 ml-0">
          <div className="w-[100%] h-full m-2 bg-[#161B22] rounded-md flex justify-start items-start  border-solid border-[1px] border-[#30363D] flex-col ">
            <p className="border-solid border-b-[1px] h-[30%] border-[#30363D] p-2 w-full text-white">
              Quick Access
            </p>

            <div className="flex justify-evenly h-[70%] p-2 w-full items-center">
              <div className="bg-[#0D1117] hover:bg-[#010409] h-full w-[25%] rounded-md border-solid border-[1px] border-[#30363D] flex justify-center items-center text-white cursor-pointer  font-semibold">
                <FaRupeeSign className="bg-[#161B22] p-2 text-4xl rounded-full mr-2" />
                <p>+ New Expense</p>
              </div>

              <div className="bg-[#0D1117] hover:bg-[#010409] h-full w-[25%] rounded-md border-solid border-[1px] border-[#30363D] flex justify-center items-center text-white cursor-pointer  font-semibold">
                <FaPlaneDeparture className="bg-[#161B22] p-2 text-4xl rounded-full mr-2" />
                <p>+ New Trip</p>
              </div>

              <div className="bg-[#0D1117] hover:bg-[#010409] h-full w-[25%] rounded-md border-solid border-[1px] border-[#30363D] flex justify-center items-center text-white cursor-pointer font-semibold">
                <FaPiggyBank className="bg-[#161B22] p-2 text-4xl rounded-full mr-2" />
                <p> Balance : Rs.126565</p>
              </div>
            </div>
          </div>
        </div>

        <div className="w-[100%] flex h-[40%] m-2 ml-0">
          <div className="w-[50%] h-full m-2 bg-[#161B22] rounded-md flex justify-start items-start  border-solid border-[1px] border-[#30363D]"></div>

          <div className="w-[50%] h-full m-2 bg-[#161B22] rounded-md flex justify-start items-start  border-solid border-[1px] border-[#30363D]"></div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
