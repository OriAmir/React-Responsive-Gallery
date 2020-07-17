import {
  screenWidthSizes,
  numOfImagesPerRow,
  imagesMaxWidth,
  colsPadding,
  imagesPaddingBottom,
} from "../constants/responsive";

const getOrderGroup = (width, userScreenWidthValues) => {
  if (!width) {
    return null;
  }
  const widthSizes = userScreenWidthValues || screenWidthSizes;

  switch (true) {
    case width <= widthSizes.s:
      return "orderS";
    case width > widthSizes.s && width < widthSizes.l:
      return "orderM";
    default:
      return "orderL";
  }
};

const sortImagesArrayByOrder = (array, width, userScreenWidthValues) => {
  const orderGroup = getOrderGroup(width, userScreenWidthValues);
  return array ? array.sort((a, b) => a[orderGroup] - b[orderGroup]) : [];
};

const getSizeGroup = (width, userScreenWidthValues) => {
  if (!width) {
    return null;
  }
  const widthSizes = userScreenWidthValues || screenWidthSizes;

  switch (true) {
    case width <= widthSizes.xs:
      return "xs";
    case width <= widthSizes.s:
      return "s";
    case width <= widthSizes.m:
      return "m";
    case width <= widthSizes.l:
      return "l";
    case width <= widthSizes.xl:
      return "xl";
    default:
      return "xxl";
  }
};

const isWidthGroupsDifferents = (oldWidth, newWidth, userScreenWidthValues) =>
  getSizeGroup(oldWidth, userScreenWidthValues) !==
  getSizeGroup(newWidth, userScreenWidthValues);

const getGallerySizes = (width, userValues) => {
  const screenWidthSizesValues = userValues && userValues.screenWidthSizes;
  const numOfImagesPerRowValues = userValues && userValues.numOfImagesPerRow;
  const imagesMaxWidthValues = userValues && userValues.imagesMaxWidth;
  const colsPaddingValues = userValues && userValues.colsPadding;
  const imagesPaddingBottomValues =
    userValues && userValues.imagesPaddingBottom;
  let widthSize = "xxl";

  if (width <= screenWidthSizesValues.xs) {
    widthSize = "xs";
  } else if (width <= screenWidthSizesValues.s) {
    widthSize = "s";
  } else if (width <= screenWidthSizesValues.m) {
    widthSize = "m";
  } else if (width <= screenWidthSizesValues.l) {
    widthSize = "l";
  } else if (width <= screenWidthSizesValues.xl) {
    widthSize = "xl";
  }

  return {
    screenWidthSizes:
      (screenWidthSizesValues && screenWidthSizesValues[widthSize]) ||
      screenWidthSizes[widthSize],
    numOfImagePerRow:
      (numOfImagesPerRowValues && numOfImagesPerRowValues[widthSize]) ||
      numOfImagesPerRow[widthSize],
    imagesMaxWidth:
      (imagesMaxWidthValues && imagesMaxWidthValues[widthSize]) ||
      imagesMaxWidth[widthSize],
    colsPadding:
      (colsPaddingValues && colsPaddingValues[widthSize]) ||
      colsPadding[widthSize],
    imagesPaddingBottom:
      (imagesPaddingBottomValues && imagesPaddingBottomValues[widthSize]) ||
      imagesPaddingBottom[widthSize],
  };
};

export {
  getGallerySizes,
  getSizeGroup,
  isWidthGroupsDifferents,
  sortImagesArrayByOrder,
  getOrderGroup,
};
