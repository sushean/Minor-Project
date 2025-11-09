import React from 'react'
import { Box, Container, Grid, Paper, Stack, Typography, Chip, Divider, Button, List, ListItem, ListItemIcon, ListItemText } from '@mui/material'
import CrisisAlertIcon from '@mui/icons-material/CrisisAlert'
import InsightsIcon from '@mui/icons-material/Insights'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import MapIcon from '@mui/icons-material/Map'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import { Link as RouterLink } from 'react-router-dom'

const Feature = ({ icon, title, desc, accent }) => (
  <Paper
    elevation={8}
    sx={{
      p: 2.5,
      height: '100%',
      bgcolor: '#0b1220',
      color: '#f8fafc',
      border: '1px solid #263446',
      borderRadius: 2,
      transition: 'transform 180ms ease, box-shadow 180ms ease',
      '&:hover': { transform: 'translateY(-4px)' }
    }}
  >
    <Stack direction="row" spacing={1.75} alignItems="flex-start">
      <Box sx={{
        width: 44,
        height: 44,
        borderRadius: '50%',
        display: 'grid',
        placeItems: 'center',
        color: accent,
        background: `${accent}20`
      }}>
        {icon}
      </Box>
      <Box>
        <Typography variant="h6" fontWeight={800}>{title}</Typography>
        <Typography variant="body2" sx={{ color: '#cbd5e1', mt: .75, lineHeight: 1.5 }}>{desc}</Typography>
      </Box>
    </Stack>
  </Paper>
)

export default function About() {
  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
      <Stack spacing={5}>
        {/* Hero */}
        <Box textAlign="center">
          <Typography variant="overline" sx={{ letterSpacing: 2, color: '#cbd5e1' }}>Our mission</Typography>
          <Typography variant="h3" fontWeight={900} sx={{ color: '#fff', mt: 0.5 }}>About Sahaayata.AI</Typography>
          <Typography variant="subtitle1" sx={{ color: '#d8e0ea', mt: 1.25, maxWidth: 760, mx: 'auto' }}>
            AI-driven disaster response platform helping citizens report incidents and coordinators act faster
            with verified, map-based intelligence.
          </Typography>
          <Box sx={{ width: 96, height: 4, mx: 'auto', mt: 2, borderRadius: 9999, background: 'linear-gradient(90deg,#ef4444,#f59e0b)' }} />
          <Stack direction="row" spacing={1} justifyContent="center" sx={{ mt: 2, flexWrap: 'wrap' }}>
            <Chip label="React + Vite" variant="outlined" size="small" sx={{ borderColor: '#263446', color: '#cbd5e1' }} />
            <Chip label="MUI" variant="outlined" size="small" sx={{ borderColor: '#263446', color: '#cbd5e1' }} />
            <Chip label="Tailwind" variant="outlined" size="small" sx={{ borderColor: '#263446', color: '#cbd5e1' }} />
            <Chip label="GSAP" variant="outlined" size="small" sx={{ borderColor: '#263446', color: '#cbd5e1' }} />
            <Chip label="FastAPI (planned)" variant="outlined" size="small" sx={{ borderColor: '#263446', color: '#cbd5e1' }} />
          </Stack>
        </Box>

        {/* Features */}
        <Box>
          <Divider sx={{ mb: 3, borderColor: '#263446' }} />
          <Grid container spacing={2.5} alignItems="stretch">
            <Grid item xs={12} sm={6} lg={3}>
              <Feature
                icon={<CrisisAlertIcon />}
                title="Citizen Reports"
                desc="Quick photo-first reporting with location. Minimal friction for people in distress."
                accent="#ef4444"
              />
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
              <Feature
                icon={<InsightsIcon />}
                title="AI Verification"
                desc="Transformer models classify disaster type, severity and confidence before surfacing to admins."
                accent="#a78bfa"
              />
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
              <Feature
                icon={<MapIcon />}
                title="Operational Map"
                desc="Dashboards visualize verified incidents with filters, severity colors and quick actions."
                accent="#38bdf8"
              />
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
              <Feature
                icon={<CloudUploadIcon />}
                title="API-first"
                desc="Planned FastAPI backend, storage integrations and webhook support for responders."
                accent="#22c55e"
              />
            </Grid>
          </Grid>
        </Box>

        {/* Roadmap */}
        <Paper elevation={6} sx={{ p: 3, bgcolor: '#0b1220', color: '#f8fafc', border: '1px solid #263446', borderRadius: 2 }}>
          <Typography variant="h6" fontWeight={900}>Roadmap</Typography>
          <List dense sx={{ mt: 1 }}>
            <ListItem disableGutters>
              <ListItemIcon sx={{ minWidth: 32, color: '#22c55e' }}><CheckCircleOutlineIcon /></ListItemIcon>
              <ListItemText primaryTypographyProps={{ sx: { color: '#cbd5e1' } }} primary="Replace mock APIs with FastAPI services" />
            </ListItem>
            <ListItem disableGutters>
              <ListItemIcon sx={{ minWidth: 32, color: '#22c55e' }}><CheckCircleOutlineIcon /></ListItemIcon>
              <ListItemText primaryTypographyProps={{ sx: { color: '#cbd5e1' } }} primary="Integrate Google Maps and real geocoding" />
            </ListItem>
            <ListItem disableGutters>
              <ListItemIcon sx={{ minWidth: 32, color: '#22c55e' }}><CheckCircleOutlineIcon /></ListItemIcon>
              <ListItemText primaryTypographyProps={{ sx: { color: '#cbd5e1' } }} primary="Add Firebase Auth and role management" />
            </ListItem>
            <ListItem disableGutters>
              <ListItemIcon sx={{ minWidth: 32, color: '#22c55e' }}><CheckCircleOutlineIcon /></ListItemIcon>
              <ListItemText primaryTypographyProps={{ sx: { color: '#cbd5e1' } }} primary="Real-time updates via WebSockets" />
            </ListItem>
          </List>
        </Paper>

        {/* CTA */}
        <Paper
          elevation={8}
          sx={{
            p: { xs: 2.5, md: 3 },
            textAlign: 'center',
            bgcolor: '#0b1220',
            color: '#f8fafc',
            border: '1px solid #263446',
            borderRadius: 2,
            backgroundImage: 'linear-gradient(90deg, #ef444410, #f59e0b10)'
          }}
        >
          <Typography variant="h6" fontWeight={900}>Ready to explore?</Typography>
          <Typography variant="body2" sx={{ color: '#cbd5e1', mt: 0.5 }}>
            Try submitting a sample incident or see how admins verify reports.
          </Typography>
          <Stack direction="row" spacing={1.5} justifyContent="center" sx={{ mt: 2, flexWrap: 'wrap' }}>
            <Button component={RouterLink} to="/report" variant="contained" className="btn-emergency">Report an Incident</Button>
            <Button component={RouterLink} to="/dashboard" variant="outlined" sx={{ borderColor: '#f59e0b', color: '#f59e0b' }}>View Dashboard</Button>
          </Stack>
        </Paper>
      </Stack>
    </Container>
  )
}
