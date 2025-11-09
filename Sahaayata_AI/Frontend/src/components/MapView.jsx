import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

// Simple map placeholder that positions markers by normalizing lat/lng
// In a real integration, use Google Maps JS API or @react-google-maps/api

function clamp(v, a, b) { return Math.max(a, Math.min(b, v)) }

export default function MapView({ reports = [], onMarkerClick }) {
  const containerRef = useRef(null)

  useEffect(() => {
    // animate markers on mount
    const ctx = gsap.context(() => {
      gsap.from('.marker', { scale: 0, opacity: 0, stagger: 0.08, duration: 0.5, ease: 'back.out(1.7)' })
    }, containerRef)
    return () => ctx.revert()
  }, [reports])

  // Very naive projection: map lat/lng ranges to percentages for demo
  const minLat = -90, maxLat = 90, minLng = -180, maxLng = 180

  return (
    <div ref={containerRef} className="map-surface p-4">
      {reports.map((r) => {
        const lat = Number(r.lat) || 0
        const lng = Number(r.lng) || 0
        const top = 100 - ((clamp(lat, minLat, maxLat) - minLat) / (maxLat - minLat)) * 100
        const left = ((clamp(lng, minLng, maxLng) - minLng) / (maxLng - minLng)) * 100
        const key = `m-${r.id}`
        return (
          <div key={key} className="marker" style={{ top: `${top}%`, left: `${left}%` }} onClick={() => onMarkerClick?.(r)}>
            <div className="pulse" />
            <div className="pin" title={`${r.type} • ${r.description}`} />
          </div>
        )
      })}
    </div>
  )
}
