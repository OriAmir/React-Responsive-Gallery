import { render, fireEvent, screen } from "@testing-library/react";
import Select from "./Select";

describe("Select Component", () => {
  test("renders the Select component", () => {
    const selectProps = {
      value: false,
      id: "select-1",
      onSelect: jest.fn(),
      mediaMaxWidth: 80,
    };

    render(<Select {...selectProps} />);
    const checkbox = screen.getByTestId("checkbox-select-1");
    expect(checkbox).toBeInTheDocument();
    // Add more specific assertions if needed
  });

  test("calls onSelect function when the checkbox is checked", () => {
    const onSelectMock = jest.fn();
    const selectProps = {
      value: false,
      id: "select-1",
      onSelect: onSelectMock,
      mediaMaxWidth: 80,
    };

    render(<Select {...selectProps} />);
    const checkbox = screen.getByTestId("checkbox-select-1");
    fireEvent.click(checkbox);
    expect(onSelectMock).toHaveBeenCalledWith(selectProps.id, true);
  });

  test("calls onSelect function when the checkbox is unchecked", () => {
    const onSelectMock = jest.fn();
    const selectProps = {
      value: true,
      id: "select-1",
      onSelect: onSelectMock,
      mediaMaxWidth: 80,
    };

    render(<Select {...selectProps} />);
    const checkbox = screen.getByTestId("checkbox-select-1");
    fireEvent.click(checkbox);
    expect(onSelectMock).toHaveBeenCalledWith(selectProps.id, false);
  });
});
