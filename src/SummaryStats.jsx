import { formatBigMoney, formatPercent } from './format';

// Cards at the top of the dashboard that sum up all the coins.
// App passes in the full list of coins.
const SummaryStats = ({ coins }) => {
  // Add up every coin's market cap
  const totalMarketCap = coins.reduce((total, coin) => total + coin.market_cap, 0);

  // The mean of every coin's price change over the last 24 hours
  const averageChange = coins.reduce((total, coin) => total + coin.price_change_percentage_24h, 0) / coins.length;

  // How many coins went up in price
  const coinsUp = coins.filter((coin) => coin.price_change_percentage_24h > 0).length;

  // The coin that went up the most
  const topGainer = coins.reduce((best, coin) =>
    coin.price_change_percentage_24h > best.price_change_percentage_24h ? coin : best
  );

  return (
    <div className="summary-stats">
      <div className="stat-card">
        <p className="stat-label">💰 Total Market Cap</p>
        <p className="stat-value">{formatBigMoney(totalMarketCap)}</p>
      </div>

      <div className="stat-card">
        <p className="stat-label">📊 Average 24h Change</p>
        <p className={`stat-value ${averageChange >= 0 ? "up" : "down"}`}>{formatPercent(averageChange)}</p>
      </div>

      <div className="stat-card">
        <p className="stat-label">📈 Coins Up Today</p>
        <p className="stat-value">{coinsUp} <span className="stat-small">of {coins.length}</span></p>
      </div>

      <div className="stat-card">
        <p className="stat-label">🏆 Top Gainer</p>
        <p className="stat-value">{topGainer.symbol.toUpperCase()}</p>
        <p className="stat-small up">{formatPercent(topGainer.price_change_percentage_24h)}</p>
      </div>
    </div>
  );
};

export default SummaryStats;
