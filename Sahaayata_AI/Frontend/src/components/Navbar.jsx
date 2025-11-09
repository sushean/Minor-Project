import React from 'react'
import { AppBar, Toolbar, IconButton, Typography, Button } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom'

const links = [
  { to: '/report', label: 'Home' },
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/about', label: 'About' }
]

export default function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()

  const onLogout = () => {
    localStorage.removeItem('sahaayata_user_token')
    navigate('/login')
  }

  return (
    <AppBar position="sticky" color="transparent" elevation={0} className="card-bg" style={{ backdropFilter: 'blur(6px)' }}>
      <Toolbar className="mx-2 md:mx-6">
        <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component={RouterLink} to="/report" sx={{ textDecoration: 'none', color: 'inherit', flexGrow: 1, fontWeight: 600 }}>
          Sahaayata.AI
        </Typography>
        {links.map(l => {
          const active = location.pathname === l.to
          return (
            <Button key={l.to} component={RouterLink} to={l.to} color={active ? 'secondary' : 'inherit'}
              sx={{ position: 'relative', mx: 0.5, fontWeight: active ? 700 : 400 }}>
              {l.label}
              {active && <span style={{ position: 'absolute', left: '50%', bottom: 2, transform: 'translateX(-50%)', width: '60%', height: 3, borderRadius: 4, background: 'linear-gradient(90deg,#ef4444,#facc15)' }} />}
            </Button>
          )
        })}
        <Button color="inherit" onClick={onLogout}>Logout</Button>
      </Toolbar>
    </AppBar>
  )
}
