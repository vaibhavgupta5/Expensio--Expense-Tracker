"use client";
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
import { GiExpense } from "react-icons/gi";
function RecurringForm() {
  const session = useSession();
  const [open, setOpen] = useState(false);

  const onSubmitExpense = async (e: any) => {
    e.preventDefault();

    const username = session.data?.user.username;
    const expenseAmount = e.target[1].value;
    const expenseSource = e.target[0].value;

    const data: any = {
      username,
      expenseAmount,
      expenseSource,
    };

    try {
      const result = await axios.post<apiResponse>("/api/monthlyExpense", data);

      toast({
        title: "Success",
        description: "Monthly Expense added successfully",
      });
      setOpen(false);
    } catch (error) {
      toast({
        title: "Failed",
        description: "Please try again!",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-transparent hover:bg-transparent h-full w-[100%]  flex justify-center items-center text-white cursor-pointer  font-semibold">
        <GiExpense className="bg-[#161B22] p-2 text-4xl rounded-full mr-2" />
        <p>+ New Recurring Expense</p>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>New Monthly Expense</DialogTitle>
          <DialogDescription>
            Add your new recurring monthly expense here. Click save when youre done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={(e) => onSubmitExpense(e)}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="expenseSource" className="text-right">
              Source
              </Label>
              <Input
                id="expenseSource"
                placeholder="House Rent"
                required={true}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="expenseAmount" className="text-right">
                Amount
              </Label>
              <Input
                id="expenseAmount"
                type="number"
                placeholder="Rs.XX,XXX"
                required={true}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default RecurringForm;
