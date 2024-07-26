"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { CalendarIcon, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import axios from "axios";
import { toast } from "@/components/ui/use-toast";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { infoformSchema } from "@/schemas/infoformSchema";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { apiResponse } from "@/types/apiResponse";
import { useRouter } from "next/navigation";

function InfoForm() {
  const [isSubmitting, setisSubmitting] = useState(false);
  const session = useSession();
  const router = useRouter();

  const form = useForm<z.infer<typeof infoformSchema>>({
    resolver: zodResolver(infoformSchema),
    defaultValues: {
      username: session.data?.user.username,
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof infoformSchema>> = async (
    data
  ) => {
    setisSubmitting(true);
    try {
      const result = await axios.post<apiResponse>("/api/overlayform", data);

      console.log(data);
      console.log(result);

      toast({
        title: "Success",
      });

        router.push("/dashboard")
       setisSubmitting(false);
       
    } catch (error: any) {
      toast({
        title: "Something Went Wrong",
        description: error?.response?.data.message,
        variant: "destructive",
      });
      setisSubmitting(false);
    }
  };

  return (
    <div className="lg:p-32 md:p-0 p-4 md:pt-0 md:pb-0 bg-[#0D1117] h-full md:flex-row flex-col flex justify-center items-center w-full md:h-[100vh]">
      <div className="md:text-8xl text-6xl p-2 md:w-[45%] font-extrabold text-white">
        <p className="md:text-4xl text-2xl not-italic font-semibold pb-4">{`Hey ${session.data?.user.username},`}</p>
        PLEASE <br></br> FILL YOUR INITIAL INFO!
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4  md:w-[55%] "
        >
          <div className="flex flex-wrap justify-center items-center">
            <div className="flex flex-col w-full p-2">
              <FormLabel className="p-2 pl-1 text-white text-lg">
                Username
              </FormLabel>
              <FormField
                name="username"
                control={form.control}
                defaultValue={session.data?.user.username}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        defaultValue={session.data?.user.username}
                        className="p-6 w-full placeholder:text-[#0D1117] placeholder:font-semibold disabled:bg-white pb-8 pt-8 text-[16px]"
                        placeholder={session.data?.user.username}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex flex-col w-full md:w-[50%] p-2">
              <FormLabel className="p-2 pl-1 text-white text-lg">
                Monthly Income
              </FormLabel>
              <FormField
                name="IncomeAmount"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="number"
                        className="p-6 w-full placeholder:text-[#0D1117]  pb-8 pt-8 text-[16px]"
                        placeholder="Rs. XX,XXX"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex flex-col w-full md:w-[50%] p-2">
              <FormLabel className="p-2 pl-1 text-white text-lg">
                Save Target
              </FormLabel>
              <FormField
                name="saveTarget"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="number"
                        className="p-6 w-full pb-8 pt-8 text-[16px]"
                        placeholder="Rs. XX,XXX"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex flex-col w-full md:w-[50%] p-2">
              <FormLabel className="p-2 pl-1 text-white text-lg">
                Recurring Expense Source
              </FormLabel>
              <FormField
                name="expenseSource"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="p-6 w-full pb-8 pt-8 text-[16px]"
                        placeholder="House Rent"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex flex-col w-full md:w-[50%] p-2">
              <FormLabel className="p-2 pl-1 text-white text-lg">
                Recurring Expense Amount
              </FormLabel>
              <FormField
                name="expenseAmount"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="number"
                        className="p-6 w-full pb-8 pt-8 text-[16px]"
                        placeholder="Rs. XX,XXX"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex flex-col w-full md:w-[50%] p-2">
              <FormLabel className="p-2 pl-1 text-white text-lg">
                Which Trip you want to go?
              </FormLabel>
              <FormField
                name="wishlistName"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="p-6 w-full pb-8 pt-8 text-[16px]"
                        placeholder="Thailand"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex flex-col w-full md:w-[50%] p-2">
              <FormLabel className="p-2 pl-1 text-white text-lg">
                When you want to go for Trip?{" "}
              </FormLabel>
              <FormField
                name="wishlistAchieveDate"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "pl-3 text-left font-normal p-6 w-full placeholder:text-[#0D1117]  pb-8 pt-8 text-[16px]",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field?.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date < new Date()
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex flex-col w-full p-2">
              <FormLabel className="p-2 pl-1 text-white text-lg">
                What will be cost of Trip?
              </FormLabel>
              <FormField
                name="wishlishAmt"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="number"
                        className="p-6 w-full pb-8 pt-8 text-[16px]"
                        placeholder="Rs. XX,XXX"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button
              className="w-full p-8 text-lg m-2 border-solid border-white border-[1px] bg-[#0D1117] font-semibold"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin" />
                  Please Wait
                </>
              ) : (
                <>PROCEED</>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default InfoForm;
