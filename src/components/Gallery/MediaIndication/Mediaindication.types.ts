export enum MediaIndicationType {
  error = "error",
  loader = "loader",
}

export interface MediaIndicationProps {
  marginBottom: number;
  custom?: React.ReactElement;
  type: MediaIndicationType;
}

export interface StyledMediaIndicationProps {
  $marginBottom: number;
  src: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  alt?: string;
}
