const mongoose = require('mongoose');

const CROPS = [
  { name: 'Tomato',    aliases: ['tamatar', 'టమాట'],      unit: 'kg', category: 'vegetable' },
  { name: 'Onion',     aliases: ['pyaaz', 'ఉల్లిపాయ'],    unit: 'kg', category: 'vegetable' },
  { name: 'Potato',    aliases: ['aloo', 'బంగాళాదుంప'],   unit: 'kg', category: 'vegetable' },
  { name: 'Brinjal',   aliases: ['baingan', 'వంకాయ'],     unit: 'kg', category: 'vegetable' },
  { name: 'Chilli',    aliases: ['mirchi', 'మిర్చి'],      unit: 'kg', category: 'spice'     },
  { name: 'Turmeric',  aliases: ['haldi', 'పసుపు'],        unit: 'kg', category: 'spice'     },
  { name: 'Rice',      aliases: ['chawal', 'బియ్యం'],      unit: 'kg', category: 'grain'     },
  { name: 'Wheat',     aliases: ['gehun', 'గోధుమ'],        unit: 'kg', category: 'grain'     },
  { name: 'Maize',     aliases: ['makka', 'మొక్కజొన్న'],  unit: 'kg', category: 'grain'     },
  { name: 'Cotton',    aliases: ['kapas', 'పత్తి'],         unit: 'kg', category: 'fiber'     },
  { name: 'Groundnut', aliases: ['moongfali', 'వేరుశనగ'], unit: 'kg', category: 'oilseed'  },
  { name: 'Sugarcane', aliases: ['ganna', 'చెరకు'],         unit: 'kg', category: 'cash_crop' },
  { name: 'Tobacco',   aliases: ['tambakhu', 'పొగాకు'],     unit: 'kg', category: 'cash_crop' },
  { name: 'Paddy',     aliases: ['dhan', 'వరి'],             unit: 'kg', category: 'grain'     },
  { name: 'Soybean',   aliases: ['soya', 'సోయాబీన్'],       unit: 'kg', category: 'oilseed'  },
];

