/* eslint-disable no-global-assign */
/* eslint no-native-reassign: 0 */
import ResponsiveGallery from "./Gallery";
import { render, screen, fireEvent } from "@testing-library/react";
import { useImage } from "hooks/useImage/use-image";
import { useVideo } from "hooks/useVideo/use-video";
import { MediaIndicationType } from "./MediaIndication/Mediaindication.types";
import { MediaElementProps } from "./Gallery.types";
import { useRef } from "react";

interface ImageHtmlElement extends HTMLElement {
  src?: string;
}
type HtmlImages = Array<ImageHtmlElement>;

jest.mock("hooks/useImage/use-image");
jest.mock("hooks/useVideo/use-video");

const mockUseImgRef = useImage as jest.MockedFunction<typeof useImage>;
const mockUseVideoRef = useVideo as jest.MockedFunction<typeof useVideo>;

const media = [
  {
    src: "http://test/1",
    orderS: 3,
    orderM: 2,
    orderL: 1,
  },
  {
    src: "http://test/2",
    orderS: 2,
    orderM: 1,
    orderL: 3,
  },
  {
    src: "http://test/3",
    orderS: 1,
    orderM: 3,
    orderL: 2,
  },
];

const imagesAndVideos: MediaElementProps[] = [
  {
    src: "http://test/1",
    orderS: 1,
    orderM: 1,
    orderL: 2,
  },
  {
    src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    id: "video-1-id",
    type: "video" as const,
    orderS: 2,
    orderM: 2,
    orderL: 1,
  },
];

describe("Gallery component showing image as expected", () => {
  beforeEach(() => {
    mockUseImgRef.mockImplementation((src: string) => {
      const image = new Image();
      image.src = src;
      return [true, false, image];
    });
  });

  test("Render gallery media as expected", () => {
    render(
      <ResponsiveGallery
        media={[
          {
            src: "src1",
          },
          {
            src: "src2",
          },
        ]}
      />,
    );

    expect(screen.getAllByRole("img").length).toEqual(2);
  });

  test("Render gallery media as expected in L window size", () => {
    window = Object.assign(window, { innerWidth: 1000 });
    render(<ResponsiveGallery media={media} />);
    const domImagesLSize: HtmlImages = screen.getAllByRole("img");
    expect(domImagesLSize[0].src).toEqual(media[0].src);
    expect(domImagesLSize[1].src).toEqual(media[2].src);
    expect(domImagesLSize[2].src).toEqual(media[1].src);
  });

  test("Render gallery media as expected in M window size", () => {
    window = Object.assign(window, { innerWidth: 770 });
    render(<ResponsiveGallery media={media} />);
    const domImagesMSize: HtmlImages = screen.getAllByRole("img");
    expect(domImagesMSize[0].src).toEqual(media[1].src);
    expect(domImagesMSize[1].src).toEqual(media[0].src);
    expect(domImagesMSize[2].src).toEqual(media[2].src);
  });

  test("Render gallery media as expected in S window size", () => {
    window = Object.assign(window, { innerWidth: 300 });
    render(<ResponsiveGallery media={media} />);
    const domImagesSSize: HtmlImages = screen.getAllByRole("img");
    expect(domImagesSSize[0].src).toEqual(media[2].src);
    expect(domImagesSSize[1].src).toEqual(media[1].src);
    expect(domImagesSSize[2].src).toEqual(media[0].src);
  });

  test("Image light box caption and title not showing when light box is disabled", () => {
    render(
      <ResponsiveGallery
        useLightBox={false}
        media={[
          {
            src: "src1",
          },
        ]}
      />,
    );
    const domImages: HtmlImages = screen.getAllByRole("img");
    fireEvent.click(domImages[0]);

    expect(screen.queryByText("src 1 caption")).toBeNull();
    expect(screen.queryByText("src 1 title")).toBeNull();
  });
});

describe("Gallery component showing errors/loader", () => {
  test("Render gallery media as loaders before loading", () => {
    mockUseImgRef.mockImplementation((src: string) => {
      const image = new Image();
      image.src = src;
      return [false, false, image];
    });

    window = Object.assign(window, { innerWidth: 1000 });
    render(<ResponsiveGallery media={media} />);
    const domImagesLSize: HtmlImages = screen.getAllByRole("img");
    screen.debug();
    expect(domImagesLSize.length).toEqual(3);
    domImagesLSize.forEach((element) => {
      expect(element).toHaveAttribute("alt", MediaIndicationType.loader);
    });
  });

  test("Render gallery media as error when failed loading", () => {
    mockUseImgRef.mockImplementation((src: string) => {
      const image = new Image();
      image.src = src;
      return [false, true, image];
    });

    window = Object.assign(window, { innerWidth: 1000 });
    render(<ResponsiveGallery media={media} />);
    const domImagesLSize: HtmlImages = screen.getAllByRole("img");
    expect(domImagesLSize.length).toEqual(3);
    domImagesLSize.forEach((element) => {
      expect(element).toHaveAttribute("alt", MediaIndicationType.error);
    });
  });

  test("Render gallery media by status", () => {
    mockUseImgRef.mockImplementation((src: string) => {
      const image = new Image();
      image.src = src;
      if (src === "http://test/1") {
        return [false, false, image];
      } else if (src === "http://test/2") {
        return [false, true, image];
      }
      return [true, false, image];
    });

    window = Object.assign(window, { innerWidth: 1000 });
    render(<ResponsiveGallery media={media} />);
    const domImagesLSize: HtmlImages = screen.getAllByRole("img");
    expect(domImagesLSize.length).toEqual(3);
    expect(domImagesLSize[0]).toHaveAttribute(
      "alt",
      MediaIndicationType.loader,
    );
    expect(domImagesLSize[1]).toHaveAttribute("src", "http://test/3");
    expect(domImagesLSize[2]).toHaveAttribute("alt", MediaIndicationType.error);
  });
});

describe("Gallery component showing videos", () => {
  beforeEach(() => {
    mockUseImgRef.mockImplementation((src: string) => {
      const image = new Image();
      image.src = src;
      return [true, false, image];
    });

    mockUseVideoRef.mockImplementation((src: string) => {
      const video = document.createElement("video");
      const videoRef = useRef<HTMLVideoElement | null>(null);
      video.src = src;
      videoRef.current = video;

      return { loaded: true, error: false, videoRef };
    });
  });

  test("Render gallery with media and videos as expected", () => {
    render(<ResponsiveGallery media={imagesAndVideos} />);
    const imgs: HtmlImages = screen.getAllByRole("img");

    const videos = screen.getAllByRole("video");
    expect(imgs.length).toEqual(1);
    expect(videos.length).toEqual(1);

    expect(imgs[0].src).toEqual(imagesAndVideos[0].src);
    // eslint-disable-next-line testing-library/no-node-access
    const sourceElement = videos[0].querySelector("source");
    expect(sourceElement?.getAttribute("src")).toBe(imagesAndVideos[1].src);
  });
});
