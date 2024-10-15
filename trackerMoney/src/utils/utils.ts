export const formatNumberToCop = (amount: number) => {
  const locale = "es-ES";
  const formatter = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "COP",
    minimumIntegerDigits: 1,
  });
  return formatter.format(amount);
};
