import { act, renderHook } from "@testing-library/react";
import { useImage } from "./use-image";

describe("useImage hook", () => {
  let mockImage: HTMLImageElement;
  let mockCreateImage: jest.Mock<HTMLImageElement>;
  const src = "https://example.com/image.png";

  beforeEach(() => {
    // Create a mock image object
    mockImage = new Image();
    mockImage.src = src;

    // Use the `createImage` function from the `jest-canvas-mock` library to create a mock image object
    // This will allow us to control the behavior of the `onload` and `onerror` events
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    mockCreateImage = jest.fn().mockImplementation(() => mockImage);

    // Replace the `Image` constructor with the mock `createImage` function
    // This will cause the hook to use the mock image object instead of creating a new one

    // eslint-disable-next-line
    (global as any).Image = mockCreateImage;
  });

  test("returns image when image success to load", () => {
    // Render the hook with a mock src
    const { result } = renderHook(() => useImage(src));
    const [loaded, error, image] = result.current;

    expect(loaded).toBe(false);
    expect(error).toBe(false);
    expect(image).toBeUndefined();

    act(() => {
      // Trigger the `onload` event on the mock image
      // Trigger a state update by calling the hook's update function
      // @ts-ignore
      mockImage.onload();
    });
    const [loaded1, error1, image1] = result.current;

    expect(loaded1).toBe(true);
    expect(error1).toBe(false);
    expect(image1).toBeInstanceOf(HTMLImageElement);
  });

  test("returns error when image fails to load", () => {
    // Render the hook with a mock src
    const { result } = renderHook(() => useImage(src));
    const [loaded, error, image] = result.current;

    expect(loaded).toBe(false);
    expect(error).toBe(false);
    expect(image).toBeUndefined();

    act(() => {
      // Trigger the `onload` event on the mock image
      // Trigger a state update by calling the hook's update function
      // @ts-ignore
      mockImage.onerror();
    });

    // Wait for the hook to update the state
    const [loaded1, error1, image1] = result.current;

    expect(loaded1).toBe(false);
    expect(error1).toBe(true);
    expect(image1).toBeUndefined();
  });
});
