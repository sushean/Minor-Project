import React, { useRef, useState, useEffect } from 'react'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'

export default function ImageUpload({ file, onChange, label = 'Upload image' }) {
  const dropRef = useRef(null)
  const [preview, setPreview] = useState(null)
  const [dragOver, setDragOver] = useState(false)

  useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file)
      setPreview(url)
      return () => URL.revokeObjectURL(url)
    } else {
      setPreview(null)
    }
  }, [file])

  const onDrop = (e) => {
    e.preventDefault()
    setDragOver(false)
    const f = e.dataTransfer.files?.[0]
    if (f && f.type.startsWith('image/')) onChange?.(f)
  }
  const onDragOver = (e) => { e.preventDefault(); setDragOver(true) }
  const onDragLeave = () => setDragOver(false)

  const onPick = (e) => {
    const f = e.target.files?.[0]
    if (f && f.type.startsWith('image/')) onChange?.(f)
  }

  const clear = () => onChange?.(null)

  return (
    <div>
      <div
        ref={dropRef}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        className={`rounded-lg border-2 ${dragOver ? 'border-yellow-400' : 'border-white/10'} border-dashed p-6 text-center transition-colors card-bg`}
      >
        {!preview ? (
          <div className="flex flex-col items-center gap-2 text-slate-200">
            <CloudUploadIcon className="text-yellow-400" fontSize="large" />
            <div className="text-sm opacity-80">{label} — drag & drop or click</div>
            <label className="mt-2 cursor-pointer inline-block px-4 py-2 rounded bg-white/10 hover:bg-white/20">
              Choose file
              <input id="file-upload" type="file" accept="image/*" className="hidden" onChange={onPick} />
            </label>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <img src={preview} alt="preview" className="h-28 w-28 object-cover rounded" />
            <div className="text-left">
              <div className="text-sm">{file?.name}</div>
              <button type="button" className="mt-2 inline-flex items-center gap-1 text-red-400 hover:text-red-300" onClick={clear}>
                <DeleteOutlineIcon fontSize="small" /> Remove
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
