## Link Demo
https://dashboard-sentimen.vercel.app/

## 🚀 Cara Menjalankan Proyek

### Prerequisites
- Node.js (versi 16 atau lebih tinggi)
- npm atau yarn package manager

### Instalasi dan Setup

1. **Clone repository**
   ```bash
   git clone <repository-url>
   cd dashboard-sentinel
   ```

2. **Install dependencies**
   ```bash
   npm install
   # atau
   yarn install
   ```

3. **Jalankan development server**
   ```bash
   npm run dev
   # atau
   yarn dev
   ```

4. **Buka browser**
   - Aplikasi akan berjalan di `http://localhost:5173`

### Build untuk Production

```bash
# Build aplikasi
npm run build

# Preview build production
npm run preview
```

## ✨ Fitur-fitur yang Tersedia

### 📈 Dashboard Overview
- **Statistik Total**: Menampilkan total data positif, netral, dan negatif
- **Persentase Distribusi**: Visualisasi persentase sentimen per kategori
- **Trend Indicators**: Indikator data dengan ikon dan warna

### 📊 Visualisasi Data
- **Chart Per Platform**: Bar chart untuk setiap platform media sosial
- **Interactive Charts**: Tooltip dan hover effects pada chart

### 📋 Tabel Data Sentimen
- **Sorting**: Pengurutan berdasarkan kolom (positive, neutral, negative, total)
- **Search**: Pencarian platform berdasarkan nama
- **Pagination**: Navigasi Data 

### 🔍 Fitur Pencarian dan Filter
- **Table Search**: Pencarian spesifik di tabel data
- **Sorting Options**: Pengurutan multi-kolom

## 🛠️ Teknologi yang Digunakan

### Frontend Framework
- **Vue.js 3**: Framework JavaScript progresif
- **TypeScript**: Type safety dan developer experience yang lebih baik
- **Vite**: Build tool yang cepat dan modern

### UI Libraries
- **Tailwind CSS**
- **DaisyUI**
- **Lucide Vue** 

### Chart Libraries
- **Chart.js**
- **vue-chartjs**

### State Management
- **Pinia**

### Development Tools
- **Prettier**: Code formatting
- **TypeScript**: Type checking

## 📁 Struktur Proyek

```
dashboard-sentinel/
├── src/
│   ├── components/
│   │   ├── ui/
│   │   │   ├── Chart.vue          # Komponen chart
│   │   │   ├── Table.vue          # Komponen tabel
│   │   │   ├── pagination.vue     # Komponen pagination
│   │   │   └── Skeleton.vue       # Loading skeleton
│   │   └── Nav.vue                # Navigation bar
│   ├── views/
│   │   └── Dashboard.vue          # Halaman utama dashboard
│   ├── stores/
│   │   └── sentimentStore.ts      # State management
│   ├── data/
│   │   └── response.json          # Data mock/API response
│   ├── router/
│   │   └── index.ts               # Vue router configuration
│   ├── style.css                  # Global styles
│   └── main.ts                    # Entry point
├── public/                        # Static assets
├── dist/                          # Build output
├── package.json                   # Dependencies
├── vite.config.ts                 # Vite configuration
├── tsconfig.json                  # TypeScript configuration
└── README.md                      # Documentation
```

## 🎯 Asumsi dan Catatan Teknis

### Data
- Data menggunakan format JSON bernama response.json di folder data

### Browser Support
- Chrome 
- Firefox 
- Safari
- Edge
