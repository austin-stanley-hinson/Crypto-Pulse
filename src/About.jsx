// A page that explains what the numbers on the dashboard mean
// and suggests some things to try.
const About = () => {
  return (
    <div className="about">
      <div className="header">
        <h1>About the Data 📚</h1>
        <h2>What the numbers mean, and what's interesting about them.</h2>
      </div>

      <div className="about-section">
        <h3>💰 What is market cap?</h3>
        <p>
          Market cap is a coin's price times the number of coins people can buy and sell.
          It's the best way to compare how big coins are, because a coin's price alone can be
          misleading. A coin that costs $0.01 can still be worth billions in total if there are
          trillions of them.
        </p>
      </div>

      <div className="about-section">
        <h3>📏 Large, mid, and small cap</h3>
        <p>
          The size filter groups coins by market cap: <strong>large cap</strong> is over $10 billion,
          <strong> mid cap</strong> is $1 billion to $10 billion, and <strong>small cap</strong> is
          under $1 billion. Smaller coins usually move up and down a lot more than big ones.
        </p>
      </div>

      <div className="about-section">
        <h3>👑 Bitcoin is in charge</h3>
        <p>
          The market share chart shows that Bitcoin alone usually holds around half or more of the
          value of the whole top 100. When Bitcoin has a good or bad day, most other coins follow it. That's
          why the "today's moves" chart usually leans to one side: coins tend to rise and fall together.
        </p>
      </div>

      <div className="about-section">
        <h3>💵 Stablecoins</h3>
        <p>
          Some coins, like Tether (USDT) and USD Coin (USDC), are built to always be worth $1.
          They almost never move, so they sit in the middle of the "today's moves" chart.
          Open one from the dashboard and look at its 30 day price chart: it's nearly flat.
        </p>
      </div>

      <div className="about-section">
        <h3>🔎 Things to try</h3>
        <ul>
          <li>Pick <strong>Small cap</strong> and watch the "today's moves" chart spread out. Small coins usually swing more.</li>
          <li>Pick <strong>Large cap</strong> and the chart usually bunches up near 0%. Big coins tend to be calmer.</li>
          <li>Set the price range to <strong>$0.99 to $1.01</strong> to find the stablecoins.</li>
          <li>Set a max price of <strong>$1</strong> to see how many big coins cost less than a dollar.</li>
          <li>Open a coin and check how far it is from its <strong>all time high</strong>.</li>
        </ul>
      </div>

      <p className="about-source">
        Data comes from the <a href="https://www.coingecko.com/en/api" target="_blank" rel="noreferrer">CoinGecko API</a> and
        is loaded fresh every time you open the app.
      </p>
    </div>
  );
};

export default About;
