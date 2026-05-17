import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../App.css';

const Header = ({ language, onLanguageChange }) => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    checkAuthStatus();
    // re-check when route changes so header updates after login redirects
  }, [location.pathname]);

  const checkAuthStatus = async () => {
    try {
      const response = await fetch('/api/v1/check-auth', {
        method: 'GET',
        credentials: 'include',
      });
      if (response.ok) {
        const data = await response.json();
        setIsAuthenticated(true);
        setUserRole(data.user?.role || null);
      } else {
        setIsAuthenticated(false);
        setUserRole(null);
      }
    } catch (error) {
      setIsAuthenticated(false);
      setUserRole(null);
    } finally {
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/v1/logout', {
        method: 'GET',
        credentials: 'include',
      });
      setIsAuthenticated(false);
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <header className="header-bar">
      <div className="header-content">
        <h1 className="header-title">
          <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
            {t('app_title')}
          </Link>
        </h1>
        <div className="header-right">
          <Link to="/nakshatras" className={`nav-btn ${location.pathname === '/nakshatras' ? 'active' : ''}`}>
            {t('nakshatras')}
          </Link>
          {isAuthenticated && (
            <>
              {userRole !== 'Admin' && (
              <Link to="/query" className={`nav-btn ${location.pathname === '/query' ? 'active' : ''}`}>
                {t('query')}
              </Link>
              )}
              {userRole === 'Admin' && (
                <Link to="/problems" className={`nav-btn ${location.pathname === '/problems' ? 'active' : ''}`}>
                  Problems
                </Link>
              )}

               {userRole === 'Admin' && (
                <Link to="/kundli" className={`nav-btn ${location.pathname === '/problems' ? 'active' : ''}`}>
                  kundli
                </Link>
              )}

              {userRole === 'Admin' && (
                <Link to="/match-making" className={`nav-btn ${location.pathname === '/match-making' ? 'active' : ''}`}>
                  Match Making
                </Link>
              )}
            </>
          )}
          {!isAuthenticated ? (
            <>
              <Link to="/login" className={`nav-btn ${location.pathname === '/login' ? 'active' : ''}`}>
                {t('login')}
              </Link>
              <Link to="/signup" className={`nav-btn ${location.pathname === '/signup' ? 'active' : ''}`}>
                {t('signup')}
              </Link>
            </>
          ) : (
                         <button onClick={handleLogout} className="nav-btn logout-btn">
               {t('logout')}
             </button>
          )}
          <div className="language-select-container">
            <label htmlFor="language-select" className="language-label">{t('language')}:</label>
            <select
              id="language-select"
              value={language}
              onChange={e => onLanguageChange(e.target.value)}
              className="language-select"
            >
              <option value="en">{t('english')}</option>
              <option value="mr">{t('marathi')}</option>
            </select>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 
