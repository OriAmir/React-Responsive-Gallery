import { LightboxProps } from "yet-another-react-lightbox";

export interface OptionsWidthSizes {
  xs: number;
  s: number;
  m: number;
  l: number;
  xl: number;
  xxl: number;
}

export type ScreenWidthSizes = Pick<
  OptionsWidthSizes,
  "xs" | "s" | "m" | "l" | "xl"
>;

export interface GalleryWidthOptions {
  screenWidthSizes?: ScreenWidthSizes;
  numOfMediaPerRow?: OptionsWidthSizes | undefined;
  mediaMaxWidth?: OptionsWidthSizes | undefined;
  colsPadding?: OptionsWidthSizes | undefined;
  mediaMarginBottom?: OptionsWidthSizes | undefined;
}

export interface GallerySizes {
  screenWidthSizes: number;
  numOfMediaPerRow: number;
  mediaMaxWidth: number;
  colsPadding: number;
  mediaMarginBottom: number;
}

export type VideoType = "video/mp4" | "video/webm" | "video/ogg";

export enum MediaType {
  Image = "image",
  Video = "video",
}

export type AdditionalVideoProps = Record<string, string | number | boolean>;

export type AdditionalILightBoxProps = Omit<
  LightboxProps,
  "open" | "close" | "slides" | "index"
>;

export interface ResponsiveGalleryProps {
  media: MediaElementProps[];
  screenWidthSizes?: ScreenWidthSizes;
  numOfMediaPerRow?: OptionsWidthSizes;
  mediaMaxWidth?: OptionsWidthSizes;
  colsPadding?: OptionsWidthSizes;
  mediaMarginBottom?: OptionsWidthSizes;
  mediaStyle?: Record<string, unknown>;
  mediaClassName?: string;
  useLightBox?: boolean;
  lightBoxAdditionalProps?: AdditionalILightBoxProps;
  selectable?: boolean;
  selectableMedia?: string[];
  onSelect?: (id: string, val: boolean) => void;
  onClick?: (id: string) => void;
  customLoader?: React.ReactElement;
  customError?: React.ReactElement;
}

export type MediaCols = Record<string, MediaElementProps[]>;

export enum WidthOptions {
  xs = "xs",
  s = "s",
  m = "m",
  l = "l",
  xl = "xl",
  xxl = "xxl",
}

export enum MediaOrderOptions {
  s = "orderS",
  m = "orderM",
  l = "orderL",
}

type LightBoxVideoSourcesType = Record<"src" | "type", VideoType>[];

export interface MediaElementProps {
  src: string;
  type?: string;
  id?: string;
  alt?: string;
  mediaClassName?: string;
  mediaStyle?: Record<string, unknown>;
  title?: string;
  description?: string;
  orderS?: number;
  orderM?: number;
  orderL?: number;
  videoType?: VideoType | ("video/mp4" | "video/webm" | "video/ogg");
  additionalVideoProps?: AdditionalVideoProps;
}

export interface MediaComponentProps {
  maxWidth: number;
  marginBottom: number;
  className?: string;
  useLightBox?: boolean;
  onClick?: () => void;
  customLoader?: React.ReactElement;
  customError?: React.ReactElement;
  selectable?: boolean;
  selected?: boolean;
  onSelect?: (id: string, val: boolean) => void;
  style?: Record<string, unknown>;
}

export type ExpandedMediaElementProps = MediaElementProps & {
  sources?: LightBoxVideoSourcesType;
};
