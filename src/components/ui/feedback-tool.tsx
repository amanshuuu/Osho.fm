'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Pin, X, MessageSquare, ClipboardList, Download, Trash2 } from 'lucide-react'

interface PinEntry {
  id: string
  url: string
  selector: string
  text: string
  timestamp: number
  note: string
}

function getSelector(el: Element): string {
  if (el.id) return `#${el.id}`
  let path = ''
  let current: Element | null = el
  while (current && current !== document.body) {
    let tag = current.tagName.toLowerCase()
    if (current.id) { path = `#${current.id}`; break }
    const parent: Element | null = current.parentElement
    if (parent) {
      const siblings = Array.from(parent.children).filter(c => c.tagName === current!.tagName)
      if (siblings.length > 1) {
        const idx = siblings.indexOf(current) + 1
        tag += `:nth-child(${idx})`
      }
    }
    path = path ? `${tag} > ${path}` : tag
    current = parent
  }
  return path
}

const STORAGE_KEY = 'ohos_feedback_pins'

export function FeedbackTool() {
  const [pins, setPins] = useState<PinEntry[]>([])
  const [pinMode, setPinMode] = useState(false)
  const [panelOpen, setPanelOpen] = useState(false)
  const [selectedEl, setSelectedEl] = useState<{ selector: string; text: string } | null>(null)
  const [note, setNote] = useState('')

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) try { setPins(JSON.parse(stored)) } catch {}
  }, [])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(pins))
  }, [pins])

  const handleMouseOver = useCallback((e: MouseEvent) => {
    if (!pinMode) return
    const target = e.target as HTMLElement
    if (target.closest('[data-feedback-tool]')) return
    document.querySelectorAll('.feedback-highlight').forEach(el => el.remove())
    const rect = target.getBoundingClientRect()
    const overlay = document.createElement('div')
    overlay.className = 'feedback-highlight'
    overlay.style.cssText = `position:fixed;pointer-events:none;z-index:9998;border:2px dashed #7A1A2E;background:rgba(122,26,46,0.08);border-radius:4px;transition:all 0.1s;top:${rect.top}px;left:${rect.left}px;width:${rect.width}px;height:${rect.height}px`
    document.body.appendChild(overlay)
  }, [pinMode])

  const handleClick = useCallback((e: MouseEvent) => {
    if (!pinMode) return
    const target = e.target as HTMLElement
    if (target.closest('[data-feedback-tool]')) return
    e.preventDefault()
    e.stopPropagation()
    const selector = getSelector(target)
    const text = target.textContent?.trim().slice(0, 100) || ''
    setSelectedEl({ selector, text })
    setNote('')
    document.querySelectorAll('.feedback-highlight').forEach(el => el.remove())
  }, [pinMode])

  useEffect(() => {
    if (pinMode) {
      document.addEventListener('mouseover', handleMouseOver)
      document.addEventListener('click', handleClick, true)
      document.body.style.cursor = 'crosshair'
    } else {
      document.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('click', handleClick, true)
      document.querySelectorAll('.feedback-highlight').forEach(el => el.remove())
      document.body.style.cursor = ''
    }
    return () => {
      document.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('click', handleClick, true)
      document.querySelectorAll('.feedback-highlight').forEach(el => el.remove())
      document.body.style.cursor = ''
    }
  }, [pinMode, handleMouseOver, handleClick])

  const savePin = () => {
    if (!selectedEl) return
    const entry: PinEntry = {
      id: Date.now().toString(36),
      url: window.location.pathname,
      selector: selectedEl.selector,
      text: selectedEl.text,
      timestamp: Date.now(),
      note,
    }
    setPins(prev => [entry, ...prev])
    setSelectedEl(null)
    setNote('')
    setPinMode(false)
  }

  const deletePin = (id: string) => {
    setPins(prev => prev.filter(p => p.id !== id))
  }

  const exportPins = () => {
    const text = JSON.stringify(pins, null, 2)
    navigator.clipboard.writeText(text).then(() => {
      alert('Pins copied to clipboard as JSON')
    })
  }

  const clearPins = () => {
    if (confirm('Delete all pinned issues?')) setPins([])
  }

  return (
    <div data-feedback-tool className="fixed bottom-24 right-4 z-50 flex flex-col items-end gap-2">
      {panelOpen && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className="bg-white rounded-2xl shadow-xl border border-[#E5DED4]/60 w-80 max-h-96 flex flex-col overflow-hidden"
        >
          <div className="flex items-center justify-between px-4 py-3 border-b border-[#E5DED4]/40">
            <span className="text-xs font-semibold text-[#1A1A1A] flex items-center gap-1.5">
              <ClipboardList className="w-3.5 h-3.5" />
              Pinned Issues ({pins.length})
            </span>
            <div className="flex items-center gap-1">
              {pins.length > 0 && (
                <>
                  <button onClick={exportPins} className="p-1 rounded-lg hover:bg-[#F8F5F0] transition-colors" title="Copy as JSON">
                    <Download className="w-3.5 h-3.5 text-[#7A6B5D]" />
                  </button>
                  <button onClick={clearPins} className="p-1 rounded-lg hover:bg-[#F8F5F0] transition-colors" title="Delete all">
                    <Trash2 className="w-3.5 h-3.5 text-[#7A6B5D]" />
                  </button>
                </>
              )}
              <button onClick={() => setPanelOpen(false)} className="p-1 rounded-lg hover:bg-[#F8F5F0] transition-colors">
                <X className="w-3.5 h-3.5 text-[#7A6B5D]" />
              </button>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            {pins.length === 0 ? (
              <p className="text-xs text-[#7A6B5D] text-center py-6">No issues pinned yet</p>
            ) : (
              pins.map(p => (
                <div key={p.id} className="p-2.5 rounded-xl bg-[#F8F5F0]/60 border border-[#E5DED4]/30 text-xs">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0 flex-1">
                      <p className="font-mono text-[10px] text-[#7A6B5D] truncate">{p.url}</p>
                      <p className="text-[#1A1A1A] font-medium truncate mt-0.5">{p.text || '(no text)'}</p>
                      <p className="text-[#7A6B5D] mt-0.5">{p.note || '(no note)'}</p>
                      <p className="text-[10px] text-[#7A6B5D]/60 mt-1 font-mono">{p.selector}</p>
                    </div>
                    <button onClick={() => deletePin(p.id)} className="p-1 rounded-lg hover:bg-[#E5DED4]/60 transition-colors shrink-0">
                      <X className="w-3 h-3 text-[#7A6B5D]" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </motion.div>
      )}

      {selectedEl && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className="bg-white rounded-2xl shadow-xl border border-[#E5DED4]/60 w-80 p-4"
        >
          <p className="text-xs font-medium text-[#1A1A1A] mb-2">Pin issue</p>
          <p className="text-[10px] font-mono text-[#7A6B5D] mb-1 truncate">{selectedEl.selector}</p>
          <p className="text-xs text-[#7A6B5D] mb-3 truncate">&ldquo;{selectedEl.text}&rdquo;</p>
          <textarea
            value={note}
            onChange={e => setNote(e.target.value)}
            placeholder="What's wrong? (optional)"
            className="w-full text-xs p-2.5 rounded-xl bg-[#F8F5F0] border border-[#E5DED4]/50 resize-none mb-3 focus:outline-none focus:border-[#7A6B5D]/40"
            rows={2}
          />
          <div className="flex items-center gap-2">
            <button onClick={savePin} className="flex-1 text-xs py-2 rounded-full bg-[#7A1A2E] text-white font-medium hover:bg-[#9C2D42] transition-colors">
              Save Pin
            </button>
            <button onClick={() => { setSelectedEl(null); setPinMode(true) }} className="flex-1 text-xs py-2 rounded-full bg-[#F8F5F0] text-[#7A6B5D] font-medium hover:bg-[#E5DED4] transition-colors">
              Re-pick
            </button>
          </div>
        </motion.div>
      )}

      <div className="flex items-center gap-2">
        {pinMode && (
          <motion.span initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }}
            className="text-[10px] text-[#7A1A2E] font-medium bg-white px-3 py-1.5 rounded-full shadow-sm border border-[#E5DED4]/40"
          >
            Click any element to pin
          </motion.span>
        )}
        <button
          onClick={() => { setPinMode(!pinMode); setSelectedEl(null) }}
          className={`w-10 h-10 rounded-full shadow-lg flex items-center justify-center transition-all ${
            pinMode ? 'bg-[#7A1A2E] text-white scale-110' : 'bg-white text-[#7A6B5D] hover:bg-[#F8F5F0] border border-[#E5DED4]/40'
          }`}
          title="Pin an issue"
        >
          <Pin className="w-4 h-4" />
        </button>
      </div>

      <button
        onClick={() => setPanelOpen(!panelOpen)}
        className="w-10 h-10 rounded-full bg-white shadow-lg border border-[#E5DED4]/40 flex items-center justify-center hover:bg-[#F8F5F0] transition-all"
        title="View pinned issues"
      >
        <MessageSquare className="w-4 h-4 text-[#7A6B5D]" />
      </button>
    </div>
  )
}
