import { NavLink } from 'react-router-dom';

// The sidebar shown on every page, with links to each page of the app.
const Sidebar = () => {
  return (
    <nav className="sidebar">
      <NavLink to="/" className="sidebar-logo">Crypto Pulse 📈</NavLink>
      <div className="sidebar-links">
        {/* "end" so Dashboard is only highlighted on the home page */}
        <NavLink to="/" end>🏠 Dashboard</NavLink>
        <NavLink to="/about">📚 About the Data</NavLink>
      </div>
    </nav>
  );
};

export default Sidebar;
