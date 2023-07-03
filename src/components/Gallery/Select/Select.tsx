import { useState } from "react";
import styled from "styled-components";
import { CheckboxProps, SelectProps } from "./Select.types";
import { StyledSelect } from "./StyledSelect";

const StyledCheckbox = styled.input.attrs<CheckboxProps>(
  ({ value, checked, className, id }) => ({
    type: "checkbox",
    value,
    checked,
    className,
    id,
  })
)<CheckboxProps>``;

const StyledDiv = styled.div<{ $mediaMaxWidth: number }>`
  position: absolute;
  z-index: 100;
  top: 5px;
  ${(props) =>
    props.$mediaMaxWidth &&
    `left: calc(${props.$mediaMaxWidth}% - 22px - 5px);`}
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
        <StyledCheckbox
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
