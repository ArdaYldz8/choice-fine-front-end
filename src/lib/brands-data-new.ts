export interface Brand {
  id: string;
  name: string;
  description: string;
  category: string;
  productCount: number;
  isExclusive?: boolean;
}

// Brands data based on CSV analysis
export const brands: Brand[] = [
  // Exclusive Brands (MARMIA & MODA)
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
    id: 'ahmad',
    name: 'AHMAD',
    description: 'Premium tea blends including Earl Grey, Ceylon, Cardamom, and specialty teas from around the world.',
    category: 'Tea & Coffee',
    productCount: 13
  },
  {
    id: 'sadaf',
    name: 'SADAF',
    description: 'Persian and Middle Eastern specialty foods, teas, spices, and traditional ingredients.',
    category: 'Tea & Coffee',
    productCount: 29
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
    id: 'lipton',
    name: 'LIPTON',
    description: 'World-renowned tea brand offering various blends and tea bags.',
    category: 'Tea & Coffee',
    productCount: 2
  },
  {
    id: 'al-wazah',
    name: 'AL WAZAH',
    description: 'Traditional tea blends with cardamom and loose tea varieties.',
    category: 'Tea & Coffee',
    productCount: 3
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
  {
    id: 'nazu-s',
    name: 'NAZU\'S',
    description: 'Premium Persian tea blends with traditional flavors.',
    category: 'Tea & Coffee',
    productCount: 1
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
  {
    id: 'basbosa',
    name: 'BASBOSA',
    description: 'Middle Eastern semolina cake with nuts, coconut, and cream varieties.',
    category: 'Cookies & Biscuits',
    productCount: 3
  },
  {
    id: 'ali-baba',
    name: 'ALI BABA',
    description: 'Wafer cookies in coconut and classic flavors.',
    category: 'Cookies & Biscuits',
    productCount: 2
  },
  {
    id: 'mcvities',
    name: 'MCVITIES',
    description: 'British digestive cookies in original flavor.',
    category: 'Cookies & Biscuits',
    productCount: 1
  },
  {
    id: 'halwani',
    name: 'HALWANI',
    description: 'Traditional Middle Eastern cookies with dates.',
    category: 'Cookies & Biscuits',
    productCount: 1
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
    id: 'nido',
    name: 'NIDO',
    description: 'Dutch milk powder in various sizes for cooking and beverages.',
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

  // Grains & Rice
  {
    id: 'al-suhagy',
    name: 'AL SUHAGY',
    description: 'Whole grains including wheat, fava beans, and traditional Middle Eastern grains.',
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
    id: 'suhagy',
    name: 'SUHAGY',
    description: 'Legumes, grains, and traditional Middle Eastern ingredients.',
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
  {
    id: 'mahmood',
    name: 'MAHMOOD',
    description: 'Sella rice for traditional Middle Eastern dishes.',
    category: 'Grains & Rice',
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

  // Nuts & Seeds
  {
    id: 'al-khar',
    name: 'AL KHAR',
    description: 'Tahini, halvah, and sesame-based products in various flavors.',
    category: 'Nuts & Seeds',
    productCount: 6
  },
  {
    id: 'nour',
    name: 'NOUR',
    description: 'Nuts, seeds, and traditional Middle Eastern ingredients including lupini beans.',
    category: 'Nuts & Seeds',
    productCount: 7
  },
  {
    id: 'crunchy-nuts',
    name: 'CRUNCHY NUTS',
    description: 'Mixed nuts and premium nut assortments.',
    category: 'Nuts & Seeds',
    productCount: 3
  },
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

  // Herbs & Spices (Small Brands)
  {
    id: 'adonis',
    name: 'ADONIS',
    description: 'Traditional za\'atar blends from different regions including Aleppo, Lebanese, and Palestinian.',
    category: 'Herbs & Spices',
    productCount: 4
  },
  {
    id: 'al-ghazaleen',
    name: 'AL GHAZALEEN',
    description: 'Tea blends in bags and loose varieties.',
    category: 'Herbs & Spices',
    productCount: 2
  },
  {
    id: 'al-kbous',
    name: 'AL KBOUS',
    description: 'Tea products in bags and loose leaf varieties.',
    category: 'Herbs & Spices',
    productCount: 2
  },
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

  // Personal Care
  {
    id: 'dettol',
    name: 'DETTOL',
    description: 'Antibacterial liquid and soap for hygiene and cleaning.',
    category: 'Personal Care',
    productCount: 2
  },
  {
    id: 'al-nabeel',
    name: 'AL NABEEL',
    description: 'Traditional Middle Eastern incense and fragrance products.',
    category: 'Personal Care',
    productCount: 1
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
];

// Group brands by category
export const brandsByCategory = brands.reduce((acc, brand) => {
  if (!acc[brand.category]) {
    acc[brand.category] = [];
  }
  acc[brand.category].push(brand);
  return acc;
}, {} as Record<string, Brand[]>);

// Get all unique categories
export const categories = Object.keys(brandsByCategory).sort();

// Get exclusive brands
export const exclusiveBrands = brands.filter(brand => brand.isExclusive);

// Get brands by product count (most popular)
export const brandsByPopularity = [...brands].sort((a, b) => b.productCount - a.productCount);

// Search function
export const searchBrands = (query: string) => {
  const lowercaseQuery = query.toLowerCase();
  return brands.filter(brand => 
    brand.name.toLowerCase().includes(lowercaseQuery) ||
    brand.description.toLowerCase().includes(lowercaseQuery) ||
    brand.category.toLowerCase().includes(lowercaseQuery)
  );
};

// Get brands by category
export const getBrandsByCategory = (category: string) => {
  return brandsByCategory[category] || [];
};

// Get brand by ID
export const getBrandById = (id: string) => {
  return brands.find(brand => brand.id === id);
};

// Statistics
export const brandStats = {
  totalBrands: brands.length,
  totalProducts: brands.reduce((sum, brand) => sum + brand.productCount, 0),
  totalCategories: categories.length,
  exclusiveBrands: exclusiveBrands.length,
  averageProductsPerBrand: Math.round(brands.reduce((sum, brand) => sum + brand.productCount, 0) / brands.length)
}; 