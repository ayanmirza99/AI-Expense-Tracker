"use client"
import React, { useEffect, useState } from 'react'
import SideNav from './_components/SideNav'
import DashboardHeader from './_components/DashboardHeader'
import { useWindowWidth } from '@react-hook/window-size'
import { db } from '../../../../utils/dbConfig'
import { Budgets } from '../../../../utils/schema'
import { useUser } from '@clerk/nextjs'
import { eq } from 'drizzle-orm'
import { useRouter } from 'next/navigation'

const DashboardLayout = ({ children }) => {
    const [expand, setExpand] = useState(false)
    const screenWidth = useWindowWidth();
    const mobileScreen = screenWidth < 768;

    const { user } = useUser()
    const router = useRouter()

    const checkUserBudgets = async () => {
        const result = await db
                        .select()
                        .from(Budgets)
                        .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
        // if (result?.length === 0){
        //     router.replace("/dashboard/budgets")
        // }
    }

    useEffect(() => {
        user && checkUserBudgets()
    }, [user])


    return (
        <>
            <div className='h-full w-full flex'>
                <section className='w-max'>
                    <SideNav expand={expand} setExpand={setExpand} mobileScreen={mobileScreen} />
                </section>
                <section className='w-full h-[100dvh] flex flex-col'>
                    <DashboardHeader expand={expand} setExpand={setExpand} mobileScreen={mobileScreen} />
                    {children}
                </section>
            </div>
        </>
    )
}

export default DashboardLayout