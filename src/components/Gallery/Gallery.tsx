import { useMemo, useReducer, useCallback } from "react";
import { nanoid } from "nanoid";
import ImagesLightBox from "./ImagesLightBox/ImagesLightBox";
import {
  lightBoxReducer,
  initialState,
} from "../../reducers/lightBox/light-box-reducer";
import { LightboxActionType } from "../../reducers/lightBox/light-box-actions-type";
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
} from "../../utils/gallery.utils";
import {
  ResponsiveGalleryProps,
  GallerySizes,
  GalleryWidthOptions,
  ImageElementProps,
  ImagesCols,
} from "./Gallery.types";
import Select from "./Select/Select";
import ImageWrapper from "./ImageWrapper/ImageWrapper";
import "react-image-lightbox/style.css";

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
  const [lightBoxValues, lightBoxDispatch] = useReducer(
    lightBoxReducer,
    initialState
  );

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
        lightBoxDispatch({
          type: LightboxActionType.LIGHT_BOX_OPEN_BY_PHOTO_INDEX,
          payload:
            imgIndex === 0
              ? colIndex
              : colIndex + imgIndex * gallerySizes.numOfImagesPerRow,
        });
      }
    },
    [gallerySizes.numOfImagesPerRow, useLightBox]
  );

  return (
    <>
      {useLightBox && lightBoxValues.isOpen && (
        <ImagesLightBox
          imagesLightbox={sortedImages}
          photoIndex={lightBoxValues.photoIndex}
          lightBoxDispatch={lightBoxDispatch}
          lightBoxAdditionalProps={lightBoxAdditionalProps}
        />
      )}
      <Row>
        {Object.keys(imagesCols).map((key, colIndex) => (
          <Col
            key={nanoid()}
            colSize={100 / gallerySizes.numOfImagesPerRow}
            colPadding={gallerySizes.colsPadding}
          >
            {imagesCols[key].map((img: ImageElementProps, imgIndex: number) => (
              <ImageWrapper key={img.id || nanoid()}>
                {selectable && (
                  <Select
                    id={img?.id || img.src}
                    selectableItems={selectableItems}
                    onSelect={onSelect}
                    imagesMaxWidth={gallerySizes.imagesMaxWidth}
                  />
                )}
                <Image
                  src={img.src}
                  maxWidth={gallerySizes.imagesMaxWidth}
                  alt={img.alt}
                  paddingBottom={gallerySizes.imagesPaddingBottom}
                  className={`${imagesStyle} ${img.imgClassName || ""}`}
                  useLightBox={useLightBox}
                  onClick={() => onImageClick(imgIndex, colIndex)}
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
};

export default Gallery;
