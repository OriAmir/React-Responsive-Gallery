import React from "react";
import Lightbox from "react-image-lightbox";
import { LightboxActionType } from "reducers/lightBox/light-box-actions-type";
import { ImageLightBoxProps } from "./ImagesLightBox.types";

export const ImagesLightBox = ({
  imagesLightbox,
  photoIndex,
  lightBoxDispatch,
  lightBoxAdditionalProps,
}: ImageLightBoxProps) => (
  <Lightbox
    mainSrc={imagesLightbox[photoIndex].src}
    nextSrc={imagesLightbox[(photoIndex + 1) % imagesLightbox.length].src}
    prevSrc={
      imagesLightbox[
        (photoIndex + imagesLightbox.length - 1) % imagesLightbox.length
      ].src
    }
    onCloseRequest={() =>
      lightBoxDispatch({ type: LightboxActionType.LIGHT_BOX_CLOSE })
    }
    onMovePrevRequest={() =>
      lightBoxDispatch({
        type: LightboxActionType.LIGHT_BOX_MOVE_PHOTO_BY_INDEX,
        payload:
          (photoIndex + imagesLightbox.length - 1) % imagesLightbox.length,
      })
    }
    onMoveNextRequest={() =>
      lightBoxDispatch({
        type: LightboxActionType.LIGHT_BOX_MOVE_PHOTO_BY_INDEX,
        payload: (photoIndex + 1) % imagesLightbox.length,
      })
    }
    imageTitle={imagesLightbox[photoIndex]?.lightboxTitle}
    imageCaption={imagesLightbox[photoIndex]?.lightboxCaption}
    {...lightBoxAdditionalProps}
  />
);

export default ImagesLightBox;
