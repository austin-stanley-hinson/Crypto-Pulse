// Sort a coin into a size group by its market cap (the total value of all its coins).
// Large: $10 billion or more
// Mid: $1 billion to $10 billion
// Small: under $1 billion
const getCoinSize = (marketCap) => {
  if (marketCap >= 10_000_000_000) return "large";
  if (marketCap >= 1_000_000_000) return "mid";
  return "small";
};

export default getCoinSize;
