'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, X, Copy, Check, QrCode, CreditCard } from 'lucide-react'

const SUPPORT_CONFIG = {
  upiId: 'your-upi-id@oksbi',
  upiName: 'Osho.fm',
  paypalUrl: '',
}

function getUpiUrl(amount?: number) {
  let url = `upi://pay?pa=${encodeURIComponent(SUPPORT_CONFIG.upiId)}&pn=${encodeURIComponent(SUPPORT_CONFIG.upiName)}&cu=INR`
  if (amount) url += `&am=${amount}`
  return url
}

function getQrUrl(amount?: number) {
  const data = getUpiUrl(amount)
  return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(data)}&bgcolor=FDFCF9&color=1A1A1A`
}

interface SupportModalProps {
  open: boolean
  onClose: () => void
}

export function SupportModal({ open, onClose }: SupportModalProps) {
  const [copied, setCopied] = useState(false)
  const [amount, setAmount] = useState('')

  const handleCopy = async () => {
    await navigator.clipboard.writeText(SUPPORT_CONFIG.upiId)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const presetAmounts = [100, 200, 500, 1000]

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', duration: 0.5 }}
            onClick={e => e.stopPropagation()}
            className="w-full max-w-sm bg-white rounded-2xl shadow-strong relative overflow-hidden"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-[#F8F5F0] flex items-center justify-center hover:bg-[#F0ECE6] transition-colors"
            >
              <X className="w-4 h-4 text-[#7A6B5D]" />
            </button>

            <div className="p-6 pb-4 text-center border-b border-[#E5DED4]/30">
              <div className="w-14 h-14 rounded-full bg-[#7A1A2E]/10 flex items-center justify-center mx-auto mb-3">
                <Heart className="w-6 h-6 text-[#7A1A2E]" />
              </div>
              <h3 className="text-lg font-semibold text-[#1A1A1A] mb-1">Support Osho.fm</h3>
              <p className="text-sm text-[#7A6B5D] leading-relaxed">
                A volunteer-run project. Your support keeps 5,000+ discourses free for everyone.
              </p>
            </div>

            <div className="p-6 space-y-5">
              <div className="text-center">
                <p className="text-xs text-[#7A6B5D] mb-3 font-medium uppercase tracking-wider">Scan to Pay via UPI</p>
                <div className="inline-block p-3 bg-white rounded-2xl border border-[#E5DED4]/40 shadow-sm">
                  <img
                    src={getQrUrl(amount ? parseInt(amount) : undefined)}
                    alt={`UPI QR code for ${SUPPORT_CONFIG.upiId}`}
                    width={180}
                    height={180}
                    className="rounded-lg"
                  />
                </div>
              </div>

              <div>
                <p className="text-xs text-[#7A6B5D] mb-2 font-medium text-center">Or pay to UPI ID</p>
                <div className="flex items-center gap-2 p-3 rounded-xl bg-[#F8F5F0] border border-[#E5DED4]/40">
                  <QrCode className="w-4 h-4 text-[#7A6B5D] shrink-0" />
                  <span className="text-sm font-mono font-medium text-[#1A1A1A] flex-1 truncate">
                    {SUPPORT_CONFIG.upiId}
                  </span>
                  <button
                    onClick={handleCopy}
                    className="shrink-0 p-2 rounded-lg hover:bg-[#E5DED4]/40 transition-colors active:scale-95"
                    aria-label="Copy UPI ID"
                  >
                    {copied ? (
                      <Check className="w-4 h-4 text-green-600" />
                    ) : (
                      <Copy className="w-4 h-4 text-[#7A6B5D]" />
                    )}
                  </button>
                </div>
                {copied && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-xs text-green-600 text-center mt-1.5"
                  >
                    UPI ID copied!
                  </motion.p>
                )}
              </div>

              <div>
                <p className="text-xs text-[#7A6B5D] mb-2 font-medium text-center">Optional amount</p>
                <div className="grid grid-cols-4 gap-2 mb-2">
                  {presetAmounts.map(a => (
                    <button
                      key={a}
                      onClick={() => setAmount(String(a))}
                      className={`py-2 rounded-xl text-xs font-medium transition-all active:scale-95 ${
                        amount === String(a)
                          ? 'bg-[#7A1A2E] text-white shadow-sm'
                          : 'bg-[#F8F5F0] text-[#7A6B5D] hover:bg-[#E5DED4]/60'
                      }`}
                    >
                      ₹{a}
                    </button>
                  ))}
                </div>
                <input
                  type="number"
                  value={amount}
                  onChange={e => setAmount(e.target.value)}
                  placeholder="Custom amount (₹)"
                  className="w-full text-sm px-4 py-2.5 rounded-xl bg-[#F8F5F0] border border-[#E5DED4]/40 text-[#1A1A1A] placeholder:text-[#7A6B5D]/40 focus:outline-none focus:border-[#7A1A2E]/30"
                />
              </div>

              {SUPPORT_CONFIG.paypalUrl && (
                <a
                  href={SUPPORT_CONFIG.paypalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-[#0070BA] text-white text-sm font-medium hover:bg-[#005ea6] transition-colors active:scale-[0.98]"
                >
                  <CreditCard className="w-4 h-4" />
                  Donate via PayPal
                </a>
              )}

              <p className="text-[11px] text-[#7A6B5D]/50 text-center">
                Thank you for your generosity.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
