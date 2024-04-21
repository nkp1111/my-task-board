"use client";

import { carouselData } from '@/constant/introduction-carousel';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'

export default function BackgroundStyle() {
  const [currentItem, setCurrentItem] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentItem((pre) => pre < carouselData.length - 1 ? pre + 1 : 0)
    }, 2000)

    return () => clearInterval(interval)
  }, []);

  return (
    <div className="w-full carousel bg-secondary h-full relative md:px-2">
      {carouselData.map((data, index) => (
        <article key={data.id} className={`carousel-item w-full h-full flex flex-col transition-[display] duration-300 ease-linear ${currentItem === index ? "block" : "hidden"}`}>
          {/* <div dangerouslySetInnerHTML={{ __html: data.Iframe }}></div> */}
          <div className='relative w-full mx-auto md:mt-20 overflow-hidden md:h-[450px] h-full'>
            <Image
              src={data.image}
              alt={data.title}
              width={500}
              height={500}
              className='absolute top-0 left-0 w-full object-center object-cover'
            />
          </div>
          <div className='text-start text-white bg-black/20 p-2 rounded-sm md:bg-transparent absolute bottom-20 lg:left-1/2 lg:-translate-x-1/2 left-10 right-10 filter backdrop-blur-sm'>
            <h3 className='md:text-slate-50'>{data.title}</h3>
            <p className='font-medium sm:text-xl text-lg mt-2 md:mx-auto'>{data.description}</p>
          </div>
        </article>
      ))}

      <ul className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-1">
        {carouselData.map((_, index) => (
          <li key={index} className={`h-2 rounded-full transition-all duration-300 ease-linear  ${index === currentItem ? "w-5 bg-white" : "w-2 bg-slate-300"} `}></li>
        ))}
      </ul>
    </div>
  )
}
