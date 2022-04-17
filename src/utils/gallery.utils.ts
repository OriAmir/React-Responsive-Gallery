import {
  numOfImagesPerRow,
  imagesMaxWidth,
  colsPadding,
  imagesPaddingBottom,
  screenWidthSizes,
} from "../constants/responsive";
import {
  OptionsWidthSizes,
  ScreenWidthSizes,
  GalleryWidthOptions,
  WidthOptions,
  ImageOrderOptions,
  GallerySizes,
  ImageElementProps,
  ImagesCols,
} from "../components/Gallery/Gallery.types";

const getOrderGroup = (
  width: number,
  userScreenWidthValues?: ScreenWidthSizes
): ImageOrderOptions => {
  const widthSizes: ScreenWidthSizes =
    userScreenWidthValues || screenWidthSizes;

  switch (true) {
    case width <= widthSizes.s:
      return ImageOrderOptions.s;
    case width > widthSizes.s && width < widthSizes.l:
      return ImageOrderOptions.m;
    default:
      return ImageOrderOptions.l;
  }
};

const sortImagesByOrderGroup = (
  array: Array<ImageElementProps>,
  width: number,
  userScreenWidthValues: ScreenWidthSizes = screenWidthSizes
): Array<ImageElementProps> => {
  const orderGroup: ImageOrderOptions = getOrderGroup(
    width,
    userScreenWidthValues
  );
  const arrayUpdated = array.reduce(
    (total: Array<ImageElementProps>, cur: ImageElementProps) => {
      if (cur?.[orderGroup]) {
        return [cur, ...total];
      }
      return [...total, cur];
    },
    []
  );

  return arrayUpdated
    ? arrayUpdated.sort((ele1: ImageElementProps, ele2: ImageElementProps) => {
        if (ele1?.[orderGroup] && ele2?.[orderGroup]) {
          return (ele1[orderGroup] ?? 0) - (ele2[orderGroup] ?? 0);
        } else {
          return 0;
        }
      })
    : [];
};

const getSizeGroup = (
  width: number,
  userScreenWidthValues?: ScreenWidthSizes
): WidthOptions => {
  const widthSizes: ScreenWidthSizes =
    userScreenWidthValues || screenWidthSizes;

  switch (true) {
    case width <= widthSizes.xs:
      return WidthOptions.xs;
    case width <= widthSizes.s:
      return WidthOptions.s;
    case width <= widthSizes.m:
      return WidthOptions.m;
    case width <= widthSizes.l:
      return WidthOptions.l;
    case width <= widthSizes.xl:
      return WidthOptions.xl;
    default:
      return WidthOptions.xxl;
  }
};

const isWidthGroupsDifferences = (
  oldWidth: number,
  newWidth: number,
  userScreenWidthValues?: ScreenWidthSizes
): boolean =>
  getSizeGroup(oldWidth, userScreenWidthValues) !==
  getSizeGroup(newWidth, userScreenWidthValues);

const getGallerySizes = (
  width: number,
  userValues?: GalleryWidthOptions
): GallerySizes => {
  const screenWidthSizesValues: ScreenWidthSizes =
    userValues?.screenWidthSizes || screenWidthSizes;

  const numOfImagesPerRowValues: OptionsWidthSizes =
    userValues?.numOfImagesPerRow || numOfImagesPerRow;

  const imagesMaxWidthValues: OptionsWidthSizes =
    userValues?.imagesMaxWidth || imagesMaxWidth;

  const colsPaddingValues: OptionsWidthSizes =
    userValues?.colsPadding || colsPadding;

  const imagesPaddingBottomValues: OptionsWidthSizes =
    userValues?.imagesPaddingBottom || imagesPaddingBottom;

  let widthSize = WidthOptions.xxl;
  if (width <= screenWidthSizesValues.xs) {
    widthSize = WidthOptions.xs;
  } else if (width <= screenWidthSizesValues.s) {
    widthSize = WidthOptions.s;
  } else if (width <= screenWidthSizesValues.m) {
    widthSize = WidthOptions.m;
  } else if (width <= screenWidthSizesValues.l) {
    widthSize = WidthOptions.l;
  } else if (width <= screenWidthSizesValues.xl) {
    widthSize = WidthOptions.xl;
  }

  return {
    screenWidthSizes: screenWidthSizesValues[widthSize],
    numOfImagesPerRow: numOfImagesPerRowValues[widthSize],
    imagesMaxWidth: imagesMaxWidthValues[widthSize],
    colsPadding: colsPaddingValues[widthSize],
    imagesPaddingBottom: imagesPaddingBottomValues[widthSize],
  };
};

const getImagesCols = (
  images: Array<ImageElementProps>,
  numOfImagesPerRow: number
): ImagesCols | Record<string, never> => {
  const imagesCols: ImagesCols | Record<string, never> = images?.reduce(
    (
      total: ImagesCols | Record<string, never>,
      cur: ImageElementProps,
      index: number
    ) =>
      total[index % numOfImagesPerRow]
        ? {
            ...total,
            [index % numOfImagesPerRow]: [
              ...total[index % numOfImagesPerRow],
              cur,
            ],
          }
        : { ...total, [index % numOfImagesPerRow]: [cur] },
    {}
  );
  return imagesCols;
};

const getSelectedImages = () => {
  const elements = document.querySelectorAll(".select-input");
  const selectedImages: string[] = [];
  elements.forEach((e: HTMLInputElement) => {
    if (e.checked) {
      selectedImages.push(e?.value);
    }
  });

  return selectedImages;
};

export {
  getGallerySizes,
  getSizeGroup,
  isWidthGroupsDifferences,
  sortImagesByOrderGroup,
  getOrderGroup,
  getImagesCols,
  getSelectedImages,
};
