import { NavLink } from 'react-router-dom'

function Sidebar({ totalMovies }) {
  return (
    <aside className="sidebar">
      <h1 className="sidebar-title">Movie Dashboard 2.0</h1>
      <p className="sidebar-subtitle">Data Dashboard Part 2</p>

      <nav className="sidebar-nav">
        <NavLink to="/" end className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
          Dashboard
        </NavLink>
      </nav>

      <div className="sidebar-note">
        <p className="note-label">Dataset Story</p>
        <p className="note-text">
          This dashboard explores recent theatrical releases and shows how genre mix and average ratings change
          across the selected movie set.
        </p>
        <p className="note-stat">Total loaded movies: {totalMovies}</p>
      </div>
    </aside>
  )
}

export default Sidebar
