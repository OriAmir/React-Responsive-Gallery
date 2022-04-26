const convertSelectableItems = (selected: string[] | undefined) => {
  if (!selected || selected.length === 0) {
    return null;
  }
  return selected.reduce((total, cur) => ({ ...total, [cur]: true }), {});
};

export { convertSelectableItems };
