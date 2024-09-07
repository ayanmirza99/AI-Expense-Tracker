"use client"
import { useUser } from '@clerk/nextjs'
import { Sparkle } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import CardInfo from './_components/CardInfo'
import { db } from '../../../../utils/dbConfig'
import { Budgets, expenses, Incomes } from '../../../../utils/schema'
import { desc, eq, sql } from 'drizzle-orm'
import BarChart from './_components/BarChart'

const page = () => {
  const { user } = useUser()
  let financialAdvice;

  const [budgetList, setBudgetList] = useState([]);
  const [incomeList, setIncomeList] = useState([]);
  const [expenseList, setExpenseList] = useState([]);
  useEffect(() => {
    user && (
      getBudgetList(),
      getAllExpenses(),
      getIncomeList()
    )
  }, [user]);


  //  used to get budget List

  const getBudgetList = async () => {
    const result = await db.select({
      id: Budgets.id,
      createdBy: Budgets.createdBy,
      totalItem: sql`count(${Budgets.id})`,
      amount: Budgets.amount
    })
      .from(Budgets)
      .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
      .groupBy(Budgets.id)
    setBudgetList(result);
  };

  // Get Income stream list

  const getIncomeList = async () => {
    const result = await db.select({
      id: Incomes.id,
      amount: Incomes.amount,
    })
      .from(Incomes)
      .groupBy(Incomes.id);
    setIncomeList(result);
  };

  //  Used to get All expenses belong to users

  const getAllExpenses = async () => {
    const result = await db
      .select({
        id: expenses.id,
        name: expenses.name,
        amount: expenses.amount,
        createdBy: expenses.createdBy,
      })
      .from(expenses)
      // .rightJoin(expenses, eq(Budgets.id, expenses.budgetId))
      .where(eq(expenses.createdBy, user?.primaryEmailAddress.emailAddress))
    // .orderBy(desc(expenses.id));
    setExpenseList(result);
  };

  return (
    <>
      <div className='w-full h-full p-8 flex flex-col gap-8'>
        <section className='w-full flex flex-col gap-4'>
          <h1 className='text-5xl font-semibold'>Hi, <span className='text-primary'>{user?.fullName}</span> 👋</h1>
          <p className="text-gray-500 font-semibold text-lg">
            Here's what is happenning with your money, Lets Manage your expenses.
          </p>
        </section>
        <section className='max-w-[90%] h-max flex flex-col gap-6 outline outline-2 outline-gray-400 rounded-xl p-4'>
          <div className='flex gap-4 items-center'>
            <Sparkle />
            <h1 className='font-semibold text-2xl'>Alfred</h1>
          </div>
          <div className='min-h-[8rem]'>{financialAdvice || "Loading"}</div>
        </section>

        <section className='w-full flex flex-wrap gap-4'>
          <CardInfo budgetList={budgetList} incomeList={incomeList} expenseList={expenseList} />
        </section>

        <section className='w-full flex md:flex-row flex-col gap-4'>
          <div className='w-2/3 rounded-2xl border-2 border-gray-400'>
            <BarChart expenseList={expenseList} budgetList={budgetList}/>
          </div>
          <div className="w-1/3"></div>
        </section>

      </div>
    </>
  )
}

export default page