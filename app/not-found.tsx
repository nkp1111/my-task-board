import React from 'react'

export default function NotFound() {
  return (
    <div className='w-auto flex items-center flex-col '>
      <h1 className='mt-20 text-2xl font-medium '>Page Not Found</h1>
      <h2 className='my-10 text-5xl text-red-500 font-bold'>404</h2>
      <p>Please check the url and visit correct location.</p>
    </div>
  )
}
