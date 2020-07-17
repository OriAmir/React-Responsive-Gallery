import {
  getSizeGroup,
  getOrderGroup,
  isWidthGroupsDifferents,
} from "./utils/gallery";

const screenWidthSizes = {
  xs: 400,
  s: 550,
  m: 750,
  l: 900,
  xl: 1210,
};

test("width size group return correctly", () => {
  expect(getSizeGroup(screenWidthSizes.xs)).toBe("xs");
  expect(getSizeGroup(screenWidthSizes.s)).toBe("s");
  expect(getSizeGroup(screenWidthSizes.m)).toBe("m");
  expect(getSizeGroup(screenWidthSizes.l)).toBe("l");
  expect(getSizeGroup(screenWidthSizes.xl)).toBe("xxl");
});

test("width group order return correctly", () => {
  expect(getOrderGroup(screenWidthSizes.xs)).toBe("orderS");
  expect(getOrderGroup(screenWidthSizes.s)).toBe("orderS");
  expect(getOrderGroup(screenWidthSizes.m)).toBe("orderM");
  expect(getOrderGroup(screenWidthSizes.l)).toBe("orderM");
  expect(getOrderGroup(screenWidthSizes.xl)).toBe("orderL");
});

test("width group different boolean return correctly", () => {
  expect(
    isWidthGroupsDifferents(screenWidthSizes.xs, screenWidthSizes.s)
  ).toBeTruthy();
  expect(
    isWidthGroupsDifferents(screenWidthSizes.xs, screenWidthSizes.xs)
  ).toBeFalsy();
  expect(
    isWidthGroupsDifferents(screenWidthSizes.m, screenWidthSizes.l)
  ).toBeTruthy();
  expect(
    isWidthGroupsDifferents(screenWidthSizes.l, screenWidthSizes.xl)
  ).toBeTruthy();
});
