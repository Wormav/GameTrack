export enum SearchBarActionTypes {
  UPDATE_GAME_NAME = 'UPDATE_GAME_NAME',
  OPEN_RESULTS = 'OPEN_RESULTS',
}

export interface SearchBarAction {
  type: SearchBarActionTypes;
  payload: Partial<SearchBarReducerState>;
}
interface SearchBarReducerState {
  gameName: string;
  openResults: boolean;
}

export const initialStateSearchBarReducer: SearchBarReducerState = {
  gameName: '',
  openResults: false,
};
export function searchBarReducer(state: SearchBarReducerState, action: SearchBarAction) {
  const { type, payload } = action;
  switch (type) {
    case SearchBarActionTypes.UPDATE_GAME_NAME:
      return {
        ...state,
        ...payload,
      };
    case SearchBarActionTypes.OPEN_RESULTS:
      return {
        ...state,
        ...payload,
      };
    default:
      return state;
  }
}
