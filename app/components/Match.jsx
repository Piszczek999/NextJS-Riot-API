import { queues, runes, spells } from "../constants";
import { getMatch } from "../fetchingFunctions";

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

export default async function Match({ matchId, puuid }) {
  const match = await getMatch(matchId);
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
    <div className="flex gap-4 shadow px-2 bg-gray-100 items-center">
      <div className="basis-16">
        <p className="text-xs text-gray-500">{queues[match.info.queueId]}</p>
        {player.win && (
          <h3 className="text-lg text-green-500 font-medium">Victory</h3>
        )}
        {!player.win && (
          <h3 className="text-lg text-red-500 font-medium">Defeat</h3>
        )}
        <p className="text-xs text-gray-500">{getGameDuration(match)}</p>
      </div>

      <div className="flex">
        <div>
          <img
            src={
              "https://ddragon.leagueoflegends.com/cdn/13.16.1/img/champion/" +
              player.championName +
              ".png"
            }
            alt={"image of" + player.championName}
            width={50}
          />
          <div className="flex gap-1 items-center justify-center">
            <img
              className="bg-gray-300 rounded-full"
              src={
                "https://ddragon.canisback.com/img/" +
                runes[getPrimaryRune(player)]
              }
              alt="Primary rune"
              width={20}
            />
            <img
              className="bg-gray-300 rounded-full p-1"
              src={
                "https://ddragon.canisback.com/img/" +
                runes[getSecondaryRune(player)]
              }
              alt="Secondary rune"
              width={20}
            />
          </div>
        </div>
        <div>
          <img
            src={
              "https://ddragon.leagueoflegends.com/cdn/13.16.1/img/spell/" +
              spells[player.summoner1Id] +
              ".png"
            }
            alt=""
            width={25}
          />
          <img
            src={
              "https://ddragon.leagueoflegends.com/cdn/13.16.1/img/spell/" +
              spells[player.summoner2Id] +
              ".png"
            }
            alt=""
            width={25}
          />
        </div>
      </div>
      <div className="grid grid-cols-4 gap-0.5">
        {playerItems.map((item) => (
          <img
            src={
              "https://ddragon.leagueoflegends.com/cdn/13.16.1/img/item/" +
              item +
              ".png"
            }
            alt=""
            width={30}
          />
        ))}
      </div>
    </div>
  );
}
