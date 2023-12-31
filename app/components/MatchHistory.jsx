"use client";

import { useEffect, useState } from "react";
import Match from "./Match";

async function clientGetMatch(matchId) {
  const res = await fetch("/api/match/" + matchId);
  return res.json();
}

export default function MatchHistory({ summoner, matchIds }) {
  const [visibleMatches, setVisibleMatches] = useState(5);
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadMoreMatches = () => {
    setVisibleMatches(visibleMatches + 5);
  };

  useEffect(() => {
    const fetchMatches = async () => {
      setLoading(true);
      const additionalMatches = await Promise.all(
        matchIds.slice(visibleMatches - 5, visibleMatches).map(clientGetMatch)
      );
      setMatches((prevMatches) => [...prevMatches, ...additionalMatches]);
      setLoading(false);
    };
    fetchMatches();
  }, [visibleMatches]);

  return (
    <div className="flex flex-col gap-2 grow">
      {matches.map((match) => (
        <Match
          key={match.metadata.matchId}
          puuid={summoner.puuid}
          match={match}
        />
      ))}
      {loading &&
        [1, 2, 3, 4, 5].map((e) => (
          <div
            key={e}
            className="flex h-24 gap-4 shadow px-2 bg-gray-100 items-center"
          >
            <div className="basis-20 h-5/6 bg-gray-200 rounded"></div>
            <div className="basis-20 h-5/6 bg-gray-200 rounded"></div>
            <div className="basis-32 h-5/6 bg-gray-200 rounded"></div>
            <div className="basis-20 h-5/6 bg-gray-200 rounded"></div>
            <div className="basis-56 h-5/6 bg-gray-200 rounded"></div>
          </div>
        ))}
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
        onClick={loadMoreMatches}
      >
        Load More
      </button>
    </div>
  );
}
