import React from "react";
import BudgetList from "./_components/BudgetList";

function page() {
  return (
    <div className="p-4 md:px-14 md:py-10 overflow-y-auto">
      <h2 className="font-bold text-3xl">My Budgets</h2>
      <BudgetList />
    </div>
  );
}

export default page;
