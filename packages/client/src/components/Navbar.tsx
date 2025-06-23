import { Link } from 'react-router-dom'
import { useAtom } from 'jotai'
import { authAtom } from '../store/authStore'

const Navbar = () => {
  const [auth, setAuth] = useAtom(authAtom)

  const handleLogout = () => {
    localStorage.removeItem('token')
    setAuth({ isAuthenticated: false, user: null })
  }

  return (
    <nav style={{ 
      backgroundColor: '#f3f4f6', 
      padding: '1rem',
      marginBottom: '1rem'
    }}>
      <div className="container" style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center' 
      }}>
        <Link to="/" style={{ fontSize: '1.5rem', fontWeight: 'bold', textDecoration: 'none', color: '#111' }}>
          TTC App
        </Link>
        <div>
          {auth.isAuthenticated ? (
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <Link to="/dashboard" style={{ textDecoration: 'none', color: '#111' }}>Dashboard</Link>
              <button onClick={handleLogout}>Logout</button>
            </div>
          ) : (
            <div style={{ display: 'flex', gap: '1rem' }}>
              <Link to="/login" style={{ textDecoration: 'none', color: '#111' }}>Login</Link>
              <Link to="/register" style={{ textDecoration: 'none', color: '#111' }}>Register</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
