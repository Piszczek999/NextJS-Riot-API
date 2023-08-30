import Image from "next/image";
import bronze from "../ranked-emblem/emblem-bronze.png";

export default async function MainProfile({ summoner }) {
  return (
    <div className="flex p-2 pb-4 bg-gray-300 shadow">
      <div className="relative">
        <img
          className="rounded-full drop-shadow-lg"
          src={
            "http://ddragon.leagueoflegends.com/cdn/13.16.1/img/profileicon/" +
            summoner.profileIconId +
            ".png"
          }
          alt=""
          width={100}
        />
        <span className="text-sm text-center bg-gray-100 border-2 border-gray-400 shadow rounded-full absolute -bottom-2 left-0 right-0 w-1/2 m-auto">
          {summoner.summonerLevel}
        </span>
      </div>
      <div className="m-5">
        <p className="text-4xl text-blue-700 font-semibold drop-shadow">
          {summoner.name}
        </p>
      </div>
    </div>
  );
}
