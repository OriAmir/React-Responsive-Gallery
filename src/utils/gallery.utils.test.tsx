import {
  getGallerySizes,
  getSizeGroup,
  isWidthGroupsDifferences,
  sortImagesByOrderGroup,
  getOrderGroup,
  getImagesCols,
  getSelectedImages,
} from "./gallery.utils";
import {
  WidthOptions,
  ImageOrderOptions,
  GallerySizes,
  ImagesCols,
  ImageElementProps,
} from "components/Gallery/Gallery.types";
import {
  numOfImagesPerRow,
  imagesMaxWidth,
  colsPadding,
  imagesPaddingBottom,
  screenWidthSizes as screenWidthSizesObj,
} from "constants/responsive";

const screenWidthSizes = {
  xs: 400,
  s: 550,
  m: 750,
  l: 900,
  xl: 1210,
};

describe("Gallery utils functions", () => {
  test("width size group return correctly", () => {
    expect(getSizeGroup(screenWidthSizes.xs)).toBe(WidthOptions.xs);
    expect(getSizeGroup(screenWidthSizes.s)).toBe(WidthOptions.s);
    expect(getSizeGroup(screenWidthSizes.m)).toBe(WidthOptions.m);
    expect(getSizeGroup(screenWidthSizes.l)).toBe(WidthOptions.l);
    expect(getSizeGroup(screenWidthSizes.xl)).toBe(WidthOptions.xxl);
  });

  test("width group order return correctly", () => {
    expect(getOrderGroup(screenWidthSizes.xs)).toBe(ImageOrderOptions.s);
    expect(getOrderGroup(screenWidthSizes.s)).toBe(ImageOrderOptions.s);
    expect(getOrderGroup(screenWidthSizes.m)).toBe(ImageOrderOptions.m);
    expect(getOrderGroup(screenWidthSizes.l)).toBe(ImageOrderOptions.m);
    expect(getOrderGroup(screenWidthSizes.xl)).toBe(ImageOrderOptions.l);
  });

  test("width group different boolean return correctly", () => {
    expect(
      isWidthGroupsDifferences(screenWidthSizes.xs, screenWidthSizes.s)
    ).toBeTruthy();
    expect(
      isWidthGroupsDifferences(screenWidthSizes.xs, screenWidthSizes.xs)
    ).toBeFalsy();
    expect(
      isWidthGroupsDifferences(screenWidthSizes.m, screenWidthSizes.l)
    ).toBeTruthy();
    expect(
      isWidthGroupsDifferences(screenWidthSizes.l, screenWidthSizes.xl)
    ).toBeTruthy();
  });

  test("images cols return correctly", () => {
    expect(getImagesCols([], 0)).toMatchObject({});
    expect(getImagesCols([], 1)).toMatchObject({});

    const imgData: ImageElementProps = { src: "http://test" };
    const images: Array<ImageElementProps> = [
      imgData,
      imgData,
      imgData,
      imgData,
      imgData,
    ];

    const oneCol: ImagesCols | Record<string, never> = getImagesCols(images, 1);
    expect(oneCol).toMatchObject({ 0: images });

    const twoCols: ImagesCols | Record<string, never> = getImagesCols(
      images,
      2
    );
    expect(twoCols).toMatchObject({
      0: [imgData, imgData, imgData],
      1: [imgData, imgData],
    });

    const threeCols: ImagesCols | Record<string, never> = getImagesCols(
      images,
      3
    );
    expect(threeCols).toMatchObject({
      0: [imgData, imgData],
      1: [imgData, imgData],
      2: [imgData],
    });

    const fourCols: ImagesCols | Record<string, never> = getImagesCols(
      images,
      4
    );
    expect(fourCols).toMatchObject({
      0: [imgData, imgData],
      1: [imgData],
      2: [imgData],
      3: [imgData],
    });
  });

  test("sort array of images return correctly", () => {
    expect(sortImagesByOrderGroup([], 200)).toEqual([]);

    const imgS1: ImageElementProps = { src: "img1", orderS: 4 };
    const imgS2: ImageElementProps = { src: "img2", orderS: 1 };
    const imgS3: ImageElementProps = { src: "img3", orderS: 3 };
    const imgS4: ImageElementProps = { src: "img4", orderS: 2 };
    const images = [imgS1, imgS2, imgS3, imgS4];
    expect(sortImagesByOrderGroup(images, 200)).toEqual([
      imgS2,
      imgS4,
      imgS3,
      imgS1,
    ]);
    const sameOrder = sortImagesByOrderGroup([imgS1, imgS2, imgS3, imgS4], 769);
    expect(sameOrder).toEqual(images);

    const sameOrder1 = sortImagesByOrderGroup(
      [imgS1, imgS2, imgS3, imgS4],
      1201
    );
    expect(sameOrder1).toEqual(images);

    const imgML1: ImageElementProps = { src: "img1", orderM: 4, orderL: 2 };
    const imgML2: ImageElementProps = { src: "img2", orderM: 1, orderL: 1 };
    const imgML3: ImageElementProps = { src: "img3", orderM: 3, orderL: 4 };
    const imgML4: ImageElementProps = { src: "img4", orderM: 2, orderL: 3 };

    const images1 = [imgML1, imgML2, imgML3, imgML4];
    expect(sortImagesByOrderGroup(images1, 1201)).toEqual([
      imgML2,
      imgML1,
      imgML4,
      imgML3,
    ]);
    expect(sortImagesByOrderGroup(images1, 750)).toEqual([
      imgML2,
      imgML4,
      imgML3,
      imgML1,
    ]);

    expect(sortImagesByOrderGroup(images1, 500)).toEqual(images1);
  });

  test("gallery sizes return correctly", () => {
    const getGallerySizesObj = (widthSize) => {
      const widthGroup = getSizeGroup(widthSize);
      const obj: GallerySizes = {
        screenWidthSizes: screenWidthSizesObj[widthGroup],
        numOfImagesPerRow: numOfImagesPerRow[widthGroup],
        imagesMaxWidth: imagesMaxWidth[widthGroup],
        colsPadding: colsPadding[widthGroup],
        imagesPaddingBottom: imagesPaddingBottom[widthGroup],
      };
      return obj;
    };

    expect(getGallerySizes(400)).toMatchObject(getGallerySizesObj(400));
    expect(getGallerySizes(800)).toMatchObject(getGallerySizesObj(800));
    expect(getGallerySizes(1250)).toMatchObject(getGallerySizesObj(1250));

    const userValues = {
      numOfImagesPerRow: {
        xs: 1,
        s: 2,
        m: 3,
        l: 4,
        xl: 5,
        xxl: 6,
      },
    };
    expect(getGallerySizes(200, userValues)).toMatchObject({
      screenWidthSizes: 420,
      numOfImagesPerRow: 1,
      imagesMaxWidth: 100,
      colsPadding: 4,
      imagesPaddingBottom: 4,
    });

    expect(getGallerySizes(1000, userValues)).toMatchObject({
      screenWidthSizes: 1200,
      numOfImagesPerRow: 5,
      imagesMaxWidth: 100,
      colsPadding: 4,
      imagesPaddingBottom: 4,
    });

    const userValues1defaultSizes = {
      xs: 1,
      s: 2,
      m: 3,
      l: 4,
      xl: 5,
      xxl: 6,
    };
    const userValues1 = {
      screenWidthSizes: {
        xs: 100,
        s: 200,
        m: 300,
        l: 400,
        xl: 500,
      },
      numOfImagesPerRow: userValues1defaultSizes,
      imagesMaxWidth: userValues1defaultSizes,
      colsPadding: userValues1defaultSizes,
      imagesPaddingBottom: userValues1defaultSizes,
    };
    expect(getGallerySizes(250, userValues1)).toMatchObject({
      screenWidthSizes: 300,
      numOfImagesPerRow: 3,
      imagesMaxWidth: 3,
      colsPadding: 3,
      imagesPaddingBottom: 3,
    });
  });

  test("get selected images return correct images", () => {
    document.body.innerHTML =
      "<div>" +
      '<input value="test" id="test" class="select-input" type="checkbox"/>' +
      '<input value="test1" id="test1" checked class="select-input" type="checkbox"/>' +
      '<input value="test1" id="test2" class="select-input" type="checkbox"/>' +
      '<input value="test3" id="test3" checked class="select-input" type="checkbox"/>' +
      '<label for="test"/>' +
      "</div>";
    const res = getSelectedImages();
    expect(res).toEqual(["test1", "test3"]);
  });
});
