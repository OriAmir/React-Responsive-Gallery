import { MediaElementProps, AdditionalILightBoxProps } from "../Gallery.types";

export interface MediaLightBoxProps {
  mediaLightbox: MediaElementProps[];
  lightBoxAdditionalProps?: AdditionalILightBoxProps;
  numOfMediaPerRow: number;
}

export interface MediaLightBoxHandle {
  openMediaByIndex: (mediaIndex: number, colIndex: number) => void;
}
