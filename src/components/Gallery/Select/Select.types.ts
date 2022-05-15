export type CheckboxProps = {
  value: string;
  checked: boolean;
  className?: string;
  id?: string;
  onChange?: (id: string, val: boolean) => void;
};

export type SelectProps = {
  id: string;
  selectableItems?: Array<string>;
  onSelect?: (id: string, val: boolean) => void;
  imagesMaxWidth: number;
};
