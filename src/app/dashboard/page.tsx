"use client";
import ExpenseForm from "@/components/forms/expenseForm";
import RecurringForm from "@/components/forms/recurringForm";
import TripForm from "@/components/forms/tripsForm";
import Sidebar from "@/components/Sidebar";
import { toast } from "@/components/ui/use-toast";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { FaPiggyBank, FaPlaneDeparture, FaRupeeSign } from "react-icons/fa";
import { DataTable } from "../expenses/data-table";
import { DataTable as Table2 } from "../trips/data-table";
import { columns } from "../expenses/columns";
import { columns as col2 } from "../trips/columns";
import { ExpenseGraph } from "@/components/graphs/expenseGraph";
import { TripGraph } from "@/components/graphs/tripGraph";
import Image from "next/image";

function Dashboard() {
  const [income, setIncome] = useState("");
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [loading, setLoading] = useState(true);

  const getIncome = useCallback(
    async (refresh: boolean = false) => {
      setLoading(true);
      try {
        const resultExpense = await axios.get("/api/expense");

        console.log(resultExpense.data.income);
        setIncome(resultExpense.data.income[0].amount);

        const newArr: any = resultExpense.data.data.filter(
          (_: any, index: number) => index < 3
        );

        const newArr2: any = resultExpense.data.trips.filter(
          (_: any, index: number) => index < 3
        );

        setData(newArr);
        setData2(newArr2);
      } catch (error: any) {
        toast({
          title: error?.message,
          description: "Please check back later",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    },
    [setData, setData2, setIncome]
  );

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    setTimeout(() => {
      if (loading === false) {
        console.log("first ok");
        getIncome();
      }
    }, 700);
  };

  useEffect(() => {
    getIncome();
  }, [toast]);

  // if(loading){
  //   return (
  //     <div className="flex h-full w-full bg-[#0D1117] ">
  //      <div className='fixed z-10 '><Sidebar /></div>
  //     <p className="text-white">Loading</p>
  //     </div>
  //   )
  // }

  return (
    <div className="flex h-full w-full bg-[#0D1117] ">
      <div className="fixed z-10 ">
        <Sidebar />
      </div>

      {loading ? (
          <div className="p-8 h-[100vh] w-full flex flex-col md:ml-[20vw] mt-12 md:mt-0 justify-center text-center">
      <div className="w-full flex p-4 justify-center items-center">
        <Image
          src="/mmhchQWT1a.gif"
          width={150}
          height={150}
          alt="Picture of the user"
          className='content-center'
      /></div>
           <p className="text-white w-full"> Loading</p>
        </div>
      ) : (
        <div className="p-8 h-full md:h-[100vh] w-full flex flex-col md:ml-[20vw] mt-12 md:mt-0">
          <div className="w-[100%] flex flex-col md:flex-row h-[40%] m-2 ml-0">
            <div className="md:w-[60%] w-full h-full m-2 bg-[#161B22] rounded-md flex flex-col justify-start items-start  border-solid border-[1px] border-[#30363D]">
              <p className="border-solid border-b-[1px] h-[18%] border-[#30363D] p-2 pl-4 w-full text-white font-bold">
                Latest Expenses
              </p>

              <div className=" p-2 w-full">
                <DataTable columns={columns} data={data} />
              </div>
            </div>

            <div className="w-full md:w-[40%] h-full m-2 bg-[#161B22] rounded-md flex flex-col justify-start items-start  border-solid border-[1px] border-[#30363D]">
              <p className="border-solid border-b-[1px] h-[18%] border-[#30363D] p-2 pl-4 w-full text-white font-bold">
                Recent Planned Trips
              </p>

              <div className=" p-2 w-full ">
                <Table2 columns={col2} data={data2} />
              </div>
            </div>
          </div>
          <div className="w-[100%] flex h-[25%] md:h-[20%] m-2 md:ml-0">
            <div className="w-[100%] h-full m-2 bg-[#161B22] rounded-md flex justify-start items-start  border-solid border-[1px] border-[#30363D] flex-col ">
              <p className="border-solid border-b-[1px] h-[30%] border-[#30363D] p-2 pl-4 w-full flex items-center text-white font-bold">
                Quick Access
              </p>

              <div className="flex flex-col md:flex-row justify-evenly h-[70%] p-2 w-full items-center ">
                <div
                  onSubmit={(e: any) => handleSubmit(e)}
                  className="bg-[#0D1117] h-full w-full md:w-[25%] hover:bg-[#010409] border-solid border-[1px] border-[#30363D]  rounded-md m-2"
                >
                  <ExpenseForm />
                </div>

                <div
                  onSubmit={(e: any) => handleSubmit(e)}
                  className="bg-[#0D1117] h-full w-full md:w-[25%] hover:bg-[#010409] border-solid border-[1px] border-[#30363D]  rounded-md m-2"
                >
                  {" "}
                  <TripForm />
                </div>

                <div
                  onSubmit={(e: any) => handleSubmit(e)}
                  className="bg-[#0D1117] h-full w-full md:w-[25%] hover:bg-[#010409] border-solid border-[1px] border-[#30363D]  rounded-md m-2"
                >
                  {" "}
                  <RecurringForm />
                </div>

                <div className="bg-[#0D1117] hover:bg-[#010409] h-full w-full md:w-[25%] rounded-md border-solid border-[1px] border-[#30363D] m-2 flex justify-center items-center text-white cursor-pointer font-semibold">
                  <FaPiggyBank className="bg-[#161B22] p-2 text-4xl rounded-full mr-2" />
                  <p> Balance : ₹{income}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="w-[100%] flex flex-col md:flex-row h-[40%] m-2 ml-0">
            <div className="w-full md:w-[50%] h-full m-2 bg-[#161B22] rounded-md flex flex-col justify-start items-start  border-solid border-[1px] border-[#30363D]">
              <p className="border-solid border-b-[1px] h-[18%] border-[#30363D] p-2 pl-4 w-full text-white font-bold">
                Expense Visualizer
              </p>
              <ExpenseGraph />
            </div>

            <div className="w-full md:w-[50%] h-full m-2 bg-[#161B22] rounded-md flex flex-col justify-start items-start  border-solid border-[1px] border-[#30363D]">
              <p className="border-solid border-b-[1px] h-[18%] border-[#30363D] p-2 pl-4 w-full text-white font-bold">
                Trip Expense Visualizer
              </p>
              <TripGraph />
            </div>
          </div>{" "}
        </div>
      )}
    </div>
  );
}

export default Dashboard;
