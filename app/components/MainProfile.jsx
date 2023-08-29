async function getLeagueData(accountId) {
  const res = await fetch(
    "https://" +
      region +
      ".api.riotgames.com/lol/league/v4/entries/by-summoner/" +
      accountId +
      "?api_key=" +
      process.env.RIOT_API_KEY,
    {
      next: {
        revalidate: 60 * 2,
      },
    }
  );
  return res.json();
}

export default function MainProfile({ summoner }) {
  const leagueData = getLeagueData(summoner.id);

  return (
    <div className="flex">
      <div className="grid">
        <img
          className="rounded-full"
          src={
            "https://ddragon.canisback.com/13.12.1/img/profileicon/" +
            summoner.profileIconId +
            ".png"
          }
          alt=""
          width={100}
        />
        <span className="text-sm text-center bg-gray-300 rounded-full mx-7">
          {summoner.summonerLevel}
        </span>
      </div>
      <div className="m-5">
        <p className="text-4xl text-blue-700 font-semibold">{summoner.name}</p>
      </div>
    </div>
  );
}
