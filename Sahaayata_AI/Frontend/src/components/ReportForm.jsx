import React, { useState } from 'react'
import { Button, Chip, LinearProgress, Tooltip, IconButton } from '@mui/material'
import ImageUpload from './ImageUpload'
import { apiSubmitReport } from '../utils/api'
import { useNavigate } from 'react-router-dom'
import CloudDoneIcon from '@mui/icons-material/CloudDone'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate'
import SendIcon from '@mui/icons-material/Send'
import RestartAltIcon from '@mui/icons-material/RestartAlt'

const ActionIcon = ({ icon, label, onClick, disabled, color='primary' }) => (
  <div className="flex flex-col items-center gap-1">
    <Tooltip title={label} placement="top">
      <span>
        <IconButton color={color} size="large" onClick={onClick} disabled={disabled}
          sx={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.12), rgba(255,255,255,0.04))',
            backdropFilter: 'blur(6px)',
            border: '1px solid rgba(255,255,255,0.12)',
            transition: 'all .25s',
            '&:hover': { transform: 'translateY(-3px)', boxShadow: '0 6px 18px -4px rgba(0,0,0,.55), 0 0 0 1px rgba(255,255,255,0.18)' }
          }}>
          {icon}
        </IconButton>
      </span>
    </Tooltip>
    <span className="text-[11px] tracking-wide uppercase opacity-70">{label}</span>
  </div>
)

export default function ReportForm() {
  const [image, setImage] = useState(null)
  const [loc, setLoc] = useState({ lat: null, lng: null })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(null)
  const navigate = useNavigate()

  const useLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation not supported')
      return
    }
    navigator.geolocation.getCurrentPosition((p) => {
      setLoc({ lat: p.coords.latitude, lng: p.coords.longitude })
    })
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    if (!image) {
      alert('Please upload an image.')
      return
    }
    setLoading(true)
    const payload = { imageName: image.name, lat: loc.lat, lng: loc.lng }
    try {
      const res = await apiSubmitReport(payload)
      if (res.success) {
        setSuccess('Image received. Our AI is analyzing it now...')
        setTimeout(() => navigate('/'), 1800)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-8 max-w-4xl mx-auto p-8 rounded-2xl relative overflow-hidden surface-strong"
      style={{ boxShadow: '0 12px 40px -10px rgba(0,0,0,0.55)' }}>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight flex items-center gap-2 text-white">
            Submit Incident
            <Tooltip title="Upload a clear, recent photo for best analysis" placement="right">
              <InfoOutlinedIcon fontSize="small" className="opacity-70" />
            </Tooltip>
          </h2>
          <p className="text-sm md:text-base opacity-90 max-w-xl leading-relaxed text-slate-200">
            Provide a disaster image. Our transformer model will auto-detect type, severity & context. Location tagging improves response routing.
          </p>
        </div>
        <Chip icon={<CloudDoneIcon />} label={image ? 'Image Ready' : 'Awaiting Image'} color={image ? 'success' : 'default'} variant={image ? 'filled' : 'outlined'} sx={{ fontWeight: 600 }} />
      </div>

      <div className="text-white">
        <ImageUpload file={image} onChange={setImage} label="Drag & drop disaster image" />
      </div>

      <div className="flex flex-wrap items-center gap-10 justify-center md:justify-start pt-2">
  <ActionIcon icon={<AddPhotoAlternateIcon fontSize="inherit" />} label={image ? 'Change Image' : 'Add Image'} onClick={() => document.querySelector('#file-upload')?.click()} />
        <ActionIcon icon={<LocationOnIcon fontSize="inherit" />} label={loc.lat ? 'Update Location' : 'Use Location'} onClick={useLocation} color="secondary" />
        <ActionIcon icon={<RestartAltIcon fontSize="inherit" />} label="Reset" onClick={() => { setImage(null); setLoc({ lat: null, lng: null }); setSuccess(null) }} />
        <ActionIcon icon={<SendIcon fontSize="inherit" />} label={loading ? 'Sending...' : 'Send'} onClick={() => !loading && image && onSubmit(new Event('submit', { cancelable: true, bubbles: true }))} disabled={!image || loading} color="success" />
      </div>

  {loc.lat && <div className="text-xs uppercase tracking-wide opacity-80 text-slate-200">Location Locked: <span className="font-mono">{loc.lat.toFixed(4)}, {loc.lng.toFixed(4)}</span></div>}

      {loading && <LinearProgress />}

  {success && <div className="mt-2 p-4 rounded-lg bg-green-600/30 text-sm font-medium shadow-inner border border-green-500/40 text-white">{success}</div>}

      {/* Hidden real submit button for form semantics */}
      <button type="submit" className="hidden" aria-hidden="true" />

  <div className="absolute inset-0 -z-10 opacity-20 pointer-events-none" style={{ background: 'radial-gradient(circle at 20% 15%, #ef4444 0, transparent 55%), radial-gradient(circle at 85% 75%, #facc15 0, transparent 60%)' }} />
    </form>
  )
}
