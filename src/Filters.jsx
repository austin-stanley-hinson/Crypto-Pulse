// The search bar and size filter above the list.
// App passes in the current values and the functions to call when they change.
const Filters = ({ searchInput, onSearchChange, sizeFilter, onSizeChange }) => {
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
    </div>
  );
};

export default Filters;
