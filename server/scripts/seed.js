/**
 * Seed Script — FramBridge
 * Populates MongoDB with:
 *  - 15 crops (including AP crops)
 *  - 21 markets across Telangana & Andhra Pradesh
 *  - PriceRecords for each market × crop × quality for the last 30 days
 *  - 5 Demo Users
 *
 * Run: node server/scripts/seed.js
 */

// Load from server/.env (one level up from scripts/)
require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });

const mongoose = require('mongoose');
const Crop = require('../models/Crop');
const Market = require('../models/Market');
const PriceRecord = require('../models/PriceRecord');
const User = require('../models/User');
const {
  CROPS,
  MARKETS,
  BASE_PRICES,
  QUALITY_MULTIPLIERS,
  getDeterministicHistoricalPrice,
} = require('../services/seedHelper');

const DEMO_USERS = [
  { name: 'Ravi Kumar', phone: '9876543210', email: 'ravi.farmer@frambridge.com', password: 'farmer123', role: 'farmer' },
  { name: 'Priya Devi', phone: '9876543211', email: 'priya.farmer@frambridge.com', password: 'farmer123', role: 'farmer' },
  { name: 'Suresh Reddy', phone: '9876543212', email: 'suresh.buyer@frambridge.com', password: 'buyer123', role: 'buyer' },
  { name: 'Anitha Rao', phone: '9876543213', email: 'anitha.buyer@frambridge.com', password: 'buyer123', role: 'buyer' },
  { name: 'Admin User', phone: '9000000001', email: 'admin@frambridge.com', password: 'password123', role: 'farmer' },
];

// ─── Main Seed Function ───────────────────────────────────────────────────────

async function seed() {
  console.log('🌱  Connecting to MongoDB...');
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('✅  Connected\n');

  // Clear existing data
  console.log('🗑️   Clearing existing data...');
  await Promise.all([
    Crop.deleteMany({}),
    Market.deleteMany({}),
    PriceRecord.deleteMany({}),
    User.deleteMany({}),
  ]);

  // Insert crops
  console.log('🌾  Seeding crops...');
  const cropDocs = await Crop.insertMany(CROPS);
  console.log(`   ✓ ${cropDocs.length} crops inserted`);

  // Insert markets (all crops supported by all markets)
  console.log('🏪  Seeding markets...');
  const allCropIds = cropDocs.map((c) => c._id);
  const marketDataWithCrops = MARKETS.map((m) => ({
    ...m,
    supportedCrops: allCropIds,
  }));
  const marketDocs = await Market.insertMany(marketDataWithCrops);
  console.log(`   ✓ ${marketDocs.length} markets inserted`);

  // Insert price records — 30 days of history for each market × crop × quality
  console.log(`💰  Seeding price records (30 days × ${marketDocs.length} markets × ${cropDocs.length} crops × 3 qualities)...`);
  const priceRecords = [];
  const now = new Date();

  for (let day = 0; day < 30; day++) {
    const recordDate = new Date(now);
    recordDate.setDate(recordDate.getDate() - day);
    recordDate.setHours(6, 0, 0, 0);

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

  // Insert in batches to avoid memory issues
  const BATCH_SIZE = 500;
  for (let i = 0; i < priceRecords.length; i += BATCH_SIZE) {
    await PriceRecord.insertMany(priceRecords.slice(i, i + BATCH_SIZE));
  }
  console.log(`   ✓ ${priceRecords.length} price records inserted`);

  // Insert demo users
  console.log('👤  Seeding demo users...');
  for (const u of DEMO_USERS) {
    await User.create(u);
  }
  console.log('   ✓ 5 demo users seeded');

  console.log('\n🎉  Seed complete!');
  console.log('\n📋  Crop IDs (use these to test /api/compare):');
  cropDocs.forEach((c) => console.log(`   ${c.name.padEnd(12)} → ${c._id}`));

  await mongoose.disconnect();
  process.exit(0);
}

seed().catch((err) => {
  console.error('❌  Seed error:', err);
  process.exit(1);
});
