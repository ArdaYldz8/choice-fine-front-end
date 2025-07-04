import { useState, useEffect } from "react";
import { Search, Filter, Package, Badge, ShoppingCart, Eye, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useProducts } from "../hooks/useProducts";
import { supabase, type Product } from "../lib/supabase";

// Brand interface
interface Brand {
  id: string;
  name: string;
  description: string;
  category: string;
  productCount: number;
  isExclusive?: boolean;
}

// Brands data based on CSV analysis
const brands: Brand[] = [
  // Exclusive Brands
  {
    id: 'marmia',
    name: 'MARMIA',
    description: 'Premium Mediterranean foods including honey, oils, grains, and traditional specialties. North Carolina\'s exclusive distributor.',
    category: 'Exclusive Brands',
    productCount: 20,
    isExclusive: true
  },
  {
    id: 'moda',
    name: 'MODA',
    description: 'Authentic Turkish cuisine featuring baklava, cheese, doner, pastries, and traditional sweets. North Carolina\'s exclusive distributor.',
    category: 'Exclusive Brands',
    productCount: 129,
    isExclusive: true
  },

  // Major Brands (50+ products)
  {
    id: 'greenland',
    name: 'GREENLAND',
    description: 'Comprehensive spice collection, herbs, seeds, and Middle Eastern seasonings for authentic flavors.',
    category: 'Spices & Seasonings',
    productCount: 141
  },
  {
    id: 'reef',
    name: 'REEF',
    description: 'Premium Middle Eastern foods including rice, dates, pickles, juices, and traditional specialties.',
    category: 'Middle Eastern Foods',
    productCount: 50
  },

  // Tea & Coffee Brands
  {
    id: 'sadaf',
    name: 'SADAF',
    description: 'Persian and Middle Eastern specialty foods, teas, spices, and traditional ingredients.',
    category: 'Tea & Coffee',
    productCount: 29
  },
  {
    id: 'ahmad',
    name: 'AHMAD',
    description: 'Premium tea blends including Earl Grey, Ceylon, Cardamom, and specialty teas from around the world.',
    category: 'Tea & Coffee',
    productCount: 13
  },
  {
    id: 'najjar',
    name: 'NAJJAR',
    description: 'Traditional Lebanese coffee with and without cardamom, roasted to perfection.',
    category: 'Tea & Coffee',
    productCount: 4
  },
  {
    id: 'do-ghazal',
    name: 'DO GHAZAL',
    description: 'Premium Ceylon and Earl Grey teas, known for exceptional quality and flavor.',
    category: 'Tea & Coffee',
    productCount: 4
  },
  {
    id: 'el-arosa',
    name: 'EL AROSA',
    description: 'Egyptian tea blends and traditional tea preparations.',
    category: 'Tea & Coffee',
    productCount: 3
  },
  {
    id: 'al-wazah',
    name: 'AL WAZAH',
    description: 'Traditional tea blends with cardamom and loose tea varieties.',
    category: 'Tea & Coffee',
    productCount: 3
  },
  {
    id: 'lipton',
    name: 'LIPTON',
    description: 'World-renowned tea brand offering various blends and tea bags.',
    category: 'Tea & Coffee',
    productCount: 2
  },
  {
    id: 'caykur',
    name: 'CAYKUR',
    description: 'Turkish tea brand known for quality black tea blends.',
    category: 'Tea & Coffee',
    productCount: 2
  },
  {
    id: 'al-ameed',
    name: 'AL AMEED',
    description: 'Traditional Turkish coffee with cardamom and medium roast blends.',
    category: 'Tea & Coffee',
    productCount: 2
  },
  {
    id: 'mehmet-efendi',
    name: 'MEHMET EFENDI',
    description: 'Authentic Turkish coffee, finely ground and traditionally prepared.',
    category: 'Tea & Coffee',
    productCount: 2
  },

  // Dairy & Cheese
  {
    id: 'al-haloub',
    name: 'AL HALOUB',
    description: 'Premium dairy products including ghee, butter, cheese, and traditional dairy specialties.',
    category: 'Dairy & Cheese',
    productCount: 12
  },
  {
    id: 'dairyland',
    name: 'DAIRYLAND',
    description: 'Turkish dairy products featuring feta cheese, borek cheese, and specialty cheeses.',
    category: 'Dairy & Cheese',
    productCount: 5
  },
  {
    id: 'green-land',
    name: 'GREEN LAND',
    description: 'Turkish feta cheese varieties including creamy, light, and low-salt options.',
    category: 'Dairy & Cheese',
    productCount: 5
  },
  {
    id: 'arz',
    name: 'ARZ',
    description: 'Lebanese dairy products including yogurt drinks, plain yogurt, and traditional dairy items.',
    category: 'Dairy & Cheese',
    productCount: 5
  },
  {
    id: 'karoun',
    name: 'KAROUN',
    description: 'Lebanese cheese specialties including Ackawi, Nabulsi, and Labne cheese.',
    category: 'Dairy & Cheese',
    productCount: 4
  },
  {
    id: 'gharibian',
    name: 'GHARIBIAN',
    description: 'Farm-fresh cheese varieties including sweet, string, and traditional Middle Eastern cheeses.',
    category: 'Dairy & Cheese',
    productCount: 4
  },
  {
    id: 'krinos',
    name: 'KRINOS',
    description: 'Bulgarian feta cheese in various sizes and packaging options.',
    category: 'Dairy & Cheese',
    productCount: 3
  },
  {
    id: 'puck',
    name: 'PUCK',
    description: 'Cream cheese and dairy cream products for cooking and baking.',
    category: 'Dairy & Cheese',
    productCount: 3
  },

  // Beverages
  {
    id: 'mira',
    name: 'MIRA',
    description: 'Tropical fruit juices including mango, guava, and fruit cocktails in various sizes.',
    category: 'Beverages',
    productCount: 16
  },
  {
    id: 'barbican',
    name: 'BARBICAN',
    description: 'Non-alcoholic malt beverages in multiple fruit flavors.',
    category: 'Beverages',
    productCount: 8
  },
  {
    id: 'moussy',
    name: 'MOUSSY',
    description: 'Non-alcoholic malt beverages with fruit flavors and classic varieties.',
    category: 'Beverages',
    productCount: 8
  },
  {
    id: 'drink-palestina',
    name: 'DRINK PALESTINA',
    description: 'Palestinian soft drinks including cola, orange, and lemon-lime flavors.',
    category: 'Beverages',
    productCount: 4
  },
  {
    id: 'vimto',
    name: 'VIMTO',
    description: 'Traditional mixed fruit drink available in cans and syrup.',
    category: 'Beverages',
    productCount: 2
  },
  {
    id: 'mirinda',
    name: 'MIRINDA',
    description: 'Fruit-flavored soft drinks including orange and apple varieties.',
    category: 'Beverages',
    productCount: 2
  },

  // Canned Foods & Preserves
  {
    id: 'ca-garden',
    name: 'CA GARDEN',
    description: 'Canned legumes and beans including foul, kidney beans, and traditional Middle Eastern recipes.',
    category: 'Canned Foods',
    productCount: 16
  },
  {
    id: 'al-shark',
    name: 'AL SHARK',
    description: 'Canned fish including tuna, sardines, and processed meat products.',
    category: 'Canned Foods',
    productCount: 9
  },
  {
    id: 'al-reef',
    name: 'AL REEF',
    description: 'Dates, meat products, and traditional Middle Eastern canned foods.',
    category: 'Canned Foods',
    productCount: 6
  },
  {
    id: 'cortas',
    name: 'CORTAS',
    description: 'Lebanese specialty products including pomegranate molasses and flower waters.',
    category: 'Canned Foods',
    productCount: 3
  },

  // Cookies & Biscuits
  {
    id: 'gullon',
    name: 'GULLON',
    description: 'Spanish cookies and biscuits including Maria, digestive, and sugar-free varieties.',
    category: 'Cookies & Biscuits',
    productCount: 14
  },
  {
    id: 'elledi',
    name: 'ELLEDI',
    description: 'Italian party wafers in multiple flavors including chocolate, vanilla, and fruit varieties.',
    category: 'Cookies & Biscuits',
    productCount: 11
  },
  {
    id: 'ulker',
    name: 'ULKER',
    description: 'Turkish cookies, biscuits, and chocolate products including tea biscuits and sandwich cookies.',
    category: 'Cookies & Biscuits',
    productCount: 10
  },
  {
    id: 'barmaki',
    name: 'BARMAKI',
    description: 'Persian cookies and sweets including baklava and traditional rice cookies.',
    category: 'Cookies & Biscuits',
    productCount: 4
  },

  // Chocolate & Confectionery
  {
    id: 'haribo',
    name: 'HARIBO',
    description: 'German gummy candies in various shapes and flavors including bears, worms, and fizzy varieties.',
    category: 'Chocolate & Candy',
    productCount: 10
  },
  {
    id: 'balconi',
    name: 'BALCONI',
    description: 'Italian snack cakes and chocolate treats in multiple flavors.',
    category: 'Chocolate & Candy',
    productCount: 8
  },
  {
    id: 'loacker',
    name: 'LOACKER',
    description: 'Premium Italian wafer cookies with hazelnut, vanilla, and chocolate fillings.',
    category: 'Chocolate & Candy',
    productCount: 8
  },
  {
    id: 'ferrero',
    name: 'FERRERO',
    description: 'Italian chocolate products including Kinder varieties and Hanuta wafers.',
    category: 'Chocolate & Candy',
    productCount: 4
  },
  {
    id: 'nestle',
    name: 'NESTLE',
    description: 'International chocolate brands including KitKat, Smarties, and Damak.',
    category: 'Chocolate & Candy',
    productCount: 3
  },
  {
    id: 'kinder',
    name: 'KINDER',
    description: 'Children\'s chocolate products including Joy eggs and chocolate bars.',
    category: 'Chocolate & Candy',
    productCount: 3
  },

  // Meat & Poultry
  {
    id: 'midamar',
    name: 'MIDAMAR',
    description: 'Halal meat products including turkey, beef, chicken, and processed meats.',
    category: 'Meat & Poultry',
    productCount: 18
  },
  {
    id: 'al-safa',
    name: 'AL SAFA',
    description: 'Frozen halal products including samosas and breaded items.',
    category: 'Meat & Poultry',
    productCount: 3
  },

  // Frozen Foods
  {
    id: 'montana',
    name: 'MONTANA',
    description: 'Frozen vegetables including artichoke, molokhia, spinach, peas, and traditional Middle Eastern vegetables.',
    category: 'Frozen Foods',
    productCount: 12
  },
  {
    id: 'fish-avenue',
    name: 'FISH AVENUE',
    description: 'Frozen fish varieties including Mediterranean fish, anchovy, and seafood products.',
    category: 'Frozen Foods',
    productCount: 7
  },
  {
    id: 'heba-s',
    name: 'HEBA\'S',
    description: 'Frozen falafel products including ready-to-cook and half-cooked varieties.',
    category: 'Frozen Foods',
    productCount: 3
  },

  // Baking & Cooking
  {
    id: 'noon',
    name: 'NOON',
    description: 'Baking essentials including soups, jello, baking powder, custard, and cooking ingredients.',
    category: 'Baking & Cooking',
    productCount: 22
  },
  {
    id: 'apollo',
    name: 'APOLLO',
    description: 'Phyllo dough and kataifi for Middle Eastern pastries.',
    category: 'Baking & Cooking',
    productCount: 2
  },

  // Pickles & Preserved Foods
  {
    id: 'marca',
    name: 'MARCA',
    description: 'Pickles, preserved lemons, harissa, and traditional North African preserved foods.',
    category: 'Pickles & Preserves',
    productCount: 11
  },
  {
    id: 'baroody',
    name: 'BAROODY',
    description: 'Lebanese pickles, olives, bread, and traditional preserved foods.',
    category: 'Pickles & Preserves',
    productCount: 8
  },
  {
    id: 'al-qasr',
    name: 'AL QASR',
    description: 'Pickled vegetables, olive oil, and traditional Middle Eastern preserved foods.',
    category: 'Pickles & Preserves',
    productCount: 4
  },
  {
    id: 'fine',
    name: 'FINE',
    description: 'Stuffed vegetables, grape leaves, and bulgur products.',
    category: 'Pickles & Preserves',
    productCount: 4
  },

  // Grains & Rice
  {
    id: 'al-suhagy',
    name: 'AL SUHAGY',
    description: 'Whole grains including wheat, fava beans, and traditional Middle Eastern grains.',
    category: 'Grains & Rice',
    productCount: 4
  },
  {
    id: 'aahu-barah',
    name: 'AAHU BARAH',
    description: 'Premium Basmati rice in various package sizes.',
    category: 'Grains & Rice',
    productCount: 3
  },
  {
    id: 'el-doha',
    name: 'EL DOHA',
    description: 'Egyptian rice and pasta products including orzo.',
    category: 'Grains & Rice',
    productCount: 3
  },

  // Nuts & Seeds
  {
    id: 'nour',
    name: 'NOUR',
    description: 'Nuts, seeds, and traditional Middle Eastern ingredients including lupini beans.',
    category: 'Nuts & Seeds',
    productCount: 7
  },
  {
    id: 'al-khar',
    name: 'AL KHAR',
    description: 'Tahini, halvah, and sesame-based products in various flavors.',
    category: 'Nuts & Seeds',
    productCount: 6
  },
  {
    id: 'crunchy-nuts',
    name: 'CRUNCHY NUTS',
    description: 'Mixed nuts and premium nut assortments.',
    category: 'Nuts & Seeds',
    productCount: 3
  },

  // Instant Foods
  {
    id: 'indomie',
    name: 'INDOMIE',
    description: 'Indonesian instant noodles in various flavors including chicken, vegetable, and fried noodles.',
    category: 'Instant Foods',
    productCount: 5
  },
  {
    id: 'spysi',
    name: 'SPYSI',
    description: 'Middle Eastern spice mixes for traditional dishes like kofta and shish tawook.',
    category: 'Instant Foods',
    productCount: 3
  },

  // Oils & Ghee
  {
    id: 'al-ghazal',
    name: 'AL GHAZAL',
    description: 'Pure ghee in various sizes for cooking and traditional preparations.',
    category: 'Oils & Ghee',
    productCount: 2
  },
  {
    id: 'aseel',
    name: 'ASEEL',
    description: 'Vegetable ghee for cooking and baking.',
    category: 'Oils & Ghee',
    productCount: 2
  },

  // Herbs & Spices
  {
    id: 'adonis',
    name: 'ADONIS',
    description: 'Traditional za\'atar blends from different regions including Aleppo, Lebanese, and Palestinian.',
    category: 'Herbs & Spices',
    productCount: 4
  },

  // Personal Care
  {
    id: 'dettol',
    name: 'DETTOL',
    description: 'Antibacterial liquid and soap for hygiene and cleaning.',
    category: 'Personal Care',
    productCount: 2
  },

  // Additional Beverages
  {
    id: 'schweppes',
    name: 'SCHWEPPES',
    description: 'Premium soft drinks including tonic water, bitter lemon, and fruit flavors.',
    category: 'Beverages',
    productCount: 5
  },
  {
    id: 'sarikiz',
    name: 'SARIKIZ',
    description: 'Turkish mineral water in various flavors including plain and fruit varieties.',
    category: 'Beverages',
    productCount: 5
  },
  {
    id: 'shani',
    name: 'SHANI',
    description: 'Middle Eastern soft drinks and beverages.',
    category: 'Beverages',
    productCount: 1
  },
  {
    id: 'uludag',
    name: 'ULUDAG',
    description: 'Turkish gazoz (traditional soda) in classic plain flavor.',
    category: 'Beverages',
    productCount: 1
  },

  // Additional Dairy & Cheese
  {
    id: 'rodopa',
    name: 'RODOPA',
    description: 'Bulgarian feta cheese known for authentic taste and quality.',
    category: 'Dairy & Cheese',
    productCount: 2
  },
  {
    id: 'halayeb',
    name: 'HALAYEB',
    description: 'Egyptian dairy products including cheese and traditional dairy items.',
    category: 'Dairy & Cheese',
    productCount: 2
  },
  {
    id: 'kdd',
    name: 'KDD',
    description: 'Middle Eastern dairy products including flavored milk and cream.',
    category: 'Dairy & Cheese',
    productCount: 2
  },
  {
    id: 'icim',
    name: 'ICIM',
    description: 'Turkish labne (strained yogurt) in various sizes.',
    category: 'Dairy & Cheese',
    productCount: 2
  },
  {
    id: 'arz-labne',
    name: 'ARZ LABNE',
    description: 'Specialized labne and kefir cheese products.',
    category: 'Dairy & Cheese',
    productCount: 1
  },
  {
    id: 'arz-plain',
    name: 'ARZ PLAIN',
    description: 'Plain yogurt products for traditional Middle Eastern cuisine.',
    category: 'Dairy & Cheese',
    productCount: 1
  },
  {
    id: 'byblos',
    name: 'BYBLOS',
    description: 'Lebanese labne and traditional dairy products.',
    category: 'Dairy & Cheese',
    productCount: 1
  },
  {
    id: 'kiri',
    name: 'KIRI',
    description: 'French cheese wedges in family-size packaging.',
    category: 'Dairy & Cheese',
    productCount: 1
  },
  {
    id: 'pindos',
    name: 'PINDOS',
    description: 'Greek halloumi cheese for grilling and cooking.',
    category: 'Dairy & Cheese',
    productCount: 1
  },
  {
    id: 'valbreso',
    name: 'VALBRESO',
    description: 'French sheep cheese with authentic European flavors.',
    category: 'Dairy & Cheese',
    productCount: 1
  },

  // Additional Canned Foods
  {
    id: 'hana',
    name: 'HANA',
    description: 'Canned legumes and milk-based beverages.',
    category: 'Canned Foods',
    productCount: 2
  },
  {
    id: 'alreef',
    name: 'ALREEF',
    description: 'Canned tuna in olive oil and with chili varieties.',
    category: 'Canned Foods',
    productCount: 2
  },
  {
    id: 'mukalla',
    name: 'MUKALLA',
    description: 'Premium canned tuna in olive oil and with chili.',
    category: 'Canned Foods',
    productCount: 2
  },
  {
    id: 'al-momtaz',
    name: 'AL MOMTAZ',
    description: 'Evaporated milk for cooking and baking.',
    category: 'Canned Foods',
    productCount: 1
  },
  {
    id: 'tamek',
    name: 'TAMEK',
    description: 'Turkish tomato paste in glass jars.',
    category: 'Canned Foods',
    productCount: 1
  },

  // Additional Chocolate & Candy
  {
    id: 'galaxy',
    name: 'GALAXY',
    description: 'Smooth milk chocolate bars and ripple varieties.',
    category: 'Chocolate & Candy',
    productCount: 2
  },
  {
    id: 'tayas',
    name: 'TAYAS',
    description: 'Turkish candy assortments and mixed candy varieties.',
    category: 'Chocolate & Candy',
    productCount: 2
  },
  {
    id: 'toblerone',
    name: 'TOBLERONE',
    description: 'Swiss milk chocolate with distinctive triangular shape.',
    category: 'Chocolate & Candy',
    productCount: 1
  },
  {
    id: 'cadbury',
    name: 'CADBURY',
    description: 'British chocolate products including Flake bars.',
    category: 'Chocolate & Candy',
    productCount: 1
  },
  {
    id: 'bon-o-bon',
    name: 'BON-O-BON',
    description: 'Chocolate bonbons with wafer and peanut filling.',
    category: 'Chocolate & Candy',
    productCount: 1
  },
  {
    id: 'nescafe',
    name: 'NESCAFE',
    description: '3-in-1 instant coffee mix for convenient preparation.',
    category: 'Chocolate & Candy',
    productCount: 1
  },

  // Additional Tea & Coffee
  {
    id: 'nazu-s',
    name: 'NAZU\'S',
    description: 'Premium Persian tea blends with traditional flavors.',
    category: 'Tea & Coffee',
    productCount: 1
  },
  {
    id: 'al-ghazaleen',
    name: 'AL GHAZALEEN',
    description: 'Tea blends in bags and loose varieties.',
    category: 'Tea & Coffee',
    productCount: 2
  },
  {
    id: 'al-kbous',
    name: 'AL KBOUS',
    description: 'Tea products in bags and loose leaf varieties.',
    category: 'Tea & Coffee',
    productCount: 2
  },

  // Additional Meat & Poultry
  {
    id: 'baraka',
    name: 'BARAKA',
    description: 'Halal corned beef and specialty seed products.',
    category: 'Meat & Poultry',
    productCount: 2
  },
  {
    id: 'merve',
    name: 'MERVE',
    description: 'Turkish pastry products and beef sucuk (sausage).',
    category: 'Meat & Poultry',
    productCount: 2
  },
  {
    id: 'mid-east',
    name: 'MID EAST',
    description: 'Middle Eastern pickles and preserved foods.',
    category: 'Meat & Poultry',
    productCount: 1
  },
  {
    id: 'maggi',
    name: 'MAGGI',
    description: 'Halal chicken bouillon cubes for cooking.',
    category: 'Meat & Poultry',
    productCount: 1
  },

  // Additional Frozen Foods
  {
    id: 'komagene',
    name: 'KOMAGENE',
    description: 'Turkish frozen foods including chikofte in portion and family packs.',
    category: 'Frozen Foods',
    productCount: 2
  },
  {
    id: 'tyj-spring',
    name: 'TYJ SPRING',
    description: 'Spring roll wrappers for Asian cuisine preparation.',
    category: 'Frozen Foods',
    productCount: 1
  },

  // Additional Baking & Cooking
  {
    id: 'dawn',
    name: 'DAWN',
    description: 'Frozen paratha bread in family and individual packs.',
    category: 'Baking & Cooking',
    productCount: 2
  },
  {
    id: 'ammar',
    name: 'AMMAR',
    description: 'Cooking essentials including orange blossom water and pomegranate molasses.',
    category: 'Baking & Cooking',
    productCount: 2
  },
  {
    id: 'tehmar',
    name: 'TEHMAR',
    description: 'Extra virgin olive oil and pomegranate sauce for cooking.',
    category: 'Baking & Cooking',
    productCount: 2
  },
  {
    id: 'fersan',
    name: 'FERSAN',
    description: 'Grape vinegar for cooking and salad dressing.',
    category: 'Baking & Cooking',
    productCount: 1
  },
  {
    id: 'angel-s-bakery',
    name: 'ANGEL\'S BAKERY',
    description: 'Artisan white pita bread for Middle Eastern cuisine.',
    category: 'Baking & Cooking',
    productCount: 1
  },
  {
    id: 'aman',
    name: 'AMAN',
    description: 'Samosa sheets for homemade appetizers.',
    category: 'Baking & Cooking',
    productCount: 1
  },
  {
    id: 'fide',
    name: 'FIDE',
    description: 'Roasted eggplants for traditional Middle Eastern dishes.',
    category: 'Baking & Cooking',
    productCount: 1
  },

  // Additional Pickles & Preserves
  {
    id: 'ashour',
    name: 'ASHOUR',
    description: 'Traditional cucumber pickles in various sizes.',
    category: 'Pickles & Preserves',
    productCount: 3
  },
  {
    id: 'marmarabirlik',
    name: 'MARMARABIRLIK',
    description: 'Turkish black olives including dried and Gemlik varieties.',
    category: 'Pickles & Preserves',
    productCount: 3
  },
  {
    id: 'athena',
    name: 'ATHENA',
    description: 'Stuffed grape leaves in various sizes.',
    category: 'Pickles & Preserves',
    productCount: 2
  },
  {
    id: 'orlando',
    name: 'ORLANDO',
    description: 'Grape leaves for stuffing and traditional preparations.',
    category: 'Pickles & Preserves',
    productCount: 2
  },
  {
    id: 'oncu',
    name: 'ONCU',
    description: 'Turkish black olives in extra large sizes.',
    category: 'Pickles & Preserves',
    productCount: 1
  },

  // Additional Grains & Rice
  {
    id: 'suhagy',
    name: 'SUHAGY',
    description: 'Legumes, grains, and traditional Middle Eastern ingredients.',
    category: 'Grains & Rice',
    productCount: 4
  },
  {
    id: 'tria',
    name: 'TRIA',
    description: 'North African grains including couscous, noodles, and traditional grain products.',
    category: 'Grains & Rice',
    productCount: 4
  },
  {
    id: 'mahmood',
    name: 'MAHMOOD',
    description: 'Sella rice for traditional Middle Eastern dishes.',
    category: 'Grains & Rice',
    productCount: 1
  },
  {
    id: 'other-lentil',
    name: 'RED LENTIL',
    description: 'Premium red lentils for cooking and traditional dishes.',
    category: 'Grains & Rice',
    productCount: 1
  },

  // Additional Nuts & Seeds
  {
    id: 'al-samir',
    name: 'AL SAMIR',
    description: 'Roasted seeds including pumpkin and melon seeds.',
    category: 'Nuts & Seeds',
    productCount: 2
  },
  {
    id: 'al-kanater',
    name: 'AL KANATER',
    description: 'Sugar-free halvah in plain and pistachio varieties.',
    category: 'Nuts & Seeds',
    productCount: 2
  },
  {
    id: 'antebella',
    name: 'ANTEBELLA',
    description: 'Pistachio cream spreads in different concentrations.',
    category: 'Nuts & Seeds',
    productCount: 2
  },
  {
    id: 'alya',
    name: 'ALYA',
    description: 'Premium Deglet Nour dates with branch.',
    category: 'Nuts & Seeds',
    productCount: 1
  },

  // Additional Oils & Ghee
  {
    id: 'al-kamaria',
    name: 'AL KAMARIA',
    description: 'Traditional ghee for Middle Eastern cooking.',
    category: 'Oils & Ghee',
    productCount: 1
  },
  {
    id: 'balca',
    name: 'BALCA',
    description: 'Extra virgin olive oil for cooking and salads.',
    category: 'Oils & Ghee',
    productCount: 1
  },
  {
    id: 'marolivo',
    name: 'MAROLIVO',
    description: 'Blended cooking oil for various culinary uses.',
    category: 'Oils & Ghee',
    productCount: 1
  },

  // Additional Herbs & Spices
  {
    id: 'al-ragawi',
    name: 'AL RAGAWI',
    description: 'Fenugreek (Helba) for traditional Middle Eastern preparations.',
    category: 'Herbs & Spices',
    productCount: 1
  },
  {
    id: 'basak',
    name: 'BASAK',
    description: 'Dried mint for cooking and tea preparation.',
    category: 'Herbs & Spices',
    productCount: 1
  },

  // Honey & Sweets
  {
    id: 'al-shifa',
    name: 'AL SHIFA',
    description: 'Pure honey for natural sweetening and health benefits.',
    category: 'Honey & Sweets',
    productCount: 1
  },
  {
    id: 'el-bawady',
    name: 'EL BAWADY',
    description: 'Black honey with traditional Middle Eastern flavors.',
    category: 'Honey & Sweets',
    productCount: 1
  },

  // Bread & Bakery
  {
    id: 'ara-z',
    name: 'ARA-Z',
    description: 'Traditional Middle Eastern breads including Sangak, Markook, and Lavash.',
    category: 'Bread & Bakery',
    productCount: 3
  },

  // Kitchenware
  {
    id: 'bbq-grill',
    name: 'BBQ GRILL',
    description: 'Grilling equipment including stands and various grill sizes.',
    category: 'Kitchenware',
    productCount: 3
  },
  {
    id: 'bbq-skewer',
    name: 'BBQ SKEWER',
    description: 'Skewer sets for grilling and barbecue preparation.',
    category: 'Kitchenware',
    productCount: 2
  },
  {
    id: 'pasabahce',
    name: 'PASABAHCE',
    description: 'Turkish glassware including tea glasses and saucers.',
    category: 'Kitchenware',
    productCount: 2
  },

  // Mineral Water
  {
    id: 'beypazari',
    name: 'BEYPAZARI',
    description: 'Turkish mineral water in small bottles.',
    category: 'Mineral Water',
    productCount: 1
  },

  // Seafood
  {
    id: 'al-afia',
    name: 'AL AFIA',
    description: 'Grape leaves for traditional Middle Eastern stuffing.',
    category: 'Seafood',
    productCount: 1
  },

  // Additional Personal Care
  {
    id: 'al-nabeel',
    name: 'AL NABEEL',
    description: 'Traditional Middle Eastern incense and fragrance products.',
    category: 'Personal Care',
    productCount: 1
  },

  // Miscellaneous
  {
    id: 'beirut',
    name: 'BEIRUT',
    description: 'Lebanese specialties including hummus tahini and tamarind syrup.',
    category: 'Miscellaneous',
    productCount: 2
  },
  {
    id: 'jameedna',
    name: 'JAMEEDNA',
    description: 'Liquid jameed for traditional Middle Eastern dishes.',
    category: 'Miscellaneous',
    productCount: 1
  },
  {
    id: 'mosul',
    name: 'MOSUL',
    description: 'Traditional kubba (wheat-based dumplings).',
    category: 'Miscellaneous',
    productCount: 1
  },
  {
    id: 'halwani',
    name: 'HALWANI',
    description: 'Traditional Middle Eastern cookies with dates.',
    category: 'Miscellaneous',
    productCount: 1
  },
  {
    id: 'mcvities',
    name: 'MCVITIES',
    description: 'British digestive cookies in original flavor.',
    category: 'Miscellaneous',
    productCount: 1
  },
  {
    id: 'other',
    name: 'OTHER',
    description: 'Various unbranded products and specialty items.',
    category: 'Miscellaneous',
    productCount: 100
  }
];

