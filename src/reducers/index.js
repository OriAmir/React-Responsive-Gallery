const lightBoxReducer = (state, action) => {
  switch (action.type) {
    case "open":
      return { ...state, isOpen: true };
    case "close":
      return { ...state, isOpen: false };
    case "photoIndex":
      return { ...state, photoIndex: action.photoIndex };
    case "photoIndex_Open":
      return { isOpen: true, photoIndex: action.photoIndex };
    default:
      return state;
  }
};

export { lightBoxReducer };
