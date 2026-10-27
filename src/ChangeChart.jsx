import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, ReferenceLine } from 'recharts';

// Groups for the chart, from big drops to big gains.
// Each coin goes in the group its 24 hour change falls into.
const GROUPS = [
  { label: "< -10%", min: -Infinity, max: -10 },
  { label: "-10 to -5", min: -10, max: -5 },
  { label: "-5 to -2", min: -5, max: -2 },
  { label: "-2 to 0", min: -2, max: 0 },
  { label: "0 to 2", min: 0, max: 2 },
  { label: "2 to 5", min: 2, max: 5 },
  { label: "5 to 10", min: 5, max: 10 },
  { label: "> 10%", min: 10, max: Infinity },
];

// A bar chart of how many coins went up or down by how much in the last 24 hours.
// Dashboard passes in the coins that match the search and filters,
// so the chart changes as the user filters the list.
const ChangeChart = ({ coins }) => {
  const changes = coins
    .map((coin) => coin.price_change_percentage_24h)
    .filter((change) => change != null);

  const data = GROUPS.map((group) => ({
    label: group.label,
    count: changes.filter((change) => change >= group.min && change < group.max).length,
    isUp: group.min >= 0,
  }));

  // Coins that moved less than 2% either way
  const calmCoins = changes.filter((change) => Math.abs(change) < 2).length;

  // Coins usually rise and fall together, so say which way most of them went
  const upShare = changes.filter((change) => change >= 0).length / changes.length;
  let trend = "Today is mixed, with about as many coins up as down.";
  if (upShare >= 0.7) trend = "Most coins went up together today.";
  if (upShare <= 0.3) trend = "Most coins went down together today.";

  return (
    <div className="chart-card">
      <h3>🎢 How much did coins move today?</h3>
      <p className="chart-note">
        {changes.length > 0 ? (
          <>
            <strong>{calmCoins} of {changes.length}</strong> coins moved less than 2% in either direction.
            {" "}{trend}
          </>
        ) : (
          "No coins match your search and filters."
        )}
        {" "}This chart updates with your filters.
      </p>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <XAxis dataKey="label" stroke="#94a3b8" fontSize={11} interval={0} />
          <YAxis stroke="#94a3b8" fontSize={12} allowDecimals={false} />
          <Tooltip
            cursor={{ fill: "#273449" }}
            contentStyle={{ backgroundColor: "#0f172a", border: "1px solid #334155", borderRadius: 8 }}
            formatter={(value) => [value, "Coins"]}
          />
          {/* A line at 0% between the losers and the gainers */}
          <ReferenceLine x="0 to 2" stroke="#64748b" strokeDasharray="4 4" position="start" />
          <Bar dataKey="count" radius={[6, 6, 0, 0]}>
            {/* Green for gains, red for drops */}
            {data.map((entry) => (
              <Cell key={entry.label} fill={entry.isUp ? "#4ade80" : "#f87171"} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChangeChart;
