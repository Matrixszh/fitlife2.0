import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { logoutUser } from '../../services/authService';
import './Sidebar.css';

export default function Sidebar() {
  const { user, setAuthUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await logoutUser();
      setAuthUser(null);
      navigate('/login');
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-brand">
          <span className="brand-icon">💪</span>
          <span className="brand-text">FitLife</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        <Link 
          to="/dashboard" 
          className={`nav-item ${isActive('/dashboard') ? 'active' : ''}`}
        >
          <span className="nav-icon">📊</span>
          <span className="nav-text">Dashboard</span>
        </Link>

        <Link 
          to="/workouts" 
          className={`nav-item ${isActive('/workouts') ? 'active' : ''}`}
        >
          <span className="nav-icon">🏋️</span>
          <span className="nav-text">Workouts</span>
        </Link>

        <Link 
          to="/prediction" 
          className={`nav-item ${isActive('/prediction') ? 'active' : ''}`}
        >
          <span className="nav-icon">🤖</span>
          <span className="nav-text">Prediction</span>
        </Link>

        <Link 
          to="/profile" 
          className={`nav-item ${isActive('/profile') ? 'active' : ''}`}
        >
          <span className="nav-icon">👤</span>
          <span className="nav-text">Profile</span>
        </Link>
      </nav>

      <div className="sidebar-footer">
        <div className="user-info">
          <div className="user-avatar">
            {user?.displayName?.charAt(0).toUpperCase() || user?.email?.charAt(0).toUpperCase() || 'U'}
          </div>
          <div className="user-details">
            <div className="user-name">
              {user?.displayName || 'User'}
            </div>
            <div className="user-email">{user?.email}</div>
          </div>
        </div>
        <button onClick={handleLogout} className="btn-logout">
          <span className="logout-icon">🚪</span>
          Logout
        </button>
      </div>
    </aside>
  );
}

