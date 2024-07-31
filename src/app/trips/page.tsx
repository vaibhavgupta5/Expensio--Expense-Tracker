"use client";
import Sidebar from "@/components/Sidebar";
import React, { useEffect, useState } from "react";

import { columns} from "./columns";
import { DataTable } from "./data-table";
import axios from "axios";
import TripForm from "@/components/forms/tripsForm";

function Trips() {
  const [data, setData] = useState([]);

  const [isFetching, setisFetching] = useState(false);

  async function getTrips() {
    try {
      setisFetching(true);
      const result = await axios.get("/api/wishlist");

      console.log(result);
      console.log(result.data.data);

      setData(result.data.data);
    } catch (error: any) {
      console.log("here");
    } finally {
      setisFetching(false);
    }
  }

  const handleSubmit = async (e:any) => {
    e.preventDefault()
   
  
    setTimeout(() => {
      if(isFetching === false){
        console.log("first ok")
        getTrips();
    }
    }, 700);
    
  }

  useEffect(() => {
    getTrips();
  }, [setData]);

  return (
    <div className="flex h-[100vh] md:flex-row flex-col w-full bg-[#0D1117] ">
      <div className="fixed z-10 ">
        <Sidebar />
      </div>

      <div className="container mx-auto py-10 md:ml-[20vw] mt-12 md:mt-0">
        <DataTable columns={columns} data={data} />
        <div onSubmit={(e:any) => handleSubmit(e)}      className="text-white p-4 bg-[#161B22] rounded-md mt-4 mb-4 order-solid border-[1px] border-[#30363D] hover:bg-[#010409] cursor-pointer">
          {" "}
          <TripForm/>
        </div>
      </div>
    </div>
  );
}

export default Trips;