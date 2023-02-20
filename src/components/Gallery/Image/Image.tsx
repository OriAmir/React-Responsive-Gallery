import Select from "../Select/Select";
import { useImage } from "hooks/useImage/use-image";
import ImageIndication, {
  ImageIndicationType,
} from "./ImageIndication/ImageIndication";
import StyledImage from "./StyledImage";
import { memo } from "react";
import { memoImage } from "utils/gallery.utils";
import { ImageProps } from "./Image.types";

const Image = ({
  img,
  maxWidth,
  paddingBottom,
  className,
  useLightBox,
  onClick,
  customLoader,
  customError,
  selectable,
  selected = false,
  onSelect,
}: ImageProps) => {
  const [loaded, err, image] = useImage(img.src);
  return (
    <>
      {selectable && loaded && !err && (
        <Select
          id={img.id || img.src}
          value={selected}
          onSelect={onSelect}
          imagesMaxWidth={maxWidth}
        />
      )}
      {!loaded && !err && (
        <ImageIndication
          paddingBottom={paddingBottom}
          custom={customLoader}
          type={ImageIndicationType.loader}
        />
      )}
      {err && (
        <ImageIndication
          paddingBottom={paddingBottom}
          custom={customError}
          type={ImageIndicationType.error}
        />
      )}
      <StyledImage
        className={className}
        src={image?.src || ""}
        show={!err && loaded}
        alt={img.alt || ""}
        maxWidth={maxWidth}
        paddingBottom={paddingBottom}
        useLightBox={useLightBox}
        onClick={onClick}
      />
    </>
  );
};

const MemoImage = memo(Image, (prev: ImageProps, next: ImageProps) => {
  return memoImage(prev, next);
});

export default MemoImage;
