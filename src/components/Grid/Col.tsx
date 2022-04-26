import styled from "styled-components";

type ColProps = {
  colSize?: number;
  colPadding?: number;
};

const Col = styled.div<ColProps>`
  box-sizing: border-box;
  flex: ${({ colSize }) => colSize || 1}%;
  max-width: ${({ colSize }) => colSize || 100}%;
  padding: ${({ colPadding }) => colPadding || 0}px;
`;

export default Col;
