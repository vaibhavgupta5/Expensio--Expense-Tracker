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
import { LoaderCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { apiResponse } from "@/types/apiResponse";
import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { FaPiggyBank } from "react-icons/fa";




function IncomeForm({income}:any) {
  const session = useSession();
  const [open, setOpen] = useState(false);
  const [isFetching, setisFetching] = useState(false);

  const onSubmitIncome = async (e: any) => {
    e.preventDefault();

    const amount = e.target[0].value;

    const data: any = {
      username: session.data?.user?.image ? session.data?.user.name : session.data?.user.username,
      amount,
    };

    try {
      setisFetching(true);

      const result = await axios.post<apiResponse>("/api/incomesource", data);

      toast({
        title: "Success",
        description: "Income Updated successfully",
      });
      setOpen(false);
    } catch (error) {
      setisFetching(true);
      toast({
        title: "Failed",
        description: "Please try again!",
        variant: "destructive",
      });
    } finally {
      setisFetching(false);
    }
  };


  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
      <Button className="bg-transparent hover:bg-transparent h-full w-[100%]  flex justify-center items-center text-white cursor-pointer  font-semibold">
                  <FaPiggyBank className="bg-[#161B22] p-2 text-4xl rounded-full mr-2" />
                  <p> Balance : ₹{income}</p>
                </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Balance</DialogTitle>
          <DialogDescription>
            Update your balance here. Click save when youre done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={(e) => onSubmitIncome(e)}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="amount" className="text-right">
                Amount
              </Label>
              <Input
                id="amount"
                type="number"
                placeholder="Rs.XX,XXX"
                defaultValue={income}
                required={true}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter className="flex items-center">
            {isFetching && <LoaderCircle className="animate-spin" />}
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default IncomeForm;
