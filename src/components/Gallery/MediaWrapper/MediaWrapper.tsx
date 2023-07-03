import styled from "styled-components";

const StyledMediaWrapper = styled.div`
  position: relative;
`;

const MediaWrapper = ({ children }: { children: React.ReactNode }) => (
  <StyledMediaWrapper>{children}</StyledMediaWrapper>
);
export default MediaWrapper;
