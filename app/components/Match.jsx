import Link from "next/link";
import { queues, regions, runes, spells } from "../constants";

function getPlayer(match, puuid) {
  return match.info.participants.find((player) => player.puuid == puuid);
}

function getPrimaryRune(player) {
  if (player.perks.styles[0]?.selections[0]?.perk) {
    return player.perks.styles[0].selections[0].perk;
  }
  return 0;
}

function getSecondaryRune(player) {
  if (player.perks.styles[1]?.style) {
    return player.perks.styles[1].style;
  }
  return 0;
}

function getGameDuration(match) {
  const totalSeconds = match.info.gameDuration;

  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  const formattedTime = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;

  return formattedTime;
}

function getDate(timestamp) {
  const date = new Date(timestamp);

  const year = date.getFullYear();
  const month = date.getMonth() + 1; // Months are zero-based, so add 1
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}`;

  return formattedDateTime;
}

export default function Match({ match, puuid }) {
  const player = getPlayer(match, puuid);
  const playerItems = [
    player.item0,
    player.item1,
    player.item2,
    player.item6,
    player.item3,
    player.item4,
    player.item5,
  ];

  return (
    <div className="flex gap-4 shadow px-2 bg-gray-100 items-center h-24">
      <div className="basis-28">
        <p className="text-xs text-gray-500">{queues[match.info.queueId]}</p>
        {player.win && (
          <h3 className="text-lg text-green-500 font-medium">Victory</h3>
        )}
        {!player.win && (
          <h3 className="text-lg text-red-500 font-medium">Defeat</h3>
        )}
        <p className="text-xs text-gray-500">{getGameDuration(match)}</p>
        <p className="text-xs text-gray-500">
          {getDate(match.info.gameEndTimestamp)}
        </p>
      </div>

      <div className="flex gap-1 basis-20">
        <div>
          <img
            className="rounded-full"
            src={`https://ddragon.leagueoflegends.com/cdn/13.16.1/img/champion/${player.championName}.png`}
            alt={"image of" + player.championName}
            width={50}
          />
          <div className="flex gap-1 items-center justify-center">
            <img
              className="bg-gray-300 rounded-full"
              src={`https://lolg-cdn.porofessor.gg/img/d/perks/13.16/64/${getPrimaryRune(
                player
              )}.png`}
              alt=""
              width={20}
            />
            <img
              className="bg-gray-300 rounded-full p-1"
              src={`https://lolg-cdn.porofessor.gg/img/d/perks/13.16/64/${getSecondaryRune(
                player
              )}.png`}
              alt=""
              width={20}
            />
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <img
            className="rounded"
            src={`https://ddragon.leagueoflegends.com/cdn/13.16.1/img/spell/${
              spells[player.summoner1Id]
            }.png`}
            alt=""
            width={25}
          />
          <img
            className="rounded"
            src={`https://ddragon.leagueoflegends.com/cdn/13.16.1/img/spell/${
              spells[player.summoner2Id]
            }.png`}
            alt=""
            width={25}
          />
        </div>
      </div>

      <div className="grid grid-cols-4 gap-0.5 basis-32">
        {playerItems.map((item) =>
          item ? (
            <img
              key={item}
              src={`https://ddragon.leagueoflegends.com/cdn/13.16.1/img/item/${item}.png`}
              alt=""
              width={30}
            />
          ) : (
            <div className="size-30px bg-gray-300 border-2 border-gray-400"></div>
          )
        )}
      </div>

      <div className="text-center basis-20">
        <p className="font-medium text-gray-600">{`${player.kills} / ${player.deaths} / ${player.assists}`}</p>
        <p className="text-xs text-gray-600">{`${
          player.totalMinionsKilled
        } CS (${(
          player.totalMinionsKilled /
          (match.info.gameDuration / 60)
        ).toFixed(1)})`}</p>
        <p className="text-xs text-gray-600">{`${Math.round(
          player.challenges?.killParticipation * 100
        )}% KP`}</p>
      </div>

      <div className="flex basis-56">
        <div className="flex flex-col gap-px w-24 whitespace-nowrap overflow-hidden mx-1">
          {match.info.participants
            .filter((player) => player.teamId === 100)
            .map((player) => (
              <div className="flex items-center gap-1">
                <img
                  className="rounded"
                  src={`https://ddragon.leagueoflegends.com/cdn/13.16.1/img/champion/${player.championName}.png`}
                  alt=""
                  width={16}
                  key={player.championName}
                />
                <Link
                  href={`/summoner/${match.info.platformId.toLowerCase()}/${
                    player.summonerName
                  }`}
                >
                  <p className="text-xs">{player.summonerName}</p>
                </Link>
              </div>
            ))}
        </div>
        <div className="flex flex-col gap-px w-24 whitespace-nowrap overflow-hidden mx-1">
          {match.info.participants
            .filter((player) => player.teamId === 200)
            .map((player) => (
              <div className="flex items-center gap-1">
                <img
                  className="rounded"
                  src={`https://ddragon.leagueoflegends.com/cdn/13.16.1/img/champion/${player.championName}.png`}
                  alt=""
                  width={16}
                  key={player.championName}
                />
                <p className="text-xs">{player.summonerName}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