// 21 Real APMC Markets across Telangana & Andhra Pradesh
const MARKETS = [
  {
    name: 'Bowenpally Market Yard',
    location: { type: 'Point', coordinates: [78.4867, 17.4739] },
    address: 'Bowenpally, Secunderabad, Telangana',
    state: 'Telangana',
    district: 'Hyderabad',
    contactInfo: '+91-40-27742525',
    operatingHours: '4:00 AM – 1:00 PM',
  },
  {
    name: 'Gaddiannaram Fruit & Veg Mandi',
    location: { type: 'Point', coordinates: [78.5480, 17.3616] },
    address: 'Gaddiannaram, Dilsukhnagar, Hyderabad, Telangana',
    state: 'Telangana',
    district: 'Hyderabad',
    contactInfo: '+91-40-24054321',
    operatingHours: '5:00 AM – 2:00 PM',
  },
  {
    name: 'Shamshabad Agri Market',
    location: { type: 'Point', coordinates: [78.4210, 17.2543] },
    address: 'Shamshabad NH 44, Ranga Reddy, Telangana',
    state: 'Telangana',
    district: 'Ranga Reddy',
    contactInfo: '+91-40-24010000',
    operatingHours: '6:00 AM – 2:00 PM',
  },
  {
    name: 'Warangal Enumamula APMC Market',
    location: { type: 'Point', coordinates: [79.5941, 17.9785] },
    address: 'Enumamula Yard, Warangal, Telangana',
    state: 'Telangana',
    district: 'Warangal',
    contactInfo: '+91-870-2570234',
    operatingHours: '5:30 AM – 3:00 PM',
  },
  {
    name: 'Nizamabad APMC Market',
    location: { type: 'Point', coordinates: [78.0941, 18.6725] },
    address: 'Main Yard, Nizamabad, Telangana',
    state: 'Telangana',
    district: 'Nizamabad',
    contactInfo: '+91-8462-220100',
    operatingHours: '5:30 AM – 1:30 PM',
  },
  {
    name: 'Karimnagar Agri Market Yard',
    location: { type: 'Point', coordinates: [79.1288, 18.4386] },
    address: 'Collectorate Road, Karimnagar, Telangana',
    state: 'Telangana',
    district: 'Karimnagar',
    contactInfo: '+91-878-2245600',
    operatingHours: '6:00 AM – 2:00 PM',
  },
  {
    name: 'Khammam APMC Chilli & Grain Mandi',
    location: { type: 'Point', coordinates: [80.1514, 17.2473] },
    address: 'Wyra Road, Khammam, Telangana',
    state: 'Telangana',
    district: 'Khammam',
    contactInfo: '+91-8742-231150',
    operatingHours: '5:00 AM – 2:30 PM',
  },
  {
    name: 'Mahbubnagar APMC Market Yard',
    location: { type: 'Point', coordinates: [77.9827, 16.7488] },
    address: 'Raichur Road, Mahbubnagar, Telangana',
    state: 'Telangana',
    district: 'Mahbubnagar',
    contactInfo: '+91-8542-225300',
    operatingHours: '6:00 AM – 1:30 PM',
  },
  {
    name: 'Nalgonda APMC Market',
    location: { type: 'Point', coordinates: [79.2674, 17.0575] },
    address: 'Clock Tower Road, Nalgonda, Telangana',
    state: 'Telangana',
    district: 'Nalgonda',
    contactInfo: '+91-8682-222800',
    operatingHours: '5:30 AM – 2:00 PM',
  },
  {
    name: 'Suryapet APMC Yard',
    location: { type: 'Point', coordinates: [79.6236, 17.1439] },
    address: 'Khammam Bypass Road, Suryapet, Telangana',
    state: 'Telangana',
    district: 'Suryapet',
    contactInfo: '+91-8684-220450',
    operatingHours: '6:00 AM – 2:00 PM',
  },
  {
    name: 'Siddipet Integrated Market Yard',
    location: { type: 'Point', coordinates: [78.8522, 18.1018] },
    address: 'Hyderabad Road, Siddipet, Telangana',
    state: 'Telangana',
    district: 'Siddipet',
    contactInfo: '+91-8457-221200',
    operatingHours: '5:30 AM – 1:00 PM',
  },
  {
    name: 'Miryalaguda Major Rice Mandi',
    location: { type: 'Point', coordinates: [79.5637, 16.8722] },
    address: 'Industrial Area, Miryalaguda, Telangana',
    state: 'Telangana',
    district: 'Nalgonda',
    contactInfo: '+91-8689-252110',
    operatingHours: '6:00 AM – 4:00 PM',
  },
  {
    name: 'Adilabad Cotton & Grain Yard',
    location: { type: 'Point', coordinates: [78.5320, 19.6641] },
    address: 'APMC Complex, Adilabad, Telangana',
    state: 'Telangana',
    district: 'Adilabad',
    contactInfo: '+91-8732-226400',
    operatingHours: '6:00 AM – 1:00 PM',
  },
  {
    name: 'Guntur Asia-Largest Mirchi Yard',
    location: { type: 'Point', coordinates: [80.4365, 16.3067] },
    address: 'Mirchi Yard Road, Guntur, Andhra Pradesh',
    state: 'Andhra Pradesh',
    district: 'Guntur',
    contactInfo: '+91-863-2234500',
    operatingHours: '4:00 AM – 3:00 PM',
  },
  {
    name: 'Kurnool APMC Onion & Grain Yard',
    location: { type: 'Point', coordinates: [78.0373, 15.8281] },
    address: 'Bellary Road, Kurnool, Andhra Pradesh',
    state: 'Andhra Pradesh',
    district: 'Kurnool',
    contactInfo: '+91-8518-241200',
    operatingHours: '5:00 AM – 2:00 PM',
  },
  {
    name: 'Vijayawada Gollapudi Wholesale Market',
    location: { type: 'Point', coordinates: [80.5753, 16.5417] },
    address: 'Gollapudi, Vijayawada, Andhra Pradesh',
    state: 'Andhra Pradesh',
    district: 'Krishna',
    contactInfo: '+91-866-2415800',
    operatingHours: '4:30 AM – 2:00 PM',
  },
  {
    name: 'Nellore APMC Rice Market',
    location: { type: 'Point', coordinates: [79.9865, 14.4426] },
    address: 'Vedayapalem, Nellore, Andhra Pradesh',
    state: 'Andhra Pradesh',
    district: 'Nellore',
    contactInfo: '+91-861-2320100',
    operatingHours: '5:00 AM - 3:00 PM',
  },
  {
    name: 'Ongole Wholesale Market Yard',
    location: { type: 'Point', coordinates: [80.0499, 15.5057] },
    address: 'NH16 Bypass, Ongole, Andhra Pradesh',
    state: 'Andhra Pradesh',
    district: 'Prakasam',
    contactInfo: '+91-8592-234400',
    operatingHours: '5:30 AM - 2:00 PM',
  },
  {
    name: 'Tirupati APMC Fruits & Vegetables',
    location: { type: 'Point', coordinates: [79.4192, 13.6288] },
    address: 'Renigunta Road, Tirupati, Andhra Pradesh',
    state: 'Andhra Pradesh',
    district: 'Chittoor',
    contactInfo: '+91-877-2230100',
    operatingHours: '4:30 AM - 1:30 PM',
  },
  {
    name: 'Kakinada Rythu Bazaar',
    location: { type: 'Point', coordinates: [82.2475, 16.9891] },
    address: 'Main Road, Kakinada, Andhra Pradesh',
    state: 'Andhra Pradesh',
    district: 'East Godavari',
    contactInfo: '+91-884-2361800',
    operatingHours: '6:00 AM - 2:00 PM',
  },
  {
    name: 'Vizag Rythu Bazaar',
    location: { type: 'Point', coordinates: [83.2185, 17.6868] },
    address: 'Dwaraka Nagar, Visakhapatnam, Andhra Pradesh',
    state: 'Andhra Pradesh',
    district: 'Visakhapatnam',
    contactInfo: '+91-891-2711100',
    operatingHours: '5:00 AM - 2:00 PM',
  },
];

