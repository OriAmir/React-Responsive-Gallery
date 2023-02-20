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

const StyledDiv = styled.div<{ imagesMaxWidth: number }>`
  position: absolute;
  top: 5px;
  ${(props) =>
    props.imagesMaxWidth &&
    `left: calc(${props.imagesMaxWidth}% - 28px - 5px);`}
`;

const Select = ({
  value = false,
  id,
  onSelect,
  imagesMaxWidth,
}: SelectProps) => {
  const [check, setCheck] = useState(value);
  const onSelectChange = (id: string, val: boolean) => {
    if (onSelect) {
      onSelect(id, val);
    }
    setCheck(val);
  };

  return (
    <StyledDiv imagesMaxWidth={imagesMaxWidth}>
      <StyledSelect>
        <StyledCheckbox
          className="select-input"
          onChange={(e) => onSelectChange(id, e.target.checked)}
          value={id}
          id={`checkbox-${id}`}
          checked={check}
        />
        <label htmlFor={`checkbox-${id}`}></label>
      </StyledSelect>
    </StyledDiv>
  );
};

export default Select;
