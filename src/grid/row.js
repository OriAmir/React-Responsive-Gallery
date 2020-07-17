import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const StyledDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 0 4px;
  box-sizing: border-box;
`;

const Row = ({ children }) => <StyledDiv>{children}</StyledDiv>;

Row.propTypes = {
  children: PropTypes.node,
};

export default Row;
