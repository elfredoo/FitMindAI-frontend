import React from "react";

export default function BackDrop({ data }) {
  return (
    <div
      className={`z-20 transition-all duration-200 opacity-30 w-screen h-screen bg-slate-300 fixed ${
        data ? "top16" : "top-0"
      } left-0`}
    ></div>
  );
}
