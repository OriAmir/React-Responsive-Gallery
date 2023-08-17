import {
  numOfMediaPerRow,
  mediaMaxWidth,
  colsPadding,
  mediaMarginBottom,
  screenWidthSizes,
} from "../constants/responsive";
import {
  OptionsWidthSizes,
  ScreenWidthSizes,
  GalleryWidthOptions,
  WidthOptions,
  MediaOrderOptions,
  GallerySizes,
  MediaElementProps,
  MediaCols,
  MediaType,
  ExpandedMediaElementProps,
} from "../components/Gallery/Gallery.types";
import { ImageProps } from "components/Gallery/Image/Image.types";
import { VideoProps } from "components/Gallery/Video/Video.types";

const getOrderGroup = (
  width: number,
  userScreenWidthValues?: ScreenWidthSizes,
): MediaOrderOptions => {
  const widthSizes: ScreenWidthSizes =
    userScreenWidthValues || screenWidthSizes;

  switch (true) {
    case width <= widthSizes.s:
      return MediaOrderOptions.s;
    case width > widthSizes.s && width < widthSizes.l:
      return MediaOrderOptions.m;
    default:
      return MediaOrderOptions.l;
  }
};

const sortMediaByOrderGroup = (
  array: Array<MediaElementProps>,
  width: number,
  userScreenWidthValues: ScreenWidthSizes = screenWidthSizes,
): Array<ExpandedMediaElementProps> => {
  const orderGroup: MediaOrderOptions = getOrderGroup(
    width,
    userScreenWidthValues,
  );
  const arrayUpdated = array.reduce(
    (total: Array<ExpandedMediaElementProps>, cur: MediaElementProps) => {
      if (cur.type === MediaType.Video) {
        // this part if for "yet-another-react-lightbox" package in order to support video
        const curWithType: ExpandedMediaElementProps = {
          ...cur,
          sources: [
            {
              src: cur.src,
              type: cur.videoType || "video/mp4",
            },
          ],
        };
        cur = curWithType;
      }
      if (cur?.[orderGroup]) {
        return [cur, ...total];
      }
      return [...total, cur];
    },
    [],
  );

  return arrayUpdated
    ? arrayUpdated.sort((ele1: MediaElementProps, ele2: MediaElementProps) => {
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
  userScreenWidthValues?: ScreenWidthSizes,
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
  userScreenWidthValues?: ScreenWidthSizes,
): boolean =>
  getSizeGroup(oldWidth, userScreenWidthValues) !==
  getSizeGroup(newWidth, userScreenWidthValues);

const getGallerySizes = (
  width: number,
  userValues?: GalleryWidthOptions,
): GallerySizes => {
  const screenWidthSizesValues: ScreenWidthSizes =
    userValues?.screenWidthSizes || screenWidthSizes;

  const numOfMediaPerRowValues: OptionsWidthSizes =
    userValues?.numOfMediaPerRow || numOfMediaPerRow;

  const mediaMaxWidthValues: OptionsWidthSizes =
    userValues?.mediaMaxWidth || mediaMaxWidth;

  const colsPaddingValues: OptionsWidthSizes =
    userValues?.colsPadding || colsPadding;

  const mediaMarginBottomValues: OptionsWidthSizes =
    userValues?.mediaMarginBottom || mediaMarginBottom;

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
    numOfMediaPerRow: numOfMediaPerRowValues[widthSize],
    mediaMaxWidth: mediaMaxWidthValues[widthSize],
    colsPadding: colsPaddingValues[widthSize],
    mediaMarginBottom: mediaMarginBottomValues[widthSize],
  };
};

const getMediaCols = (
  media: Array<MediaElementProps>,
  numOfMediaPerRow: number,
): MediaCols | Record<string, never> => {
  const mediaCols: MediaCols | Record<string, never> = media?.reduce(
    (
      total: MediaCols | Record<string, never>,
      cur: MediaElementProps,
      index: number,
    ) =>
      total[index % numOfMediaPerRow]
        ? {
            ...total,
            [index % numOfMediaPerRow]: [
              ...total[index % numOfMediaPerRow],
              cur,
            ],
          }
        : { ...total, [index % numOfMediaPerRow]: [cur] },
    {},
  );
  return mediaCols;
};

const getSelectedMedia = () => {
  const elements = document.querySelectorAll(".select-input");
  const selectedMedia: string[] = [];
  elements.forEach((e: HTMLInputElement) => {
    if (e.checked) {
      selectedMedia.push(e?.value);
    }
  });

  return selectedMedia;
};

const isMediaSelected = (
  media: MediaElementProps,
  selectableMedia: Array<string>,
): boolean => {
  const id = media?.id && selectableMedia?.indexOf(media.id) !== -1;
  const src = selectableMedia?.indexOf(media.src) !== -1;
  return id || src;
};

const memoImage = (prev: ImageProps, next: ImageProps): boolean => {
  const src = prev.img.src !== next.img.src;
  const maxWidth = prev.maxWidth !== next.maxWidth;
  const margin = prev.marginBottom !== next.marginBottom;
  const lightBox = prev.useLightBox !== next.useLightBox;

  //don't memo,we need to render since image data is change
  if (src || maxWidth || margin || lightBox) {
    return false;
  }

  //memo since only the selected value changed
  return true;
};

const memoVideo = (prev: VideoProps, next: VideoProps): boolean => {
  const src = prev.video.src !== next.video.src;
  const maxWidth = prev.maxWidth !== next.maxWidth;
  const margin = prev.marginBottom !== next.marginBottom;
  const lightBox = prev.useLightBox !== next.useLightBox;

  //don't memo,we need to render since image data is change
  if (src || maxWidth || margin || lightBox) {
    return false;
  }

  //memo since only the selected value changed
  return true;
};

export {
  getGallerySizes,
  getSizeGroup,
  isWidthGroupsDifferences,
  sortMediaByOrderGroup,
  getOrderGroup,
  getMediaCols,
  getSelectedMedia,
  isMediaSelected,
  memoImage,
  memoVideo,
};
