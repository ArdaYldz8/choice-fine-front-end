export interface Brand {
  id: string;
  name: string;
  description: string;
  productCount: number;
  category: string;
  logoUrl?: string; // URL for actual logo
  logoPlaceholder?: string; // Fallback placeholder (initials)
  featured: boolean;
}

export const brands: Brand[] = [
  // Ana Markalar (Featured Brands)
  {
    id: "marmia",
    name: "MARMIA",
    description: "Baklava, tahini, zeytinyağı, baharat, bulgur",
    productCount: 85,
    category: "Ana Markalar",
    logoUrl: "/marmia-logo.png",
    logoPlaceholder: "MR",
    featured: true
  },
  {
    id: "moda",
    name: "MODA",
    description: "Pastane, et, peynir, dondurulmuş ürünler",
    productCount: 120,
    category: "Ana Markalar",
    logoUrl: "/moda-logo.webp",
    logoPlaceholder: "MD",
    featured: true
  },
  {
    id: "al-reef",
    name: "AL REEF",
    description: "Hurma, et ürünleri, ton balık, konserve, turşu, bakliyat",
    productCount: 95,
    category: "Konserve & Gıda",
    logoPlaceholder: "AR",
    featured: true
  },
  {
    id: "haribo",
    name: "HARIBO",
    description: "Helal şeker",
    productCount: 25,
    category: "Şeker & Tatlı",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Haribo_Logo.svg/512px-Haribo_Logo.svg.png",
    logoPlaceholder: "HB",
    featured: true
  },

  // A-B Markaları
  {
    id: "aahu-barah",
    name: "AAHU BARAH",
    description: "Basmati pirinç",
    productCount: 8,
    category: "Tahıl & Pirinç",
    logoPlaceholder: "AB",
    featured: true
  },
  {
    id: "abu-walad",
    name: "ABU WALAD",
    description: "Bisküvi",
    productCount: 6,
    category: "Bisküvi & Wafer",
    logoPlaceholder: "AW",
    featured: false
  },
  {
    id: "adonis",
    name: "ADONIS",
    description: "Za'atar baharat",
    productCount: 4,
    category: "Baharat & Sos",
    logoPlaceholder: "AD",
    featured: false
  },
  {
    id: "ahmad",
    name: "AHMAD",
    description: "Çay ürünleri",
    productCount: 15,
    category: "Çay & İçecek",
    logoUrl: "https://ahmadtea.my/wp-content/uploads/2023/02/ahmad-tea-logo.png",
    logoPlaceholder: "AH",
    featured: true
  },
  {
    id: "al-badawy",
    name: "AL BADAWY",
    description: "Hurma sirkesi",
    productCount: 6,
    category: "Sos & Baharat",
    logoPlaceholder: "ALB",
    featured: true
  },
  {
    id: "al-haloub",
    name: "AL HALOUB",
    description: "Peynir, tereyağı, et ürünleri",
    productCount: 45,
    category: "Süt & Et Ürünleri",
    logoPlaceholder: "ALH",
    featured: true
  },
  {
    id: "al-kanater",
    name: "AL KANATER",
    description: "Halva",
    productCount: 12,
    category: "Şeker & Tatlı",
    logoPlaceholder: "ALK",
    featured: true
  },
  {
    id: "al-safa",
    name: "AL SAFA",
    description: "Dondurulmuş samosa",
    productCount: 8,
    category: "Dondurulmuş Gıda",
    logoPlaceholder: "ALS",
    featured: true
  },
  {
    id: "angels-bakery",
    name: "ANGEL'S BAKERY",
    description: "Pita ekmeği",
    productCount: 5,
    category: "Fırın Ürünleri",
    logoPlaceholder: "AB",
    featured: true
  },
  {
    id: "apollo",
    name: "APOLLO",
    description: "Fillo hamuru",
    productCount: 6,
    category: "Hamur & Börek",
    logoPlaceholder: "AP",
    featured: true
  },
  {
    id: "arz",
    name: "ARZ",
    description: "Yoğurt, peynir",
    productCount: 18,
    category: "Süt Ürünleri",
    logoPlaceholder: "AR",
    featured: true
  },
  {
    id: "balconi",
    name: "BALCONI",
    description: "Bisküvi",
    productCount: 12,
    category: "Bisküvi & Wafer",
    logoPlaceholder: "BC",
    featured: true
  },
  {
    id: "barbican",
    name: "BARBICAN",
    description: "İçecek",
    productCount: 9,
    category: "İçecek",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Barbican_logo.svg/512px-Barbican_logo.svg.png",
    logoPlaceholder: "BB",
    featured: true
  },
  {
    id: "ca-garden",
    name: "CA GARDEN",
    description: "Konserve bakliyat",
    productCount: 22,
    category: "Konserve & Gıda",
    logoPlaceholder: "CG",
    featured: true
  },
  {
    id: "cortas",
    name: "CORTAS",
    description: "Gül suyu, nar ekşisi",
    productCount: 15,
    category: "Sos & Baharat",
    logoPlaceholder: "CO",
    featured: true
  },
  {
    id: "dairyland",
    name: "DAIRYLAND",
    description: "Peynir",
    productCount: 12,
    category: "Süt Ürünleri",
    logoPlaceholder: "DL",
    featured: true
  },
  {
    id: "dawn",
    name: "DAWN",
    description: "Paratha",
    productCount: 8,
    category: "Fırın Ürünleri",
    logoPlaceholder: "DW",
    featured: true
  },
  {
    id: "drink-palestina",
    name: "DRINK PALESTINA",
    description: "Gazlı içecek",
    productCount: 6,
    category: "İçecek",
    logoPlaceholder: "DP",
    featured: true
  },
  {
    id: "elledi",
    name: "ELLEDI",
    description: "Wafer",
    productCount: 10,
    category: "Bisküvi & Wafer",
    logoPlaceholder: "EL",
    featured: true
  },
  {
    id: "gharibian-farm",
    name: "GHARIBIAN FARM",
    description: "Peynir",
    productCount: 8,
    category: "Süt Ürünleri",
    logoPlaceholder: "GF",
    featured: true
  },
  {
    id: "greenland",
    name: "GREENLAND",
    description: "Baharat, zeytun, peynir",
    productCount: 65,
    category: "Baharat & Zeytun",
    logoPlaceholder: "GL",
    featured: true
  },
  {
    id: "gullon",
    name: "GULLON",
    description: "Bisküvi",
    productCount: 14,
    category: "Bisküvi & Wafer",
    logoUrl: "https://gullon.es/wp-content/themes/gullon/assets/img/logo_gullon_m.svg",
    logoPlaceholder: "GU",
    featured: true
  },
  {
    id: "hebas",
    name: "HEBA'S",
    description: "Dondurulmuş falafel",
    productCount: 5,
    category: "Dondurulmuş Gıda",
    logoPlaceholder: "HE",
    featured: true
  },
  {
    id: "indomie",
    name: "INDOMIE",
    description: "Hazır erişte",
    productCount: 12,
    category: "Erişte & Makarna",
    logoUrl: "https://indomie.ng/wp-content/uploads/2022/09/indomie-logo.png",
    logoPlaceholder: "ID",
    featured: true
  },
  {
    id: "karoun",
    name: "KAROUN",
    description: "Peynir",
    productCount: 15,
    category: "Süt Ürünleri",
    logoPlaceholder: "KA",
    featured: true
  },
  {
    id: "krinos",
    name: "KRINOS",
    description: "Bulgar peyniri",
    productCount: 18,
    category: "Süt Ürünleri",
    logoPlaceholder: "KR",
    featured: true
  },
  {
    id: "loacker",
    name: "LOACKER",
    description: "Wafer",
    productCount: 16,
    category: "Bisküvi & Wafer",
    logoUrl: "https://www.loacker.com/static/images/logo.svg",
    logoPlaceholder: "LK",
    featured: true
  },
  {
    id: "midamar",
    name: "MIDAMAR",
    description: "Helal et ürünleri",
    productCount: 28,
    category: "Et Ürünleri",
    logoPlaceholder: "MM",
    featured: true
  },
  {
    id: "mira",
    name: "MIRA",
    description: "Meyve suyu",
    productCount: 12,
    category: "İçecek",
    logoPlaceholder: "MI",
    featured: true
  },
  {
    id: "montana",
    name: "MONTANA",
    description: "Dondurulmuş sebze",
    productCount: 25,
    category: "Dondurulmuş Gıda",
    logoPlaceholder: "MT",
    featured: true
  },
  {
    id: "moussy",
    name: "MOUSSY",
    description: "Alkoholsüz bira",
    productCount: 8,
    category: "İçecek",
    logoPlaceholder: "MO",
    featured: true
  },
  {
    id: "najjar",
    name: "NAJJAR",
    description: "Kahve",
    productCount: 15,
    category: "Kahve",
    logoPlaceholder: "NJ",
    featured: true
  },
  {
    id: "noon",
    name: "NOON",
    description: "Jello, krema, baharat",
    productCount: 18,
    category: "Tatlı & Baharat",
    logoPlaceholder: "NN",
    featured: true
  },
  {
    id: "tria",
    name: "TRIA",
    description: "Kuskus, erişte",
    productCount: 12,
    category: "Erişte & Makarna",
    logoPlaceholder: "TR",
    featured: true
  },
  {
    id: "vimto",
    name: "VIMTO",
    description: "İçecek",
    productCount: 6,
    category: "İçecek",
    logoPlaceholder: "VI",
    featured: true
  },
  
  // Ek Markalar (A-F devamı)
  {
    id: "al-ameed",
    name: "AL AMEED",
    description: "Kahve",
    productCount: 8,
    category: "Çay & Kahve",
    logoPlaceholder: "AA",
    featured: false
  },
  {
    id: "al-afia",
    name: "AL AFIA",
    description: "Asma yaprağı",
    productCount: 5,
    category: "Konserve & Gıda",
    logoPlaceholder: "AF",
    featured: false
  },
  {
    id: "al-ghazal",
    name: "AL GHAZAL",
    description: "Tereyağı/ghee",
    productCount: 6,
    category: "Süt Ürünleri",
    logoPlaceholder: "AG",
    featured: false
  },
  {
    id: "al-ghazaleen",
    name: "AL GHAZALEEN",
    description: "Çay",
    productCount: 10,
    category: "Çay & Kahve",
    logoPlaceholder: "AG",
    featured: false
  },
  {
    id: "al-kamaria",
    name: "AL KAMARIA",
    description: "Ghee",
    productCount: 4,
    category: "Süt Ürünleri",
    logoPlaceholder: "AK",
    featured: false
  },
  {
    id: "al-kbous",
    name: "AL KBOUS",
    description: "Çay",
    productCount: 5,
    category: "Çay & Kahve",
    logoPlaceholder: "AK",
    featured: false
  },
  {
    id: "al-khar",
    name: "AL KHAR",
    description: "Tahin, halva",
    productCount: 8,
    category: "Şeker & Tatlı",
    logoPlaceholder: "AK",
    featured: false
  },
  {
    id: "al-madina",
    name: "AL MADINA",
    description: "Hurma",
    productCount: 6,
    category: "Kuru Meyve",
    logoPlaceholder: "AM",
    featured: false
  },
  {
    id: "al-momtaz",
    name: "AL MOMTAZ",
    description: "Evaporated milk",
    productCount: 3,
    category: "Süt Ürünleri",
    logoPlaceholder: "AM",
    featured: false
  },
  {
    id: "al-qasr",
    name: "AL QASR",
    description: "Zeytinyağı, turşu",
    productCount: 12,
    category: "Zeytinyağı & Turşu",
    logoPlaceholder: "AQ",
    featured: false
  },
  {
    id: "al-ragawi",
    name: "AL RAGAWI",
    description: "Çemen baharat",
    productCount: 4,
    category: "Baharat & Sos",
    logoPlaceholder: "AR",
    featured: false
  },
  {
    id: "al-samir",
    name: "AL SAMIR",
    description: "Çekirdek",
    productCount: 8,
    category: "Kuruyemiş",
    logoPlaceholder: "AS",
    featured: false
  },
  {
    id: "al-shark",
    name: "AL SHARK",
    description: "Ton balık, sardalya, et ürünleri",
    productCount: 25,
    category: "Konserve & Gıda",
    logoPlaceholder: "AS",
    featured: false
  },
  {
    id: "al-shifa",
    name: "AL SHIFA",
    description: "Bal",
    productCount: 6,
    category: "Bal & Reçel",
    logoPlaceholder: "AS",
    featured: false
  },
  {
    id: "al-suhagy",
    name: "AL SUHAGY",
    description: "Bakliyat, buğday",
    productCount: 15,
    category: "Tahıl & Bakliyat",
    logoPlaceholder: "AS",
    featured: false
  },
  {
    id: "al-thahap",
    name: "AL THAHAP",
    description: "Tamerhind şurubu",
    productCount: 3,
    category: "İçecek",
    logoPlaceholder: "AT",
    featured: false
  },
  {
    id: "al-wazah",
    name: "AL WAZAH",
    description: "Çay",
    productCount: 8,
    category: "Çay & Kahve",
    logoPlaceholder: "AW",
    featured: false
  },
  {
    id: "ali-baba",
    name: "ALI BABA",
    description: "Wafer",
    productCount: 10,
    category: "Bisküvi & Wafer",
    logoPlaceholder: "AB",
    featured: false
  },
  {
    id: "alvand",
    name: "ALVAND",
    description: "Küp şeker",
    productCount: 4,
    category: "Şeker & Tatlı",
    logoPlaceholder: "AL",
    featured: false
  },
  {
    id: "alya",
    name: "ALYA",
    description: "Hurma",
    productCount: 6,
    category: "Kuru Meyve",
    logoPlaceholder: "AL",
    featured: false
  },
  {
    id: "aman",
    name: "AMAN",
    description: "Samosa yaprakları",
    productCount: 4,
    category: "Hamur & Börek",
    logoPlaceholder: "AM",
    featured: false
  },
  {
    id: "ammar",
    name: "AMMAR",
    description: "Baharat, nar ekşisi",
    productCount: 12,
    category: "Baharat & Sos",
    logoPlaceholder: "AM",
    featured: false
  },
  {
    id: "antebella",
    name: "ANTEBELLA",
    description: "Antep fıstığı kreması",
    productCount: 5,
    category: "Şeker & Tatlı",
    logoPlaceholder: "AN",
    featured: false
  },
  {
    id: "ara-z",
    name: "ARA-Z",
    description: "Dondurulmuş ekmek",
    productCount: 8,
    category: "Dondurulmuş Gıda",
    logoPlaceholder: "AZ",
    featured: false
  },
  {
    id: "asateer",
    name: "ASATEER",
    description: "Karışık baklava",
    productCount: 6,
    category: "Şeker & Tatlı",
    logoPlaceholder: "AS",
    featured: false
  },
  {
    id: "aseel",
    name: "ASEEL",
    description: "Bitkisel ghee",
    productCount: 5,
    category: "Süt Ürünleri",
    logoPlaceholder: "AS",
    featured: false
  },
  {
    id: "ashour",
    name: "ASHOUR",
    description: "Turşu",
    productCount: 8,
    category: "Zeytinyağı & Turşu",
    logoPlaceholder: "AS",
    featured: false
  },
  {
    id: "ata",
    name: "ATA",
    description: "Dondurulmuş mantı",
    productCount: 4,
    category: "Dondurulmuş Gıda",
    logoPlaceholder: "AT",
    featured: false
  },
  {
    id: "athena",
    name: "ATHENA",
    description: "Asma yaprağı",
    productCount: 6,
    category: "Konserve & Gıda",
    logoPlaceholder: "AT",
    featured: false
  },
  {
    id: "azul",
    name: "AZUL",
    description: "Hindistan cevizi suyu",
    productCount: 3,
    category: "İçecek",
    logoPlaceholder: "AZ",
    featured: false
  },
  {
    id: "balca",
    name: "BALCA",
    description: "Zeytinyağı",
    productCount: 5,
    category: "Zeytinyağı & Turşu",
    logoPlaceholder: "BC",
    featured: false
  },
  {
    id: "baraka",
    name: "BARAKA",
    description: "Kavun çekirdeği, konserve et",
    productCount: 8,
    category: "Konserve & Gıda",
    logoPlaceholder: "BK",
    featured: false
  },
  {
    id: "barmaki",
    name: "BARMAKI",
    description: "Baklava, kurabiye",
    productCount: 10,
    category: "Şeker & Tatlı",
    logoPlaceholder: "BM",
    featured: false
  },
  {
    id: "baroody",
    name: "BAROODY",
    description: "Turşu, asma yaprağı, kuru nane",
    productCount: 15,
    category: "Zeytinyağı & Turşu",
    logoPlaceholder: "BY",
    featured: false
  },
  {
    id: "basak",
    name: "BASAK",
    description: "Kuru nane",
    productCount: 4,
    category: "Baharat & Sos",
    logoPlaceholder: "BS",
    featured: false
  },
  {
    id: "beirut",
    name: "BEIRUT",
    description: "Tamarind şurubu, humus",
    productCount: 8,
    category: "Konserve & Gıda",
    logoPlaceholder: "BT",
    featured: false
  },
  {
    id: "beypazari",
    name: "BEYPAZARI",
    description: "Maden suyu",
    productCount: 6,
    category: "İçecek",
    logoPlaceholder: "BP",
    featured: false
  },
  {
    id: "bon-o-bon",
    name: "BON-O-BON",
    description: "Şeker",
    productCount: 4,
    category: "Şeker & Tatlı",
    logoPlaceholder: "BB",
    featured: false
  },
  {
    id: "botany",
    name: "BOTANY",
    description: "Isot biber",
    productCount: 3,
    category: "Baharat & Sos",
    logoPlaceholder: "BT",
    featured: false
  },
  {
    id: "bounty",
    name: "BOUNTY",
    description: "Çikolata",
    productCount: 5,
    category: "Şeker & Tatlı",
    logoPlaceholder: "BY",
    featured: false
  },
  {
    id: "byblos",
    name: "BYBLOS",
    description: "Lebni",
    productCount: 4,
    category: "Süt Ürünleri",
    logoPlaceholder: "BY",
    featured: false
  },
  
  // C-F Markaları
  {
    id: "cadbury",
    name: "CADBURY",
    description: "Çikolata",
    productCount: 12,
    category: "Şeker & Tatlı",
    logoPlaceholder: "CD",
    featured: false
  },
  {
    id: "carabao",
    name: "CARABAO",
    description: "Enerji içeceği",
    productCount: 5,
    category: "İçecek",
    logoPlaceholder: "CB",
    featured: false
  },
  {
    id: "castania",
    name: "CASTANIA",
    description: "Çekirdek",
    productCount: 15,
    category: "Kuruyemiş",
    logoPlaceholder: "CS",
    featured: false
  },
  {
    id: "caykur",
    name: "CAYKUR",
    description: "Türk çayı",
    productCount: 20,
    category: "Çay & Kahve",
    logoPlaceholder: "CK",
    featured: false
  },
  {
    id: "crunchy-nuts",
    name: "CRUNCHY NUTS",
    description: "Karışık kuruyemiş",
    productCount: 12,
    category: "Kuruyemiş",
    logoPlaceholder: "CN",
    featured: false
  },
  {
    id: "cruz-de-malta",
    name: "CRUZ DE MALTA",
    description: "Yerba mate",
    productCount: 6,
    category: "Çay & Kahve",
    logoPlaceholder: "CM",
    featured: false
  },
  {
    id: "damavand",
    name: "DAMAVAND",
    description: "Yoğurt",
    productCount: 8,
    category: "Süt Ürünleri",
    logoPlaceholder: "DM",
    featured: false
  },
  {
    id: "dettol",
    name: "DETTOL",
    description: "Sabun, dezenfektan",
    productCount: 10,
    category: "Temizlik",
    logoPlaceholder: "DT",
    featured: false
  },
  {
    id: "didi",
    name: "DIDI",
    description: "Türk buzlu çayı",
    productCount: 6,
    category: "İçecek",
    logoPlaceholder: "DD",
    featured: false
  },
  {
    id: "do-ghazal",
    name: "DO GHAZAL",
    description: "Çay",
    productCount: 15,
    category: "Çay & Kahve",
    logoPlaceholder: "DG",
    featured: false
  },
  {
    id: "el-arosa",
    name: "EL AROSA",
    description: "Çay",
    productCount: 8,
    category: "Çay & Kahve",
    logoPlaceholder: "EA",
    featured: false
  },
  {
    id: "el-bawady",
    name: "EL BAWADY",
    description: "Siyah bal",
    productCount: 4,
    category: "Bal & Reçel",
    logoPlaceholder: "EB",
    featured: false
  },
  {
    id: "el-doha",
    name: "EL DOHA",
    description: "Mısır pirinci",
    productCount: 8,
    category: "Tahıl & Pirinç",
    logoPlaceholder: "ED",
    featured: false
  },
  {
    id: "fatir",
    name: "FATIR",
    description: "Dondurulmuş hamur",
    productCount: 5,
    category: "Dondurulmuş Gıda",
    logoPlaceholder: "FT",
    featured: false
  },
  {
    id: "fayoumi",
    name: "FAYOUMI",
    description: "Peynir",
    productCount: 6,
    category: "Süt Ürünleri",
    logoPlaceholder: "FY",
    featured: false
  },
  {
    id: "ferrero",
    name: "FERRERO",
    description: "Çikolata (Kinder, Nutella)",
    productCount: 25,
    category: "Şeker & Tatlı",
    logoUrl: "https://logos-world.net/wp-content/uploads/2020/09/Ferrero-Logo.png",
    logoPlaceholder: "FR",
    featured: false
  },
  {
    id: "fersan",
    name: "FERSAN",
    description: "Üzüm sirkesi",
    productCount: 4,
    category: "Baharat & Sos",
    logoPlaceholder: "FS",
    featured: false
  },
  {
    id: "fide",
    name: "FIDE",
    description: "Közlenmiş patlıcan",
    productCount: 5,
    category: "Konserve & Gıda",
    logoPlaceholder: "FD",
    featured: false
  },
  {
    id: "fine-meze",
    name: "FINE MEZE",
    description: "Asma yaprağı, hazır yemek",
    productCount: 12,
    category: "Konserve & Gıda",
    logoPlaceholder: "FM",
    featured: false
  },
  {
    id: "fish-avenue",
    name: "FISH AVENUE",
    description: "Dondurulmuş balık",
    productCount: 18,
    category: "Dondurulmuş Gıda",
    logoPlaceholder: "FA",
    featured: false
  },
  
  // G-M Markaları
  {
    id: "galaxy",
    name: "GALAXY",
    description: "Çikolata",
    productCount: 8,
    category: "Şeker & Tatlı",
    logoPlaceholder: "GX",
    featured: false
  },
  {
    id: "ginseng",
    name: "GINSENG",
    description: "Enerji içeceği",
    productCount: 5,
    category: "İçecek",
    logoPlaceholder: "GS",
    featured: false
  },
  {
    id: "gopi",
    name: "GOPI",
    description: "Lassi",
    productCount: 6,
    category: "İçecek",
    logoPlaceholder: "GP",
    featured: false
  },
  {
    id: "gural",
    name: "GURAL",
    description: "Türk kahvesi takımı",
    productCount: 10,
    category: "Mutfak Eşyası",
    logoPlaceholder: "GR",
    featured: false
  },
  {
    id: "hakan",
    name: "HAKAN",
    description: "Toprak tava",
    productCount: 5,
    category: "Mutfak Eşyası",
    logoPlaceholder: "HK",
    featured: false
  },
  {
    id: "halayeb",
    name: "HALAYEB",
    description: "Peynir",
    productCount: 12,
    category: "Süt Ürünleri",
    logoPlaceholder: "HL",
    featured: false
  },
  {
    id: "halwani",
    name: "HALWANI",
    description: "Mamul",
    productCount: 8,
    category: "Şeker & Tatlı",
    logoPlaceholder: "HW",
    featured: false
  },
  {
    id: "hana",
    name: "HANA",
    description: "Süt ürünleri",
    productCount: 10,
    category: "Süt Ürünleri",
    logoPlaceholder: "HN",
    featured: false
  },
  {
    id: "harissa-du-cap-bon",
    name: "HARISSA DU CAP BON",
    description: "Harissa",
    productCount: 5,
    category: "Baharat & Sos",
    logoPlaceholder: "HC",
    featured: false
  },
  {
    id: "kdd",
    name: "KDD",
    description: "Krema, süt",
    productCount: 12,
    category: "Süt Ürünleri",
    logoPlaceholder: "KD",
    featured: false
  },
  {
    id: "kinder",
    name: "KINDER",
    description: "Çikolata",
    productCount: 15,
    category: "Şeker & Tatlı",
    logoPlaceholder: "KI",
    featured: false
  },
  {
    id: "kiri",
    name: "KIRI",
    description: "Peynir",
    productCount: 8,
    category: "Süt Ürünleri",
    logoPlaceholder: "KI",
    featured: false
  },
  {
    id: "kizilay",
    name: "KIZILAY",
    description: "Maden suyu",
    productCount: 6,
    category: "İçecek",
    logoPlaceholder: "KZ",
    featured: false
  },
  {
    id: "knorr",
    name: "KNORR",
    description: "Baharat, bulyon",
    productCount: 15,
    category: "Baharat & Sos",
    logoPlaceholder: "KN",
    featured: false
  },
  {
    id: "komagene",
    name: "KOMAGENE",
    description: "Çiğ köfte",
    productCount: 5,
    category: "Hazır Yemek",
    logoPlaceholder: "KM",
    featured: false
  },
  {
    id: "kraft",
    name: "KRAFT",
    description: "Peynir",
    productCount: 10,
    category: "Süt Ürünleri",
    logoPlaceholder: "KF",
    featured: false
  },
  {
    id: "kral",
    name: "KRAL",
    description: "Güllac",
    productCount: 4,
    category: "Şeker & Tatlı",
    logoPlaceholder: "KR",
    featured: false
  },
  {
    id: "lipton",
    name: "LIPTON",
    description: "Çay",
    productCount: 20,
    category: "Çay & Kahve",
    logoUrl: "https://logos-world.net/wp-content/uploads/2020/04/Lipton-Logo.png",
    logoPlaceholder: "LP",
    featured: false
  },
  {
    id: "luxury",
    name: "LUXURY",
    description: "Krema fudge",
    productCount: 6,
    category: "Şeker & Tatlı",
    logoPlaceholder: "LX",
    featured: false
  },
  {
    id: "maggi",
    name: "MAGGI",
    description: "Bulyon",
    productCount: 8,
    category: "Baharat & Sos",
    logoPlaceholder: "MG",
    featured: false
  },
  {
    id: "mahmood",
    name: "MAHMOOD",
    description: "Pirinç",
    productCount: 6,
    category: "Tahıl & Pirinç",
    logoPlaceholder: "MH",
    featured: false
  },
  {
    id: "malawy",
    name: "MALAWY",
    description: "Peynir",
    productCount: 8,
    category: "Süt Ürünleri",
    logoPlaceholder: "ML",
    featured: false
  },
  {
    id: "maltesers",
    name: "MALTESERS",
    description: "Çikolata",
    productCount: 6,
    category: "Şeker & Tatlı",
    logoPlaceholder: "MT",
    featured: false
  },
  {
    id: "marca",
    name: "MARCA",
    description: "İçecek, baharat, turşu",
    productCount: 15,
    category: "Konserve & Gıda",
    logoPlaceholder: "MC",
    featured: false
  },
  {
    id: "marmarabirlik",
    name: "MARMARABIRLIK",
    description: "Zeytin",
    productCount: 12,
    category: "Zeytinyağı & Turşu",
    logoPlaceholder: "MB",
    featured: false
  },
  {
    id: "marolivo",
    name: "MAROLIVO",
    description: "Karışık yağ",
    productCount: 8,
    category: "Zeytinyağı & Turşu",
    logoPlaceholder: "MO",
    featured: false
  },
  {
    id: "mars",
    name: "MARS",
    description: "Çikolata",
    productCount: 10,
    category: "Şeker & Tatlı",
    logoPlaceholder: "MR",
    featured: false
  },
  {
    id: "mcvities",
    name: "MCVITIES",
    description: "Bisküvi",
    productCount: 8,
    category: "Bisküvi & Wafer",
    logoPlaceholder: "MV",
    featured: false
  },
  {
    id: "mehmet-efendi",
    name: "MEHMET EFENDI",
    description: "Türk kahvesi",
    productCount: 12,
    category: "Çay & Kahve",
    logoPlaceholder: "ME",
    featured: false
  },
  {
    id: "merve",
    name: "MERVE",
    description: "Pastırma, sucuk",
    productCount: 10,
    category: "Et Ürünleri",
    logoPlaceholder: "MV",
    featured: false
  },
  {
    id: "mid-east",
    name: "MID EAST",
    description: "Turşu",
    productCount: 8,
    category: "Zeytinyağı & Turşu",
    logoPlaceholder: "MD",
    featured: false
  },
  {
    id: "mirinda",
    name: "MIRINDA",
    description: "Gazlı içecek",
    productCount: 6,
    category: "İçecek",
    logoPlaceholder: "MR",
    featured: false
  },
  {
    id: "misko",
    name: "MISKO",
    description: "Fide makarna",
    productCount: 8,
    category: "Erişte & Makarna",
    logoPlaceholder: "MS",
    featured: false
  },
  {
    id: "mission",
    name: "MISSION",
    description: "İraklı içecek",
    productCount: 5,
    category: "İçecek",
    logoPlaceholder: "MS",
    featured: false
  },
  {
    id: "mosul",
    name: "MOSUL",
    description: "Kubba, kebap",
    productCount: 15,
    category: "Dondurulmuş Gıda",
    logoPlaceholder: "MO",
    featured: false
  },
  {
    id: "mr-nut",
    name: "MR. NUT",
    description: "Kuruyemiş",
    productCount: 20,
    category: "Kuruyemiş",
    logoPlaceholder: "MN",
    featured: false
  },
  {
    id: "mukalla",
    name: "MUKALLA",
    description: "Ton balık",
    productCount: 8,
    category: "Konserve & Gıda",
    logoPlaceholder: "MK",
    featured: false
  },
  {
    id: "mumtaz",
    name: "MUMTAZ",
    description: "Çay",
    productCount: 10,
    category: "Çay & Kahve",
    logoPlaceholder: "MM",
    featured: false
  },
  
  // N-Z Markaları  
  {
    id: "nazus",
    name: "NAZU'S",
    description: "Persiyanlı çay",
    productCount: 8,
    category: "Çay & Kahve",
    logoPlaceholder: "NZ",
    featured: false
  },
  {
    id: "nemah",
    name: "NEMAH",
    description: "Siyah bal",
    productCount: 5,
    category: "Bal & Reçel",
    logoPlaceholder: "NM",
    featured: false
  },
  {
    id: "nescafe",
    name: "NESCAFE",
    description: "Kahve",
    productCount: 15,
    category: "Çay & Kahve",
    logoUrl: "https://logos-world.net/wp-content/uploads/2020/09/Nescafe-Logo.png",
    logoPlaceholder: "NC",
    featured: false
  },
  {
    id: "nestle",
    name: "NESTLE",
    description: "Çikolata",
    productCount: 20,
    category: "Şeker & Tatlı",
    logoUrl: "https://logos-world.net/wp-content/uploads/2020/04/Nestle-Logo.png",
    logoPlaceholder: "NS",
    featured: false
  },
  {
    id: "nido",
    name: "NIDO",
    description: "Süt tozu",
    productCount: 6,
    category: "Süt Ürünleri",
    logoPlaceholder: "ND",
    featured: false
  },
  {
    id: "nour",
    name: "NOUR",
    description: "Bakliyat, hibiskus",
    productCount: 15,
    category: "Tahıl & Bakliyat",
    logoPlaceholder: "NR",
    featured: false
  },
  {
    id: "oncu",
    name: "ONCU",
    description: "Zeytin",
    productCount: 12,
    category: "Zeytinyağı & Turşu",
    logoPlaceholder: "ON",
    featured: false
  },
  {
    id: "orlando",
    name: "ORLANDO",
    description: "Asma yaprağı",
    productCount: 8,
    category: "Konserve & Gıda",
    logoPlaceholder: "OR",
    featured: false
  },
  {
    id: "pasabahce",
    name: "PASABAHCE",
    description: "Çay bardağı",
    productCount: 15,
    category: "Mutfak Eşyası",
    logoPlaceholder: "PB",
    featured: false
  },
  {
    id: "payna",
    name: "PAYNA",
    description: "Tek porsiyon baklava",
    productCount: 6,
    category: "Şeker & Tatlı",
    logoPlaceholder: "PY",
    featured: false
  },
  {
    id: "penguen",
    name: "PENGUEN",
    description: "Reçel",
    productCount: 12,
    category: "Bal & Reçel",
    logoPlaceholder: "PG",
    featured: false
  },
  {
    id: "pepsi",
    name: "PEPSI",
    description: "İraklı kola",
    productCount: 8,
    category: "İçecek",
    logoUrl: "https://logos-world.net/wp-content/uploads/2020/09/Pepsi-Logo.png",
    logoPlaceholder: "PP",
    featured: false
  },
  {
    id: "pindos",
    name: "PINDOS",
    description: "Hellim peyniri",
    productCount: 6,
    category: "Süt Ürünleri",
    logoPlaceholder: "PN",
    featured: false
  },
  {
    id: "puck",
    name: "PUCK",
    description: "Krema, krem peynir",
    productCount: 10,
    category: "Süt Ürünleri",
    logoPlaceholder: "PU",
    featured: false
  },
  {
    id: "quality-street",
    name: "QUALITY STREET",
    description: "Çikolata",
    productCount: 8,
    category: "Şeker & Tatlı",
    logoPlaceholder: "QS",
    featured: false
  },
  {
    id: "queen",
    name: "QUEEN",
    description: "Turşu",
    productCount: 10,
    category: "Zeytinyağı & Turşu",
    logoPlaceholder: "QU",
    featured: false
  },
  {
    id: "reef",
    name: "REEF",
    description: "Konserve, turşu, bakliyat, şeker",
    productCount: 45,
    category: "Konserve & Gıda",
    logoPlaceholder: "RF",
    featured: false
  },
  {
    id: "rodopa",
    name: "RODOPA",
    description: "Bulgar peyniri",
    productCount: 8,
    category: "Süt Ürünleri",
    logoPlaceholder: "RD",
    featured: false
  },
  {
    id: "royal-bengal-tiger",
    name: "ROYAL BENGAL TIGER",
    description: "Pirinç",
    productCount: 6,
    category: "Tahıl & Pirinç",
    logoPlaceholder: "RB",
    featured: false
  },
  {
    id: "rukak-al-salam",
    name: "RUKAK AL SALAM",
    description: "Ekmek",
    productCount: 4,
    category: "Fırın Ürünleri",
    logoPlaceholder: "RS",
    featured: false
  },
  {
    id: "sadaf",
    name: "SADAF",
    description: "Persiyanlı ürünler (pirinç, baharat, çay)",
    productCount: 35,
    category: "Çeşitli",
    logoPlaceholder: "SF",
    featured: false
  },
  {
    id: "sahtein",
    name: "SAHTEIN",
    description: "Mercimek",
    productCount: 8,
    category: "Tahıl & Bakliyat",
    logoPlaceholder: "SH",
    featured: false
  },
  {
    id: "salah-el-din",
    name: "SALAH EL DIN",
    description: "Susam",
    productCount: 6,
    category: "Kuruyemiş",
    logoPlaceholder: "SD",
    featured: false
  },
  {
    id: "salam",
    name: "SALAM",
    description: "Samosa yaprakları",
    productCount: 5,
    category: "Hamur & Börek",
    logoPlaceholder: "SL",
    featured: false
  },
  {
    id: "sarikiz",
    name: "SARIKIZ",
    description: "Maden suyu",
    productCount: 10,
    category: "İçecek",
    logoPlaceholder: "SK",
    featured: false
  },
  {
    id: "schweppes",
    name: "SCHWEPPES",
    description: "Gazlı içecek",
    productCount: 15,
    category: "İçecek",
    logoUrl: "https://logos-world.net/wp-content/uploads/2020/09/Schweppes-Logo.png",
    logoPlaceholder: "SW",
    featured: false
  },
  {
    id: "selam",
    name: "SELAM",
    description: "Baklava",
    productCount: 8,
    category: "Şeker & Tatlı",
    logoPlaceholder: "SL",
    featured: false
  },
  {
    id: "shahia",
    name: "SHAHIA",
    description: "Kuru incir",
    productCount: 6,
    category: "Kuru Meyve",
    logoPlaceholder: "SH",
    featured: false
  },
  {
    id: "shan",
    name: "SHAN",
    description: "Baharat karışımları",
    productCount: 20,
    category: "Baharat & Sos",
    logoPlaceholder: "SN",
    featured: false
  },
  {
    id: "shani",
    name: "SHANI",
    description: "İçecek",
    productCount: 5,
    category: "İçecek",
    logoPlaceholder: "SN",
    featured: false
  },
  {
    id: "shirin-yashas",
    name: "SHIRIN YASHA'S",
    description: "Zülbiye, bamya tatlısı",
    productCount: 8,
    category: "Şeker & Tatlı",
    logoPlaceholder: "SY",
    featured: false
  },
  {
    id: "sinalco",
    name: "SINALCO",
    description: "İraklı gazlı içecek",
    productCount: 8,
    category: "İçecek",
    logoPlaceholder: "SC",
    featured: false
  },
  {
    id: "siro",
    name: "SIRO",
    description: "Digestive bisküvi",
    productCount: 6,
    category: "Bisküvi & Wafer",
    logoPlaceholder: "SR",
    featured: false
  },
  {
    id: "sirma",
    name: "SIRMA",
    description: "Maden suyu",
    productCount: 8,
    category: "İçecek",
    logoPlaceholder: "SM",
    featured: false
  },
  {
    id: "snickers",
    name: "SNICKERS",
    description: "Çikolata",
    productCount: 8,
    category: "Şeker & Tatlı",
    logoUrl: "https://logos-world.net/wp-content/uploads/2020/09/Snickers-Logo.png",
    logoPlaceholder: "SN",
    featured: false
  },
  {
    id: "sogol",
    name: "SOGOL",
    description: "Kuru limon",
    productCount: 4,
    category: "Baharat & Sos",
    logoPlaceholder: "SG",
    featured: false
  },
  {
    id: "spysi",
    name: "SPYSI",
    description: "Baharat karışımları",
    productCount: 15,
    category: "Baharat & Sos",
    logoPlaceholder: "SP",
    featured: false
  },
  {
    id: "suhagy",
    name: "SUHAGY",
    description: "Bakliyat",
    productCount: 12,
    category: "Tahıl & Bakliyat",
    logoPlaceholder: "SG",
    featured: false
  },
  {
    id: "sun",
    name: "SUN",
    description: "Gazlı içecek",
    productCount: 6,
    category: "İçecek",
    logoPlaceholder: "SU",
    featured: false
  },
  {
    id: "tamek",
    name: "TAMEK",
    description: "Domates salçası",
    productCount: 8,
    category: "Konserve & Gıda",
    logoPlaceholder: "TM",
    featured: false
  },
  {
    id: "tayas",
    name: "TAYAS",
    description: "Şeker",
    productCount: 12,
    category: "Şeker & Tatlı",
    logoPlaceholder: "TY",
    featured: false
  },
  {
    id: "tehmar",
    name: "TEHMAR",
    description: "Nar sosu, zeytinyağı",
    productCount: 10,
    category: "Baharat & Sos",
    logoPlaceholder: "TH",
    featured: false
  },
  {
    id: "tik-tik",
    name: "TIK TIK",
    description: "Hazır koşari",
    productCount: 5,
    category: "Hazır Yemek",
    logoPlaceholder: "TT",
    featured: false
  },
  {
    id: "tiger",
    name: "TIGER",
    description: "Cips",
    productCount: 8,
    category: "Kuruyemiş",
    logoPlaceholder: "TG",
    featured: false
  },
  {
    id: "toblerone",
    name: "TOBLERONE",
    description: "Çikolata",
    productCount: 6,
    category: "Şeker & Tatlı",
    logoUrl: "https://logos-world.net/wp-content/uploads/2020/09/Toblerone-Logo.png",
    logoPlaceholder: "TB",
    featured: false
  },
  {
    id: "tyj",
    name: "TYJ",
    description: "Spring roll",
    productCount: 4,
    category: "Dondurulmuş Gıda",
    logoPlaceholder: "TJ",
    featured: false
  },
  {
    id: "ulker",
    name: "ULKER",
    description: "Bisküvi, çikolata",
    productCount: 30,
    category: "Bisküvi & Wafer",
    logoPlaceholder: "UK",
    featured: false
  },
  {
    id: "uludag",
    name: "ULUDAG",
    description: "Gazoz",
    productCount: 8,
    category: "İçecek",
    logoPlaceholder: "UD",
    featured: false
  },
  {
    id: "valbreso",
    name: "VALBRESO",
    description: "Peynir",
    productCount: 6,
    category: "Süt Ürünleri",
    logoPlaceholder: "VB",
    featured: false
  },
  {
    id: "vegie-turk",
    name: "VEGIE TURK",
    description: "Dondurulmuş sebze",
    productCount: 15,
    category: "Dondurulmuş Gıda",
    logoPlaceholder: "VT",
    featured: false
  },
  {
    id: "vegeta",
    name: "VEGETA",
    description: "Baharat",
    productCount: 8,
    category: "Baharat & Sos",
    logoPlaceholder: "VG",
    featured: false
  },
  {
    id: "vitrac",
    name: "VITRAC",
    description: "Konsantre meyve suyu",
    productCount: 10,
    category: "İçecek",
    logoPlaceholder: "VT",
    featured: false
  },
  {
    id: "wellmade",
    name: "WELLMADE",
    description: "Çiçek balı",
    productCount: 6,
    category: "Bal & Reçel",
    logoPlaceholder: "WM",
    featured: false
  },
  {
    id: "yoruksut",
    name: "YORUKSUT",
    description: "Kaymak",
    productCount: 5,
    category: "Süt Ürünleri",
    logoPlaceholder: "YS",
    featured: false
  },
  {
    id: "zam-zam",
    name: "ZAM ZAM",
    description: "Su",
    productCount: 3,
    category: "İçecek",
    logoPlaceholder: "ZZ",
    featured: false
  },
  {
    id: "zalloum",
    name: "ZALLOUM",
    description: "Sıvı jameed",
    productCount: 4,
    category: "Süt Ürünleri",
    logoPlaceholder: "ZL",
    featured: false
  },
  {
    id: "ziyad",
    name: "ZIYAD",
    description: "Çeşitli gıda ürünleri",
    productCount: 40,
    category: "Çeşitli",
    logoPlaceholder: "ZY",
    featured: false
  },
  {
    id: "zwan",
    name: "ZWAN",
    description: "Tavuk jambon",
    productCount: 8,
    category: "Et Ürünleri",
    logoPlaceholder: "ZW",
    featured: false
  }
];

export const featuredBrands = brands.filter(brand => brand.featured);
export const allBrands = brands;

// Category groupings
export const brandsByCategory = brands.reduce((acc, brand) => {
  if (!acc[brand.category]) {
    acc[brand.category] = [];
  }
  acc[brand.category].push(brand);
  return acc;
}, {} as Record<string, Brand[]>); 