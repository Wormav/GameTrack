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

export interface IPublisher {
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
  publisher: IPublisher[];
  platforms: IPlatforms[];
  genres: IGenre[];
  multiplayer: boolean;
  cover: string;
  thumbnail: string;
}
