"use client";
import { useGlobalContext } from "@/context/context";
import { useEffect } from "react";
import { useClerk } from "@clerk/nextjs";
import { DataTable } from "./_components/data-table";
import { columns } from "./tableConfig";

function ExpensesScreen() {
  const { getAllExpenses, expenseList } = useGlobalContext();
  const { user } = useClerk();
  useEffect(() => {
    user && getAllExpenses();
  }, [user]);

  return (
    <div className="p-10">
      <h2 className="font-bold text-3xl">My Expenses</h2>
        <DataTable columns={columns} data={expenseList} />
      <section className="w-full flex justify-center items-center">
      </section>
      {/* <ExpenseListTable
        expenseList={expenseList}
        refreshData={() => getAllExpenses()}
      /> */}
    </div>
  );
}

export default ExpensesScreen;
