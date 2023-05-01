import axios from "axios";


export class IgdbClient {
    client_secret: string;
    client_id: string;


    constructor(client_id: string, client_secret: string){
        this.client_id = client_id;
        this.client_secret = client_secret;
    }

    async get_access_token(){
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

    }
    async get_game(){

    }

}
