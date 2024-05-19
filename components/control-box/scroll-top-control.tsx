"use client";

import React from 'react'

export default function ScrollTopControl() {
  const goToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })
  return (
    <div className='grid tooltip place-items-center opacity-50 hover:opacity-100 transition-opacity duration-300 ease-linear size-16 rounded-full bg-error cursor-pointer'
      onClick={goToTop}
      data-tip="Back to top">
      <svg xmlns="http://www.w3.org/2000/svg" width="32px" height="32px" viewBox="0 0 24 24" fill="none">
        <path d="M12 4V20M12 4L8 8M12 4L16 8" className='stroke-error-content' strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  )
}
