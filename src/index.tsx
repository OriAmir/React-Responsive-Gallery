import React, { useMemo, useReducer } from "react";
import { nanoid } from "nanoid";
import ImagesLightBox from "./images-light-box";
import {
  lightBoxReducer,
  initialState,
} from "./reducers/lightBox/light-box-reducer";
import { LightboxActionType } from "./reducers/lightBox/light-box-actions-type";
import Row from "./grid/Row";
import Col from "./grid/Col";
import Image from "./Image";
import useScreenDimensions from "./hooks/use-screen-dimensions";
import {
  screenWidthSizes as defaultScreenWidthSizes,
  numOfImagesPerRow as defaultNumOfImagesPerRow,
  imagesMaxWidth as defaultImagesMaxWidth,
  colsPadding as defaultColsPadding,
  imagesPaddingBottom as defaultImagesPaddingBottom,
} from "./constants/responsive";
import {
  getGallerySizes,
  sortImagesByOrderGroup,
  getImagesCols,
} from "./utils/gallery.utils";
import {
  ResponsiveGalleryProps,
  GallerySizes,
  GalleryWidthOptions,
  ImageElementProps,
  ImagesCols,
} from "./gallery.types";
import "react-image-lightbox/style.css";

const ResponsiveGallery = ({
  images,
  screenWidthSizes,
  numOfImagesPerRow,
  imagesMaxWidth,
  colsPadding,
  imagesPaddingBottom,
  imagesStyle,
  useLightBox,
  lightBoxAdditionalProps,
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
              <Image
                key={nanoid()}
                imageSrc={img.src}
                imgMaxWidth={gallerySizes.imagesMaxWidth}
                paddingBottom={gallerySizes.imagesPaddingBottom}
                className={`${imagesStyle} ${img.imgClassName || ""}`}
                useLightBox={useLightBox}
                onClick={() => {
                  if (useLightBox) {
                    lightBoxDispatch({
                      type: LightboxActionType.LIGHT_BOX_OPEN_BY_PHOTO_INDEX,
                      payload:
                        imgIndex === 0
                          ? colIndex
                          : colIndex +
                            imgIndex * gallerySizes.numOfImagesPerRow,
                    });
                  }
                }}
              />
            ))}
          </Col>
        ))}
      </Row>
    </>
  );
};

ResponsiveGallery.defaultProps = {
  screenWidthSizes: defaultScreenWidthSizes,
  numOfImagesPerRow: defaultNumOfImagesPerRow,
  imagesMaxWidth: defaultImagesMaxWidth,
  colsPadding: defaultColsPadding,
  imagesPaddingBottom: defaultImagesPaddingBottom,
  imagesStyle: "",
  useLightBox: false,
};

export default ResponsiveGallery;
