import styled from "styled-components";
import ErrrSVG from "assets/images/error.svg";
import LoaderSVG from "assets/images/loader.svg";

export enum ImageIndicationType {
  error = "error",
  loader = "loader",
}
type StyledImageIndicationProps = {
  paddingBottom: number;
  custom?: React.ReactElement;
  type: ImageIndicationType;
};

type StyleImgIndicationProps = {
  paddingBottom: number;
  indicationType: ImageIndicationType;
};

const StyledIndication = styled.img.attrs(
  ({ indicationType }: { indicationType: ImageIndicationType }) => ({
    alt:
      indicationType === ImageIndicationType.error
        ? ImageIndicationType.error
        : ImageIndicationType.loader,
    src: indicationType === ImageIndicationType.error ? ErrrSVG : LoaderSVG,
  })
)<StyleImgIndicationProps>`
  height: 100px;
  max-width: 80%;
  margin-bottom: ${({ paddingBottom }) => paddingBottom || 0}px;
`;

const StyledImageIndicationWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const ImageIndication = ({
  paddingBottom,
  custom,
  type,
}: StyledImageIndicationProps) => {
  return (
    <StyledImageIndicationWrapper>
      {!custom ? (
        <StyledIndication paddingBottom={paddingBottom} indicationType={type} />
      ) : (
        custom
      )}
    </StyledImageIndicationWrapper>
  );
};

export default ImageIndication;
