import React, { useEffect, useMemo, useState } from 'react'
import MapView from '../components/MapView'
import DisasterCard from '../components/DisasterCard'
import { apiGetReports, seedDemoReports, apiVerifyReport } from '../utils/api'
import {
  Box,
  Button,
  Chip,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  Tab,
  Tabs,
  Typography,
} from '@mui/material'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import RefreshIcon from '@mui/icons-material/Refresh'
import SecurityIcon from '@mui/icons-material/Security'

export default function Dashboard() {
  const role = typeof window !== 'undefined' ? localStorage.getItem('sahaayata_role') : null
  const isAdmin = role === 'admin'
  const [verified, setVerified] = useState([])
  const [unverified, setUnverified] = useState([])
  const [filter, setFilter] = useState('all')
  const [tab, setTab] = useState(0) // 0 = Verified, 1 = Unverified

  useEffect(() => {
    seedDemoReports()
    fetchReports()
  }, [])

  const fetchReports = async () => {
    const v = await apiGetReports({ onlyVerified: true })
    const all = await apiGetReports({ onlyVerified: false })
    if (v.success) setVerified(v.reports)
    if (all.success) setUnverified((all.reports || []).filter(r => !r.verified))
  }

  const onFilter = (e) => setFilter(e.target.value)

  const filteredVerified = useMemo(() => (
    filter === 'all' ? verified : verified.filter(r => r.type === filter)
  ), [verified, filter])

  const filteredUnverified = useMemo(() => (
    filter === 'all' ? unverified : unverified.filter(r => r.type === filter)
  ), [unverified, filter])

  const onMarkerClick = (r) => {
    if (isAdmin && !r.verified) {
      apiVerifyReport(r.id).then(() => fetchReports())
    }
  }

  return (
    <Box className="main-content" sx={{ maxWidth: '1400px', mx: 'auto' }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <Paper elevation={4} sx={{ p: 1.5, bgcolor: '#0b1220', border: '1px solid #263446' }}>
            <Box display="flex" alignItems="center" justifyContent="space-between" px={1} pb={1}>
              <Typography variant="h6" fontWeight={700}>Live Map</Typography>
              <Stack direction="row" spacing={1} alignItems="center">
                <Chip icon={<SecurityIcon />} label={isAdmin ? 'Admin' : 'Viewer'} size="small" color={isAdmin ? 'secondary' : 'default'} />
                <Button startIcon={<RefreshIcon />} size="small" variant="contained" onClick={fetchReports}
                  sx={{ bgcolor: '#facc15', color: '#0b1220', '&:hover': { bgcolor: '#eab308' } }}>
                  Refresh
                </Button>
              </Stack>
            </Box>
            <MapView reports={filteredVerified} onMarkerClick={onMarkerClick} />
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper elevation={4} sx={{ p: 2, bgcolor: '#0b1220', border: '1px solid #263446' }}>
            <Stack direction="row" spacing={1} alignItems="center" justifyContent="space-between">
              <Typography variant="h6" fontWeight={700}>Reports</Typography>
              <Stack direction="row" spacing={1}>
                <Chip label={`Verified: ${verified.length}`} color="success" size="small" />
                {isAdmin && <Chip label={`Unverified: ${unverified.length}`} color="warning" size="small" />}
              </Stack>
            </Stack>

            <Box mt={2}>
              <FormControl fullWidth size="small">
                <InputLabel id="filter-label">Filter Type</InputLabel>
                <Select labelId="filter-label" value={filter} label="Filter Type" onChange={onFilter}>
                  <MenuItem value="all">All</MenuItem>
                  <MenuItem value="Flood">Flood</MenuItem>
                  <MenuItem value="Fire">Fire</MenuItem>
                  <MenuItem value="Landslide">Landslide</MenuItem>
                  <MenuItem value="Earthquake">Earthquake</MenuItem>
                </Select>
              </FormControl>
            </Box>

            <Divider sx={{ my: 2, borderColor: '#263446' }} />

            <Tabs value={isAdmin ? tab : 0} onChange={(_, v) => setTab(v)} textColor="inherit" indicatorColor="secondary" variant="fullWidth">
              <Tab label="Verified" />
              {isAdmin && <Tab label="Unverified" />}
            </Tabs>

            <Box mt={2} sx={{ maxHeight: '60vh', overflowY: 'auto' }}>
              {(isAdmin ? (tab === 0 ? filteredVerified : filteredUnverified) : filteredVerified).map((r) => (
                <Box key={r.id} sx={{ mb: 1.5 }}>
                  <DisasterCard report={r} />
                  {isAdmin && !r.verified && (
                    <Button size="small" variant="contained" startIcon={<CheckCircleOutlineIcon />} onClick={() => apiVerifyReport(r.id).then(fetchReports)}>
                      Verify
                    </Button>
                  )}
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}
