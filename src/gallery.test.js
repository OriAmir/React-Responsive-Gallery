import { getSizeGroup } from './utils/gallery';


test('width of 400 to be in xs group', () => {
  expect(getSizeGroup(400)).toBe('xs');
});

test('width of 600 to be in s group', () => {
  expect(getSizeGroup(600)).toBe('s');
});

test('size group of 765 to be in m group', () => {
  expect(getSizeGroup(765)).toBe('m');
});

test('size group of 800 to be in l group', () => {
  expect(getSizeGroup(800)).toBe('l');
});

test('size group of 1199 to be in xl group', () => {
  expect(getSizeGroup(1190)).toBe('xl');
});

test('size group of 1250 to be in xxl group', () => {
  expect(getSizeGroup(1250)).toBe('xxl');
});
