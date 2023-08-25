import Match from "@/app/components/Match";
import { notFound } from "next/navigation";

async function getPuuid(name) {
  const res = await fetch(
    "https://eun1.api.riotgames.com/lol/summoner/v4/summoners/by-name/" +
      name +
      "?api_key=" +
      process.env.RIOT_API_KEY,
    {
      next: {
        revalidate: 60 * 60,
      },
    }
  );

  if (!res.ok) {
    notFound();
  }

  const data = await res.json();
  return data.puuid;
}

async function getMatchIds(puuid) {
  const res = await fetch(
    "https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/" +
      puuid +
      "/ids?start=0&count=5&api_key=" +
      process.env.RIOT_API_KEY,
    {
      next: {
        revalidate: 60,
      },
    }
  );
  return res.json();
}

export default async function Profile({ params }) {
  const puuid = await getPuuid(params.id);
  const matchIds = await getMatchIds(puuid);

  return (
    <main>
      {matchIds.map((matchId) => (
        <Match puuid={puuid} matchId={matchId} />
      ))}
    </main>
  );
}
