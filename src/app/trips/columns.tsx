"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Expense = {
  amount: number
  name: string
  createdAt: string
  achieveTill: string

}

export const columns: ColumnDef<Expense>[] = [
    
      {
        accessorKey: "name",
        header: "Trip To",
      },
    {
    accessorKey: "amount",
    header: "Expense (in Rs.)",
  },
  {
    accessorKey: "createdAt",
    header: "Planning Date",
  },
  {
    accessorKey: "achieveTill",
    header: "Trip Date",
  },
]

