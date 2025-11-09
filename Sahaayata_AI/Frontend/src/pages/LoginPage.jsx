import React, { useState } from 'react'
import { TextField, Button, ToggleButtonGroup, ToggleButton, Paper, Grid, Typography, Link, Alert, Box, FormControlLabel, Checkbox, InputAdornment, IconButton, Divider } from '@mui/material'
import { apiLogin } from '../utils/api'
import { useNavigate } from 'react-router-dom'
import SecurityIcon from '@mui/icons-material/Security'
import CrisisAlertIcon from '@mui/icons-material/CrisisAlert'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'

export default function LoginPage() {
  const [role, setRole] = useState('user')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [remember, setRemember] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  const onSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!email || !password) {
      setError('Please enter email and password.')
      return
    }
    setLoading(true)
    const res = await apiLogin({ email, password, role })
    setLoading(false)
    if (res.success) {
      localStorage.setItem('sahaayata_user_token', res.token)
      localStorage.setItem('sahaayata_role', role)
      if (role === 'admin') navigate('/dashboard')
      else navigate('/report')
    } else {
      setError('Unable to sign in. Please try again.')
    }
  }

  return (
    <Grid container sx={{ minHeight: '100vh' }}>
      {/* Left: Form */}
      <Grid item xs={12} md={6} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', p: { xs: 2.5, md: 4 } }}>
        <Paper
          elevation={12}
          sx={{
            p: 4,
            width: '100%',
            maxWidth: 460,
            bgcolor: '#0b1220',
            color: '#f8fafc',
            border: '1px solid #263446',
            borderTop: '4px solid #f59e0b',
            borderRadius: 3
          }}
        >
          <Typography variant="overline" sx={{ letterSpacing: 2, color: '#cbd5e1' }}>Welcome back</Typography>
          <Typography variant="h5" fontWeight={900}>Sign in</Typography>
          <Typography variant="body2" sx={{ mb: 2, opacity: 0.85 }}>Coordinate or report emergencies with Sahaayata.AI.</Typography>

          <ToggleButtonGroup
            value={role}
            exclusive
            onChange={(_, v) => v && setRole(v)}
            size="small"
            sx={{
              mb: 2,
              '& .MuiToggleButtonGroup-grouped': { borderColor: '#263446' },
              '& .Mui-selected': { bgcolor: '#f59e0b22 !important', borderColor: '#f59e0b !important', color: '#f59e0b !important' }
            }}
          >
            <ToggleButton value="user">{<CrisisAlertIcon fontSize="small" sx={{ mr: 0.5 }} />}User</ToggleButton>
            <ToggleButton value="admin">{<SecurityIcon fontSize="small" sx={{ mr: 0.5 }} />}Admin</ToggleButton>
          </ToggleButtonGroup>

          <form onSubmit={onSubmit} className="space-y-3">
            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              margin="dense"
            />
            <TextField
              label="Password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              margin="dense"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword((s) => !s)} edge="end" sx={{ color: '#cbd5e1' }}>
                      {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 0.5 }}>
              <FormControlLabel
                control={<Checkbox checked={remember} onChange={(e) => setRemember(e.target.checked)} sx={{ color: '#cbd5e1' }} />}
                label={<Typography variant="body2" sx={{ color: '#cbd5e1' }}>Remember me</Typography>}
              />
              <Link href="#" underline="hover" sx={{ color: '#cbd5e1' }}>Forgot password?</Link>
            </Box>
            {error && (
              <Alert severity="error" variant="outlined" sx={{ bgcolor: 'transparent', color: '#fecaca', borderColor: '#fca5a5' }}>
                {error}
              </Alert>
            )}
            <Button type="submit" fullWidth variant="contained" endIcon={<ArrowForwardIcon />} className="btn-emergency" disabled={loading} sx={{ mt: 0.5 }}>
              {loading ? 'Signing in...' : 'Sign in'}
            </Button>
          </form>
          <Divider sx={{ my: 2, borderColor: '#263446' }} />
          <Typography variant="caption" sx={{ display: 'block', opacity: 0.8 }}>
            Demo mode: any email/password works. Selected role directs you to {role === 'admin' ? 'Dashboard' : 'Report'}.
          </Typography>
        </Paper>
      </Grid>

      {/* Right: Hero */}
      <Grid item xs={12} md={6} sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', justifyContent: 'center', p: 4 }}>
        <Box sx={{ maxWidth: 520, textAlign: 'center' }}>
          <Typography variant="h3" fontWeight={900} sx={{ color: '#ffffff' }}>Sahaayata.AI</Typography>
          <Box sx={{ width: 96, height: 4, mx: 'auto', mt: 1, borderRadius: 9999, background: 'linear-gradient(90deg,#ef4444,#f59e0b)' }} />
          <Typography variant="h6" sx={{ color: '#d8e0ea', mt: 1.5 }}>AI-driven disaster response and coordination.</Typography>
          <Typography variant="body1" sx={{ color: '#cbd5e1', mt: 2 }}>
            Join a network of responders and citizens reporting real-time incidents. Our models classify and prioritize
            events so help reaches faster.
          </Typography>
        </Box>
      </Grid>
    </Grid>
  )
}
