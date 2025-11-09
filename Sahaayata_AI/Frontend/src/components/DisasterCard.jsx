import React from 'react'

export default function DisasterCard({ report }) {
  const color = report.severity === 'critical' ? 'bg-red-600' : report.severity === 'high' ? 'bg-amber-500' : 'bg-yellow-400'
  return (
    <div className="p-3 mb-2 rounded card-bg flex items-start gap-3">
      <div className={`w-3 h-10 rounded ${color}`} />
      <div>
        <div className="text-sm text-gray-300">{report.type} • <span className="muted">{new Date(report.timestamp).toLocaleString()}</span></div>
        <div className="font-semibold">{report.description}</div>
        <div className="text-xs muted">Lat: {report.lat ?? 'N/A'} Lng: {report.lng ?? 'N/A'}</div>
      </div>
    </div>
  )
}
