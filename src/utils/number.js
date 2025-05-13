export const formatInt = (value, unit = '円') => {
  return `${Number(value).toLocaleString()} ${unit}`;
};
