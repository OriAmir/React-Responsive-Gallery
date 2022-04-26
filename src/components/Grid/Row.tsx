import React from "react";
import styled from "styled-components";

const StyledDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 0 4px;
  box-sizing: border-box;
`;

const Row = ({ children }: { children: React.ReactNode }) => (
  <StyledDiv>{children}</StyledDiv>
);

export default Row;
