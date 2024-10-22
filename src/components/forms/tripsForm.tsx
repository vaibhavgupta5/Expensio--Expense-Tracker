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
import { wishListSchema } from "@/schemas/wishlistSchema";
import { apiResponse } from "@/types/apiResponse";
import axios from "axios";
import { LoaderCircle } from "lucide-react";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { FaPiggyBank, FaPlaneDeparture, FaRupeeSign } from "react-icons/fa";

function TripForm() {
  const session = useSession();
  const [open, setOpen] = useState(false);
  const [isFetching, setisFetching] = useState(false);

  const onSubmitTrip = async (e: any) => {
    e.preventDefault();

    const wishlishAmt = e.target[1].value;
    const wishlistName = e.target[0].value;
    const wishlistAchieveDate = e.target[2].value;

    const data: any = {
      username: session.data?.user?.image ? session.data?.user.name : session.data?.user.username,
      wishlistName,
      wishlishAmt,
      wishlistAchieveDate,
    };


    try {
      setisFetching(true);

      const result = await axios.post<apiResponse>("/api/wishlist", data);

      toast({
        title: "Success",
        description: "Trip added successfully",
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
          <FaPlaneDeparture className="bg-[#161B22] p-2 text-4xl rounded-full mr-2" />
          <p>+ New Trip</p>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>New Trip</DialogTitle>
          <DialogDescription>
            Add your new trip here. Click save when youre done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={(e) => onSubmitTrip(e)}>
          <div className="grid  gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="TripTitle" className="text-right">
                Trip to?
              </Label>
              <Input
                id="TripTitle"
                placeholder="Bangkok"
                required={true}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="wishlishAmt" className="text-right">
                Amount?
              </Label>
              <Input
                id="wishlishAmt"
                type="number"
                placeholder="Rs.XX,XXX"
                required={true}
                className="col-span-3"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="wishlistAchieveDate" className="text-right">
                Date?
              </Label>
              <Input
                id="wishlistAchieveDate"
                type="date"
                placeholder="30/02/26"
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

export default TripForm;
