import Lightbox from "yet-another-react-lightbox";
import { LightboxActionType } from "reducers/lightBox/light-box-actions-type";
import { MediaLightBoxProps, MediaLightBoxHandle } from "./MediaLightBox.types";
import {
  lightBoxReducer,
  initialState,
} from "reducers/lightBox/light-box-reducer";
import { forwardRef, useImperativeHandle, useReducer } from "react";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";
import Captions from "yet-another-react-lightbox/plugins/captions";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Video from "yet-another-react-lightbox/plugins/video";

export const MediaLightBox = forwardRef<
  MediaLightBoxHandle,
  MediaLightBoxProps
>((props, ref) => {
  const [lightBoxValues, lightBoxDispatch] = useReducer(
    lightBoxReducer,
    initialState,
  );
  const { numOfMediaPerRow, mediaLightbox, lightBoxAdditionalProps } = props;

  useImperativeHandle(
    ref,
    () => {
      return {
        openMediaByIndex(mediaIndex: number, colIndex: number) {
          lightBoxDispatch({
            type: LightboxActionType.LIGHT_BOX_OPEN_BY_MEDIA_INDEX,
            payload:
              mediaIndex === 0
                ? colIndex
                : colIndex + mediaIndex * numOfMediaPerRow,
          });
        },
      };
    },
    [numOfMediaPerRow],
  );

  const { mediaIndex, isOpen } = lightBoxValues;
  const additionalPlugins = lightBoxAdditionalProps?.plugins || [];
  return isOpen ? (
    <Lightbox
      close={() =>
        lightBoxDispatch({ type: LightboxActionType.LIGHT_BOX_CLOSE })
      }
      open={isOpen}
      //@ts-ignore
      slides={mediaLightbox}
      index={mediaIndex}
      plugins={[Captions, Fullscreen, Video, ...additionalPlugins]}
      {...lightBoxAdditionalProps}
    />
  ) : null;
});

MediaLightBox.displayName = "MediaLightBox";

export default MediaLightBox;
