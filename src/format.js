// Helpers for showing numbers from the API in a readable way.

// A coin's price, e.g. 67012.5 -> "$67,012.50"
// Coins worth less than $1 get more decimal places, e.g. 0.00001234 -> "$0.00001234"
export const formatPrice = (price) => {
  return price.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: price < 1 ? 8 : 2,
  });
};

// A big dollar amount, shortened, e.g. 1320000000000 -> "$1.32T"
export const formatBigMoney = (amount) => {
  return amount.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    notation: "compact",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
};

// A percent change with a + or - sign, e.g. 2.345 -> "+2.35%"
export const formatPercent = (percent) => {
  const sign = percent > 0 ? "+" : "";
  return `${sign}${percent.toFixed(2)}%`;
};
