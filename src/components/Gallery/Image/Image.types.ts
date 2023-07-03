import { MediaElementProps, MediaComponentProps } from "../Gallery.types";

export type ImageProps = MediaComponentProps & {
  img: MediaElementProps;
};

export type StyledImageProps = {
  src: string;
  alt: string;
};

export type StyledButtonImageProps = {
  $maxWidth: number;
  $paddingBottom: number;
  $useLightBox?: boolean;
  onClick?: () => void;
};
