import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom';
import { formatPrice, formatBigMoney, formatPercent, formatSupply, formatDate } from './format';

const API_KEY = import.meta.env.VITE_APP_API_KEY;

// The detail page for one coin, e.g. /coin/bitcoin.
// It gets the coin's id from the URL and fetches extra info
// that isn't shown in the dashboard list.
const CoinDetail = () => {
  const { id } = useParams();

  // The full info for this coin (null until the data comes back)
  const [coin, setCoin] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCoin = async () => {
      try {
        const params = new URLSearchParams({
          localization: false,
          tickers: false,
          community_data: false,
          developer_data: false,
          x_cg_demo_api_key: API_KEY,
        });
        const response = await fetch(`https://api.coingecko.com/api/v3/coins/${id}?${params}`);
        if (!response.ok) throw new Error(`Couldn't load this coin (error ${response.status})`);
        const json = await response.json();
        setCoin(json);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchCoin();
  }, [id]);

  if (error) return <p className="message error">{error}</p>;
  if (!coin) return <p className="message">Loading coin...</p>;

  const market = coin.market_data;

  // The description comes with HTML links in it, so take those out
  // and keep the first paragraph
  const description = coin.description.en.replace(/<[^>]+>/g, "").split(/\r?\n\r?\n/)[0];

  // Price changes over different amounts of time
  const changes = [
    { label: "24 hours", value: market.price_change_percentage_24h },
    { label: "7 days", value: market.price_change_percentage_7d },
    { label: "30 days", value: market.price_change_percentage_30d },
    { label: "1 year", value: market.price_change_percentage_1y },
  ];

  const homepage = coin.links.homepage.find((link) => link !== "");

  return (
    <div className="coin-detail">
      <Link to="/" className="back-link">← Back to dashboard</Link>

      <div className="detail-header">
        <img src={coin.image.large} alt={coin.name} />
        <div>
          <h1>
            {coin.name} <span className="symbol">{coin.symbol.toUpperCase()}</span>
          </h1>
          <p className="detail-rank">Rank #{coin.market_cap_rank}</p>
        </div>
        <p className="detail-price">{formatPrice(market.current_price.usd)}</p>
      </div>

      {description && <p className="detail-description">{description}</p>}

      <div className="detail-changes">
        {changes.map((change) => (
          <div className="stat-card" key={change.label}>
            <p className="stat-label">{change.label}</p>
            {/* Some newer coins don't have a full year of prices yet */}
            {change.value == null ? (
              <p className="stat-value">—</p>
            ) : (
              <p className={`stat-value ${change.value >= 0 ? "up" : "down"}`}>{formatPercent(change.value)}</p>
            )}
          </div>
        ))}
      </div>

      <div className="detail-sections">
        <div className="detail-section">
          <h3>📊 Market</h3>
          <table className="detail-table">
            <tbody>
              <tr><td>Market cap</td><td>{formatBigMoney(market.market_cap.usd)}</td></tr>
              <tr><td>Fully diluted value</td><td>{market.fully_diluted_valuation.usd ? formatBigMoney(market.fully_diluted_valuation.usd) : "—"}</td></tr>
              <tr><td>24h trading volume</td><td>{formatBigMoney(market.total_volume.usd)}</td></tr>
              <tr><td>24h high</td><td>{formatPrice(market.high_24h.usd)}</td></tr>
              <tr><td>24h low</td><td>{formatPrice(market.low_24h.usd)}</td></tr>
            </tbody>
          </table>
        </div>

        <div className="detail-section">
          <h3>🏔️ Records</h3>
          <table className="detail-table">
            <tbody>
              <tr><td>All time high</td><td>{formatPrice(market.ath.usd)}</td></tr>
              <tr><td>Date of high</td><td>{formatDate(market.ath_date.usd)}</td></tr>
              <tr>
                <td>Down from high</td>
                <td className="down">{formatPercent(market.ath_change_percentage.usd)}</td>
              </tr>
              <tr><td>All time low</td><td>{formatPrice(market.atl.usd)}</td></tr>
              <tr><td>Date of low</td><td>{formatDate(market.atl_date.usd)}</td></tr>
            </tbody>
          </table>
        </div>

        <div className="detail-section">
          <h3>🪙 Supply</h3>
          <table className="detail-table">
            <tbody>
              <tr><td>Circulating supply</td><td>{formatSupply(market.circulating_supply)}</td></tr>
              <tr><td>Total supply</td><td>{market.total_supply ? formatSupply(market.total_supply) : "—"}</td></tr>
              {/* No max supply means more coins can always be made */}
              <tr><td>Max supply</td><td>{market.max_supply ? formatSupply(market.max_supply) : "No limit"}</td></tr>
            </tbody>
          </table>
        </div>

        <div className="detail-section">
          <h3>ℹ️ About</h3>
          <table className="detail-table">
            <tbody>
              <tr><td>Launched</td><td>{coin.genesis_date ? formatDate(coin.genesis_date) : "—"}</td></tr>
              <tr><td>Algorithm</td><td>{coin.hashing_algorithm || "—"}</td></tr>
              <tr>
                <td>Website</td>
                <td>{homepage ? <a href={homepage} target="_blank" rel="noreferrer">{new URL(homepage).hostname}</a> : "—"}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {coin.categories.length > 0 && (
        <div className="categories">
          {coin.categories.filter((category) => category).map((category) => (
            <span className="category" key={category}>{category}</span>
          ))}
        </div>
      )}
    </div>
  );
};

export default CoinDetail;
