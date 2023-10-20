import styled from "styled-components";

export const StyledSelect = styled.div`
  position: relative;

  input[type="checkbox"] {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
    z-index: -1;
  }

  label {
    position: relative;
    display: inline-block;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 50%;
    cursor: pointer;
    height: 22px;
    width: 22px;
  }

  label:after {
    content: "";
    position: absolute;
    top: 25%;
    left: 25%;
    transform: translate(-50%, -50%);
    border: 2px solid #fff;
    border-top: none;
    border-right: none;
    height: 5px;
    width: 10px;
    opacity: 0;
    transform: rotate(-45deg);
  }

  input[type="checkbox"]:focus + label {
    outline: 2px solid blue; /* Add focus outline for accessibility */
  }

  input[type="checkbox"]:checked + label {
    background-color: #66bb6a;
    border-color: #66bb6a;
  }

  input[type="checkbox"]:checked + label:after {
    opacity: 1;
  }
`;
