import { useMemo, useCallback, useRef, lazy, Suspense } from "react";
import Row from "../Grid/Row";
import Col from "../Grid/Col";
import Image from "./Image/Image";
import { useScreenDimensions } from "../../hooks/useScreenDimensions/use-screen-dimensions";
import {
  screenWidthSizes as defaultScreenWidthSizes,
  numOfMediaPerRow as defaultNumOfMediaPerRow,
  mediaMaxWidth as defaultMediaMaxWidth,
  colsPadding as defaultColsPadding,
  mediaMarginBottom as defaultMediaMarginBottom,
} from "../../constants/responsive";
import {
  getGallerySizes,
  sortMediaByOrderGroup,
  getMediaCols,
  isMediaSelected,
} from "../../utils/gallery.utils";
import {
  ResponsiveGalleryProps,
  GallerySizes,
  GalleryWidthOptions,
  MediaCols,
  MediaType,
  MediaElementProps,
  MediaComponentProps,
} from "./Gallery.types";
import MediaWrapper from "./MediaWrapper/MediaWrapper";
import { MediaLightBoxHandle } from "./MediaLightBox/MediaLightBox.types";
import Video from "./Video/Video";

const MediaLightBoxComponent = lazy(() =>
  import("./MediaLightBox/MediaLightBox").then((module) => ({
    default: module.MediaLightBox,
  })),
);

const Gallery = ({
  media,
  screenWidthSizes,
  numOfMediaPerRow,
  mediaMaxWidth,
  colsPadding,
  mediaMarginBottom,
  mediaStyle,
  mediaClassName,
  useLightBox,
  lightBoxAdditionalProps,
  selectable,
  selectableMedia,
  onSelect,
  customLoader,
  customError,
  onClick,
}: ResponsiveGalleryProps) => {
  const { width } = useScreenDimensions(screenWidthSizes);
  const userGalleryOptions: GalleryWidthOptions = {
    screenWidthSizes,
    numOfMediaPerRow,
    mediaMaxWidth,
    colsPadding,
    mediaMarginBottom,
  };
  const gallerySizes: GallerySizes = getGallerySizes(width, userGalleryOptions);
  const lightboxRef = useRef<MediaLightBoxHandle>(null);

  const sortedMedia: MediaElementProps[] = useMemo(
    () => sortMediaByOrderGroup(media, width, screenWidthSizes),
    [media, screenWidthSizes, width],
  );
  const mediaCols: MediaCols = useMemo(
    () => getMediaCols(sortedMedia, gallerySizes.numOfMediaPerRow),
    [gallerySizes, sortedMedia],
  );

  const onMediaClick = useCallback(
    (mediaIndex: number, colIndex: number, id: string) => {
      if (onClick) {
        onClick(id);
      }
      if (useLightBox) {
        lightboxRef?.current?.openMediaByIndex(mediaIndex, colIndex);
      }
    },
    [onClick, useLightBox],
  );

  return (
    <>
      {useLightBox && (
        <Suspense fallback={<></>}>
          <MediaLightBoxComponent
            mediaLightbox={sortedMedia}
            ref={lightboxRef}
            lightBoxAdditionalProps={lightBoxAdditionalProps}
            numOfMediaPerRow={gallerySizes.numOfMediaPerRow}
          />
        </Suspense>
      )}
      <Row>
        {Object.keys(mediaCols).map((key, colIndex) => (
          <Col
            key={`col-${key}`}
            $colSize={100 / gallerySizes.numOfMediaPerRow}
            $colPadding={gallerySizes.colsPadding}
          >
            {mediaCols?.[key]?.map(
              (media: MediaElementProps, mediaIndex: number) => {
                const eleProps: MediaComponentProps = {
                  maxWidth: gallerySizes.mediaMaxWidth,
                  marginBottom: gallerySizes.mediaMarginBottom,
                  useLightBox,
                  className: `${media?.mediaClassName || ""} ${
                    mediaClassName || ""
                  }`,
                  onClick: () =>
                    onMediaClick(mediaIndex, colIndex, media?.id || media.src),
                  selectable,
                  selected: selectableMedia
                    ? isMediaSelected(media, selectableMedia)
                    : false,
                  style: {
                    ...(mediaStyle || {}),
                    ...(media.mediaStyle || {}),
                  },
                  customLoader,
                  customError,
                  onSelect,
                };

                return (
                  <MediaWrapper key={media.id || media.src}>
                    {media?.type === MediaType.Video ? (
                      <Video video={media} {...eleProps} />
                    ) : (
                      <Image img={media} {...eleProps} />
                    )}
                  </MediaWrapper>
                );
              },
            )}
          </Col>
        ))}
      </Row>
    </>
  );
};

Gallery.defaultProps = {
  screenWidthSizes: defaultScreenWidthSizes,
  numOfMediaPerRow: defaultNumOfMediaPerRow,
  mediaMaxWidth: defaultMediaMaxWidth,
  colsPadding: defaultColsPadding,
  mediaMarginBottom: defaultMediaMarginBottom,
  mediaStyle: null,
  mediaClassName: "",
  useLightBox: false,
  selectable: false,
  customLoader: null,
  customError: null,
};

export default Gallery;
