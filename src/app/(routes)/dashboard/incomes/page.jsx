import React from "react";
import IncomeList from "./_components/IncomeList";

function page() {
  return (
    <div className="p-4 md:p-6 overflow-y-auto">
      <h2 className="font-bold text-3xl">My Incomes</h2>
      <IncomeList />
    </div>
  );
}

export default page;