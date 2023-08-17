import Select from "../Select/Select";
import { useImage } from "hooks/useImage/use-image";
import MediaIndication from "../MediaIndication/MediaIndication";
import { StyledImage, StyledButtonImage } from "./StyledImage";
import { memo, useCallback } from "react";
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

  const onImageButtonClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      const clickedElement = e.target as HTMLElement;
      if (
        selectable &&
        loaded &&
        !err &&
        ["input", "label"].includes(clickedElement.tagName.toLowerCase())
      ) {
        return; // Stop the event handling for the checkbox element
      }

      onClick?.();
    },
    [],
  );

  return (
    <>
      <StyledButtonImage
        $maxWidth={maxWidth}
        $marginBottom={marginBottom}
        $useLightBox={useLightBox}
        style={{
          display: !err && loaded ? "block" : "none",
        }}
        aria-label={img.alt || ""}
        role="button"
        tabIndex={0}
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
          onImageButtonClick(e);
        }}
      >
        <StyledImage
          className={className}
          style={style}
          src={image?.src || ""}
          alt={img.alt || ""}
        />
        {selectable && loaded && !err && (
          <Select
            id={img.id || img.src}
            value={selected}
            onSelect={onSelect}
            mediaMaxWidth={maxWidth}
          />
        )}
      </StyledButtonImage>

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
