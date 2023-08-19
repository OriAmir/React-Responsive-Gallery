import { MediaElementProps, MediaComponentProps } from "../Gallery.types";

export type VideoProps = MediaComponentProps & {
  video: MediaElementProps;
};

export interface StyledVideoProps {
  $maxWidth: number;
  $marginBottom: number;
}
