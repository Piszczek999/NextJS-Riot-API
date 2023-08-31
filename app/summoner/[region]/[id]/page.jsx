// components
import MainProfile from "@/app/components/MainProfile";
import { getMatchIds, getSummoner } from "@/app/fetchingFunctions";
import ProfileLeagues from "@/app/components/ProfileLeagues";
import MatchHistory from "@/app/components/MatchHistory";

export default async function Profile({ params }) {
  const summoner = await getSummoner(params.id, params.region);
  const matchIds = await getMatchIds(summoner.puuid);

  return (
    <main className="flex flex-col gap-2 max-w-6xl m-auto">
      <MainProfile summoner={summoner} />
      <div className="flex flex-col md:flex-row gap-2">
        <ProfileLeagues summoner={summoner} region={params.region} />
        <MatchHistory summoner={summoner} matchIds={matchIds} />
      </div>
    </main>
  );
}