// Base prices per crop (₹/kg) across all 21 markets
const BASE_PRICES = {
  Tomato:    [24, 25, 22, 20, 18, 19, 21, 18, 20, 21, 22, 19, 17, 26, 23, 27, 24, 25, 23, 26, 28],
  Onion:     [22, 23, 20, 18, 16, 17, 19, 17, 18, 19, 20, 17, 16, 21, 24, 22, 20, 21, 22, 21, 23],
  Potato:    [18, 19, 17, 15, 14, 15, 16, 14, 15, 16, 17, 15, 13, 20, 18, 21, 19, 18, 20, 19, 22],
  Brinjal:   [16, 17, 15, 13, 12, 14, 14, 12, 13, 14, 15, 13, 11, 18, 16, 19, 15, 16, 17, 18, 20],
  Chilli:    [95, 98, 90, 88, 80, 82, 105, 84, 86, 92, 88, 85, 78, 120, 92, 110, 95, 98, 92, 94, 96],
  Turmeric:  [85, 88, 80, 78, 92, 82, 79, 74, 76, 78, 81, 75, 70, 90, 82, 94, 86, 88, 85, 87, 89],
  Rice:      [32, 33, 30, 28, 27, 29, 28, 27, 29, 30, 31, 35, 26, 31, 29, 34, 30, 32, 31, 33, 35],
  Wheat:     [25, 26, 24, 22, 21, 23, 22, 22, 23, 24, 25, 22, 21, 27, 25, 28, 26, 27, 26, 28, 29],
  Maize:     [21, 22, 19, 18, 17, 19, 18, 17, 18, 19, 20, 18, 16, 22, 20, 23, 21, 22, 20, 22, 24],
  Cotton:    [62, 64, 58, 60, 56, 59, 61, 55, 57, 58, 60, 56, 68, 65, 59, 66, 63, 67, 62, 65, 64],
  Groundnut: [65, 68, 62, 60, 58, 61, 67, 57, 59, 62, 63, 60, 72, 70, 64, 68, 71, 66, 63, 69, 70],
  Sugarcane: [ 3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  4,  3,  4,  4,  4,  3,  4,  4],
  Tobacco:   [85, 88, 80, 78, 82, 84, 87, 76, 79, 81, 83, 78, 90, 95, 88, 92, 91, 89, 87, 93, 94],
  Paddy:     [20, 21, 19, 18, 17, 18, 20, 18, 19, 20, 21, 22, 16, 22, 20, 23, 23, 22, 20, 24, 25],
  Soybean:   [42, 44, 40, 38, 36, 38, 41, 37, 39, 40, 42, 39, 45, 46, 42, 47, 47, 45, 43, 48, 49],
};

