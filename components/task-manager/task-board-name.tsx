"use client";

import React, { useEffect, useRef, useState } from 'react'
import editSvg from "@/public/assets/Edit_duotone.svg"
import Image from "next/image";
import { useCookies } from 'react-cookie';


const BOARD_NAME = "My Task Board"

export default function TaskBoardName() {
  const [cookies, setCookie] = useCookies(["goal_name"]);

  const [editBoardName, setEditBoardName] = useState(false);
  const boardNameRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    if (localStorage) {
      const goalName = localStorage.getItem("goal_name");
      if (!boardNameRef.current) return;
      if (goalName) {
        // set goal name
        boardNameRef.current.innerText = goalName;
      }
      else {
        // set default goal name
        boardNameRef.current.innerText = BOARD_NAME;
        localStorage.setItem("goal_name", BOARD_NAME);
        setCookie("goal_name", BOARD_NAME);
      }
    }
  }, []);

  useEffect(() => {
    if (editBoardName && boardNameRef.current) {
      boardNameRef.current.focus();
    }
  }, [editBoardName]);

  useEffect(() => {
    if (boardNameRef.current) {
      boardNameRef.current.addEventListener("input", function (event) {
        // if (event.key === "Enter") {
        //   event.preventDefault();
        //   // Optionally handle Enter key press here
        //   return;
        // }
        const text = this.innerText.trim();
        const charCount = text.length;

        if (charCount > 25) {
          this.innerText = text.slice(0, 25);
        }
      })
    }
  }, [boardNameRef]);

  useEffect(() => {
    if (!editBoardName && boardNameRef.current) {
      localStorage.setItem("goal_name", boardNameRef.current.innerText);
      setCookie("goal_name", boardNameRef.current.innerText);
    }
  }, [editBoardName, setCookie]);

  return (
    <>
      <div className="flex flex-col gap-3">
        <h1 className="md:text-5xl text-4xl"
          contentEditable={editBoardName}
          ref={boardNameRef}
        >
        </h1>
        <p>Tasks to keep organized</p>
      </div>
      <span className="tooltip tooltip-bottom cursor-pointer" data-tip={"Edit"}
        onClick={() => setEditBoardName(pre => !pre)}>
        <Image
          src={editSvg}
          alt={"Edit"}
          className="w-8 h-8 mt-1"
        />
      </span>
    </>
  )
}
