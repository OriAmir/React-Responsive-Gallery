import { act, renderHook } from "@testing-library/react";
import { useVideo } from "./use-video";

describe("useVideo hook", () => {
  test("should set loaded to true when the video can play", () => {
    const videoSrc = "path/to/video.mp4";
    const { result } = renderHook(() => useVideo(videoSrc));

    act(() => {
      // Simulate the video can play event
      result.current.videoRef.current?.dispatchEvent(
        new Event("canplay", { bubbles: true })
      );
    });

    expect(result.current.loaded).toBe(true);
  });

  test("should set error to true when the video encounters an error", () => {
    const videoSrc = "path/to/non-existing-video.mp4";
    const { result } = renderHook(() => useVideo(videoSrc));

    act(() => {
      // Simulate the video error event
      result.current.videoRef.current?.dispatchEvent(
        new Event("error", { bubbles: true })
      );
    });

    expect(result.current.error).toBe(true);
  });

  it("should set loaded to false initially", () => {
    const videoSrc = "path/to/video.mp4";
    const { result } = renderHook(() => useVideo(videoSrc));

    expect(result.current.loaded).toBe(false);
  });

  it("should set error to false initially", () => {
    const videoSrc = "path/to/video.mp4";
    const { result } = renderHook(() => useVideo(videoSrc));

    expect(result.current.error).toBe(false);
  });

  it("should update the videoRef.current when videoSrc changes", () => {
    const initialVideoSrc = "path/to/video.mp4";
    const updatedVideoSrc = "path/to/another-video.mp4";
    const { result, rerender } = renderHook(
      (props) => useVideo(props.videoSrc),
      {
        initialProps: { videoSrc: initialVideoSrc },
      }
    );

    expect(result.current.videoRef.current?.src).toContain(initialVideoSrc);

    rerender({ videoSrc: updatedVideoSrc });

    expect(result.current.videoRef.current?.src).toContain(updatedVideoSrc);
  });

  test("should remove event listeners when unmounted", () => {
    const videoSrc = "path/to/video.mp4";
    const { result, unmount } = renderHook(() => useVideo(videoSrc));

    const removeEventListenerSpy = jest.spyOn(
      // @ts-ignore
      result.current.videoRef.current,
      "removeEventListener"
    );

    act(() => {
      unmount();
    });

    expect(removeEventListenerSpy).toHaveBeenCalledTimes(2);
    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      "canplay",
      expect.any(Function)
    );
    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      "error",
      expect.any(Function)
    );
    // @ts-ignore
    removeEventListenerSpy.mockRestore();
  });
});
