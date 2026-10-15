import { useState, useEffect } from 'react'
import './App.css'
import CoinList from './CoinList';
import SummaryStats from './SummaryStats';

const API_KEY = import.meta.env.VITE_APP_API_KEY;

function App() {
  // The top 100 coins from the API (empty until the data comes back)
  const [coins, setCoins] = useState([]);

  // Is the first request still running?
  const [isLoading, setIsLoading] = useState(true);

  // Message to show if the request failed ("" = no error)
  const [error, setError] = useState("");

  // Get the coins once, when the page first loads
  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const params = new URLSearchParams({
          vs_currency: "usd",
          order: "market_cap_desc",
          per_page: 100,
          page: 1,
          x_cg_demo_api_key: API_KEY,
        });
        const response = await fetch(`https://api.coingecko.com/api/v3/coins/markets?${params}`);
        if (!response.ok) throw new Error(`CoinGecko API error: ${response.status}`);
        const json = await response.json();
        setCoins(json);
      } catch (err) {
        setError(err.message);
      }
      setIsLoading(false);
    };
    fetchCoins();
  }, []);

  return (
    <div className="App">
      <div className="header">
        <h1>Crypto Pulse 📈</h1>
        <h2>How is the crypto market doing today? A live look at the top 100 coins.</h2>
      </div>

      {isLoading && <p className="message">Loading coins...</p>}
      {error && <p className="message error">{error}</p>}

      {coins.length > 0 && (
        <>
          <SummaryStats coins={coins} />
          <CoinList coins={coins} />
        </>
      )}
    </div>
  );
};

export default App;
