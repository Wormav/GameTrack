import { HowLongToBeatService } from "howlongtobeat";

const hltbService = new HowLongToBeatService();

export async function getTimeComplete(name: string) {
  try {
    const result = await hltbService.search(name);

    const game = result.find((e) => e.name === name);
    return game;
  } catch (err) {
    return null;
  }
}
