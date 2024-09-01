"use client";
import React from "react";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import Image from "next/image";

export function Hero() {
    return (
        <section className="bg-gray-50 flex items-center flex-col">
            <div className="flex flex-col overflow-hidden">
                <ContainerScroll
                    titleComponent={
                        <>
                            <h1 className="text-4xl font-bold text-black dark:text-white">
                                Manage your Money with AI-Driven Personal<br />
                                <span className="text-6xl text-primary md:text-[6rem] font-extrabold mt-4 leading-none">
                                    Finance Advisor
                                </span>
                            </h1>
                        </>
                    }>
                    <Image
                        src={`/linear.webp`}
                        alt="hero"
                        height={720}
                        width={1400}
                        className="mx-auto rounded-2xl object-cover h-full w-full object-left-bottom"
                        draggable={false} />
                </ContainerScroll>
            </div>
        </section>
    );
}
