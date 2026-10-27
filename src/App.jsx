import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom';
import './App.css'
import Sidebar from './Sidebar';
import Dashboard from './Dashboard';
import CoinDetail from './CoinDetail';

const API_KEY = import.meta.env.VITE_APP_API_KEY;

function App() {
  // The top 100 coins from the API (empty until the data comes back)
  const [coins, setCoins] = useState([]);

  // Is the first request still running?
  const [isLoading, setIsLoading] = useState(true);

  // Message to show if the request failed ("" = no error)
  const [error, setError] = useState("");

  // What the user typed in the search bar
  const [searchInput, setSearchInput] = useState("");

  // Which size of coin to show: "all", "large", "mid", or "small"
  const [sizeFilter, setSizeFilter] = useState("all");

  // The lowest and highest price to show, as typed ("" = no limit)
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

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
    // The sidebar stays on the left while the page on the right changes
    <div className="App">
      <Sidebar />

      <main className="content">
        <Routes>
          <Route
            path="/"
            element={
              <>
                {isLoading && <p className="message">Loading coins...</p>}
                {error && <p className="message error">{error}</p>}
                {coins.length > 0 && (
                  <Dashboard
                    coins={coins}
                    searchInput={searchInput}
                    onSearchChange={setSearchInput}
                    sizeFilter={sizeFilter}
                    onSizeChange={setSizeFilter}
                    minPrice={minPrice}
                    onMinPriceChange={setMinPrice}
                    maxPrice={maxPrice}
                    onMaxPriceChange={setMaxPrice}
                  />
                )}
              </>
            }
          />
          <Route path="/coin/:id" element={<CoinDetail />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
