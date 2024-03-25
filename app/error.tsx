"use client";

import React from 'react'

type ErrorProps = {
  error: Error;
  reset: () => void;
};

export default function Error({ error, reset }: ErrorProps) {
  return (
    <div className='w-auto h-svh flex justify-center items-center flex-col'>
      <p className="mt-4 text-red-500 text-2xl font-medium text-center md:mx-10 mx-3">
        {error.message || "Something Went Wrong!!!"}
      </p>

      <button
        type="button"
        onClick={() => reset()}
        className="inline-block px-5 py-3 mt-6 text-sm font-medium text-white bg-indigo-600 rounded hover:bg-indigo-700 focus:outline-none focus:ring cursor-pointer"
      >
        Try Again
      </button>
    </div>
  )
}
