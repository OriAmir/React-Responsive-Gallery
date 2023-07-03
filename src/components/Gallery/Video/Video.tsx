import styled from "styled-components";
import Select from "../Select/Select";
import { useVideo } from "hooks/useVideo/use-video";
import { StyledVideoProps, VideoProps } from "./Video.types";
import MediaIndication from "../MediaIndication/MediaIndication";
import { MediaIndicationType } from "../MediaIndication/Mediaindication.types";
import { memo } from "react";
import { memoVideo } from "utils/gallery.utils";

const StyledVideo = styled.video.attrs({
  role: "video",
})<StyledVideoProps>`
  display: block;
  height: auto;
  max-width: ${({ maxWidth }) => maxWidth}%;
  margin-bottom: ${({ paddingBottom }) => paddingBottom || 0}px;
`;

const Video = ({
  video,
  maxWidth = 100,
  paddingBottom,
  className,
  useLightBox,
  onClick,
  customLoader,
  customError,
  selectable,
  selected = false,
  onSelect,
  style,
}: VideoProps) => {
  const { loaded, error, videoRef } = useVideo(video.src);

  const additionalProps = {
    controls: true,
    ...video?.additionalVideoProps,
  };

  const handleVideoClick = () => {
    if (useLightBox) {
      // @ts-ignore
      setTimeout(() => {
        videoRef?.current?.pause();
      }, 500);
      setTimeout(() => {
        onClick?.();
      }, 500);
    } else {
      onClick?.();
    }
  };

  return (
    <>
      {loaded && !error && (
        <StyledVideo
          ref={videoRef}
          maxWidth={maxWidth}
          onClick={handleVideoClick}
          paddingBottom={paddingBottom}
          className={className}
          style={style}
          {...additionalProps}
        >
          <source src={video.src} type={video?.videoType} />
        </StyledVideo>
      )}

      {selectable && loaded && !error && (
        <Select
          id={video.id || video.src}
          value={selected}
          onSelect={onSelect}
          mediaMaxWidth={maxWidth}
        />
      )}
      {!loaded && !error && (
        <MediaIndication
          paddingBottom={paddingBottom}
          custom={customLoader}
          type={MediaIndicationType.loader}
        />
      )}
      {error && (
        <MediaIndication
          paddingBottom={paddingBottom}
          custom={customError}
          type={MediaIndicationType.error}
        />
      )}
    </>
  );
};

const MemoVideo = memo(Video, (prev: VideoProps, next: VideoProps) => {
  return memoVideo(prev, next);
});

export default MemoVideo;
