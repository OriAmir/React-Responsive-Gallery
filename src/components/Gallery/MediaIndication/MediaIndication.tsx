import styled from "styled-components";
import ErrorSVG from "assets/images/error.svg";
import LoaderSVG from "assets/images/loader.svg";
import {
  MediaIndicationProps,
  StyledMediaIndicationProps,
  MediaIndicationType,
} from "./Mediaindication.types";

const StyledMediaIndication = styled.img<StyledMediaIndicationProps>`
  height: 100px;
  max-width: 80%;
  margin-bottom: ${({ $paddingBottom }) => $paddingBottom || 0}px;
`;

const StyledMediaIndicationWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const MediaIndication = ({
  paddingBottom,
  custom,
  type,
}: MediaIndicationProps) => {
  return (
    <StyledMediaIndicationWrapper>
      {!custom ? (
        <StyledMediaIndication
          $paddingBottom={paddingBottom}
          // indicationType={type}
          alt={
            type === MediaIndicationType.error
              ? MediaIndicationType.error
              : MediaIndicationType.loader
          }
          src={type === MediaIndicationType.error ? ErrorSVG : LoaderSVG}
        />
      ) : (
        custom
      )}
    </StyledMediaIndicationWrapper>
  );
};

export default MediaIndication;
