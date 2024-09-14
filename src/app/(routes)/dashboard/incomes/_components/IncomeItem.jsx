import { Trash2Icon } from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { db } from "../../../../../../utils/dbConfig";
import { Incomes } from "../../../../../../utils/schema";
import { eq } from "drizzle-orm";
import { useGlobalContext } from "@/context/context";
import { toast } from "sonner";

function IncomeItem({ income }) {
  const { getIncomeList } = useGlobalContext();

  const deleteIncome = async (id) => {
    try {
      await db.delete(Incomes).where(eq(Incomes.id, id));
      await getIncomeList();
      toast.error("Income Deleted!");
    } catch (error) {
      console.error("Error deleting income:", error);
      toast.error("Can't delete income. Something went wrong!");
    }
  };

  return (
    <div
      className="p-5 border rounded-2xl flex flex-col gap-4
    hover:shadow-md duration-150 ease-in-out cursor-pointer h-[145px] min-w-[300px] md:min-w-[390px]"
    >
      <div className="flex gap-2 items-center justify-between">
        <div className="flex gap-2 items-center justify-center">
          <h2
            className="text-2xl p-4
              bg-slate-100 rounded-full 
              "
          >
            {income.icon}
          </h2>
          <div>
            <h2 className="font-bold text-xl">{income.name}</h2>
          </div>
        </div>
        <h2 className="font-bold text-primary text-xl"> Rs. {income.amount}</h2>
      </div>
      <div className="w-full flex justify-end">
        <Dialog>
          <DialogTrigger asChild>
            <Trash2Icon className="text-red-500" />
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="text-lg">Delete Income</DialogTitle>
              <DialogDescription className="text-md">
                Are you sure you want to delete "{income.name}"?
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Cancel
                </Button>
              </DialogClose>
              <DialogClose>
                <Button
                  onClick={() => deleteIncome(income.id)}
                  type="submit"
                  variant="destructive"
                >
                  Yes
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

export default IncomeItem;