// Group brands by category
const brandsByCategory = brands.reduce((acc, brand) => {
  if (!acc[brand.category]) {
    acc[brand.category] = [];
  }
  acc[brand.category].push(brand);
  return acc;
}, {} as Record<string, Brand[]>);

// Get category image based on product category
const getCategoryImage = (category: string) => {
  const imageMap: { [key: string]: string } = {
    'BAKERY': 'https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
    'CANDY': 'https://images.unsplash.com/photo-1514849302-984523450cf4?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
    'CHEESES': 'https://images.unsplash.com/photo-1452195100486-9cc805987862?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
    'COOKIES': 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
    'DATES': 'https://images.unsplash.com/photo-1577069861033-55d04cec4ef5?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
    'DRINKS': 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
    'FROZEN': 'https://images.unsplash.com/photo-1506976785307-8732e854ad03?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
    'GRAINS': 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
    'NUTS': 'https://images.unsplash.com/photo-1508747792480-cca4d777b15b?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
    'OTHERS': 'https://images.unsplash.com/photo-1586201375761-83865001e31c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
    'PASTA': 'https://images.unsplash.com/photo-1551892589-865f69869476?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
    'SPICES': 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
    'TEA': 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
    'COFFEE': 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
    'YOGURT': 'https://images.unsplash.com/photo-1571212515416-8b71b4752fdc?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
  };
  
  return imageMap[category] || 'https://images.unsplash.com/photo-1556909114-4f0f33e6a3c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80';
};

