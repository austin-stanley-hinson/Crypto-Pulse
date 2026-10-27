# Web Development Project 6 - *Crypto Pulse*

Submitted by: **Austin Stanley Hinson**

This web app: **A data dashboard that gives a live look at the top 100 cryptocurrencies, using the CoinGecko API. A sidebar on every page links to the dashboard and an About the Data page. The dashboard has summary cards, two charts (each top 10 coin's share of the market, and how many coins rose or fell by how much today), and a list of coins that can be searched and filtered. Clicking a coin opens its own detail page, with a unique URL, showing its description, price changes over 24 hours to 1 year, a 30 day price chart, all time high and low, supply, and more.**

Time spent: **X** hours spent in total

## Required Features

The following **required** functionality is completed:

- [x] **Clicking on an item in the list view displays more details about it**
  - Clicking on an item in the dashboard list navigates to a detail view for that item
  - Detail view includes extra information about the item not included in the dashboard view
    - The coin's description, price change over 7 days, 30 days, and 1 year, a 30 day price chart, 24 hour high and low, trading volume, fully diluted value, all time high and low with their dates, circulating, total, and max supply, launch date, hashing algorithm, website, and categories
  - The same sidebar is displayed in detail view as in dashboard view
- [x] **Each detail view of an item has a direct, unique URL link to that item's detail view page**
  - e.g. `/coin/bitcoin`, `/coin/ethereum`, `/coin/tether`
- [x] **The app includes at least two unique charts developed using the fetched data that tell an interesting story**
  - At least two charts should be incorporated into the dashboard view of the site
  - Each chart should describe a different aspect of the dataset
    - **Who owns the market?** A bar chart of each top 10 coin's share of the top 100's total market cap, plus one bar for the other 90. It shows how much bigger Bitcoin is than everything else.
    - **How much did coins move today?** A bar chart of how many coins went up or down by how much in the last 24 hours. It updates with the search and filters, so you can compare how much large and small coins move.

The following **optional** features are implemented:

- [x] The site's customized dashboard contains more content that explains what is interesting about the data
  - Each chart has a note under its title that changes with the data, e.g. "BTC alone makes up 59.3% of the value of the top 100 coins" and "Most coins went up together today"
  - An **About the Data** page explains market cap, the size groups, why Bitcoin matters so much, and stablecoins, and suggests filters to try
- [x] The site allows users to toggle between different data visualizations
  - Buttons above the charts show and hide each chart

The following **additional** features are implemented:

* [x] A 30 day price chart on each coin's detail page, green if the price went up over the month and red if it went down
* [x] The filters are kept when you open a coin and come back to the dashboard
* [x] The sidebar highlights the page you're on, and turns into a bar across the top on small screens
* [x] The page scrolls back to the top when you open a coin
* [x] Features from Project 5:
  * A search bar, a market cap size filter (large, mid, or small cap), and a min and max price, which all work together
  * Summary cards for the total market cap, the average 24 hour change, how many coins went up today, and the biggest gainer
  * A "Showing 14 of 100 coins" counter and a message when no coins match
  * Green and red 24 hour changes, prices formatted for their size, and big numbers shortened to `$1.64T` or `$987M`
  * The API key is kept in a `.env.local` file so it isn't committed to GitHub

## Video Walkthrough

Here's a walkthrough of implemented required features:

<img src='walkthrough.gif' title='Video Walkthrough' width='' alt='Video Walkthrough' />

<!-- Replace this with whatever GIF tool you used! -->
GIF created with the macOS Screenshot tool (Cmd+Shift+5) and converted to a GIF  
<!-- Recommended tools:
[Kap](https://getkap.co/) for macOS
[ScreenToGif](https://www.screentogif.com/) for Windows
[peek](https://github.com/phw/peek) for Linux. -->

## Notes

One challenge was keeping the filters when moving between pages. The search and filter values used to live inside the dashboard, so they would reset every time a coin was opened. Moving them up into `App`, which wraps every page along with the sidebar, keeps them in place when the user comes back. Another challenge was choosing charts that tell a story instead of just repeating the list. A chart of prices wouldn't say much, since prices range from fractions of a cent to tens of thousands of dollars, but market share and the spread of today's changes both show patterns that are hard to see in a table: Bitcoin holds a huge share of the market, and coins tend to rise and fall together. The detail page also needed its own API calls, since the list doesn't include things like the description or all time high, and each detail page has to load on its own when someone opens its URL directly.

## License

    Copyright 2026 Austin Stanley Hinson

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
