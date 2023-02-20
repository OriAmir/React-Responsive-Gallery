import { ImageElementProps } from "../Gallery.types";

export type ImageProps = {
  img: ImageElementProps;
  maxWidth: number;
  paddingBottom: number;
  className?: string;
  useLightBox?: boolean;
  onClick?: () => void;
  customLoader?: React.ReactElement;
  customError?: React.ReactElement;
  selectable?: boolean;
  selected?: boolean;
  onSelect?: (id: string, val: boolean) => void;
};

export type StyledImageProps = {
  src: string;
  show: boolean;
  alt: string;
  maxWidth: number;
  paddingBottom: number;
  useLightBox?: boolean;
  onClick?: () => void;
};
