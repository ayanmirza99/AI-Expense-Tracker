"use client";
import React, { useEffect } from "react";
import CreateIncome from "./CreateIncome";
import { useUser } from "@clerk/nextjs";
import { useGlobalContext } from "@/context/context";
import IncomeItem from "./IncomeItem";

function BudgetList() {
  const { user } = useUser();
  const { incomeList, getIncomeList } = useGlobalContext();

  useEffect(() => {
    user && getIncomeList();
  }, [user]);

  return (
    <div className="mt-7">
      <div className="flex justify-center md:justify-normal flex-wrap gap-4">
        <CreateIncome refreshData={() => getIncomeList()} />
        {incomeList?.length > 0
          ? incomeList.map((income, index) => (
              <IncomeItem income={income} key={index} />
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
