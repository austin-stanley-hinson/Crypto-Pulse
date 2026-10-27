import { useNavigate } from 'react-router-dom';
import { formatPrice, formatBigMoney, formatPercent } from './format';

// The dashboard list: one coin per row.
// App passes in the coins to show.
// Clicking a row opens that coin's detail page.
const CoinList = ({ coins }) => {
  const navigate = useNavigate();

  return (
    // The wrapper lets the table scroll sideways on small screens
    <div className="table-wrapper">
      <table className="coin-list">
        <thead>
          <tr>
            <th>#</th>
            <th>Coin</th>
            <th>Price</th>
            <th>24h Change</th>
            <th>Market Cap</th>
          </tr>
        </thead>
        <tbody>
          {coins.map((coin) => (
            <tr key={coin.id} className="coin-row" onClick={() => navigate(`/coin/${coin.id}`)}>
              <td className="rank">{coin.market_cap_rank}</td>
              <td>
                <div className="coin-name">
                  <img src={coin.image} alt={coin.name} />
                  <span>{coin.name}</span>
                  <span className="symbol">{coin.symbol.toUpperCase()}</span>
                </div>
              </td>
              <td>{formatPrice(coin.current_price)}</td>
              {/* Green if the price went up, red if it went down */}
              <td className={coin.price_change_percentage_24h >= 0 ? "up" : "down"}>
                {formatPercent(coin.price_change_percentage_24h)}
              </td>
              <td>{formatBigMoney(coin.market_cap)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CoinList;
