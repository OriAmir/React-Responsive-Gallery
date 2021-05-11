import { LightboxActionType } from "./light-box-actions-type";

type State = {
  photoIndex: number;
  isOpen: boolean;
};
const initialState = {
  photoIndex: 0,
  isOpen: false,
};

type ActionType =
  | { type: LightboxActionType.LIGHT_BOX_OPEN }
  | { type: LightboxActionType.LIGHT_BOX_CLOSE }
  | { type: LightboxActionType.LIGHT_BOX_OPEN_BY_PHOTO_INDEX; payload: number }
  | { type: LightboxActionType.LIGHT_BOX_MOVE_PHOTO_BY_INDEX; payload: number };

const lightBoxReducer = (
  state: typeof initialState,
  action: ActionType
): State => {
  switch (action.type) {
    case LightboxActionType.LIGHT_BOX_OPEN:
      return { ...state, isOpen: true };
    case LightboxActionType.LIGHT_BOX_CLOSE:
      return { ...state, isOpen: false };
    case LightboxActionType.LIGHT_BOX_OPEN_BY_PHOTO_INDEX:
      return { isOpen: true, photoIndex: action.payload };
    case LightboxActionType.LIGHT_BOX_MOVE_PHOTO_BY_INDEX:
      return { isOpen: true, photoIndex: action.payload };
    default:
      return state;
  }
};

export { lightBoxReducer, initialState };
