export const knownYouTubeIds: Record<string, { videoId: string; confidence: number; note?: string }> = {
  '1': { videoId: 'y47LgoRtQmY', confidence: 0.95, note: 'A Bird on the Wing #1' },
  '2': { videoId: 's-o-1s5K2xA', confidence: 0.80, note: 'A Bird on the Wing #2' },
  '3': { videoId: 'rEZ7FKpfG8Q', confidence: 0.85, note: 'A Bird on the Wing #3 | The Witness Within' },
  '4': { videoId: '7IZulhCis1k', confidence: 0.85, note: 'A Bird on the Wing #4 | The Empty Boat' },
  '5': { videoId: 'nIHByJxzQpc', confidence: 0.85, note: 'A Bird on the Wing #5' },
  '6': { videoId: 'uEHuZjykLy0', confidence: 0.85, note: 'A Bird on the Wing #6 | The Witness…' },
  '7': { videoId: 'iahwRhFyaIc', confidence: 0.80, note: 'Secret of True Freedom (A Bird on the Wing)' },
  '8': { videoId: 'NxVPSJTEtwg', confidence: 0.85, note: 'A Bird on the Wing #8' },
  '9': { videoId: 'M8EfTk8Ep88', confidence: 0.85, note: 'A Bird on the Wing #9 | The Golden Path' },
  '10': { videoId: 'fXeKNPq12Bw', confidence: 0.95, note: 'A Bird on the Wing #10 | Midnight Sky & Zen Silence' },
  '11': { videoId: 'HY9aw5cQRDQ', confidence: 0.85, note: 'Greatest Courage (Sufis series)' },
  '12': { videoId: 'MM3VopzjC1k', confidence: 0.95, note: 'Tantra: The Way of Acceptance' },
  '15': { videoId: 'bzxcT4PNysk', confidence: 0.90, note: 'Zen: The Path of Paradox Vol.3' },
  // ID 13 (साक्षी रहो / अमृत अनुभव): not found on YouTube or any public repository
  // ID 14 (प्रेम ही परम धर्म / प्रेम का प्रवेश): not found on YouTube or any public repository
}

export const seriesYouTubeIds: Record<string, { videoId: string; confidence: number; note?: string }> = {
  'a-bird-on-the-wing-01-11': { videoId: 'y47LgoRtQmY', confidence: 0.95, note: 'A Bird on the Wing #1' },
}
