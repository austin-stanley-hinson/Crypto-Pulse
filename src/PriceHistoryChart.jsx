import { useState, useEffect } from 'react'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { formatPrice, formatDate } from './format';

const API_KEY = import.meta.env.VITE_APP_API_KEY;

// A line chart of one coin's price over the last 30 days, on its detail page.
const PriceHistoryChart = ({ id }) => {
  // Each point is { time, price } (empty until the data comes back)
  const [prices, setPrices] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const params = new URLSearchParams({
          vs_currency: "usd",
          days: 30,
          interval: "daily",
          x_cg_demo_api_key: API_KEY,
        });
        const response = await fetch(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?${params}`);
        if (!response.ok) throw new Error(`Couldn't load price history (error ${response.status})`);
        const json = await response.json();
        // The API gives [time, price] pairs
        setPrices(json.prices.map(([time, price]) => ({ time, price })));
      } catch (err) {
        setError(err.message);
      }
    };
    fetchPrices();
  }, [id]);

  if (error) return <p className="message error">{error}</p>;
  if (prices.length === 0) return <p className="message">Loading price history...</p>;

  // Green if the price is higher than 30 days ago, red if lower
  const isUp = prices[prices.length - 1].price >= prices[0].price;
  const color = isUp ? "#4ade80" : "#f87171";

  return (
    <div className="chart-card">
      <h3>📅 Price over the last 30 days</h3>
      <ResponsiveContainer width="100%" height={260}>
        <AreaChart data={prices} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
          <XAxis
            dataKey="time"
            stroke="#94a3b8"
            fontSize={12}
            tickFormatter={(time) => formatDate(time).replace(/, \d{4}$/, "")}
            minTickGap={30}
          />
          <YAxis
            stroke="#94a3b8"
            fontSize={12}
            domain={["auto", "auto"]}
            tickFormatter={formatPrice}
            width={90}
          />
          <Tooltip
            contentStyle={{ backgroundColor: "#0f172a", border: "1px solid #334155", borderRadius: 8 }}
            labelFormatter={formatDate}
            formatter={(value) => [formatPrice(value), "Price"]}
          />
          <Area type="monotone" dataKey="price" stroke={color} fill={color} fillOpacity={0.15} strokeWidth={2} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PriceHistoryChart;
