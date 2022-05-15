import {
  selectReducer,
  initialState as selectInitialState,
} from "reducers/select/select-reducer";
import { SelectActionType } from "reducers/select/select-action-types";
import { useReducer } from "react";
import styled from "styled-components";
import { convertSelectableItems } from "./Select.utils";
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
  id,
  selectableItems,
  onSelect,
  imagesMaxWidth,
}: SelectProps) => {
  const [selectedValues, selectDispatch] = useReducer(
    selectReducer,
    convertSelectableItems(selectableItems) || selectInitialState
  );

  const onSelectChange = (id: string, val: boolean) => {
    selectDispatch({
      type: val
        ? SelectActionType.SELECT_SET_IMAGE
        : SelectActionType.DESELECT_IMAGE,
      payload: id,
    });
  };

  return (
    <StyledDiv imagesMaxWidth={imagesMaxWidth}>
      <StyledSelect>
        <StyledCheckbox
          className="select-input"
          onChange={(e) => {
            onSelect
              ? onSelect(id, e.target.checked)
              : onSelectChange(id, e.target.checked);
          }}
          value={id}
          id={`checkbox-${id}`}
          checked={selectedValues?.[id] || false}
        />
        <label htmlFor={`checkbox-${id}`}></label>
      </StyledSelect>
    </StyledDiv>
  );
};

export default Select;
