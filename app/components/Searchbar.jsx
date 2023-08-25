"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Searchbar() {
  const router = useRouter();

  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setText("");
    router.push(text);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        className="border-2 rounded-full p-2"
        placeholder="Type in Summoner's name"
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button type="submit" />
    </form>
  );
}
