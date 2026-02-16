# Mediz.id - Website Kesehatan Ibu & Bayi

Website profesional untuk layanan homecare ibu dan bayi dengan sistem pricing dinamis per wilayah.

## 🚀 Fitur Utama

### 1. Dynamic Pricing System
- Harga otomatis berubah sesuai wilayah (Jakarta-Tangerang / Surabaya-Malang)
- Modal pemilihan lokasi muncul otomatis untuk first-time visitor
- Harga tersembunyi (Rp 0) sebelum user memilih lokasi
- Pilihan lokasi tersimpan di localStorage

### 2. Layanan
- Paket Pendampingan Persalinan (3 paket)
- Paket Perawatan Bayi Baru Lahir (10 paket)
- Mom Care & Baby Treatment (10 layanan)
- Kelas Privat (Senam Hamil, Menyusui, MPASI, Prenatal Yoga)

### 3. Navigation
- Semua menu dropdown terkoneksi dengan section yang sesuai
- Smooth scrolling
- Mobile responsive dengan hamburger menu

### 4. Direct WhatsApp Booking
- Semua tombol booking langsung redirect ke WhatsApp
- Tidak ada form kompleks, lebih personal dan cepat

## 📁 Struktur File

### Core Files
- `index.html` - Halaman utama
- `styles.css` - Styling utama
- `script.js` - JavaScript utama

### Pricing System
- `pricing-data.js` - Data harga per wilayah
- `pricing-script.js` - Logic dynamic pricing
- `pricing-styles.css` - Styling pricing sections

### Assets
- `images/` - Folder untuk semua gambar
  - `logo.jpg` - Logo Mediz.id
  - `hero-mother-baby.jpg` - Hero image
  - `senbumil.png`, `busui.jpg`, `mpasi.png`, `bumilyoga.png` - Class images
  - `instruktor1.jpeg` - Instructor photo
  - `testimonial1.jpeg`, `testimonial3.jpeg` - Testimonial photos

## 🧪 Testing

### Clear localStorage untuk testing:
```javascript
// Buka Console (F12), jalankan:
localStorage.removeItem('selectedRegion')
// Lalu refresh halaman
```

### Atau gunakan Incognito Mode:
- Chrome: `Ctrl + Shift + N`
- Firefox: `Ctrl + Shift + P`

## 🎯 Quick Start

1. Buka `index.html` di browser
2. Modal pemilihan lokasi akan muncul (jika first visit)
3. Pilih lokasi → Harga akan update otomatis
4. Semua tombol booking mengarah ke WhatsApp

## 📞 Contact

WhatsApp: https://wa.link/q0zct5

---

**Status:** Production Ready ✅
**Last Updated:** 16 Februari 2026
