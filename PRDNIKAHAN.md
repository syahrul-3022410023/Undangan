# PRD — Wedding Invitation Scrapbook

## 1. Product Overview

Website undangan pernikahan digital dengan konsep **Interactive Scrapbook**.

Website tidak dibuat seperti undangan digital biasa yang hanya berisi section panjang, tetapi dibuat seperti pengguna sedang membuka dan mengikuti **album cerita perjalanan pasangan**.

Elemen visual utama:

- Foto polaroid
- Masking tape
- Kertas sobek
- Sticker dan doodle
- Tulisan tangan
- Paper texture
- Foto asli pasangan
- Animasi interaktif

---

## 2. Tujuan

Membuat undangan pernikahan yang:

- Personal dan terasa dibuat khusus untuk pasangan
- Memiliki pengalaman interaktif
- Memiliki visual seperti scrapbook atau album kenangan
- Tidak terlihat seperti template undangan biasa
- Tidak terlalu bergantung pada gambar AI
- Nyaman dibuka melalui mobile
- Memiliki animasi yang halus dan tidak berlebihan

---

## 3. Target User

- Keluarga
- Teman
- Kerabat
- Tamu undangan

### Platform Priority

**Mobile First**

Karena mayoritas pengguna akan membuka undangan melalui:

- WhatsApp
- Instagram
- Browser mobile

---

## 4. Tech Stack

### Core Stack

- Next.js
- TypeScript
- Tailwind CSS
- Framer Motion

### Optional Library

- GSAP → untuk animasi opening atau transisi kompleks
- Lenis → smooth scrolling

---

## 5. User Flow

```text
Link Undangan
      ↓
Opening Envelope
      ↓
Klik "Buka Undangan"
      ↓
Scrapbook Cover
      ↓
Welcome / Nama Pasangan
      ↓
Our Story
      ↓
Wedding Day
      ↓
Detail Acara
      ↓
Location
      ↓
Gallery
      ↓
RSVP / Ucapan
      ↓
Closing