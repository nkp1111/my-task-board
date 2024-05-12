"use client";

import React, { useEffect, useRef, useState } from 'react'
import editSvg from "@/public/assets/Edit_duotone.svg"
import Image from "next/image";
import useGlobalContext from '@/lib/general/context';


const BOARD_NAME = "My Task Board"

export default function TaskBoardName() {
  const { setGoal, goal } = useGlobalContext()
  const [editBoardName, setEditBoardName] = useState(false);
  const boardNameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editBoardName) boardNameRef?.current?.focus()
  }, [editBoardName]);

  useEffect(() => {
    const input = boardNameRef.current;
    if (input) {
      const handleChange = (e: Event) => {
        const target = e.target as HTMLInputElement;
        setGoal((pre: any) => ({ ...pre, name: target.value.slice(0, 14) }));
      };
      input.addEventListener("input", handleChange);
      return () => {
        input.removeEventListener("input", handleChange);
      };
    }
  }, []);

  return (
    <>
      <div className="flex flex-col gap-3">
        <h1 className="inline w-fit py-0">
          <input
            aria-label='Board name'
            type="text"
            className={`border-none outline-none !bg-transparent !p-0 h-full input md:text-5xl text-4xl !flex-shrink-0 disabled:text-black/90 max-w-80`}
            ref={boardNameRef}
            disabled={!editBoardName}
            value={goal?.name}
          />
        </h1>
        <p>Tasks to keep organized</p>
      </div>
      <span className="tooltip tooltip-bottom cursor-pointer" data-tip={"Edit"}
        onClick={() => setEditBoardName(pre => !pre)}>
        <Image
          src={editSvg}
          alt={"Edit"}
          className="w-8 h-8 mt-3"
        />
      </span>
    </>
  )
}
