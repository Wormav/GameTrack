import axios, { AxiosResponse, RawAxiosRequestHeaders } from "axios";
import { IGenre, IPlatforms, IPublisher, IReleaseDate } from "../database/clients/igdbGames/igdbGames.interface";
import responseToGame from "../database/clients/igdbGames/utils";
import { addGames } from "../database/clients/igdbGames/igdbGames.client";

function delay(milliseconds: number) {
  return new Promise(resolve => {
    setTimeout(resolve, milliseconds);
  });
}

export interface IJwt {
  access_token: string;
  expires_in: number;
  token_type: string;
}

export interface IResponseGame {
  id: number;
  name: string;
  version_title: string;
  summary: string;
  genres: IGenre[];
  release_dates: IReleaseDate[];
  involved_companies: IPublisher[];
  platforms: IPlatforms[];
  multiplayer_modes: number[];
  checksum: string;
  cover: {
    id: number;
    image_id: string;
  };
}


export class IgdbClient {
  client_secret: string;
  client_id: string;


  constructor(client_id: string, client_secret: string) {
    this.client_id = client_id;
    this.client_secret = client_secret;
  }

  async _handle_call<T>(url: string, headers: Partial<RawAxiosRequestHeaders>, body: string, method = "POST"): Promise<AxiosResponse<T> | null> {
    // eslint-disable-next-line no-constant-condition
    while (true) {
      try {
        if (method === "POST") {
          const response = await axios.post(url, body, { headers: headers })
          return response
        }
        else {
          const response = await axios.get(url)
          return response
        }
      }
      catch (error) {
        const typedError = error as { status?: number };
        if (typeof typedError.status !== "undefined" && typedError.status !== 429) {
          console.error("Error in _handle_call: ", typedError);
        }
        await delay(1000)
      }
    }
  }

  async _get_access_token() {
    const IGDB_AUTH_URL = `https://id.twitch.tv/oauth2/token?client_id` +
      `=${this.client_id}&client_secret=${this.client_secret}&grant_type=client_credentials`

    try {
      const response = await this._handle_call<IJwt>(IGDB_AUTH_URL, {}, "")
      return response?.data
    } catch (error) {
      console.error('Error in _get_access_token: ', error)
      return null
    }
  }
  
  async get_games(offset = 0, limit: number) {
    const IGDB_GAMES_URL = `https://api.igdb.com/v4/games`
    const jwt: IJwt | null | undefined = await this._get_access_token()
    if (!jwt) {
      return []
    }
   
    const body = `fields name, version_title, summary, genres.name,
                release_dates.date, involved_companies.company.name,
                platforms.name, platforms.platform_logo.url, genres,
                multiplayer_modes, checksum, cover.image_id;
                limit ${limit};
                offset ${offset};`;
    const headers = {
      "Authorization": `Bearer ${jwt.access_token}`,
      "Client-ID": this.client_id,
      "Content-Type": "text/plain"
    }
    const response = await this._handle_call<IResponseGame[]>(IGDB_GAMES_URL, headers, body)
    if (!response)
    {
      console.error("Error getting games from IGDB")
      return []
    }
    return (response.data)
  }

  static async add_games_to_db(games: IResponseGame[]) {
    const res = games.map( (game: IResponseGame) => responseToGame(game))
    await addGames(res)
   
  }
}

