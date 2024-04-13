import React from 'react'

export default function MainPaddingX({ children }: { children: React.ReactNode }) {
  return (
    <div className='px-4 sm:px-10 md:px-24 lg:px-32'>
      {children}
    </div>
  )
}
