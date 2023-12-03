import React from "react";

function Input() {
  return (
    <>
      <label htmlFor="name">Name</label>
      <div className="mt-2">
        <input
          type="text"
          name="name"
          className="block w-full h-10 rounded-md border-0 py-1.5 pl-7 pr-20 border-slate-200 bg-white text-sm  text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-slate-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
      </div>
    </>
  );
}

export default Input;
