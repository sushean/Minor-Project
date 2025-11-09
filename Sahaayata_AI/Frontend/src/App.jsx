import React from 'react'
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import LoginPage from './pages/LoginPage'
import ReportPage from './pages/ReportPage'
import Dashboard from './pages/Dashboard'
import About from './pages/About'
import Navbar from './components/Navbar'
import './index.css'

const focusRing = '0 0 0 2px rgba(245,158,11,0.40)'
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#0f172a' },
    secondary: { main: '#facc15' },
    error: { main: '#ef4444' }
  },
  components: {
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: { root: { '&:focus-visible': { boxShadow: focusRing, outline: 'none' } } }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          transition: 'border-color 120ms ease, box-shadow 120ms ease',
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#f59e0b',
            boxShadow: focusRing,
            borderWidth: 1
          }
        },
        notchedOutline: { borderColor: '#384759' }
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#f59e0b',
            boxShadow: focusRing,
            borderWidth: 1
          },
          '& label.Mui-focused': { color: '#f8fafc' }
        }
      }
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          borderColor: '#384759',
            '&.Mui-selected': {
              borderColor: '#f59e0b',
              color: '#f59e0b',
              backgroundColor: '#f59e0b22'
            },
            '&:focus-visible': { boxShadow: focusRing, outline: 'none' }
        }
      }
    }
  }
})

// Simple error boundary to avoid silent blank screen
class AppErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }
  componentDidCatch(err, info) {
    console.error('App crashed:', err, info)
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 32 }}>
          <h2 style={{ color: '#facc15' }}>Runtime Error</h2>
          <pre style={{ whiteSpace: 'pre-wrap', color: '#fff', background: '#1e293b', padding: 16, borderRadius: 8 }}>
            {String(this.state.error)}
          </pre>
          <button
            style={{ marginTop: 12, background: '#f59e0b', padding: '8px 16px', border: 'none', borderRadius: 6, cursor: 'pointer' }}
            onClick={() => window.location.reload()}
          >
            Reload
          </button>
        </div>
      )
    }
    return this.props.children
  }
}

function AppWrapper() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <AppErrorBoundary>
          <AppRoutes />
        </AppErrorBoundary>
      </BrowserRouter>
    </ThemeProvider>
  )
}

function AppRoutes() {
  const location = useLocation()
  const hideNavbar = location.pathname === '/login'
  return (
    <div className="app-container">
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/report" element={<SafeReportPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/about" element={<About />} />
        <Route path="/" element={<Navigate to="/report" replace />} />
        <Route path="*" element={<Navigate to="/report" replace />} />
      </Routes>
    </div>
  )
}

// Wrap ReportPage to catch its own errors (in case that component is failing)
function SafeReportPage() {
  try {
    return <ReportPage />
  } catch (e) {
    console.error('ReportPage error:', e)
    return (
      <div style={{ padding: 32 }}>
        <h3 style={{ color: '#ef4444' }}>Report page failed to load.</h3>
        <p style={{ color: '#fff' }}>Check console for details.</p>
      </div>
    )
  }
}

export default AppWrapper
