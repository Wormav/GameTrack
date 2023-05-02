import axios from "axios";


export class IgdbClient {
    client_secret: string;
    client_id: string;


    constructor(client_id: string, client_secret: string){
        this.client_id = client_id;
        this.client_secret = client_secret;
    }

    async _get_access_token(){
        const IGDB_AUTH_URL = `https://id.twitch.tv/oauth2/token?client_id=${this.client_id}&client_secret=${this.client_secret}&grant_type=client_credentials`

        try {
            const response = await axios.post(IGDB_AUTH_URL)
            const { access_token } = response.data
            return access_token
        } catch (error) {
            return null
        }
    }

    async get_games(){
        const IGDB_GAMES_URL = `https://api.igdb.com/v4/games`
        const jwt: String | null = await this._get_access_token()
        if (!jwt){
            return null
        }
        console.log(jwt)
        try {
            // summary, release_dates, involved_companies, platforms, genres, multiplayer_modes
            const body: string = "fields name, version_title, summary, release_dates, involved_companies, platforms, genres, multiplayer_modes, checksum; limit 100;"
            // const body: string = "name; limit 100;"
            const response = await axios.post(
                IGDB_GAMES_URL, body, {
                headers: {
                    "Authorization": `Bearer ${jwt}`,
                    "Client-ID": this.client_id,
                    "Content-Type": "text/plain"
                    }
                }
            )
            console.log(response.data)

        } catch (error) {
            console.log(error)
            return null
        }

    }
    async get_game(){

    }

}
