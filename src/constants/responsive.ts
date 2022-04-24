import { OptionsWidthSizes } from "components/Gallery/Gallery.types";

const screenWidthSizes: Pick<OptionsWidthSizes, "xs" | "s" | "m" | "l" | "xl"> =
  {
    xs: 420,
    s: 600,
    m: 768,
    l: 992,
    xl: 1200,
  };

const colsPadding: OptionsWidthSizes = {
  xs: 4,
  s: 4,
  m: 4,
  l: 4,
  xl: 4,
  xxl: 4,
};

const imagesPaddingBottom: OptionsWidthSizes = {
  xs: 4,
  s: 4,
  m: 4,
  l: 4,
  xl: 4,
  xxl: 4,
};

const imagesMaxWidth: OptionsWidthSizes = {
  xs: 100,
  s: 100,
  m: 100,
  l: 100,
  xl: 100,
  xxl: 100,
};

const numOfImagesPerRow: OptionsWidthSizes = {
  xs: 1,
  s: 2,
  m: 3,
  l: 3,
  xl: 4,
  xxl: 5,
};

export {
  screenWidthSizes,
  colsPadding,
  imagesPaddingBottom,
  imagesMaxWidth,
  numOfImagesPerRow,
};
