import { useState } from "react";
import styled from "styled-components";
import { SelectProps } from "./Select.types";
import { StyledSelect } from "./StyledSelect";

const StyledDiv = styled.div<{ $mediaMaxWidth: number }>`
  position: absolute;
  z-index: 100;
  top: 8px;
  ${(props) =>
    props.$mediaMaxWidth &&
    `left: calc(${props.$mediaMaxWidth}% - 22px - 8px);`}
`;

const Select = ({
  value = false,
  id,
  onSelect,
  mediaMaxWidth,
}: SelectProps) => {
  const [check, setCheck] = useState(value);
  const onSelectChange = (id: string, val: boolean) => {
    if (onSelect) {
      onSelect(id, val);
    }
    setCheck(val);
  };
  const uniqueId = `checkbox-${id}`;
  return (
    <StyledDiv $mediaMaxWidth={mediaMaxWidth}>
      <StyledSelect>
        <input
          type="checkbox"
          className="select-input"
          onChange={(e) => onSelectChange(id, e.target.checked)}
          value={id}
          id={uniqueId}
          data-testid={uniqueId}
          checked={check}
        />
        <label htmlFor={uniqueId}></label>
      </StyledSelect>
    </StyledDiv>
  );
};

export default Select;
