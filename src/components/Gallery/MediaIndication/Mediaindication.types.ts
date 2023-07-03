export enum MediaIndicationType {
  error = "error",
  loader = "loader",
}

export type MediaIndicationProps = {
  marginBottom: number;
  custom?: React.ReactElement;
  type: MediaIndicationType;
};

export type StyledMediaIndicationProps = {
  $marginBottom: number;
  src: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  alt?: string;
};
