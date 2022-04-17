import { fireEvent } from "@testing-library/react";
import { act, renderHook } from "@testing-library/react-hooks";
import { useScreenDimensions } from "./use-screen-dimensions";

describe("use screen dimensions hook", () => {
  const renderHookWithDiffWidth = (oldWidth: number, newWidth: number) => {
    window.innerWidth = oldWidth;
    const { result } = renderHook(() => useScreenDimensions());
    expect(result.current.width).toEqual(oldWidth);
    act(() => {
      window.innerWidth = newWidth;
      fireEvent(window, new Event("resize"));
    });
    return result.current.width;
  };

  test("should return same width if it's the same group-XS(0-420)", async () => {
    expect(renderHookWithDiffWidth(50, 419)).toEqual(50);
  });

  test("should return same width if it's the same group-S(420-600)", async () => {
    expect(renderHookWithDiffWidth(421, 599)).toEqual(421);
  });

  test("should return same width if it's the same group-M(600-768)", async () => {
    expect(renderHookWithDiffWidth(601, 750)).toEqual(601);
  });

  test("should return same width if it's the same group-L(768-992)", async () => {
    expect(renderHookWithDiffWidth(770, 990)).toEqual(770);
  });

  test("should return same width if it's the same group-XL(992-1200)", async () => {
    expect(renderHookWithDiffWidth(993, 1199)).toEqual(993);
  });

  test("should return same width if it's the same group-XLL(1201-Infinity)", async () => {
    expect(renderHookWithDiffWidth(1201, 2000)).toEqual(1201);
  });

  test("should return different width if it's diff group-XS(200) to S(500)", async () => {
    expect(renderHookWithDiffWidth(200, 500)).toEqual(500);
  });

  test("should return different width if it's diff group-S(500) to M(700)", async () => {
    expect(renderHookWithDiffWidth(500, 700)).toEqual(700);
  });

  test("should return different width if it's diff group-M(700) to L(900)", async () => {
    expect(renderHookWithDiffWidth(700, 900)).toEqual(900);
  });

  test("should return different width if it's diff group-L(800) to XL(1000)", async () => {
    expect(renderHookWithDiffWidth(800, 1000)).toEqual(1000);
  });

  test("should return different width if it's diff group-XL(1100) to XLL(2000)", async () => {
    expect(renderHookWithDiffWidth(1100, 2000)).toEqual(2000);
  });
});
