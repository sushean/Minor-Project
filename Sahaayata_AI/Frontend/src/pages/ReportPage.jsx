import React, { useRef, useState } from 'react'
import {
  Box,
  Button,
  Chip,
  Container,
  Divider,
  IconButton,
  LinearProgress,
  Paper,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import RestartAltIcon from '@mui/icons-material/RestartAlt'
import SendIcon from '@mui/icons-material/Send'
import CloudDoneIcon from '@mui/icons-material/CloudDone'
import { apiSubmitReport } from '../utils/api'

export default function ReportPage() {
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [loc, setLoc] = useState({ lat: null, lng: null })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(null)
  const inputRef = useRef(null)

  const pickImage = () => inputRef.current?.click()
  const onFileChange = (e) => {
    const f = e.target.files?.[0]
    if (f && f.type.startsWith('image/')) {
      setFile(f)
      const url = URL.createObjectURL(f)
      setPreview(url)
    }
  }
  const clearFile = () => {
    setFile(null)
    if (preview) URL.revokeObjectURL(preview)
    setPreview(null)
  }

  const useLocation = () => {
    if (!navigator.geolocation) return alert('Geolocation not supported on this device.')
    navigator.geolocation.getCurrentPosition((p) => setLoc({ lat: p.coords.latitude, lng: p.coords.longitude }))
  }

  const submit = async () => {
    if (!file) return alert('Please add an image first.')
    if (!loc.lat || !loc.lng) return alert('Location is required. Please use location before sending.')
    setLoading(true)
    setSuccess(null)
    try {
      const res = await apiSubmitReport({ imageName: file.name, lat: loc.lat, lng: loc.lng })
      if (res.success) setSuccess('Thank you for reporting. Help is reaching soon.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Stack spacing={3}>
        <Box textAlign="center">
          <Typography variant="h3" fontWeight={800} color="#FFFFFF">
            Rapid Disaster Intel
          </Typography>
          <Typography variant="subtitle1" sx={{ color: '#d8e0ea', mt: 1 }}>
            Upload a clear photo. We’ll auto-detect the event and alert coordinators.
          </Typography>
        </Box>

        <Paper elevation={8} sx={{
          px: { xs: 2, sm: 4 }, py: 3,
          bgcolor: '#0b1220',
          color: '#f8fafc',
          border: '1px solid #263446',
          borderRadius: 3,
        }}>
          <Stack spacing={2}>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Box>
                <Typography variant="h5" fontWeight={700}>Submit Incident</Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>Image + location (required).</Typography>
              </Box>
              <Stack direction="row" spacing={1}>
                <Chip icon={<CloudDoneIcon />} label={file ? 'Image Ready' : 'Awaiting Image'} color={file ? 'success' : 'default'} variant={file ? 'filled' : 'outlined'} />
                <Chip icon={<LocationOnIcon />} label={loc.lat ? 'Location Ready' : 'Location Required'} color={loc.lat ? 'success' : 'default'} variant={loc.lat ? 'filled' : 'outlined'} />
              </Stack>
            </Stack>

            <Divider sx={{ borderColor: '#263446' }} />

            {/* Image picker with preview */}
            <Box sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              flexWrap: 'wrap',
            }}>
              <Box sx={{ width: 120, height: 120, borderRadius: 2, border: '1px dashed #3a4a61', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', bgcolor: '#0f172a' }}>
                {preview ? (
                  <img src={preview} alt="preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <AddPhotoAlternateIcon sx={{ color: '#facc15' }} fontSize="large" />
                )}
              </Box>

              <Stack direction="row" spacing={2} alignItems="center">
                <input ref={inputRef} type="file" accept="image/*" onChange={onFileChange} hidden />
                <Tooltip title={file ? 'Change Image' : 'Add Image'}>
                  <IconButton color="primary" onClick={pickImage} sx={{ bgcolor: 'rgba(255,255,255,0.08)' }}>
                    <AddPhotoAlternateIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title={loc.lat ? 'Update Location (required)' : 'Enable Location (required)'}>
                  <IconButton color="secondary" onClick={useLocation} sx={{ bgcolor: 'rgba(255,255,255,0.08)' }}>
                    <LocationOnIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Reset">
                  <IconButton onClick={() => { clearFile(); setLoc({ lat: null, lng: null }); setSuccess(null) }} sx={{ bgcolor: 'rgba(255,255,255,0.08)', color: '#fff' }}>
                    <RestartAltIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Send (requires image and location)">
                  <span>
                    <IconButton disabled={!file || !loc.lat || loading} onClick={submit} sx={{ bgcolor: file && loc.lat ? '#ef4444' : 'rgba(255,255,255,0.08)', color: '#fff', '&.Mui-disabled': { opacity: 0.5 } }}>
                      <SendIcon />
                    </IconButton>
                  </span>
                </Tooltip>
              </Stack>
            </Box>

            {loc.lat && (
              <Typography variant="caption" sx={{ color: '#d8e0ea' }}>
                Location locked: {loc.lat.toFixed(4)}, {loc.lng.toFixed(4)}
              </Typography>
            )}

            {loading && <LinearProgress />}
            {success && (
              <Box sx={{ mt: 1, p: 1.5, borderRadius: 1, bgcolor: 'rgba(34,197,94,0.18)', border: '1px solid rgba(34,197,94,0.35)' }}>
                <Typography variant="body2" sx={{ color: '#e4f9ea' }}>{success}</Typography>
              </Box>
            )}
          </Stack>
        </Paper>
      </Stack>
    </Container>
  )
}
