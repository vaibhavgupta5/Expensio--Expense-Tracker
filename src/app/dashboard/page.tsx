"use client";
import ExpenseForm from "@/components/forms/expenseForm";
import RecurringForm from "@/components/forms/recurringForm";
import TripForm from "@/components/forms/tripsForm";
import Sidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { apiResponse } from "@/types/apiResponse";
import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { FaPiggyBank, FaPlaneDeparture, FaRupeeSign } from "react-icons/fa";
import { GiExpense } from "react-icons/gi";

function Dashboard() {
  return (
    <div className="flex h-full w-full bg-[#0D1117] ">
      <Sidebar />

      <div className="p-8 h-[100vh] w-full flex flex-col">
        <div className="w-[100%] flex h-[40%] m-2 ml-0">
          <div className="w-[60%] h-full m-2 bg-[#161B22] rounded-md flex justify-start items-start  border-solid border-[1px] border-[#30363D]">
            <p className="border-solid border-b-[1px] h-[18%] border-[#30363D] p-2 pl-4 w-full text-white font-bold">
              Latest Expenses
            </p>
          </div>

          <div className="w-[40%] h-full m-2 bg-[#161B22] rounded-md flex justify-start items-start  border-solid border-[1px] border-[#30363D]"></div>
        </div>

        <div className="w-[100%] flex h-[20%] m-2 ml-0">
          <div className="w-[100%] h-full m-2 bg-[#161B22] rounded-md flex justify-start items-start  border-solid border-[1px] border-[#30363D] flex-col ">
            <p className="border-solid border-b-[1px] h-[30%] border-[#30363D] p-2 pl-4 w-full flex items-center text-white font-bold">
              Quick Access
            </p>

            <div className="flex justify-evenly h-[70%] p-2 w-full items-center">
              <ExpenseForm />

              <TripForm />

              <RecurringForm/>

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
