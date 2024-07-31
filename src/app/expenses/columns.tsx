"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Expense = {
  _id: string
  amount: number
  title: string
  createdAt: string
}

export const columns: ColumnDef<Expense>[] = [
    {
        accessorKey: "_id",
        header: "Expense ID",
      },
      {
        accessorKey: "title",
        header: "Expense Title",
      },
    {
    accessorKey: "amount",
    header: "Amount (in Rs.)",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
]


export type MonthlyExpense = {
  _id: string
  amount: number
  expenseSource: string
  createdAt: string
}

export const columnsMonthly: ColumnDef<MonthlyExpense>[] = [
    {
        accessorKey: "_id",
        header: "Monthly Expense ID",
      },
      {
        accessorKey: "expenseSource",
        header: "Monthly Expense Source",
      },
    {
    accessorKey: "amount",
    header: "Amount (in Rs.)",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
]
