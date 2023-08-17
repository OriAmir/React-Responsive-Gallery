import { render, fireEvent, screen } from "@testing-library/react";
import Video from "./Video";
import { VideoProps } from "./Video.types";
import { useVideo } from "hooks/useVideo/use-video";
import { useRef } from "react";

jest.mock("hooks/useVideo/use-video");
const mockUseVideoRef = useVideo as jest.MockedFunction<typeof useVideo>;

const mockVideoFunc = (loaded = true, error = false) => {
  return (src: string) => {
    const video = document.createElement("video");
    const videoRef = useRef<HTMLVideoElement | null>(null);
    video.src = src;
    videoRef.current = video;

    return { loaded, error, videoRef };
  };
};

const videoProps: VideoProps = {
  video: {
    src: "path/to/video.mp4",
    type: "video" as const,
  },
  marginBottom: 5,
  maxWidth: 100,
};

describe("Video Component", () => {
  beforeEach(() => {
    mockUseVideoRef.mockImplementation(mockVideoFunc());
    jest.clearAllMocks();
  });

  test("renders video component with source", () => {
    render(<Video {...videoProps} />);
    const videoElement = screen.getByRole("video") as HTMLVideoElement;
    expect(videoElement).toBeInTheDocument();
    // eslint-disable-next-line testing-library/no-node-access
    const sourceElement = videoElement.querySelector("source");
    expect(sourceElement?.getAttribute("src")).toBe("path/to/video.mp4");
  });

  test("renders video component with additional video properties", () => {
    const videoPropsNew: VideoProps = {
      ...videoProps,
      video: {
        ...videoProps.video,
        additionalVideoProps: {
          autoPlay: true,
          controls: true,
          loop: false,
          muted: true,
        },
      },
    };

    render(<Video {...videoPropsNew} />);

    const videoElement = screen.getByRole("video") as HTMLVideoElement;
    expect(videoElement).toBeInTheDocument();
    // eslint-disable-next-line testing-library/no-node-access
    const sourceElement = videoElement.querySelector("source");
    expect(sourceElement?.getAttribute("src")).toBe("path/to/video.mp4");
    expect(videoElement.loop).toBe(false);
    expect(videoElement.controls).toBe(true);
    expect(videoElement.autoplay).toBe(true);
  });

  test("calls onClick function when video is clicked", () => {
    const handleClick = jest.fn();
    render(<Video {...videoProps} onClick={handleClick} />);

    const videoElement = screen.getByRole("video");
    fireEvent.click(videoElement);
    expect(handleClick).toHaveBeenCalled();
  });

  test("displays the custom loader when the video is not loaded", () => {
    mockUseVideoRef.mockImplementation(mockVideoFunc(false));
    render(<Video {...videoProps} customLoader={<div>loading video</div>} />);
    expect(screen.getByText("loading video")).toBeInTheDocument();
  });

  test("displays the custom error when the video has an error", () => {
    mockUseVideoRef.mockImplementation(mockVideoFunc(false, true));
    render(
      <Video {...videoProps} customError={<div>error loading video</div>} />,
    );
    expect(screen.getByText("error loading video")).toBeInTheDocument();
  });
});
