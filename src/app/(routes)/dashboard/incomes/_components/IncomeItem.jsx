import React from "react";

function IncomeItem({ income }) {
    console.log(income);
    
  return (
    <div
      className="p-5 border rounded-2xl
    hover:shadow-md duration-150 ease-in-out cursor-pointer h-[170px] min-w-[300px] md:min-w-[390px]"
    >
      <div className="flex gap-2 items-center justify-between">
        <div className="flex gap-2 items-center">
          <h2
            className="text-xl p-3
              bg-slate-100 rounded-full 
              "
          >
            {income.icon}
          </h2>
          <div>
            <h2 className="font-bold">{income.name}</h2>
          </div>
        </div>
        <h2 className="font-bold text-primary text-lg"> Rs. {income.amount}</h2>
      </div>
    </div>
  );
}

export default IncomeItem;
