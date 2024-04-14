"use client";

import React, { ComponentProps } from 'react'
import { useFormStatus } from "react-dom";

type FormSubmitButtonProps = {
  children: React.ReactNode, className?: string
} & ComponentProps<"button">;

export default function SubmitFormButton(
  { children, className, ...props }
    : FormSubmitButtonProps
) {

  const { pending } = useFormStatus();

  return (
    <button
      {...props}
      type="submit"
      disabled={pending}
      className={`${className} btn`}
    >
      {pending && <span className="loading loading-spinner" />}
      {children}
    </button>
  )
}