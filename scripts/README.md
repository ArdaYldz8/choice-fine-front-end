# 📸 Image Upload Guide

Bu rehber, ürün görsellerini Supabase Storage'ye yüklemek için gereken adımları açıklar.

## 🚀 Hızlı Başlangıç

### 1. Environment Variables Ayarlama

`.env` dosyanızda şu değişkenlerin olduğundan emin olun:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key
VITE_SUPABASE_SERVICE_KEY=your_service_role_key
```

⚠️ **Önemli:** `VITE_SUPABASE_SERVICE_KEY` yükleme işlemi için gereklidir.

### 2. Görsel Klasör Yapısını Hazırlama

Görselleriniz şu yapıda organize edilmelidir:

```
Website Images/
├── Bakery/
│   ├── acma_chocolate.jpeg
│   ├── araz_lavash.jpg
│   └── ...
├── Spices/
│   ├── adonis_aleppo.jpg
│   ├── baharat_jug.webp
│   └── ...
├── Nuts/
│   ├── castania_pumpkin.jpg
│   ├── al_samir_seeds.jpg
│   └── ...
└── ...
```

### 3. Görselleri Yükleme

Terminal'de şu komutu çalıştırın:

```bash
npm run upload-images
```

## 📁 Kategori Eşleştirmeleri

| Klasör Adı | Veritabanı Kategorisi | Storage Yolu |
|------------|----------------------|-------------|
| Bakery | BAKERY | `bakery/` |
| Candy | CANDY | `candy/` |
| Spices | SPICES | `spices/` |
| Nuts | NUTS | `nuts/` |
| Olives & Olives Oils | OLIVES | `olives/` |
| Tea & Coffee | TEA | `tea/` |
| Meat Products | MEAT | `meat/` |
| Pasta | PASTA | `pasta/` |
| Sauces | SAUCES | `sauces/` |
| Snacks | SNACKS | `snacks/` |
| Sweets | SWEETS | `sweets/` |
| Yogurt Products | YOGURT | `yogurt/` |
| Kitchen | KITCHEN | `kitchen/` |
| Pickles | PICKLES | `pickles/` |
| Ready to Eat | READY TO EAT | `ready-to-eat/` |
| Foodservice | FOODSERVICE | `foodservice/` |

## 🔍 Görsel Eşleştirme Sistemi

Sistem, ürün adlarını görsel dosya adlarıyla otomatik olarak eşleştirir:

### Eşleştirme Stratejileri:

1. **Tam Eşleşme**: `"Aleppo Pepper"` → `aleppo-pepper.jpg`
2. **Kısmi Eşleşme**: `"Adonis Aleppo Spice"` → `adonis-aleppo.jpg`
3. **Marka Eşleştirme**: `"Castania Nuts"` → `castania-pumpkin.jpg`
4. **Kelime Eşleştirme**: Önemli kelimeler üzerinden arama

### Dosya Adı Kuralları:

- Küçük harfler kullanılır
- Boşluklar tire (-) ile değiştirilir
- Özel karakterler kaldırılır
- Örnek: `"Al-Samir Seeds"` → `al-samir-seeds.jpg`

## 🛠️ Teknik Detaylar

### Desteklenen Formatlar:
- `.jpg`, `.jpeg`
- `.png`
- `.webp`
- `.gif`

### Dosya Boyutu Limiti:
- Maksimum 5MB per dosya

### Bucket Ayarları:
- **Bucket Adı**: `product-images`
- **Public Access**: Aktif
- **Folder Structure**: `category/filename.ext`

## 📊 Upload İstatistikleri

Script çalıştıktan sonra şu bilgileri görürsünüz:

```
🎉 Upload Summary:
   ✅ Successfully uploaded: 125 images
   ❌ Errors: 2

🔗 Your images are now available at:
   https://your-project.supabase.co/storage/v1/object/public/product-images/[category]/[filename]
```

## 🐛 Troubleshooting

### Hata: "Missing Supabase environment variables"
- `.env` dosyasında `VITE_SUPABASE_SERVICE_KEY` olduğundan emin olun

### Hata: "Images directory not found"
- `Website Images` klasörünün doğru yerde olduğunu kontrol edin
- Script'teki `imagesDir` yolunu güncelleyin

### Hata: "Bucket already exists"
- Bu normal bir durumdur, script devam edecektir

### Görsel Eşleşmiyor
- Dosya adlarının ürün adlarıyla benzer olduğundan emin olun
- Marka adlarını ve önemli kelimeleri dosya adına ekleyin

## 🔄 Yeniden Yükleme

Aynı dosyayı tekrar yüklerseniz, mevcut dosya güncellenecektir (`upsert: true`).

## 📞 Yardım

Sorun yaşıyorsanız:
1. Terminal çıktısını kontrol edin
2. Supabase Dashboard'da Storage bölümünü kontrol edin
3. Browser Console'da hata mesajlarını kontrol edin

---

**Not**: İlk yükleme işlemi görsel sayısına bağlı olarak 5-15 dakika sürebilir. 