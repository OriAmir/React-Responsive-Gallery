import {
  ImageElementProps,
  AdditionalILightBoxProps,
} from "../../Gallery/Gallery.types";

export type ImageLightBoxProps = {
  imagesLightbox: Array<ImageElementProps>;
  lightBoxAdditionalProps?: AdditionalILightBoxProps;
  numOfImagesPerRow: number;
};

export type ImagesLightBoxHandle = {
  openImageByIndex: (imgIndex: number, colIndex: number) => void;
};
