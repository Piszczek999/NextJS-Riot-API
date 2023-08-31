"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { regions } from "../constants";

export default function Searchbar() {
  const router = useRouter();

  const [text, setText] = useState("");
  const [region, setRegion] = useState("eune");

  const handleSubmit = (e) => {
    e.preventDefault();
    setText("");
    router.replace(`/summoner/${regions[region]}/${text}`);
  };

  return (
    <form onSubmit={handleSubmit} className="flex border-2 rounded-full">
      <div className="dropdown p-2 bg-gray-100 rounded-l-full">
        <button type="button" className="px-2">
          <p className="uppercase">{region}</p>
        </button>
        <div className="dropdown-content dropdown-scrollable">
          {Object.keys(regions).map((regionKey) => (
            <button
              key={regionKey}
              className="drop-item"
              type="button"
              onClick={() => {
                setRegion(regionKey);
              }}
            >
              <p className="uppercase">{regionKey}</p>
            </button>
          ))}
        </div>
      </div>
      <input
        className="p-2 w-full"
        placeholder="Type in Summoner's name"
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        name="text"
      />
      <div className="flex items-center px-2 bg-gray-100 rounded-r-full">
        <button type="submit">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </button>
      </div>
    </form>
  );
}
