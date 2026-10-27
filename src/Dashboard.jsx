import { useState } from 'react'
import CoinList from './CoinList';
import SummaryStats from './SummaryStats';
import Filters from './Filters';
import MarketShareChart from './MarketShareChart';
import ChangeChart from './ChangeChart';
import getCoinSize from './coinSize';

// The home page: summary cards, the search and filters, and the list of coins.
// App passes in the coins and the filter values, so the filters are kept
// when the user opens a coin and comes back.
const Dashboard = ({
  coins,
  searchInput, onSearchChange,
  sizeFilter, onSizeChange,
  minPrice, onMinPriceChange,
  maxPrice, onMaxPriceChange,
}) => {
  // Which charts are shown (the user can turn each one on and off)
  const [showShareChart, setShowShareChart] = useState(true);
  const [showChangeChart, setShowChangeChart] = useState(true);

  // Only show coins whose name or symbol includes the search text
  // (lowercase so "btc", "BTC", and "Bitcoin" all work)
  // and that are the size picked in the filter
  // and whose price is between the min and max (if they were typed in)
  const search = searchInput.trim().toLowerCase();
  const shownCoins = coins.filter((coin) => {
    const matchesSearch = coin.name.toLowerCase().includes(search) || coin.symbol.toLowerCase().includes(search);
    const matchesSize = sizeFilter === "all" || getCoinSize(coin.market_cap) === sizeFilter;
    const aboveMin = minPrice === "" || coin.current_price >= Number(minPrice);
    const belowMax = maxPrice === "" || coin.current_price <= Number(maxPrice);
    return matchesSearch && matchesSize && aboveMin && belowMax;
  });

  return (
    <>
      <div className="header">
        <h1>Crypto Pulse 📈</h1>
        <h2>How is the crypto market doing today? A live look at the top 100 coins.</h2>
      </div>

      <SummaryStats coins={coins} />

      <div className="chart-toggles">
        <span>Charts:</span>
        <button
          className={showShareChart ? "toggle on" : "toggle"}
          onClick={() => setShowShareChart(!showShareChart)}
        >
          🥧 Market share
        </button>
        <button
          className={showChangeChart ? "toggle on" : "toggle"}
          onClick={() => setShowChangeChart(!showChangeChart)}
        >
          🎢 Today's moves
        </button>
      </div>

      {(showShareChart || showChangeChart) && (
        <div className="charts">
          {showShareChart && <MarketShareChart coins={coins} />}
          {showChangeChart && <ChangeChart coins={shownCoins} />}
        </div>
      )}

      <Filters
        searchInput={searchInput}
        onSearchChange={onSearchChange}
        sizeFilter={sizeFilter}
        onSizeChange={onSizeChange}
        minPrice={minPrice}
        onMinPriceChange={onMinPriceChange}
        maxPrice={maxPrice}
        onMaxPriceChange={onMaxPriceChange}
      />

      <p className="results-count">Showing {shownCoins.length} of {coins.length} coins</p>

      {shownCoins.length > 0 ? (
        <CoinList coins={shownCoins} />
      ) : (
        <p className="message">No coins match your search and filters.</p>
      )}
    </>
  );
};

export default Dashboard;
