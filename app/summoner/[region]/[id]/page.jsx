import { notFound } from "next/navigation";

// components
import Match from "@/app/components/Match";
import MainProfile from "@/app/components/MainProfile";

async function getSummoner(name, region) {
  const res = await fetch(
    "https://" +
      region +
      ".api.riotgames.com/lol/summoner/v4/summoners/by-name/" +
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

  return res.json();
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
  const summoner = await getSummoner(params.id, params.region);
  const matchIds = await getMatchIds(summoner.puuid);

  return (
    <main>
      <MainProfile summoner={summoner} />
      <div className="md:flex gap-4 flex-wrap">
        <div>
          <div className="bg-gray-200">Solo/Duo</div>
        </div>
        <div>
          {matchIds.map((matchId) => (
            <Match puuid={summoner.puuid} matchId={matchId} />
          ))}
        </div>
      </div>
    </main>
  );
}
