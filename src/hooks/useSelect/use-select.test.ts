import { renderHook } from "@testing-library/react-hooks";
import { useSelect } from "./use-select";

describe("use select hook", () => {
  test("should return empty array", () => {
    const { result } = renderHook(() => useSelect());
    expect(result.current).toEqual([]);
  });

  test("should return one result that checked", () => {
    document.body.innerHTML =
      "<div>" +
      '<input value="test" id="test" checked class="select-input" type="checkbox"/>' +
      '<label for="test"/>' +
      "</div>";
    const { result } = renderHook(() => useSelect());
    expect(result.current).toEqual(["test"]);
  });

  test("should return two result that checked", () => {
    document.body.innerHTML =
      "<div>" +
      '<input value="test" id="test" checked class="select-input" type="checkbox"/>' +
      '<input value="test1" id="test1" checked class="select-input" type="checkbox"/>' +
      '<label for="test"/>' +
      "</div>";
    const { result } = renderHook(() => useSelect());
    expect(result.current).toEqual(["test", "test1"]);
  });

  test("should return one result from total of 2 checkboxes", () => {
    document.body.innerHTML =
      "<div>" +
      '<input value="test" id="test" class="select-input" type="checkbox"/>' +
      '<input value="test1" id="test1" checked class="select-input" type="checkbox"/>' +
      '<label for="test"/>' +
      "</div>";
    const { result } = renderHook(() => useSelect());
    expect(result.current).toEqual(["test1"]);
  });
});
