import { LightboxActionType } from "./light-box-actions-type";

type State = {
  mediaIndex: number;
  isOpen: boolean;
};
const initialState = {
  mediaIndex: 0,
  isOpen: false,
};

type ActionType =
  | { type: LightboxActionType.LIGHT_BOX_OPEN }
  | { type: LightboxActionType.LIGHT_BOX_CLOSE }
  | { type: LightboxActionType.LIGHT_BOX_OPEN_BY_MEDIA_INDEX; payload: number }
  | { type: LightboxActionType.LIGHT_BOX_MOVE_PHOTO_BY_INDEX; payload: number };

const lightBoxReducer = (
  state: typeof initialState,
  action: ActionType,
): State => {
  switch (action.type) {
    case LightboxActionType.LIGHT_BOX_OPEN:
      return { ...state, isOpen: true };
    case LightboxActionType.LIGHT_BOX_CLOSE:
      return { ...state, isOpen: false };
    case LightboxActionType.LIGHT_BOX_OPEN_BY_MEDIA_INDEX:
      return { isOpen: true, mediaIndex: action.payload };
    case LightboxActionType.LIGHT_BOX_MOVE_PHOTO_BY_INDEX:
      return { isOpen: true, mediaIndex: action.payload };
    default:
      return state;
  }
};

export { lightBoxReducer, initialState };
