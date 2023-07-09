import styled, { css } from "styled-components";
import { StyledImageProps, StyledButtonImageProps } from "./Image.types";

const StyledButtonImage = styled.button<StyledButtonImageProps>`
  position: relative;
  max-width: ${({ $maxWidth }) => $maxWidth}%;
  border: none;
  padding: 0;
  background-color: transparent;
  margin-bottom: ${({ $marginBottom }) => $marginBottom || 0}px;
  ${({ $useLightBox = false }) =>
    $useLightBox &&
    css`
      cursor: pointer;
    `}
`;

const StyledImage = styled.img<StyledImageProps>`
  max-width: 100%;
  height: auto;
`;

export { StyledImage, StyledButtonImage };
