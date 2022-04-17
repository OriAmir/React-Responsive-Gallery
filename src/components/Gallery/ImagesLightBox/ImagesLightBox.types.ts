import { ILightBoxProps } from "react-image-lightbox";
import { ImageElementProps } from "../../Gallery/gallery.types";

export type ImageLightBoxProps = {
  imagesLightbox: Array<ImageElementProps>;
  photoIndex: number;
  lightBoxDispatch: (obj: { type: string; payload?: number | string }) => void;
  lightBoxAdditionalProps?: ILightBoxProps;
};
