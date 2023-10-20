import {
  getGallerySizes,
  getSizeGroup,
  isWidthGroupsDifferences,
  sortMediaByOrderGroup,
  getOrderGroup,
  getMediaCols,
  getSelectedMedia,
  isMediaSelected,
  memoImage,
  memoVideo,
} from "./gallery.utils";
import {
  WidthOptions,
  MediaOrderOptions,
  GallerySizes,
  MediaCols,
  MediaElementProps,
} from "components/Gallery/Gallery.types";
import {
  numOfMediaPerRow,
  mediaMaxWidth,
  colsPadding,
  mediaMarginBottom,
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
    expect(getOrderGroup(screenWidthSizes.xs)).toBe(MediaOrderOptions.s);
    expect(getOrderGroup(screenWidthSizes.s)).toBe(MediaOrderOptions.s);
    expect(getOrderGroup(screenWidthSizes.m)).toBe(MediaOrderOptions.m);
    expect(getOrderGroup(screenWidthSizes.l)).toBe(MediaOrderOptions.m);
    expect(getOrderGroup(screenWidthSizes.xl)).toBe(MediaOrderOptions.l);
  });

  test("width group different boolean return correctly", () => {
    expect(
      isWidthGroupsDifferences(screenWidthSizes.xs, screenWidthSizes.s),
    ).toBeTruthy();
    expect(
      isWidthGroupsDifferences(screenWidthSizes.xs, screenWidthSizes.xs),
    ).toBeFalsy();
    expect(
      isWidthGroupsDifferences(screenWidthSizes.m, screenWidthSizes.l),
    ).toBeTruthy();
    expect(
      isWidthGroupsDifferences(screenWidthSizes.l, screenWidthSizes.xl),
    ).toBeTruthy();
  });

  test("media cols return correctly", () => {
    expect(getMediaCols([], 0)).toMatchObject({});
    expect(getMediaCols([], 1)).toMatchObject({});

    const mediaData: MediaElementProps = { src: "http://test" };
    const media: MediaElementProps[] = [
      mediaData,
      mediaData,
      mediaData,
      mediaData,
      mediaData,
    ];

    const oneCol: MediaCols | Record<string, never> = getMediaCols(media, 1);
    expect(oneCol).toMatchObject({ 0: media });

    const twoCols: MediaCols | Record<string, never> = getMediaCols(media, 2);
    expect(twoCols).toMatchObject({
      0: [mediaData, mediaData, mediaData],
      1: [mediaData, mediaData],
    });

    const threeCols: MediaCols | Record<string, never> = getMediaCols(media, 3);
    expect(threeCols).toMatchObject({
      0: [mediaData, mediaData],
      1: [mediaData, mediaData],
      2: [mediaData],
    });

    const fourCols: MediaCols | Record<string, never> = getMediaCols(media, 4);
    expect(fourCols).toMatchObject({
      0: [mediaData, mediaData],
      1: [mediaData],
      2: [mediaData],
      3: [mediaData],
    });
  });

  test("sort array of media return correctly", () => {
    expect(sortMediaByOrderGroup([], 200)).toEqual([]);

    const imgS1: MediaElementProps = { src: "img1", orderS: 4 };
    const imgS2: MediaElementProps = { src: "img2", orderS: 1 };
    const imgS3: MediaElementProps = { src: "img3", orderS: 3 };
    const imgS4: MediaElementProps = { src: "img4", orderS: 2 };
    const media = [imgS1, imgS2, imgS3, imgS4];
    expect(sortMediaByOrderGroup(media, 200)).toEqual([
      imgS2,
      imgS4,
      imgS3,
      imgS1,
    ]);
    const sameOrder = sortMediaByOrderGroup([imgS1, imgS2, imgS3, imgS4], 769);
    expect(sameOrder).toEqual(media);

    const sameOrder1 = sortMediaByOrderGroup(
      [imgS1, imgS2, imgS3, imgS4],
      1201,
    );
    expect(sameOrder1).toEqual(media);

    const imgML1: MediaElementProps = { src: "img1", orderM: 4, orderL: 2 };
    const imgML2: MediaElementProps = { src: "img2", orderM: 1, orderL: 1 };
    const imgML3: MediaElementProps = { src: "img3", orderM: 3, orderL: 4 };
    const imgML4: MediaElementProps = { src: "img4", orderM: 2, orderL: 3 };

    const images1 = [imgML1, imgML2, imgML3, imgML4];
    expect(sortMediaByOrderGroup(images1, 1201)).toEqual([
      imgML2,
      imgML1,
      imgML4,
      imgML3,
    ]);
    expect(sortMediaByOrderGroup(images1, 750)).toEqual([
      imgML2,
      imgML4,
      imgML3,
      imgML1,
    ]);

    expect(sortMediaByOrderGroup(images1, 500)).toEqual(images1);
  });

  test("gallery sizes return correctly", () => {
    const getGallerySizesObj = (widthSize: number) => {
      const widthGroup = getSizeGroup(widthSize);
      const obj: GallerySizes = {
        screenWidthSizes:
          widthGroup !== WidthOptions.xxl
            ? screenWidthSizesObj[widthGroup]
            : screenWidthSizesObj.xl + 1,
        numOfMediaPerRow: numOfMediaPerRow[widthGroup],
        mediaMaxWidth: mediaMaxWidth[widthGroup],
        colsPadding: colsPadding[widthGroup],
        mediaMarginBottom: mediaMarginBottom[widthGroup],
      };
      return obj;
    };

    expect(getGallerySizes(400)).toMatchObject(getGallerySizesObj(400));
    expect(getGallerySizes(800)).toMatchObject(getGallerySizesObj(800));
    expect(getGallerySizes(1250)).toMatchObject(getGallerySizesObj(1250));

    const userValues = {
      numOfMediaPerRow: {
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
      numOfMediaPerRow: 1,
      mediaMaxWidth: 100,
      colsPadding: 4,
      mediaMarginBottom: 4,
    });

    expect(getGallerySizes(1000, userValues)).toMatchObject({
      screenWidthSizes: 1200,
      numOfMediaPerRow: 5,
      mediaMaxWidth: 100,
      colsPadding: 4,
      mediaMarginBottom: 4,
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
      numOfMediaPerRow: userValues1defaultSizes,
      mediaMaxWidth: userValues1defaultSizes,
      colsPadding: userValues1defaultSizes,
      mediaMarginBottom: userValues1defaultSizes,
    };
    expect(getGallerySizes(250, userValues1)).toMatchObject({
      screenWidthSizes: 300,
      numOfMediaPerRow: 3,
      mediaMaxWidth: 3,
      colsPadding: 3,
      mediaMarginBottom: 3,
    });
  });

  test("get selected media return correct media", () => {
    document.body.innerHTML =
      "<div>" +
      '<input value="test" id="test" class="select-input" type="checkbox"/>' +
      '<input value="test1" id="test1" checked class="select-input" type="checkbox"/>' +
      '<input value="test1" id="test2" class="select-input" type="checkbox"/>' +
      '<input value="test3" id="test3" checked class="select-input" type="checkbox"/>' +
      '<label for="test"/>' +
      "</div>";
    const res = getSelectedMedia();
    expect(res).toEqual(["test1", "test3"]);
  });

  test("isMediaSelected should return true when an image is selected by id", () => {
    const img = { id: "1", src: "path/to/image" };
    const selectabletestems = ["1"];
    expect(isMediaSelected(img, selectabletestems)).toBe(true);
  });

  test("isMediaSelected should return true when an image is selected by src", () => {
    const img = { id: "1", src: "path/to/image" };
    const selectabletestems = ["path/to/image"];
    expect(isMediaSelected(img, selectabletestems)).toBe(true);
  });

  test("isMediaSelected should return false when an image is not selected", () => {
    const img = { id: "1", src: "path/to/image" };
    const selectabletestems = ["2"];
    expect(isMediaSelected(img, selectabletestems)).toBe(false);
  });

  test("memoImage should return true when only the selected property changes", () => {
    const prev = {
      img: { src: "path/to/prev" },
      maxWidth: 100,
      marginBottom: 20,
      selected: true,
    };
    const next = {
      img: { src: "path/to/prev" },
      maxWidth: 100,
      marginBottom: 20,
      selected: false,
    };
    expect(memoImage(prev, next)).toBe(true);
  });
  test("memoImage should return false when img.src changes", () => {
    const prev = {
      img: { src: "path/to/prev" },
      maxWidth: 100,
      marginBottom: 20,
      selected: true,
    };
    const next = {
      img: { src: "path/to/next" },
      maxWidth: 100,
      marginBottom: 20,
      selected: true,
    };
    expect(memoImage(prev, next)).toBe(false);
  });
  test("memoImage should return false when maxWidth changes", () => {
    const prev = {
      img: { src: "path/to/prev" },
      maxWidth: 100,
      marginBottom: 20,
      selected: true,
    };
    const next = {
      img: { src: "path/to/prev" },
      maxWidth: 200,
      marginBottom: 20,
      selected: true,
    };
    expect(memoImage(prev, next)).toBe(false);
  });
  test("memoImage should return false when marginBottom changes", () => {
    const prev = {
      img: { src: "path/to/prev" },
      maxWidth: 100,
      marginBottom: 20,
      selected: true,
    };
    const next = {
      img: { src: "path/to/prev" },
      maxWidth: 100,
      marginBottom: 30,
      selected: true,
    };
    expect(memoImage(prev, next)).toBe(false);
  });
  test("memoImage should return true when no properties change", () => {
    const prev = {
      img: { src: "path/to/prev" },
      maxWidth: 100,
      marginBottom: 20,
      selected: true,
    };
    const next = {
      img: { src: "path/to/prev" },
      maxWidth: 100,
      marginBottom: 20,
      selected: true,
    };
    expect(memoImage(prev, next)).toBe(true);
  });

  test("memoVideo should return false if video src is different", () => {
    const prev = {
      video: { src: "video1.mp4" },
      maxWidth: 100,
      marginBottom: 20,
    };
    const next = {
      video: { src: "video2.mp4" },
      maxWidth: 100,
      marginBottom: 20,
    };
    const result = memoVideo(prev, next);
    expect(result).toBe(false);
  });

  test("memoVideo should return false if maxWidth is different", () => {
    const prev = {
      video: { src: "video1.mp4" },
      maxWidth: 400,
      marginBottom: 20,
    };
    const next = {
      video: { src: "video1.mp4" },
      maxWidth: 600,
      marginBottom: 20,
    };
    const result = memoVideo(prev, next);
    expect(result).toBe(false);
  });

  test("memoVideo should return false if marginBottom is different", () => {
    const prev = {
      video: { src: "video1.mp4" },
      maxWidth: 400,
      marginBottom: 10,
    };
    const next = {
      video: { src: "video1.mp4" },
      maxWidth: 400,
      marginBottom: 20,
    };
    const result = memoVideo(prev, next);
    expect(result).toBe(false);
  });

  test("memoVideo should return false if useLightBox is different", () => {
    const prev = {
      video: { src: "video1.mp4" },
      maxWidth: 400,
      marginBottom: 10,
      useLightBox: true,
    };
    const next = {
      video: { src: "video1.mp4" },
      maxWidth: 400,
      marginBottom: 10,
      useLightBox: false,
    };
    const result = memoVideo(prev, next);
    expect(result).toBe(false);
  });
});
