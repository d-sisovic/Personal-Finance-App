export const formatToNiceNumber = (value: number, minimumFractionDigits: number) =>
  `$${value.toLocaleString('en-US', { minimumFractionDigits, maximumFractionDigits: 2 })}`;
