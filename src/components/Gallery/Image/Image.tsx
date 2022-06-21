import styled, { css } from "styled-components";

type ImgProps = {
  src: string;
  maxWidth: number;
  alt?: string;
  paddingBottom: number;
  className?: string;
  useLightBox?: boolean;
  onClick?: () => void;
};

const Image = styled.img.attrs<ImgProps>(({ src }) => ({
  src,
}))<ImgProps>`
  max-width: ${({ maxWidth }) => maxWidth}%;
  height: auto;
  margin-bottom: ${({ paddingBottom }) => paddingBottom || 0}px;
  ${({ useLightBox = false }) =>
    useLightBox &&
    css`
      cursor: pointer;
    `}
  ${({ alt = "" }) =>
    alt &&
    css`
      alt: ${alt};
    `}
`;

export default Image;
