"use client"
import Sidebar from '@/components/Sidebar'
import React, { useEffect, useState } from 'react'

import { Expense, columns, columnsMonthly } from "./columns"
import { DataTable, DataTableMonthly } from "./data-table"
import axios from 'axios'
import ExpenseForm from '@/components/forms/expenseForm'
import RecurringForm from '@/components/forms/recurringForm'
 



function Expenses() {
 const [data, setData] = useState([]);
 const [data2, setData2] = useState([]);

const [isFetching, setisFetching] = useState(false)
  

async function  getIncome () {
          
    try {
      setisFetching(true)
      const result = await axios.get("/api/expense")

      console.log(result)
      console.log(result.data.data)

        setData(result.data.data)
        setData2(result.data.data2)


    } catch (error:any) {
        console.log("here")

    } finally{
      setisFetching(false)
    }

  }

  const handleSubmit = async (e:any) => {
    e.preventDefault()
   
  
    setTimeout(() => {
      if(isFetching === false){
        console.log("first ok")
        getIncome();
    }
    }, 700);
    
  }

  useEffect(() => {

    getIncome();
  
  }, [setData ])
    
  return (

    <div className="flex h-[100vh] md:flex-row flex-col w-full bg-[#0D1117] ">
      <div className='fixed z-10 '><Sidebar />
      </div>
      
      <div className="container mx-auto py-10 md:ml-[20vw] mt-12 md:mt-0">
<DataTable columns={columns} data={data} />
<div onSubmit={(e:any) => handleSubmit(e)}    className='text-white p-4 bg-[#161B22] rounded-md mt-4 mb-4 order-solid border-[1px] border-[#30363D] hover:bg-[#010409] cursor-pointer'>  <ExpenseForm/>
</div>
<DataTableMonthly columns={columnsMonthly} data={data2} />
<div onSubmit={(e:any) => handleSubmit(e)}     className='text-white p-4 bg-[#161B22] rounded-md mt-4 mb-4 order-solid border-[1px] border-[#30363D] hover:bg-[#010409] cursor-pointer'>  <RecurringForm/>
</div>
</div>
</div>



  )
}

export default Expenses