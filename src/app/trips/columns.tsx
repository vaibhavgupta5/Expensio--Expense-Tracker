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

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

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
    cell: ({ getValue }) => formatDate(getValue<string>()),
  },
  {
    accessorKey: "achieveTill",
    header: "Trip Date",
    // cell is a property that allows custom func to class.. getValue is a func that takes out value of accessorKey and sends to date format func.
    cell: ({ getValue }) => formatDate(getValue<string>()),
  },
]

