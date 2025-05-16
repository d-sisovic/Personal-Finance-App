export const formatToNiceNumber = (value: number, minimumFractionDigits: number) =>
  `$${value.toLocaleString('en-US', { minimumFractionDigits, maximumFractionDigits: 2 })}`;

export const formatStringToNumber = (value: string) => parseFloat(value.replace('$', ''));