const QUALITY_MULTIPLIERS = { A: 1.00, B: 0.85, C: 0.70 };

/**
 * Deterministic historical price calculator:
 * Guarantees:
 * - Grade A > Grade B > Grade C strictly
 * - No negative prices
 * - Consistent sinusoidal daily variation across past dates
 * - Completely reproducible output
 */
function getDeterministicHistoricalPrice(cropName, marketIdx, quality = 'A', dayOffset = 0) {
  const basePrices = BASE_PRICES[cropName] || BASE_PRICES.Tomato;
  const basePrice = basePrices[marketIdx % basePrices.length] || 20;

  // Predictable, realistic seasonal cycle: +/- 8% amplitude
  const cycle = Math.sin(dayOffset * 0.28 + marketIdx * 0.42);
  const adjustedBase = basePrice * (1 + cycle * 0.08);

  const multiplier = QUALITY_MULTIPLIERS[quality] || 1.0;
  const rawPrice = adjustedBase * multiplier;

  // Round to 1 decimal place, minimum price ₹3/kg
  return Math.max(3.0, Math.round(rawPrice * 10) / 10);
}

async function autoSeedDatabase(Crop, Market, PriceRecord) {
  const count = await Crop.countDocuments();
  if (count > 0) {
    return; // Already seeded
  }

  console.log('🌾 Initializing and auto-seeding mock markets and crops...');
  const cropDocs = await Crop.insertMany(CROPS);
  const allCropIds = cropDocs.map((c) => c._id);
  const marketDataWithCrops = MARKETS.map((m) => ({
    ...m,
    supportedCrops: allCropIds,
  }));
  const marketDocs = await Market.insertMany(marketDataWithCrops);

  const priceRecords = [];
  const now = new Date();

  for (let day = 0; day < 30; day++) {
    const recordDate = new Date(now);
    recordDate.setDate(recordDate.getDate() - day);
    recordDate.setHours(6, 0, 0, 0); // 6:00 AM auction opening

    marketDocs.forEach((market, mIdx) => {
      cropDocs.forEach((crop) => {
        ['A', 'B', 'C'].forEach((quality) => {
          const price = getDeterministicHistoricalPrice(crop.name, mIdx, quality, day);

          priceRecords.push({
            market: market._id,
            crop: crop._id,
            pricePerUnit: price,
            quality,
            date: recordDate,
            source: 'seed',
            isDemoData: true,
          });
        });
      });
    });
  }

  const BATCH_SIZE = 500;
  for (let i = 0; i < priceRecords.length; i += BATCH_SIZE) {
    await PriceRecord.insertMany(priceRecords.slice(i, i + BATCH_SIZE));
  }
  console.log(`✅ Auto-seed complete: ${cropDocs.length} crops, ${marketDocs.length} markets, ${priceRecords.length} prices.`);
}

module.exports = {
  autoSeedDatabase,
  CROPS,
  MARKETS,
  BASE_PRICES,
  QUALITY_MULTIPLIERS,
  getDeterministicHistoricalPrice,
};
