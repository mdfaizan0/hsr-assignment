const Navbar = ({ name, onLogout }) => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h2>Hello, {name} 👋🏻</h2>
      </div>
      <div className="navbar-right">
        <button onClick={onLogout}>Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;