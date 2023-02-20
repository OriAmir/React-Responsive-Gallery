import Lightbox from "yet-another-react-lightbox";
import { LightboxActionType } from "reducers/lightBox/light-box-actions-type";
import {
  ImageLightBoxProps,
  ImagesLightBoxHandle,
} from "./ImagesLightBox.types";
import {
  lightBoxReducer,
  initialState,
} from "reducers/lightBox/light-box-reducer";
import { forwardRef, useImperativeHandle, useReducer } from "react";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";
import Captions from "yet-another-react-lightbox/plugins/captions";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";

export const ImagesLightBox = forwardRef<
  ImagesLightBoxHandle,
  ImageLightBoxProps
>((props, ref) => {
  const [lightBoxValues, lightBoxDispatch] = useReducer(
    lightBoxReducer,
    initialState
  );
  const { numOfImagesPerRow, imagesLightbox, lightBoxAdditionalProps } = props;

  useImperativeHandle(
    ref,
    () => {
      return {
        openImageByIndex(imgIndex: number, colIndex: number) {
          lightBoxDispatch({
            type: LightboxActionType.LIGHT_BOX_OPEN_BY_PHOTO_INDEX,
            payload:
              imgIndex === 0
                ? colIndex
                : colIndex + imgIndex * numOfImagesPerRow,
          });
        },
      };
    },
    [numOfImagesPerRow]
  );

  const { photoIndex, isOpen } = lightBoxValues;
  return isOpen ? (
    <Lightbox
      close={() =>
        lightBoxDispatch({ type: LightboxActionType.LIGHT_BOX_CLOSE })
      }
      open={isOpen}
      slides={imagesLightbox}
      index={photoIndex}
      plugins={[Captions, Fullscreen]}
      {...lightBoxAdditionalProps}
    />
  ) : null;
});

export default ImagesLightBox;
