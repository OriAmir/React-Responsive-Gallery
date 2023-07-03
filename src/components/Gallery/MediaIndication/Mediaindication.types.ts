export enum MediaIndicationType {
  error = "error",
  loader = "loader",
}

export type MediaIndicationProps = {
  paddingBottom: number;
  custom?: React.ReactElement;
  type: MediaIndicationType;
};

export type StyledMediaIndicationProps = {
  $paddingBottom: number;
  src: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  alt?: string;
};
