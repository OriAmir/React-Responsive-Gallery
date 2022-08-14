import {
  ImageElementProps,
  AdditionalILightBoxProps,
} from "../../Gallery/Gallery.types";

export type ImageLightBoxProps = {
  imagesLightbox: Array<ImageElementProps>;
  photoIndex: number;
  lightBoxDispatch: (obj: { type: string; payload?: number | string }) => void;
  lightBoxAdditionalProps?: AdditionalILightBoxProps;
};
