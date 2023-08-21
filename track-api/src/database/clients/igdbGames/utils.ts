import { IResponseGame } from "../../../queries/igdb_client";
import { IGame } from "./igdbGames.interface";

const responseToGame = (data: IResponseGame): IGame => {
  const cover_url = data.cover?.image_id
    ? `https://images.igdb.com/igdb/image/upload/t_1080p/${data.cover.image_id}.jpg` : ""
  const thumbnail_url = data.cover?.image_id
    ? `https://images.igdb.com/igdb/image/upload/t_cover_small/${data.cover.image_id}.jpg` : ""
  const filteredReleaseDates = data.release_dates?.filter((el) => el.date) ?? []

  const game: IGame = {
    gameId: data.id,
    title: data.name,
    description: data.summary,
    release_dates: filteredReleaseDates,
    publisher: data.involved_companies,
    platforms: data.platforms,
    genres: data.genres,
    multiplayer: data.multiplayer_modes?.length > 0,
    cover: cover_url,
    thumbnail: thumbnail_url,
  }
  return game
}

export default  responseToGame