const BrandCard = ({ brand, onQuickPreview }: { brand: Brand; onQuickPreview: (brand: Brand) => void }) => {
  const isExclusiveBrand = brand.isExclusive;
  
  // Kategori bazlı renk paleti
  const getCategoryColor = (category: string) => {
    if (isExclusiveBrand) {
      return "from-amber-500 via-yellow-500 to-orange-500";
    }
    
    const colors: { [key: string]: string } = {
      "Exclusive Brands": "from-amber-500 via-yellow-500 to-orange-500",
      "Spices & Seasonings": "from-red-500 to-rose-600",
      "Middle Eastern Foods": "from-primaryBlue to-accentRed",
      "Tea & Coffee": "from-amber-500 to-orange-600",
      "Dairy & Cheese": "from-blue-500 to-cyan-600",
      "Beverages": "from-teal-500 to-emerald-600",
      "Canned Foods": "from-green-500 to-lime-600",
      "Cookies & Biscuits": "from-yellow-500 to-amber-600",
      "Chocolate & Candy": "from-pink-500 to-rose-600",
      "Meat & Poultry": "from-red-600 to-pink-600",
      "Frozen Foods": "from-indigo-500 to-blue-600",
      "Baking & Cooking": "from-purple-500 to-violet-600",
      "Pickles & Preserves": "from-emerald-500 to-teal-600",
      "Grains & Rice": "from-stone-500 to-gray-600",
      "Nuts & Seeds": "from-orange-500 to-yellow-600",
      "Instant Foods": "from-lime-500 to-green-600",
      "Oils & Ghee": "from-yellow-600 to-orange-500",
      "Herbs & Spices": "from-green-600 to-emerald-500",
      "Personal Care": "from-blue-600 to-indigo-500",
      "Honey & Sweets": "from-orange-500 to-yellow-600",
      "Bread & Bakery": "from-amber-600 to-orange-500",
      "Kitchenware": "from-gray-500 to-slate-600",
      "Mineral Water": "from-cyan-500 to-blue-500",
      "Seafood": "from-teal-600 to-cyan-600",
      "Miscellaneous": "from-purple-600 to-pink-600"
    };
    return colors[category] || "from-gray-500 to-slate-600";
  };

  return (
    <div className={`group relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2
                    border ${isExclusiveBrand ? 'border-amber-300 ring-2 ring-amber-200' : 'border-gray-100'} overflow-hidden`}>
      {/* Exclusive Badge */}
      {isExclusiveBrand && (
        <div className="absolute top-2 right-2 sm:top-3 sm:right-3 z-10 bg-amber-400 text-amber-900 text-xs font-bold px-2 py-0.5 sm:px-3 sm:py-1 rounded-full shadow-lg">
          ⭐ EXCLUSIVE
        </div>
      )}
      
      {/* Gradient header based on category */}
      <div className={`${isExclusiveBrand ? 'h-20 sm:h-24' : 'h-16 sm:h-20'} bg-gradient-to-r ${getCategoryColor(brand.category)} relative overflow-hidden`}>
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative h-full flex items-center justify-center">
          <h3 className={`font-serif font-bold ${isExclusiveBrand ? 'text-lg sm:text-2xl' : 'text-base sm:text-xl'} text-white text-center leading-tight px-2 sm:px-4`}>
            {brand.name}
          </h3>
        </div>
        <div className="absolute top-0 right-0 w-6 h-6 sm:w-8 sm:h-8 bg-white/20 rounded-bl-2xl"></div>
        
        {isExclusiveBrand && (
          <div className="absolute bottom-0 left-0 right-0 bg-amber-400/20 text-white text-center text-xs font-semibold py-0.5 sm:py-1">
            <span className="hidden sm:inline">North Carolina's Exclusive Distributor</span>
            <span className="sm:hidden">NC Exclusive</span>
          </div>
        )}
      </div>

      {/* Brand info */}
      <div className="p-4 sm:p-6">
        <p className={`text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4 leading-relaxed ${isExclusiveBrand ? 'min-h-[2.5rem] sm:min-h-[3rem]' : 'min-h-[2rem] sm:min-h-[2.5rem]'}`}>
          {brand.description}
          {isExclusiveBrand && (
            <span className="block mt-2 text-amber-700 font-semibold text-xs">
              🎯 <span className="hidden sm:inline">We are the exclusive distributor in North Carolina</span>
              <span className="sm:hidden">NC Exclusive distributor</span>
            </span>
          )}
        </p>
        
        <div className="flex items-center justify-between text-sm mb-3 sm:mb-4">
          <span className={`px-2 py-1 sm:px-3 sm:py-1 ${isExclusiveBrand ? 'bg-amber-100 text-amber-700' : 'bg-primaryBlue/10 text-primaryBlue'} rounded-full font-medium text-xs sm:text-sm`}>
            {brand.productCount} products
          </span>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => onQuickPreview(brand)}
              className="text-gray-600 hover:text-primaryBlue font-medium transition-colors duration-300 
                         text-xs sm:text-sm flex items-center space-x-1 hover:underline touch-target"
            >
              <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>Quick Preview</span>
            </button>
          <Link
              to={`/products?brand=${brand.name}`}
            className="text-primaryBlue hover:text-accentRed font-medium transition-colors duration-300 
                       text-xs sm:text-sm flex items-center space-x-1 hover:underline touch-target"
          >
            <span>View Products</span>
            <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
          </div>
        </div>
        
        <div className="pt-2 sm:pt-3 border-t border-gray-100">
          <span className={`text-xs px-2 py-1 rounded-full ${isExclusiveBrand ? 'bg-amber-100 text-amber-700' : 'bg-lightGrey text-gray-500'}`}>
            {brand.category}
          </span>
        </div>
      </div>
    </div>
  );
};

