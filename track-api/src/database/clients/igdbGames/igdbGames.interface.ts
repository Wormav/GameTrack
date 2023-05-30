export interface IReleaseDate {
    id: number,
    date: Date,
}

export interface IGenre {
    id: number;
    name: string;
}

export interface IReleaseDate {
    id: number;
    date: Date;
}

export interface IPlatforms {
    id: number;
    name: string;
    platform_logo: {
        id: number;
        url: string;
    }
}

export interface IInvolvedCompanies {
    company: {
        id: number;
        name: string;
    }
}

export interface IGame {

    gameId: number;
    title: string;
    description: string;
    release_dates: IReleaseDate[];
    involvedCompanies: IInvolvedCompanies[];
    platforms: IPlatforms[];
    genres: IGenre[];
    multiplayer: boolean;
}
