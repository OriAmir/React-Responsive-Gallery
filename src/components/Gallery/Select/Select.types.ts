export type CheckboxProps = {
  value: string;
  checked: boolean;
  className?: string;
  id?: string;
  onChange?: (id: string, val: boolean) => void;
};

export type SelectProps = {
  value: boolean;
  id: string;
  onSelect?: (id: string, val: boolean) => void;
  mediaMaxWidth: number;
};