export default function Brands() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("name");
  const [quickPreviewBrand, setQuickPreviewBrand] = useState<Brand | null>(null);
  const [previewProducts, setPreviewProducts] = useState<Product[]>([]);
  const [loadingPreview, setLoadingPreview] = useState(false);

  const handleQuickPreview = async (brand: Brand) => {
    setQuickPreviewBrand(brand);
    setLoadingPreview(true);
    
    try {
      // Fetch real products for this brand
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('active', true)
        .ilike('name', `%${brand.name}%`)
        .limit(3);

      if (error) {
        console.error('Error fetching preview products:', error);
        // Fallback to empty array if error
        setPreviewProducts([]);
      } else {
        setPreviewProducts(data || []);
      }
    } catch (err) {
      console.error('Error in handleQuickPreview:', err);
      setPreviewProducts([]);
    } finally {
      setLoadingPreview(false);
    }
  };

  const closeQuickPreview = () => {
    setQuickPreviewBrand(null);
    setPreviewProducts([]);
  };

  // Get all unique categories
  const categories = ["All", ...Object.keys(brandsByCategory)];

  // Filter and sort brands
  const filteredBrands = brands
    .filter(brand => {
      const matchesSearch = brand.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           brand.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "All" || brand.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      // First prioritize exclusive brands (MARMIA and MODA)
      const aIsExclusive = a.isExclusive;
      const bIsExclusive = b.isExclusive;
      
      if (aIsExclusive && !bIsExclusive) return -1;
      if (!aIsExclusive && bIsExclusive) return 1;
      
      // Then sort by the selected criteria
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "products":
          return b.productCount - a.productCount;
        case "category":
          return a.category.localeCompare(b.category);
        default:
          return 0;
      }
    });

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-lightGrey to-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primaryBlue via-neutralBlack to-primaryBlue text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-64 h-64 bg-accentRed rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-primaryBlue rounded-full blur-3xl animate-pulse" />
        </div>
        
        <div className="relative container-custom py-12 sm:py-16 md:py-20">
          <div className="text-center">
            <div className="flex justify-center mb-4 sm:mb-6">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/10 rounded-2xl flex items-center justify-center">
                <Badge className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
              </div>
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-4 sm:mb-6 leading-tight">
              Our <span className="text-accentRed">Brands</span>
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl text-white/90 mb-6 sm:mb-8 leading-relaxed max-w-3xl mx-auto px-4">
              Discover 142+ premium brands from around the world. Quality partners we trust to bring you the best.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
              <a 
                href="#brands-section"
                className="group inline-flex items-center justify-center bg-white text-neutralBlack px-6 py-3 sm:px-8 sm:py-4 rounded-xl font-semibold text-base sm:text-lg transition-all duration-300 hover:scale-105 touch-target"
              >
                <Badge className="mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5" />
                Browse Brands
              </a>
              
              <a 
                href="/products"
                className="group inline-flex items-center justify-center border-2 border-white text-white px-6 py-3 sm:px-8 sm:py-4 rounded-xl font-semibold text-base sm:text-lg transition-all duration-300 hover:bg-white hover:text-neutralBlack touch-target"
              >
                <ShoppingCart className="mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5" />
                View Products
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Filters and Search */}
      <section id="brands-section" className="py-8 sm:py-12 md:py-16 lg:py-24">
        <div className="container-custom px-4">
          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg border border-gray-100 p-4 sm:p-6 md:p-8 mb-8 sm:mb-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {/* Search */}
              <div className="relative col-span-1 sm:col-span-2 lg:col-span-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 sm:h-5 sm:w-5" />
                <input
                  type="text"
                  placeholder="Search brands..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 sm:py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primaryBlue focus:border-transparent text-sm sm:text-base"
                />
              </div>

              {/* Category Filter */}
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 sm:h-5 sm:w-5" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 sm:py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primaryBlue focus:border-transparent appearance-none bg-white text-sm sm:text-base"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              {/* Sort */}
              <div className="relative">
                <Package className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 sm:h-5 sm:w-5" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 sm:py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primaryBlue focus:border-transparent appearance-none bg-white text-sm sm:text-base"
                >
                  <option value="name">Sort by Name</option>
                  <option value="products">Sort by Product Count</option>
                  <option value="category">Sort by Category</option>
                </select>
              </div>
            </div>

            {/* Results Info */}
            <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs sm:text-sm text-gray-600 gap-2 sm:gap-0">
              <span>
                Showing {filteredBrands.length} of {brands.length} featured brands
                {selectedCategory !== "All" && ` in ${selectedCategory}`}
                {searchTerm && ` matching "${searchTerm}"`}
              </span>
              
              {(searchTerm || selectedCategory !== "All") && (
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("All");
                  }}
                  className="text-primaryBlue hover:text-accentRed font-medium transition-colors touch-target"
                >
                  Clear Filters
                </button>
              )}
            </div>
          </div>

          {/* Brands Grid */}
          {filteredBrands.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
              {filteredBrands.map((brand) => (
                <BrandCard key={brand.id} brand={brand} onQuickPreview={handleQuickPreview} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 sm:py-16">
              <Package className="h-12 w-12 sm:h-16 sm:w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg sm:text-xl font-serif font-semibold text-neutralBlack mb-2">No brands found</h3>
              <p className="text-sm sm:text-base text-gray-600 px-4">
                Try adjusting your search terms or filters to find what you're looking for.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Quick Preview Modal */}
      {quickPreviewBrand && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {/* Modal Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-serif font-bold text-neutralBlack">
                    {quickPreviewBrand.name}
            </h2>
                  <p className="text-sm text-gray-600 mt-1">
                    {quickPreviewBrand.category} • {quickPreviewBrand.productCount} products
            </p>
          </div>
                <button
                  onClick={closeQuickPreview}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-6 h-6 text-gray-600" />
                </button>
                  </div>

              {/* Brand Description */}
              <div className="mb-6">
                <p className="text-gray-700 leading-relaxed">
                  {quickPreviewBrand.description}
                </p>
                {quickPreviewBrand.isExclusive && (
                  <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                    <p className="text-amber-800 font-medium text-sm">
                      ⭐ We are the exclusive distributor of {quickPreviewBrand.name} in North Carolina
                    </p>
                </div>
                )}
              </div>

              {/* Sample Products */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-neutralBlack mb-4">
                  Sample Products
                </h3>
                {loadingPreview ? (
                  <div className="flex items-center justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primaryBlue"></div>
                    <span className="ml-3 text-gray-600">Loading products...</span>
                  </div>
                ) : previewProducts.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {previewProducts.map((product, index) => (
                      <div key={product.id} className="bg-gray-50 rounded-lg p-4">
                        <div className="w-full h-32 bg-gray-200 rounded-lg mb-3 flex items-center justify-center overflow-hidden">
                          {product.image_url ? (
                            <img 
                              src={product.image_url} 
                              alt={product.name}
                              className="w-full h-full object-cover rounded-lg"
                              onError={(e) => {
                                e.currentTarget.style.display = 'none';
                                e.currentTarget.nextElementSibling?.classList.remove('hidden');
                              }}
                            />
                          ) : null}
                          <div className={`${product.image_url ? 'hidden' : 'flex'} items-center justify-center w-full h-full`}>
                            <img 
                              src={getCategoryImage(product.category || '')} 
                              alt={product.name}
                              className="w-full h-full object-cover rounded-lg"
                              onError={(e) => {
                                e.currentTarget.style.display = 'none';
                                e.currentTarget.nextElementSibling?.classList.remove('hidden');
                              }}
                            />
                            <Package className="w-8 h-8 text-gray-400 hidden" />
                          </div>
                        </div>
                        <h4 className="font-medium text-sm text-neutralBlack mb-1 line-clamp-2">
                          {product.name}
                        </h4>
                        <p className="text-gray-500 text-xs mb-2">
                          {product.category}
                        </p>
                        <div className="text-primaryBlue font-semibold text-sm">
                          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                            Member Pricing Available
                    </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500">No products found for this brand in our database.</p>
                    <p className="text-gray-400 text-sm mt-1">This might be a new brand or products may be coming soon.</p>
                  </div>
                  )}
                </div>

              {/* Member Notice */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <ShoppingCart className="w-4 h-4 text-blue-600" />
              </div>
                  <div>
                    <h4 className="font-semibold text-blue-900 mb-1">
                      Want to see more products and prices?
                    </h4>
                    <p className="text-blue-800 text-sm mb-3">
                      Create a free account to access our full catalog, detailed product information, and wholesale pricing.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <Link
                        to="/login"
                        className="inline-flex items-center justify-center bg-blue-600 text-white px-4 py-2 rounded-lg font-medium text-sm hover:bg-blue-700 transition-colors"
                      >
                        Sign In
                      </Link>
                      <Link
                        to="/contact"
                        className="inline-flex items-center justify-center border border-blue-600 text-blue-600 px-4 py-2 rounded-lg font-medium text-sm hover:bg-blue-50 transition-colors"
                      >
                        Request Access
                      </Link>
          </div>
        </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  to={`/products?brand=${quickPreviewBrand.name}`}
                  className="flex-1 bg-primaryBlue text-white px-6 py-3 rounded-lg font-semibold text-center hover:bg-primaryBlue/90 transition-colors"
                >
                  View All Products
                </Link>
                <button
                  onClick={closeQuickPreview}
                  className="flex-1 border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 