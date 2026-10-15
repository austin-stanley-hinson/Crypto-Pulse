// The search bar, size filter, and price range above the list.
// App passes in the current values and the functions to call when they change.
const Filters = ({
  searchInput, onSearchChange,
  sizeFilter, onSizeChange,
  minPrice, onMinPriceChange,
  maxPrice, onMaxPriceChange,
}) => {
  return (
    <div className="filters">
      <input
        type="text"
        className="search-bar"
        value={searchInput}
        placeholder="🔍 Search by name or symbol..."
        onChange={(event) => onSearchChange(event.target.value)}
      />

      <select
        className="size-filter"
        value={sizeFilter}
        onChange={(event) => onSizeChange(event.target.value)}
      >
        <option value="all">All sizes</option>
        <option value="large">Large cap (over $10B)</option>
        <option value="mid">Mid cap ($1B to $10B)</option>
        <option value="small">Small cap (under $1B)</option>
      </select>

      {/* Only show coins priced between these two numbers (either one can be left empty) */}
      <div className="price-range">
        <label htmlFor="min-price">Price $</label>
        <input
          id="min-price"
          type="number"
          min="0"
          step="any"
          value={minPrice}
          placeholder="Min"
          onChange={(event) => onMinPriceChange(event.target.value)}
        />
        <label htmlFor="max-price">to $</label>
        <input
          id="max-price"
          type="number"
          min="0"
          step="any"
          value={maxPrice}
          placeholder="Max"
          onChange={(event) => onMaxPriceChange(event.target.value)}
        />
      </div>
    </div>
  );
};

export default Filters;
