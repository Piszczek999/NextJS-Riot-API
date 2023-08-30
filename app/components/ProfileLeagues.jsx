import { getLeagueData, getTFTLeagueData } from "../fetchingFunctions";

const emblems = {
  CHALLENGER: 10,
  GRANDMASTER: 9,
  MASTER: 8,
  DIAMOND: 7,
  EMERALD: 6,
  PLATINUM: 5,
  GOLD: 4,
  SILVER: 3,
  BRONZE: 2,
  IRON: 1,
  UNRANKED: 0,
};
function initLeagues(leagueData, tftLeagueData) {
  return {
    solo: leagueData.find((item) => item.queueType === "RANKED_SOLO_5x5") || {
      queueType: "RANKED_SOLO_5x5",
      tier: "UNRANKED",
      rank: "",
    },
    flex: leagueData.find((item) => item.queueType === "RANKED_FLEX_SR") || {
      queueType: "RANKED_FLEX_SR",
      tier: "UNRANKED",
      rank: "",
    },
    tftDoubleUp: leagueData.find(
      (item) => item.queueType === "RANKED_TFT_DOUBLE_UP"
    ) || {
      queueType: "RANKED_TFT_DOUBLE_UP",
      tier: "UNRANKED",
      rank: "",
    },
    tft: tftLeagueData.find((item) => item.queueType === "RANKED_TFT") || {
      queueType: "RANKED_TFT",
      tier: "UNRANKED",
      rank: "",
    },
  };
}

export default async function ProfileLeagues({ summoner, region }) {
  const leagueData = await getLeagueData(summoner.id, region);
  const tftLeagueData = await getTFTLeagueData(summoner.id, region);
  const leagues = initLeagues(leagueData, tftLeagueData);
  Object.keys(leagues).map((queue) => console.log(queue));

  return (
    <div className="flex flex-col gap-2">
      {Object.keys(leagues).map((queue) => (
        <div key={queue} className="bg-gray-200 shadow p-2">
          <div className="flex">
            <img
              src={`https://lolg-cdn.porofessor.gg/img/s/league-icons-v3/160/${
                emblems[leagues[queue].tier]
              }.png`}
              alt={leagues[queue].tier}
              width={100}
            />
            <div className="flex flex-col justify-center text-gray-600">
              <p className="capitalize">{queue}</p>
              <p className="font-bold">{`${leagues[queue].tier} ${leagues[queue].rank}`}</p>
              {leagues[queue].tier === "UNRANKED" || (
                <>
                  <p>{`LP: ${leagues[queue].leaguePoints}`}</p>
                  <div className="text-sm">
                    <span>
                      Wins:{" "}
                      <span className="text-green-500">
                        {leagues[queue].wins}
                      </span>
                    </span>
                    <span> - </span>
                    <span>
                      Losses:{" "}
                      <span className="text-red-500">
                        {leagues[queue].losses}
                      </span>
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
