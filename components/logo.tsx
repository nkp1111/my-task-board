"use client";

import Image from 'next/image'
import logoSvg from "@/public/assets/Logo.svg";
import { useFormState } from 'react-dom';
import React, { useEffect, useState } from 'react'
import { showAlert } from '@/lib/alert';


interface LogoSVGParam extends SVGTypeParams {
  handleSaveGoal: (prevState: any, queryData: FormData) => Promise<{
    error: string;
    success?: undefined;
  } | {
    success: string;
    error?: undefined;
  }>
}


export default function Logo({ width = 50, height = 50, className, handleSaveGoal }: LogoSVGParam) {

  const [state, formAction] = useFormState(handleSaveGoal, null);

  useEffect(() => {
    if (state) {
      const { error, success } = state;
      if (error) showAlert(error || "Something went wrong", "error");
      if (success) showAlert(success, "success");
    }
  }, [state]);


  return (
    <form action={formAction}>
      <button type="submit"
        className="tooltip cursor-pointer tooltip-bottom"
        data-tip={"Save"}
        aria-label='Save current task'>
        <Image
          src={logoSvg}
          alt={'logo'}
          width={width}
          height={height}
          className={className}
          role="button"
        />
      </button>
    </form>

  )
}
