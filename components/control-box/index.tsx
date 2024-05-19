"use client";

import React, { useState } from 'react'
import ScrollTopControl from './scroll-top-control'
import ShowMoreGoals from './show-more-goals';


export default function ControlBox() {

  return (
    <div className='fixed bottom-10 w-[calc(100vw-2rem)] max-w-5xl mx-auto bg-transparent flex justify-between'>
      <ShowMoreGoals />
      <ScrollTopControl />
    </div>
  )
}
