import { useMemo, useCallback, useRef, lazy, Suspense } from "react";
import Row from "../Grid/Row";
import Col from "../Grid/Col";
import Image from "./Image/Image";
import { useScreenDimensions } from "../../hooks/useScreenDimensions/use-screen-dimensions";
import {
  screenWidthSizes as defaultScreenWidthSizes,
  numOfImagesPerRow as defaultNumOfImagesPerRow,
  imagesMaxWidth as defaultImagesMaxWidth,
  colsPadding as defaultColsPadding,
  imagesPaddingBottom as defaultImagesPaddingBottom,
} from "../../constants/responsive";
import {
  getGallerySizes,
  sortImagesByOrderGroup,
  getImagesCols,
  isImageSelected,
} from "../../utils/gallery.utils";
import {
  ResponsiveGalleryProps,
  GallerySizes,
  GalleryWidthOptions,
  ImageElementProps,
  ImagesCols,
} from "./Gallery.types";
import ImageWrapper from "./ImageWrapper/ImageWrapper";
import { ImagesLightBoxHandle } from "./ImagesLightBox/ImagesLightBox.types";

const ImagesLightBoxComponent = lazy(() =>
  import("./ImagesLightBox/ImagesLightBox").then((module) => ({
    default: module.ImagesLightBox,
  }))
);

const Gallery = ({
  images,
  screenWidthSizes,
  numOfImagesPerRow,
  imagesMaxWidth,
  colsPadding,
  imagesPaddingBottom,
  imagesStyle,
  useLightBox,
  lightBoxAdditionalProps,
  selectable,
  selectableItems,
  onSelect,
  customLoader,
  customError,
}: ResponsiveGalleryProps) => {
  const { width } = useScreenDimensions(screenWidthSizes);
  const userGalleryOptions: GalleryWidthOptions = {
    screenWidthSizes,
    numOfImagesPerRow,
    imagesMaxWidth,
    colsPadding,
    imagesPaddingBottom,
  };
  const gallerySizes: GallerySizes = getGallerySizes(width, userGalleryOptions);
  const lightboxRef = useRef<ImagesLightBoxHandle>(null);

  const sortedImages: Array<ImageElementProps> = useMemo(
    () => sortImagesByOrderGroup(images, width, screenWidthSizes),
    [images, screenWidthSizes, width]
  );
  const imagesCols: ImagesCols | Record<string, never> = useMemo(
    () => getImagesCols(sortedImages, gallerySizes.numOfImagesPerRow),
    [gallerySizes, sortedImages]
  );

  const onImageClick = useCallback(
    (imgIndex: number, colIndex: number) => {
      if (useLightBox) {
        lightboxRef?.current?.openImageByIndex(imgIndex, colIndex);
      }
    },
    [useLightBox]
  );

  return (
    <>
      {useLightBox && (
        <Suspense fallback={<div>Loading...</div>}>
          <ImagesLightBoxComponent
            imagesLightbox={sortedImages}
            ref={lightboxRef}
            lightBoxAdditionalProps={lightBoxAdditionalProps}
            numOfImagesPerRow={gallerySizes.numOfImagesPerRow}
          />
        </Suspense>
      )}
      <Row>
        {Object.keys(imagesCols).map((key, colIndex) => (
          <Col
            key={`col-${key}`}
            colSize={100 / gallerySizes.numOfImagesPerRow}
            colPadding={gallerySizes.colsPadding}
          >
            {imagesCols[key].map((img: ImageElementProps, imgIndex: number) => (
              <ImageWrapper key={img.id || img.src}>
                <Image
                  img={img}
                  maxWidth={gallerySizes.imagesMaxWidth}
                  paddingBottom={gallerySizes.imagesPaddingBottom}
                  className={`${imagesStyle} ${img.imgClassName || ""}`}
                  useLightBox={useLightBox}
                  onClick={() => onImageClick(imgIndex, colIndex)}
                  customLoader={customLoader}
                  customError={customError}
                  selectable={selectable}
                  selected={
                    selectableItems
                      ? isImageSelected(img, selectableItems)
                      : false
                  }
                  onSelect={onSelect}
                />
              </ImageWrapper>
            ))}
          </Col>
        ))}
      </Row>
    </>
  );
};

Gallery.defaultProps = {
  screenWidthSizes: defaultScreenWidthSizes,
  numOfImagesPerRow: defaultNumOfImagesPerRow,
  imagesMaxWidth: defaultImagesMaxWidth,
  colsPadding: defaultColsPadding,
  imagesPaddingBottom: defaultImagesPaddingBottom,
  imagesStyle: "",
  useLightBox: false,
  selectable: false,
  customLoader: null,
  customError: null,
};

export default Gallery;
