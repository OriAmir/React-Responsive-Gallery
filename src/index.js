import React, { useReducer } from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import shortid from "shortid";
import ImagesLightBox from "./images-light-box";
import { lightBoxReducer } from "./reducers";
import { Row } from "./grid";
import useScreenDimensions from "./hooks/use-screen-dimensions";
import {
  screenWidthSizes as defaultScreenWidthSizes,
  numOfImagesPerRow as defaultNumOfImagesPerRow,
  imagesMaxWidth as defaultImagesMaxWidth,
  colsPadding as defaultColsPadding,
  imagesPaddingBottom as defaultImagesPaddingBottom,
} from "./constants/responsive";
import { getGallerySizes, sortImagesArrayByOrder } from "./utils/gallery";
import "react-image-lightbox/style.css"; // This only needs to be imported once in your app

const ImgElment = styled.img.attrs((props) => ({
  src: props.imageSrc,
}))`
  max-width: ${(props) => props.imgMaxWidth}%;
  height: auto;
  margin-bottom: ${(props) => props.paddingBottom || 0}px;
  ${(props) =>
    props.useLightBox &&
    css`
      cursor: pointer;
    `}
`;

const ColElement = styled.div.attrs((props) => ({
  src: props.imageSrc,
}))`
  box-sizing: border-box;
  flex: ${(props) => props.colSize || 1}%;
  max-width: ${(props) => props.colSize || 100}%;
  padding: ${(props) => props.colPadding || 0}px;
`;

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
}) => {
  const { width } = useScreenDimensions(screenWidthSizes);
  const gallerySizes = getGallerySizes(width, {
    screenWidthSizes,
    numOfImagesPerRow,
    imagesMaxWidth,
    colsPadding,
    imagesPaddingBottom,
  });
  const [lightBoxVal, lightBoxDispatch] = useReducer(lightBoxReducer, {
    photoIndex: 0,
    isOpen: false,
  });
  const sorted = sortImagesArrayByOrder(images, width, screenWidthSizes);

  const imagesCols = sorted.reduce(
    (total, cur, index) =>
      total[index % gallerySizes.numOfImagePerRow]
        ? {
            ...total,
            [index % gallerySizes.numOfImagePerRow]: [
              ...total[index % gallerySizes.numOfImagePerRow],
              cur,
            ],
          }
        : { ...total, [index % gallerySizes.numOfImagePerRow]: [cur] },
    {}
  );

  return (
    <>
      {useLightBox && lightBoxVal.isOpen && (
        <ImagesLightBox
          imagesLightbox={sorted}
          photoIndex={lightBoxVal.photoIndex}
          lightBoxDispatch={lightBoxDispatch}
          lightBoxAdditionalProps={lightBoxAdditionalProps}
        />
      )}
      <Row>
        {Object.keys(imagesCols).map((key, colIndex) => (
          <ColElement
            key={shortid.generate()}
            colSize={100 / gallerySizes.numOfImagePerRow}
            colPadding={gallerySizes.colsPadding}
          >
            {imagesCols[key].map((img, imgIndex) => (
              <ImgElment
                key={shortid.generate()}
                imageSrc={img.src}
                imgMaxWidth={gallerySizes.imagesMaxWidth}
                paddingBottom={gallerySizes.imagesPaddingBottom}
                className={`${imagesStyle} ${img.imgClassName || ""}`}
                useLightBox={useLightBox}
                onClick={() =>
                  useLightBox &&
                  lightBoxDispatch({
                    type: "photoIndex_Open",
                    photoIndex:
                      imgIndex === 0
                        ? colIndex
                        : colIndex + imgIndex * gallerySizes.numOfImagePerRow,
                  })
                }
              />
            ))}
          </ColElement>
        ))}
      </Row>
    </>
  );
};

ResponsiveGallery.propTypes = {
  images: PropTypes.array.isRequired,
  screenWidthSizes: PropTypes.object,
  numOfImagesPerRow: PropTypes.object,
  imagesMaxWidth: PropTypes.object,
  colsPadding: PropTypes.object,
  imagesPaddingBottom: PropTypes.object,
  imagesStyle: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  useLightBox: PropTypes.bool,
  lightBoxAdditionalProps: PropTypes.object,
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
