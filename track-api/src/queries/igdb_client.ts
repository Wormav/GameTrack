import axios, { AxiosError, AxiosHeaders, AxiosResponse } from "axios";
import { addGame } from "../database/clients/igdbGames/igdbGames.client";
import { response } from "express";

function delay(milliseconds: number) {
    return new Promise(resolve => {
        setTimeout(resolve, milliseconds);
    });
}

export class IgdbClient {
    client_secret: string;
    client_id: string;


    constructor(client_id: string, client_secret: string){
        this.client_id = client_id;
        this.client_secret = client_secret;
    }

    async _get_access_token() {
        const IGDB_AUTH_URL = `https://id.twitch.tv/oauth2/token?client_id` +
        `=${this.client_id}&client_secret=${this.client_secret}&grant_type=client_credentials`

        try {
            const response = await axios.post(IGDB_AUTH_URL)
            const { access_token } = response.data
            return access_token
        } catch (error) {
                return null
        }
    }

    async _handle_call(url: string, headers: any, body: string) {
        while (true) {
            try {
                const response = await axios.post(url, body, { headers })
                return response.data
            } catch (error) {
                const err = error as AxiosError
                if (err.response?.status !== 429)
                {
                    console.log(err.response)
                    return []
                }
                await delay(1000)
            }
        }
    }

    async get_games(){
        const IGDB_GAMES_URL = `https://api.igdb.com/v4/games`
        const jwt: String | null = await this._get_access_token()
        if (!jwt){
            return null
        }
        let offset = 0
        let games = []
        while (true){
            const body: string = `fields name, version_title, summary, genres.name,
                release_dates.date, involved_companies.company.name,
                platforms.name, platforms.platform_logo.url, genres,
                multiplayer_modes, checksum, cover.url;
                limit 500;
                offset ${offset};`;
            const response = await this._handle_call(IGDB_GAMES_URL, {
                "Authorization": `Bearer ${jwt}`,
                "Client-ID": this.client_id,
                "Content-Type": "text/plain"
            }, body)
            if (response.length === 0)
                break;

            for(let i = 0; i < response.length; i++){
                await addGame({
                    gameId: response[i].id,
                    title: response[i].name,
                    description: response[i].summary,
                    involvedCompanies: response[i].involved_companies,
                    multiplayer: response[i].multiplayer_modes?.length > 0 ? true : false,
                    release_dates: response[i].release_dates,
                    platforms: response[i].platforms,
                    genres: response[i].genres,
                    cover: response[i].cover?.url,

                })
            }
            offset += 500;
            games.push(response)
        }
        return games


    }
}
