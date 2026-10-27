import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { formatBigMoney } from './format';

// A bar chart of how much of the top 100's total value each of the
// 10 biggest coins holds, plus one bar for the other 90 together.
const MarketShareChart = ({ coins }) => {
  const totalMarketCap = coins.reduce((total, coin) => total + coin.market_cap, 0);

  // Coins already come sorted by market cap, biggest first
  const topTen = coins.slice(0, 10);
  const restMarketCap = coins.slice(10).reduce((total, coin) => total + coin.market_cap, 0);

  const data = [
    ...topTen.map((coin) => ({
      name: coin.symbol.toUpperCase(),
      share: (coin.market_cap / totalMarketCap) * 100,
      marketCap: coin.market_cap,
    })),
    { name: `Other ${coins.length - 10}`, share: (restMarketCap / totalMarketCap) * 100, marketCap: restMarketCap },
  ];

  const bitcoinShare = data[0].share;

  return (
    <div className="chart-card">
      <h3>🥧 Who owns the market?</h3>
      <p className="chart-note">
        {data[0].name} alone makes up <strong>{bitcoinShare.toFixed(1)}%</strong> of the value of the top 100 coins.
        The other {coins.length - 10} coins together hold only {data[10].share.toFixed(1)}%.
      </p>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
          <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} interval={0} />
          <YAxis stroke="#94a3b8" fontSize={12} unit="%" />
          <Tooltip
            cursor={{ fill: "#273449" }}
            contentStyle={{ backgroundColor: "#0f172a", border: "1px solid #334155", borderRadius: 8 }}
            formatter={(value, name, item) => [`${value.toFixed(2)}% (${formatBigMoney(item.payload.marketCap)})`, "Share"]}
          />
          <Bar dataKey="share" radius={[6, 6, 0, 0]}>
            {/* The "other" bar is gray so it stands apart from the single coins */}
            {data.map((entry, index) => (
              <Cell key={entry.name} fill={index === 10 ? "#64748b" : "#38bdf8"} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MarketShareChart;
