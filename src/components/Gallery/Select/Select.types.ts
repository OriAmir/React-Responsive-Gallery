export type SelectProps = {
  value: boolean;
  id: string;
  onSelect?: (id: string, val: boolean) => void;
  mediaMaxWidth: number;
};
