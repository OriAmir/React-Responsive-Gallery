import styled from "styled-components";

const StyledImageWrapper = styled.div`
  position: relative;
`;

const ImageWrapper = ({ children }: { children: React.ReactNode }) => (
  <StyledImageWrapper>{children}</StyledImageWrapper>
);
export default ImageWrapper;
