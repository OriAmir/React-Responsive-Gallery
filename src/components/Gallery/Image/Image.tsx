import Select from "../Select/Select";
import { useImage } from "hooks/useImage/use-image";
import MediaIndication from "../MediaIndication/MediaIndication";
import { StyledImage, StyledButtonImage } from "./StyledImage";
import { memo } from "react";
import { memoImage } from "utils/gallery.utils";
import { ImageProps } from "./Image.types";
import { MediaIndicationType } from "../MediaIndication/Mediaindication.types";

const Image = ({
  img,
  maxWidth,
  marginBottom,
  className,
  useLightBox,
  onClick,
  customLoader,
  customError,
  selectable,
  selected = false,
  onSelect,
  style,
}: ImageProps) => {
  const [loaded, err, image] = useImage(img.src);
  return (
    <>
      <StyledButtonImage
        $maxWidth={maxWidth}
        onClick={onClick}
        $marginBottom={marginBottom}
        $useLightBox={useLightBox}
        style={{
          display: !err && loaded ? "block" : "none",
        }}
      >
        <StyledImage
          className={className}
          style={style}
          src={image?.src || ""}
          alt={img.alt || ""}
        />
      </StyledButtonImage>
      {selectable && loaded && !err && (
        <Select
          id={img.id || img.src}
          value={selected}
          onSelect={onSelect}
          mediaMaxWidth={maxWidth}
        />
      )}
      {!loaded && !err && (
        <MediaIndication
        marginBottom={marginBottom}
          custom={customLoader}
          type={MediaIndicationType.loader}
        />
      )}
      {err && (
        <MediaIndication
        marginBottom={marginBottom}
          custom={customError}
          type={MediaIndicationType.error}
        />
      )}
    </>
  );
};

const MemoImage = memo(Image, (prev: ImageProps, next: ImageProps) => {
  return memoImage(prev, next);
});

export default MemoImage;
