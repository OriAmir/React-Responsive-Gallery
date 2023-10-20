import { MediaElementProps, MediaComponentProps } from "../Gallery.types";

export type ImageProps = MediaComponentProps & {
  img: MediaElementProps;
};

export interface StyledImageProps {
  src: string;
  alt: string;
}

export interface StyledButtonImageProps {
  $maxWidth: number;
  $marginBottom: number;
  $useLightBox?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}
