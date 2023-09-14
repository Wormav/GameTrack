import { HowLongToBeatService } from 'howlongtobeat';

const hltbService = new HowLongToBeatService();

export async function getTimeComplete(name: string) {
  try {
    const result = await hltbService.search(name).then(async (games) => {
      const game = games.find((e) => e.name === name);
      if (game) {
        return await hltbService.detail(game.id);
      }
    });
    return result;
  } catch (err) {
    console.error(err);
    return null;
  }
}
