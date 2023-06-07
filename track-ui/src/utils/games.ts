import { Game } from '@src/contexts/UserGamesContext';

const isInUserGames = (userGames: Game[], id: number) => userGames.some((g) => g.id === id);
export default isInUserGames;
