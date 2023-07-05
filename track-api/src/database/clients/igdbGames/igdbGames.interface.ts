export interface IReleaseDate {
  id: number,
  date: Date,
  game_id: number
}

export interface IGenre {
  id: number;
  name: string;
  game_id: number
}

export interface IPlatforms {
  id: number;
  name: string;
  game_id: number
  platform_logo: {
    id: number;
    url: string;
  }
}

export interface IInvolvedCompanies {
  company: {
    id: number;
    name: string;
    game_id: number
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
  cover: string;
  thumbnail: string;
}
