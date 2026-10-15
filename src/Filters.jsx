// The search bar above the list.
// App passes in what's typed and the function to call when it changes.
const Filters = ({ searchInput, onSearchChange }) => {
  return (
    <div className="filters">
      <input
        type="text"
        className="search-bar"
        value={searchInput}
        placeholder="🔍 Search by name or symbol..."
        onChange={(event) => onSearchChange(event.target.value)}
      />
    </div>
  );
};

export default Filters;
