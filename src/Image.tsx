import styled, { css } from "styled-components";

type ImgProps = {
  imageSrc: string;
  imgMaxWidth: number;
  paddingBottom: number;
  className?: string;
  useLightBox?: boolean;
  onClick?: () => void;
};

const Image = styled.img.attrs<ImgProps>(({ imageSrc }) => ({
  src: imageSrc,
}))<ImgProps>`
  max-width: ${({ imgMaxWidth }) => imgMaxWidth}%;
  height: auto;
  margin-bottom: ${({ paddingBottom }) => paddingBottom || 0}px;
  ${({ useLightBox = false }) =>
    useLightBox &&
    css`
      cursor: pointer;
    `}
`;

export default Image;
