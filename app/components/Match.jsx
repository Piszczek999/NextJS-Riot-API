import Image from "next/image";
// import Icon from "@/app/perk-images/Styles/7200_Domination.png";

async function getMatch(matchId) {
  const res = await fetch(
    "https://europe.api.riotgames.com/lol/match/v5/matches/" +
      matchId +
      "?api_key=" +
      process.env.RIOT_API_KEY,
    {
      next: {
        revalidate: 0,
      },
    }
  );
  return res.json();
}

function getPlayer(match, puuid) {
  return match.info.participants.find((player) => player.puuid == puuid);
}

function getPrimaryRune(player) {
  return player.perks.styles[0].selections[0].perk;
}

function getSecondaryRune(player) {
  return player.perks.styles[1].style;
}

export default async function Match({ matchId, puuid }) {
  const runes = {
    8100: "perk-images/Styles/7200_Domination.png",
    8300: "perk-images/Styles/7203_Whimsy.png",
    8000: "perk-images/Styles/7201_Precision.png",
    8400: "perk-images/Styles/7204_Resolve.png",
    8200: "perk-images/Styles/7202_Sorcery.png",
    8112: "perk-images/Styles/Domination/Electrocute/Electrocute.png",
    8124: "perk-images/Styles/Domination/Predator/Predator.png",
    8128: "perk-images/Styles/Domination/DarkHarvest/DarkHarvest.png",
    9923: "perk-images/Styles/Domination/HailOfBlades/HailOfBlades.png",
    8351: "perk-images/Styles/Inspiration/GlacialAugment/GlacialAugment.png",
    8360: "perk-images/Styles/Inspiration/UnsealedSpellbook/UnsealedSpellbook.png",
    8369: "perk-images/Styles/Inspiration/FirstStrike/FirstStrike.png",
    8005: "perk-images/Styles/Precision/PressTheAttack/PressTheAttack.png",
    8008: "perk-images/Styles/Precision/LethalTempo/LethalTempoTemp.png",
    8021: "perk-images/Styles/Precision/FleetFootwork/FleetFootwork.png",
    8010: "perk-images/Styles/Precision/Conqueror/Conqueror.png",
    8437: "perk-images/Styles/Resolve/GraspOfTheUndying/GraspOfTheUndying.png",
    8439: "perk-images/Styles/Resolve/VeteranAftershock/VeteranAftershock.png",
    8465: "perk-images/Styles/Resolve/Guardian/Guardian.png",
    8214: "perk-images/Styles/Sorcery/SummonAery/SummonAery.png",
    8229: "perk-images/Styles/Sorcery/ArcaneComet/ArcaneComet.png",
    8230: "perk-images/Styles/Sorcery/PhaseRush/PhaseRush.png",
  };
  const spells = {
    1: "SummonerBoost",
    3: "SummonerExhaust",
    4: "SummonerFlash",
    6: "SummonerHaste",
    7: "SummonerHeal",
    11: "SummonerSmite",
    12: "SummonerTeleport",
    13: "SummonerMana",
    14: "SummonerDot",
    21: "SummonerBarrier",
    30: "SummonerPoroRecall",
    31: "SummonerPoroThrow",
    32: "SummonerSnowball",
    39: "SummonerSnowURFSnowball_Mark",
    54: "Summoner_UltBookPlaceholder",
    55: "Summoner_UltBookSmitePlaceholder",
    2202: "SummonerCherryFlash",
    2201: "SummonerCherryHold",
  };

  const match = await getMatch(matchId);
  const player = getPlayer(match, puuid);

  return (
    <div className="flex gap-4 shadow my-2 bg-gray-100">
      <h3>{player.win ? "Victory" : "Defeat"}</h3>
      <div className="flex">
        <div>
          <img
            src={
              "http://ddragon.leagueoflegends.com/cdn/13.16.1/img/champion/" +
              player.championName +
              ".png"
            }
            alt={"image of" + player.championName}
            width={50}
          />
          <div className="flex gap-1 items-center justify-center">
            <img
              src={
                "https://ddragon.canisback.com/img/" +
                runes[getPrimaryRune(player)]
              }
              alt="Primary rune"
              width={20}
            />
            <img
              src={
                "https://ddragon.canisback.com/img/" +
                runes[getSecondaryRune(player)]
              }
              alt="Secondary rune"
              width={12}
            />
          </div>
        </div>
        <div>
          <img
            src={
              "https://ddragon.canisback.com/latest/img/spell/" +
              spells[player.summoner1Id] +
              ".png"
            }
            alt=""
            width={25}
          />
          <img
            src={
              "https://ddragon.canisback.com/latest/img/spell/" +
              spells[player.summoner2Id] +
              ".png"
            }
            alt=""
            width={25}
          />
        </div>
      </div>
    </div>
  );
}
