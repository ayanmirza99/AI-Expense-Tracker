"use client";
import { useState } from "react";
import Header from "./_components/Header";
import { Hero } from "./_components/Hero";

export default function page() {
  // const [databaseUrl, setDatabaseUrl] = useState(process.env.NEXT_PUBLIC_DATABASE_URL);
  return (
    <>
      {/* <h1>{databaseUrl}</h1> */}
      <Header />
      <Hero />
    </>
  );
}
