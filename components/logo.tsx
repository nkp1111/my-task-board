import Image from 'next/image'
import React from 'react'
import logoSvg from "@/public/assets/Logo.svg";

export default function Logo({ width = 50, height = 50, className }: SVGTypeParams) {
  return (
    <Image
      src={logoSvg}
      alt={'logo'}
      width={width}
      height={height}
      className={className}
    />
  )
}
