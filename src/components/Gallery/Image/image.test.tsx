import { render, screen, fireEvent } from "@testing-library/react";
import ImageComponent from "./Image";
import { useImage } from "hooks/useImage/use-image";

jest.mock("hooks/useImage/use-image");
const mockUseImgRef = useImage as jest.MockedFunction<typeof useImage>;

describe("Image Component", () => {
  const imgSrc = "image.jpg";
  const imgAlt = "Image Alt";
  const customLoaderText = "Loading...";
  const customErrorText = "Error loading image";
  const onSelectMock = jest.fn();
  const onClickMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("displays the select component when selectable prop is true", () => {
    mockUseImgRef.mockImplementation((src: string) => {
      const image = new Image();
      image.src = src;
      return [true, false, image];
    });

    render(
      <ImageComponent
        img={{
          src: imgSrc,
          alt: imgAlt,
          id: "image-1",
        }}
        maxWidth={100}
        marginBottom={10}
        selectable={true}
      />,
    );
    const element = screen.getByTestId("checkbox-image-1");
    expect(element).toBeInTheDocument();
  });

  test("does not display the select component when selectable prop is false", () => {
    render(
      <ImageComponent
        img={{
          src: imgSrc,
          alt: imgAlt,
          id: "image-1",
        }}
        maxWidth={100}
        marginBottom={10}
        selectable={false}
      />,
    );

    expect(screen.queryByRole("checkbox")).not.toBeInTheDocument();
  });

  test("displays the custom loader when the image is not loaded", () => {
    mockUseImgRef.mockImplementation((src: string) => {
      const image = new Image();
      image.src = src;
      return [false, false, image];
    });

    render(
      <ImageComponent
        img={{
          src: imgSrc,
          alt: imgAlt,
          id: "image-1",
        }}
        maxWidth={100}
        marginBottom={10}
        customLoader={<div>{customLoaderText}</div>}
      />,
    );

    expect(screen.getByText(customLoaderText)).toBeInTheDocument();
  });

  test("displays the custom error when there is an error loading the image", () => {
    mockUseImgRef.mockImplementation((src: string) => {
      const image = new Image();
      image.src = src;
      return [true, true, image];
    });

    render(
      <ImageComponent
        img={{
          src: "invalid-image.jpg",
          alt: imgAlt,
          id: "image-1",
        }}
        maxWidth={100}
        marginBottom={10}
        customError={<div>{customErrorText}</div>}
      />,
    );

    expect(screen.getByText(customErrorText)).toBeInTheDocument();
  });

  test("triggers the onSelect callback when the select component is clicked", () => {
    mockUseImgRef.mockImplementation((src: string) => {
      const image = new Image();
      image.src = src;
      return [true, false, image];
    });
    render(
      <ImageComponent
        img={{
          src: imgSrc,
          alt: imgAlt,
          id: "image-1",
        }}
        maxWidth={100}
        marginBottom={10}
        selectable={true}
        onSelect={onSelectMock}
      />,
    );

    const element = screen.getByTestId("checkbox-image-1");
    fireEvent.click(element);

    expect(onSelectMock).toHaveBeenCalledTimes(1);
    expect(onSelectMock).toHaveBeenCalledWith("image-1", true);
  });

  test("triggers the onClick callback when the image is clicked", () => {
    render(
      <ImageComponent
        img={{
          src: imgSrc,
          alt: imgAlt,
          id: "image-1",
        }}
        maxWidth={100}
        marginBottom={10}
        onClick={onClickMock}
      />,
    );

    const image = screen.getByAltText(imgAlt);
    fireEvent.click(image);

    expect(onClickMock).toHaveBeenCalledTimes(1);
  });
});
