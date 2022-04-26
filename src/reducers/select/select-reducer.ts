import { SelectActionType } from "./select-action-types";

type State = Record<string, boolean>;

const initialState = {};

type ActionType =
  | { type: SelectActionType.SELECT_SET_IMAGE; payload: string }
  | { type: SelectActionType.DESELECT_IMAGE; payload: string }
  | { type: SelectActionType.SELECT_ALL_IMAGES; payload: Array<string> }
  | { type: SelectActionType.DESELECT_ALL_IMAGES };

const selectReducer = (
  state: typeof initialState,
  action: ActionType
): State => {
  switch (action.type) {
    case SelectActionType.SELECT_SET_IMAGE:
      return { ...state, [action.payload]: true };
    case SelectActionType.DESELECT_IMAGE:
      const newState = { ...state };
      delete newState[action.payload];
      return newState;
    // case SelectActionType.SELECT_ALL_IMAGES:
    //   return { isOpen: true, photoIndex: action.payload };
    case SelectActionType.DESELECT_ALL_IMAGES:
      return initialState;
    default:
      return state;
  }
};

export { selectReducer, initialState };
