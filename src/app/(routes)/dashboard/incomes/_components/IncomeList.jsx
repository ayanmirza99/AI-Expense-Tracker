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
  console.log(incomeList);

  return (
    <div className="mt-7">
      <div className="flex justify-center md:justify-normal flex-wrap gap-4">
        <CreateIncome refreshData={() => getIncomeList()} />
        {incomeList?.length > 0 &&
          incomeList.map((income, index) => (
            <IncomeItem income={income} key={index} />
          ))}
        {incomeList.length === 0 &&
          incomeList !== "" &&
          [1, 2, 3, 4, 5].map((item, index) => (
            <div
              key={index}
              className="min-w-[280px] md:min-w-[350px] bg-slate-200 rounded-lg 
                  h-[150px] animate-pulse"
            ></div>
          ))}
        {incomeList === "" && (
          <div className="text-xl min-w-[280px] md:min-w-[350px] h-[150px] flex items-center justify-center text-red-600 font-semibold">
            No incomes
          </div>
        )}
      </div>
    </div>
  );
}

export default BudgetList;
