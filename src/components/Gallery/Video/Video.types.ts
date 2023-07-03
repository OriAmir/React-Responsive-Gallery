import { MediaElementProps, MediaComponentProps } from "../Gallery.types";

export type VideoProps = MediaComponentProps & {
  video: MediaElementProps;
};

export type StyledVideoProps = {
  maxWidth: number;
  paddingBottom: number;
};
