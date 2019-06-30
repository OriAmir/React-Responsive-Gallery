import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import shortid from 'shortid';
// import styles from './app.module.scss';
import { Row } from './grid';
import useScreenDimensions from './hooks/use-screen-dimensions';
import {
  screenWidthSizes as defaultScreenWidthSizes,
  numOfImagesPerRow as defaultNumOfImagesPerRow,
  imagesMaxWidth as defaultImagesMaxWidth,
  colsPadding as defaultColsPadding,
  imagesPaddingBottom as defaultImagesPaddingBottom
} from './constants/responsive';
import { getGallerySizes, sortImagesArrayByOrder } from './utils/gallery';

const ImgElment = styled.img.attrs(props => ({
  src: props.imageSrc
}))`
  max-width: ${props => props.imgMaxWidth}%;
  height: auto;
  margin-bottom: ${props => props.paddingBottom || 0}px;
`;

const ColElement = styled.div.attrs(props => ({
  src: props.imageSrc
}))`
box-sizing: border-box;
flex: ${props => props.colSize || 1}%;
max-width: ${props => props.colSize || 100}%;
padding: ${props => props.colPadding || 0}px;
`;

const ResponsiveGallery = ({
  images, screenWidthSizes, numOfImagesPerRow, imagesMaxWidth,
  colsPadding, imagesPaddingBottom, imagesStyle
}) => {
  const { width } = useScreenDimensions(screenWidthSizes);
  const gallerySizes = getGallerySizes(width, {
    screenWidthSizes,
    numOfImagesPerRow,
    imagesMaxWidth,
    colsPadding,
    imagesPaddingBottom
  });

  const sorted = sortImagesArrayByOrder(images, width, screenWidthSizes);

  const imagesCols = sorted.reduce((total, cur, index) => (
    total[index % gallerySizes.numOfImagePerRow]
      ? {
        ...total,
        [index % gallerySizes.numOfImagePerRow]:
         [...total[index % gallerySizes.numOfImagePerRow], cur]
      }
      : { ...total, [index % gallerySizes.numOfImagePerRow]: [cur] }), {});

  return (
    <Row>
      {Object.keys(imagesCols).map(key => (
        <ColElement
          key={shortid.generate()}
          colSize={100 / gallerySizes.numOfImagePerRow}
          colPadding={gallerySizes.colsPadding}
        >
          {imagesCols[key].map(img => (
            <ImgElment
              key={shortid.generate()}
              imageSrc={img.src}
              imgMaxWidth={gallerySizes.imagesMaxWidth}
              paddingBottom={gallerySizes.imagesPaddingBottom}
              className={`${imagesStyle} ${img.imgClassName || ''}`}
            />
          ))
          }
        </ColElement>
      ))
      }
    </Row>
  );
};

ResponsiveGallery.propTypes = {
  images: PropTypes.array.isRequired,
  screenWidthSizes: PropTypes.object,
  numOfImagesPerRow: PropTypes.object,
  imagesMaxWidth: PropTypes.object,
  colsPadding: PropTypes.object,
  imagesPaddingBottom: PropTypes.object,
  imagesStyle: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ])
};

ResponsiveGallery.defaultProps = {
  screenWidthSizes: defaultScreenWidthSizes,
  numOfImagesPerRow: defaultNumOfImagesPerRow,
  imagesMaxWidth: defaultImagesMaxWidth,
  colsPadding: defaultColsPadding,
  imagesPaddingBottom: defaultImagesPaddingBottom,
  imagesStyle: ''
};

export default ResponsiveGallery;
