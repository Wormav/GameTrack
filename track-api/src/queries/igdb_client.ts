import axios, { AxiosError, AxiosHeaders, AxiosResponse } from "axios";
import { addGame } from "../database/clients/igdbGames/igdbGames.client";
import { response } from "express";
import { IReleaseDate } from "../database/clients/igdbGames/igdbGames.interface";

function delay(milliseconds: number) {
  return new Promise(resolve => {
    setTimeout(resolve, milliseconds);
  });
}

export class IgdbClient {
  client_secret: string;
  client_id: string;


  constructor(client_id: string, client_secret: string) {
    this.client_id = client_id;
    this.client_secret = client_secret;
  }

  async _handle_call(url: string, headers: any, body: string, method: string = "POST") {
    while (true) {
      try {
        if (method === "POST") {
          const response = await axios.post(url, body, { headers })
          return response.data
        }
        else {
          const response = await axios.get(url)
          return response.data
        }
      }
      catch (error) {
        const err = error as AxiosError
        if (err.response?.status !== 429) {
          console.log(err.response)
          return []
        }
        await delay(1000)
      }
    }
  }

  async _get_access_token() {
    const IGDB_AUTH_URL = `https://id.twitch.tv/oauth2/token?client_id` +
      `=${this.client_id}&client_secret=${this.client_secret}&grant_type=client_credentials`

    try {
      const response = await this._handle_call(IGDB_AUTH_URL, {}, "")
      return response.access_token
    } catch (error) {
      console.log(error)
      return null
    }
  }

  async get_games(offset: number = 0, limit: number) {
    const IGDB_GAMES_URL = `https://api.igdb.com/v4/games`
    const jwt: String | null = await this._get_access_token()
    if (!jwt) {
      return []
    }
    let games = []
    const body: string = `fields name, version_title, summary, genres.name,
                release_dates.date, involved_companies.company.name,
                platforms.name, platforms.platform_logo.url, genres,
                multiplayer_modes, checksum, cover.image_id;
                limit ${limit};
                offset ${offset};`;
    const response = await this._handle_call(IGDB_GAMES_URL, {
      "Authorization": `Bearer ${jwt}`,
      "Client-ID": this.client_id,
      "Content-Type": "text/plain"
    }, body)
    if (response.length === 0)
      return []

    console.log(`start adding games offset ${offset} to ${offset + limit} `)
    for (let i = 0; i < response.length; i++) {
      const cover_url = response[i].cover?.image_id
        ? `https://images.igdb.com/igdb/image/upload/t_1080p/${response[i].cover.image_id}.jpg` : ""
      const thumbnail_url = response[i].cover?.image_id
        ? `https://images.igdb.com/igdb/image/upload/t_cover_small/${response[i].cover.image_id}.jpg` : ""
      const filteredReleaseDates = response[i].release_dates?.filter((el: IReleaseDate) => el.date) ?? []
      await addGame({
      gameId: response[i].id,
      title: response[i].name,
      description: response[i].summary,
      publisher: response[i].involved_companies,
      multiplayer: response[i].multiplayer_modes?.length > 0 ? true : false,
      release_dates: filteredReleaseDates,
      platforms: response[i].platforms,
      genres: response[i].genres,
      cover: cover_url,
      thumbnail: thumbnail_url,
      })
    }
    console.log(`Added games offset ${offset} to ${offset + limit} `)
    offset += limit;
    games.push(response)
    return games


  }
}
