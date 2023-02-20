import styled, { css } from "styled-components";
import { StyledImageProps } from "./Image.types";

const StyledImage = styled.img<StyledImageProps>`
  display: ${({ show }) => (!show ? "none" : "block")};
  max-width: ${({ maxWidth }) => maxWidth}%;
  height: auto;
  loading: lazy;
  margin-bottom: ${({ paddingBottom }) => paddingBottom || 0}px;
  ${({ useLightBox = false }) =>
    useLightBox &&
    css`
      cursor: pointer;
    `}
`;

export default StyledImage;
