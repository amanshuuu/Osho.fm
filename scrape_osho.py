#!/usr/bin/env python3
"""
Osho Discourse Scraper — Archive.org JSON API
Fetches the complete file listing from Archive.org metadata API and builds discourses.json
"""
import os, sys, json, re, urllib.parse
from typing import Dict, List, Optional
import requests

LANG_MAP = {
    "SOUNDS OF SILENCE": "english", "ZEN": "english", "TANTRA": "english",
    "YOGA": "english", "BUDDHA": "english", "SUFISM": "english",
    "BHAGWAD GITA": "english", "KABIR": "english", "VEDANTA": "english",
    "UPANISHAD": "english", "SHIVA SUTRA": "english", "HINDUISM": "english",
    "GURDJIEFF": "english", "NIRVANA": "english", "MEDITATION": "english",
    "WESTERN MISTICS": "english", "PHILOSOPHIA": "english", "KUNDALINI": "english",
    "ZEN AND ZEN MASTERS": "english",
    "HINDI": "hindi", "HINDI / OSHO": "hindi",
}

def format_duration(seconds: float) -> str:
    if not seconds or seconds <= 0: return "1h 00m"
    total_min = int(seconds // 60)
    h = total_min // 60
    m = total_min % 60
    return f"{h}h {m:02d}m" if h else f"{m}m"

def infer_language(genre: str, path: str) -> str:
    if genre:
        g = genre.strip().upper()
        if g in LANG_MAP: return LANG_MAP[g]
    return "hindi" if "/Hindi/" in path else "english"

def extract_series_from_path(path: str) -> str:
    parts = path.split("/")
    if len(parts) < 3: return "Unknown"
    series_dir = parts[-2]
    series = re.sub(r'\s*[\u2013-]\s*Osho\s*World\s*$', '', series_dir)
    series = re.sub(r'\s*\d+-\d+\s*$', '', series).strip()
    series = re.sub(r'^\d+-', '', series).strip()
    return series or series_dir

COLLECTION_ID = "osho-audio-discourses-collection"
BASE_CDN = f"https://archive.org/download/{COLLECTION_ID}"

def scrape_all() -> List[Dict]:
    print("Fetching metadata from Archive.org...")
    url = f"https://archive.org/metadata/{COLLECTION_ID}"
    r = requests.get(url, headers={"User-Agent": "OshoScraper/1.0"}, timeout=120)
    r.raise_for_status()
    data = r.json()
    files = data.get("files", [])
    print(f"Total files in collection: {len(files)}")

    discourses = []
    seen = set()

    for f in files:
        name = f.get("name", "")
        source = f.get("source", "")
        fmt = f.get("format", "")
        if source != "original" or not name.endswith(".mp3"): continue

        album = f.get("album", "")
        track_str = f.get("track", "")
        track_num = int(track_str) if track_str and track_str.isdigit() else 0
        if not track_num:
            base = os.path.splitext(os.path.basename(name))[0]
            digits = re.findall(r'_(\d+)$', base)
            track_num = int(digits[0]) if digits else 0

        title = (f.get("title") or "").strip()
        if not title:
            title = os.path.splitext(os.path.basename(name))[0]
            title = title.replace("OSHO-", "").replace("_", " ").strip()

        series = (album or extract_series_from_path(name)).strip()
        genre = (f.get("genre") or "").strip()
        language = infer_language(genre, name)
        duration_sec = float(f.get("length", 0)) if f.get("length") else 0
        comment = (f.get("comment") or "").strip()
        size_bytes = int(f.get("size", 0)) if f.get("size") else 0

        series_slug = re.sub(r'[^a-zA-Z0-9]+', '-', series.lower()).strip('-')[:40]
        disc_id = f"{series_slug}-{track_num:03d}" if track_num else f"{series_slug}-{len(discourses)+1}"

        key = f"{series}|{track_num}"
        if key in seen: continue
        seen.add(key)

        disc = {
            "id": disc_id,
            "title": title,
            "series": series,
            "seriesSlug": series_slug,
            "trackNumber": track_num,
            "duration": format_duration(duration_sec),
            "durationSeconds": int(duration_sec),
            "category": genre.title() if genre else "Meditation",
            "tags": [],
            "mood": [],
            "thumbnail": urllib.parse.quote(f"{BASE_CDN}/{name.replace('.mp3', '.png')}", safe=":/"),
            "gradient": "",
            "audioUrl": urllib.parse.quote(f"{BASE_CDN}/{name}", safe=":/"),
            "date": "",
            "language": language,
            "description": comment if comment else (f"{series} — Discourse {track_num}" if track_num else series),
            "summary": "",
            "highlights": [],
            "chapters": [],
            "listenCount": 0,
            "speaker": "Osho",
            "size": size_bytes,
        }
        discourses.append(disc)

    return discourses

def merge_curated(scraped: List[Dict], curated_path: str) -> List[Dict]:
    """Merge curated 15 items with rich metadata into scraped data."""
    if not os.path.exists(curated_path): return scraped
    
    import importlib.util, importlib.machinery
    # Read the TS file and extract discourses array with regex
    with open(curated_path, "r", encoding="utf-8") as f:
        ts_content = f.read()
    
    # Find the discourses array
    m = re.search(r'export const discourses: Discourse\[\] = (\[.*?\]);', ts_content, re.DOTALL)
    if not m:
        # Try without trailing semicolon
        m = re.search(r'export const discourses: Discourse\[\] = (\[.*\])', ts_content, re.DOTALL)
    if not m:
        print("Could not find discourses array in data.ts")
        return scraped
    
    # Replace Discourse[], single-quote tags, and trailing commas
    array_str = m.group(1)
    array_str = re.sub(r'as Discourse\[\]', '', array_str)
    array_str = re.sub(r',\s*\]', ']', array_str)
    
    try:
        curated = json.loads(array_str)
    except json.JSONDecodeError as e:
        print(f"Failed to parse curated data: {e}")
        return scraped

    print(f"Parsed {len(curated)} curated discourses")
    
    merged = list(scraped)
    lookup = {}
    for d in merged:
        key = f"{d.get('series', '')}|{d.get('trackNumber', 0)}"
        lookup[key] = d
    
    for c in curated:
        key = f"{c.get('series', '')}|{c.get('trackNumber', 0)}"
        existing = lookup.get(key)
        if existing:
            # Keep scraped audioUrl, overlay rich metadata
            rich = {k: v for k, v in c.items() if k != 'audioUrl'}
            existing.update(rich)
            if not existing.get('audioUrl') or existing['audioUrl'] == '':
                existing['audioUrl'] = c.get('audioUrl', '')
        else:
            merged.append(c)
    
    return merged

def save_json(discourses: List[Dict], filepath: str):
    os.makedirs(os.path.dirname(filepath), exist_ok=True)
    with open(filepath, "w", encoding="utf-8") as f:
        json.dump(discourses, f, indent=2, ensure_ascii=False)
    print(f"Saved {len(discourses)} discourses to {filepath}")

def main():
    print("=" * 60)
    print("Osho Discourse Scraper — Archive.org")
    print("=" * 60)
    
    script_dir = os.path.dirname(os.path.abspath(__file__))
    
    discourses = scrape_all()
    if not discourses:
        print("No discourses found!")
        return

    # Merge curated rich metadata
    curated_path = os.path.join(script_dir, "src", "lib", "data.ts")
    if os.path.exists(curated_path):
        discourses = merge_curated(discourses, curated_path)
    
    english = sum(1 for d in discourses if d.get("language") == "english")
    hindi = sum(1 for d in discourses if d.get("language") == "hindi")
    print(f"\nTotal: {len(discourses)} (English: {english}, Hindi: {hindi})")
    
    save_json(discourses, os.path.join(script_dir, "public", "discourses.json"))
    print("Done!")

if __name__ == "__main__":
    main()
