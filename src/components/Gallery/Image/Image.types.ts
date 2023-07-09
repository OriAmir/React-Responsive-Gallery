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
  $marginBottom: number;
  $useLightBox?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};
