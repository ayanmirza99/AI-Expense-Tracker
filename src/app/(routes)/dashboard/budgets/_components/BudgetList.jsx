"use client";
import React, { useEffect } from "react";
import CreateBudget from "./CreateBudget";
import { useUser } from "@clerk/nextjs";
import BudgetItem from "./BudgetItem";
import { useGlobalContext } from "@/context/context";

function BudgetList() {
  const { user } = useUser();
  const { budgetList, getBudgetList } = useGlobalContext();

  useEffect(() => {
    user && getBudgetList();
  }, [user]);

  return (
    <div className="mt-7">
      <div className="flex justify-center md:justify-normal flex-wrap gap-4">
        <CreateBudget refreshData={() => getBudgetList()} />
        {budgetList?.length > 0
          ? budgetList.map((budget, index) => (
              <BudgetItem budget={budget} key={index} />
            ))
          : [1, 2, 3, 4, 5].map((item, index) => (
              <div
                key={index}
                className="min-w-[280px] md:min-w-[350px] bg-slate-200 rounded-lg 
                h-[150px] animate-pulse"
              ></div>
            ))}
      </div>
    </div>
  );
}

export default BudgetList;
