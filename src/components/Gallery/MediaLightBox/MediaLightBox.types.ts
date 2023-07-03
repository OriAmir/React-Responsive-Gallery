import { MediaElementProps, AdditionalILightBoxProps } from "../Gallery.types";

export type MediaLightBoxProps = {
  mediaLightbox: Array<MediaElementProps>;
  lightBoxAdditionalProps?: AdditionalILightBoxProps;
  numOfMediaPerRow: number;
};

export type MediaLightBoxHandle = {
  openMediaByIndex: (mediaIndex: number, colIndex: number) => void;
};
