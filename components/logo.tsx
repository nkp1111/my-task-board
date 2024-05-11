"use client";

import Image from 'next/image'
import logoSvg from "@/public/assets/Logo.svg";
import React, { useEffect, useState } from 'react'
import { showAlert } from '@/lib/alert';
import useGlobalContext from '@/lib/general/context';


export default function Logo({ width = 50, height = 50, className }: SVGTypeParams) {

  // TODO: save this goal
  // TODO: update this goal
  const { saveGoal, loading } = useGlobalContext();

  return (
    <button
      type="button"
      className="tooltip tooltip-bottom"
      data-tip={"Save"}
      aria-label='Save current task'
      onClick={saveGoal}
      disabled={loading}>
      <Image
        src={logoSvg}
        alt={'logo'}
        width={width}
        height={height}
        className={className + ` ${loading ? "filter grayscale  cursor-not-allowed" : "cursor-pointer"}`}
        role="button"
      />
    </button>
  )
}
