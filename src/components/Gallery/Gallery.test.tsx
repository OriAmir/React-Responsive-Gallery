/* eslint no-native-reassign: 0 */
import ResponsiveGallery from "./Gallery";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

interface ImageHtmlElement extends HTMLElement {
  src?: string;
}
type HtmlImages = Array<ImageHtmlElement>;

describe("Gallery component", () => {
  const images = [
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
  test("Render gallery images as expected", () => {
    render(
      <ResponsiveGallery
        images={[
          {
            src: "src1",
          },
          {
            src: "src2",
          },
        ]}
      />
    );

    expect(screen.getAllByRole("img").length).toEqual(2);
  });

  test("Render gallery images as expected in L window size", () => {
    window = Object.assign(window, { innerWidth: 1000 });
    render(<ResponsiveGallery images={images} />);
    const domImagesLSize: HtmlImages = screen.getAllByRole("img");
    expect(domImagesLSize[0].src).toEqual(images[0].src);
    expect(domImagesLSize[1].src).toEqual(images[2].src);
    expect(domImagesLSize[2].src).toEqual(images[1].src);
  });

  test("Render gallery images as expected in M window size", () => {
    window = Object.assign(window, { innerWidth: 770 });
    render(<ResponsiveGallery images={images} />);
    const domImagesMSize: HtmlImages = screen.getAllByRole("img");
    expect(domImagesMSize[0].src).toEqual(images[1].src);
    expect(domImagesMSize[1].src).toEqual(images[0].src);
    expect(domImagesMSize[2].src).toEqual(images[2].src);
  });

  test("Render gallery images as expected in S window size", () => {
    window = Object.assign(window, { innerWidth: 300 });
    render(<ResponsiveGallery images={images} />);
    const domImagesSSize: HtmlImages = screen.getAllByRole("img");
    expect(domImagesSSize[0].src).toEqual(images[2].src);
    expect(domImagesSSize[1].src).toEqual(images[1].src);
    expect(domImagesSSize[2].src).toEqual(images[0].src);
  });

  test("Image light box caption and title showing after clicking on image", async () => {
    render(
      <ResponsiveGallery
        useLightBox
        images={[
          {
            src: "src1",
            lightboxCaption: "src 1 caption",
            lightboxTitle: "src 1 title",
          },
        ]}
      />
    );
    const domImages: HtmlImages = screen.getAllByRole("img");
    fireEvent.click(domImages[0]);

    await waitFor(() =>
      expect(screen.getByText("src 1 caption")).toBeInTheDocument()
    );
    await waitFor(() =>
      expect(screen.getByText("src 1 title")).toBeInTheDocument()
    );
  });

  test("Image light box caption and title not showing when light box is disabled", () => {
    render(
      <ResponsiveGallery
        useLightBox={false}
        images={[
          {
            src: "src1",
            lightboxCaption: "src 1 caption",
            lightboxTitle: "src 1 title",
          },
        ]}
      />
    );
    const domImages: HtmlImages = screen.getAllByRole("img");
    fireEvent.click(domImages[0]);

    expect(screen.queryByText("src 1 caption")).toBeNull();
    expect(screen.queryByText("src 1 title")).toBeNull();
  });
});
