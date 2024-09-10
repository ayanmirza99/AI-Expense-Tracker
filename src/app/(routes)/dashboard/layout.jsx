"use client";
import React, { useEffect } from "react";
import SideNav from "./_components/SideNav";
import DashboardHeader from "./_components/DashboardHeader";
import { db } from "../../../../utils/dbConfig";
import { Budgets } from "../../../../utils/schema";
import { useUser } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { useRouter } from "next/navigation";
import Loader from "./Loader";
import { useGlobalContext } from "@/context/context";
import NextTopLoader from "nextjs-toploader";

const DashboardLayout = ({ children }) => {
  const { expand, setExpand, mobileScreen } = useGlobalContext();

  const { user } = useUser();
  const router = useRouter();

  const checkUserBudgets = async () => {
    const result = await db
      .select()
      .from(Budgets)
      .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress));
    // if (result?.length === 0){
    //     router.replace("/dashboard/budgets")
    // }
  };

  useEffect(() => {
    user && checkUserBudgets();
  }, [user]);

  return (
    <>
      {user ? (
        <div className="h-full w-full flex">
          <section className="">
            <SideNav
              expand={expand}
              setExpand={setExpand}
              mobileScreen={mobileScreen}
            />
          </section>
          <section className="w-full h-[100dvh] flex flex-col">
            <DashboardHeader
              expand={expand}
              setExpand={setExpand}
              mobileScreen={mobileScreen}
            />
            <NextTopLoader color="#4845D2" showAtBottom/>
            {children}
          </section>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default DashboardLayout;
