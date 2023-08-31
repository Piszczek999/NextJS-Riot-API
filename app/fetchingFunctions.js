import { notFound } from "next/navigation";

export async function getMatchIds(puuid) {
  const res = await fetch(
    "https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/" +
      puuid +
      "/ids?start=0&count=100&api_key=" +
      process.env.RIOT_API_KEY,
    {
      next: {
        revalidate: 60 * 2,
      },
    }
  );
  return res.json();
}

export async function getSummoner(name, region) {
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

export async function getLeagueData(accountId, region) {
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

export async function getTFTLeagueData(accountId, region) {
  const res = await fetch(
    "https://" +
      region +
      ".api.riotgames.com/tft/league/v1/entries/by-summoner/" +
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

export async function getMatch(matchId) {
  const res = await fetch(
    "https://europe.api.riotgames.com/lol/match/v5/matches/" +
      matchId +
      "?api_key=" +
      process.env.RIOT_API_KEY,
    {
      next: {
        revalidate: 60 * 60,
      },
    }
  );
  return res.json();
}
