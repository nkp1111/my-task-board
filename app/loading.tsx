import React from 'react'

export default function loading() {
  return (
    <div className='w-full pt-20 text-4xl flex justify-center items-center min-h-screen'>
      Loading <span className='animate-pulse'>...</span>
    </div>
  )
}
