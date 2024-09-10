"use client"
import React from 'react'
import { Triangle } from 'react-loader-spinner'

const Loader = () => {
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <Triangle
        height="80"
        width="80"
        color="#4845d2"
        ariaLabel="triangle-loading"
      />
    </div>
  )
}

export default Loader