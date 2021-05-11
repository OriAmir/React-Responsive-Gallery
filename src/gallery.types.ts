import { ILightBoxProps } from "react-image-lightbox";

export type OptionsWidthSizes = {
  xs: number;
  s: number;
  m: number;
  l: number;
  xl: number;
  xxl: number;
};

export type ScreenWidthSizes = Pick<
  OptionsWidthSizes,
  "xs" | "s" | "m" | "l" | "xl"
>;

export type GalleryWidthOptions = {
  screenWidthSizes?: ScreenWidthSizes;
  numOfImagesPerRow?: OptionsWidthSizes | undefined;
  imagesMaxWidth?: OptionsWidthSizes | undefined;
  colsPadding?: OptionsWidthSizes | undefined;
  imagesPaddingBottom?: OptionsWidthSizes | undefined;
};

export type GallerySizes = {
  screenWidthSizes: number;
  numOfImagesPerRow: number;
  imagesMaxWidth: number;
  colsPadding: number;
  imagesPaddingBottom: number;
};

export type ImageLightBoxProps = {
  imagesLightbox: Array<ImageElementProps>;
  photoIndex: number;
  lightBoxDispatch: (obj: { type: string; payload?: number | string }) => void;
  lightBoxAdditionalProps?: ILightBoxProps;
};

export type ImageBasicData = {
  lightboxCaption?: string;
  lightboxTitle?: string;
  src: string;
};

export interface ImageElementProps extends ImageBasicData {
  orderS?: number;
  orderM?: number;
  orderL?: number;
  imgClassName?: string | Record<string, unknown>;
}

export type ResponsiveGalleryProps = {
  images: Array<ImageElementProps>;
  screenWidthSizes?: ScreenWidthSizes;
  numOfImagesPerRow?: OptionsWidthSizes;
  imagesMaxWidth?: OptionsWidthSizes;
  colsPadding?: OptionsWidthSizes;
  imagesPaddingBottom?: OptionsWidthSizes;
  imagesStyle?: Record<string, unknown> | string;
  useLightBox?: boolean;
  lightBoxAdditionalProps?: ILightBoxProps;
};

export type ImagesCols = Array<ImageElementProps>;

export enum WidthOptions {
  xs = "xs",
  s = "s",
  m = "m",
  l = "l",
  xl = "xl",
  xxl = "xxl",
}

export enum ImageOrderOptions {
  s = "orderS",
  m = "orderM",
  l = "orderL",
}
