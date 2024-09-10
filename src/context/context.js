"use client";
import { createContext, useContext, useState } from "react";
import { db } from "../../utils/dbConfig";
import { Budgets, expenses, Incomes } from "../../utils/schema";
import { desc, eq, sql } from "drizzle-orm";
import { useUser } from "@clerk/nextjs";
import { useWindowWidth } from '@react-hook/window-size'

const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {
  const { user } = useUser();
  const [budgetList, setBudgetList] = useState([]);
  const [incomeList, setIncomeList] = useState([]);
  const [expenseList, setExpenseList] = useState([]);

  const [expand, setExpand] = useState(false);
  const screenWidth = useWindowWidth();
  const mobileScreen = screenWidth < 1000;

  const getBudgetList = async () => {
    const result = await db
      .select({
        id: Budgets.id,
        Icon: Budgets.Icon,
        name: Budgets.name,
        createdBy: Budgets.createdBy,
        totalItem: sql`count(${Budgets.id})`,
        totalSpend: sql`sum(${expenses.amount})`,
        amount: Budgets.amount,
      })
      .from(Budgets)
      .leftJoin(expenses, eq(Budgets.id, expenses.budgetId))
      .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
      .groupBy(Budgets.id)
      .orderBy(desc(Budgets.id));
    setBudgetList(result);
  };

  const getIncomeList = async () => {
    const result = await db
      .select({
        id: Incomes.id,
        amount: Incomes.amount,
        name: Incomes.name,
        icon: Incomes.Icon
      })
      .from(Incomes)
      .groupBy(Incomes.id);
    setIncomeList(result);
  };

  const getAllExpenses = async () => {
    const result = await db
      .select({
        id: expenses.id,
        name: expenses.name,
        expense: expenses.amount,
        createdBy: expenses.createdBy,
        budgetId: expenses.budgetId,
      })
      .from(expenses)
      .where(eq(expenses.createdBy, user?.primaryEmailAddress.emailAddress));
    setExpenseList(result);
  };

  return (
    <GlobalContext.Provider
      value={{
        expenseList,
        budgetList,
        incomeList,
        getAllExpenses,
        getBudgetList,
        getIncomeList,
        mobileScreen,
        expand,
        setExpand,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
