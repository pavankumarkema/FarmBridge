import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { 
  TrendingUp, 
  MapPin, 
  Layers, 
  ArrowRight, 
  Sparkles, 
  CloudSun, 
  BarChart3, 
  ShieldCheck, 
  Lightbulb, 
  DollarSign, 
  ExternalLink,
  ChevronRight,
  UserCheck
} from 'lucide-react';
import api from '../services/api';

export default function Dashboard() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [weather, setWeather] = useState(null);
  const [loadingWeather, setLoadingWeather] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    // Fetch quick weather for farmer's region (default to Guntur or AP capital region)
    api.get('/weather?city=Guntur')
      .then((res) => setWeather(res.data))
      .catch((err) => console.error('Weather fetch error:', err))
      .finally(() => setLoadingWeather(false));
  }, [user, navigate]);

  if (!user) return null;

  const apHighlights = [
    {
      crop: 'Tomato',
      icon: '🍅',
      unit: 'kg',
      rates: [
        { market: 'Guntur', price: 26, trend: '+₹2' },
        { market: 'Vijayawada', price: 27, trend: '+₹3' },
        { market: 'Nellore', price: 24, trend: 'stable' },
      ],
    },
    {
      crop: 'Onion',
      icon: '🧅',
      unit: 'kg',
      rates: [
        { market: 'Kurnool', price: 24, trend: '+₹2' },
        { market: 'Vijayawada', price: 22, trend: 'stable' },
        { market: 'Vizag', price: 23, trend: '+₹1' },
      ],
    },
    {
      crop: 'Chilli',
      icon: '🌶️',
      unit: 'kg',
      rates: [
        { market: 'Guntur', price: 120, trend: '+₹8' },
        { market: 'Ongole', price: 98, trend: '+₹4' },
        { market: 'Kurnool', price: 92, trend: 'stable' },
      ],
    },
    {
      crop: 'Paddy (BPT)',
      icon: '🌾',
      unit: 'kg',
      rates: [
        { market: 'Kakinada', price: 24, trend: '+₹2' },
        { market: 'Vizag', price: 23, trend: '+₹1' },
        { market: 'Nellore', price: 22, trend: 'stable' },
      ],
    },
    {
      crop: 'Groundnut',
      icon: '🥜',
      unit: 'kg',
      rates: [
        { market: 'Kurnool', price: 70, trend: '+₹4' },
        { market: 'Tirupati', price: 68, trend: '+₹2' },
        { market: 'Nellore', price: 66, trend: 'stable' },
      ],
    },
  ];

  const farmerTips = [
    {
      title: 'Groundnut Season Peak',
      text: 'Sell Groundnut after October for better prices in Kurnool APMC yard.',
      tag: 'Market Timing',
    },
    {
      title: 'Guntur Mirchi Early Bird',
      text: 'Guntur chilli market opens auction at 4:00 AM for best Grade A rates.',
      tag: 'Best Rates',
    },
    {
      title: 'Nellore BPT Paddy Premium',
      text: 'Nellore BPT paddy commands premium in state procurement centers & mills.',
      tag: 'Procurement',
    },
    {
      title: 'Coastal Market Arbitrage',
      text: 'Vizag coastal mandis show 10-15% higher vegetable prices due to port demand.',
      tag: 'High Profit',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      {/* Top Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-800 text-white p-6 sm:p-10 shadow-xl">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-10 w-48 h-48 bg-emerald-400/10 rounded-full blur-xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-emerald-100 border border-white/20">
              <UserCheck className="w-3.5 h-3.5 text-emerald-300" />
              <span>{user.role === 'farmer' ? '🌾 Verified Farmer' : '🛒 Verified Buyer'}</span>
              {user.district && <span className="text-white/80">• {user.district}</span>}
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              Welcome back, {user.name}!
            </h1>
            <p className="text-emerald-100/90 text-sm sm:text-base max-w-xl">
              Live mandi intelligence for Telangana & Andhra Pradesh. Maximize your crop profits today with realtime price discovery.
            </p>
          </div>

          {/* Quick Weather Capsule in Banner */}
          {weather && (
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 min-w-[200px] flex items-center gap-3 self-start md:self-auto">
              <div className="p-2.5 bg-emerald-500/30 rounded-xl text-2xl">
                ☀️
              </div>
              <div>
                <div className="text-xs font-medium text-emerald-200">Guntur Weather</div>
                <div className="text-xl font-bold">{weather.temp || weather.temperature}°C</div>
                <div className="text-[11px] text-emerald-100">{weather.description || weather.condition}</div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Quick Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="card p-5 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Markets Available</span>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <MapPin className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-3xl font-black text-gray-900">21</div>
            <div className="text-xs text-emerald-600 font-semibold mt-1">13 Telangana + 8 Andhra Pradesh</div>
          </div>
        </div>

        <div className="card p-5 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Crops Tracked</span>
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center font-bold">
              <Layers className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-3xl font-black text-gray-900">15</div>
            <div className="text-xs text-teal-600 font-semibold mt-1">Grains, Pulses, Spices & Cash Crops</div>
          </div>
        </div>

        <div className="card p-5 bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200/80 rounded-2xl shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700">Today's Best Deal</span>
            <div className="w-10 h-10 rounded-xl bg-amber-200/80 text-amber-800 flex items-center justify-center font-bold">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black text-gray-900">Guntur Mirchi Yard</div>
            <div className="text-xs font-bold text-amber-800 mt-1">Chilli @ ₹120 / kg (Grade A)</div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-emerald-600" />
          Quick Actions
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Link
            to="/compare"
            className="group p-4 bg-white border border-gray-200 rounded-2xl shadow-2xs hover:border-emerald-500 hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <DollarSign className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-gray-900 text-sm group-hover:text-emerald-700 transition-colors">Compare Prices</div>
              <div className="text-xs text-gray-500 mt-0.5">Find best mandi for your harvest</div>
            </div>
          </Link>

          <Link
            to="/markets"
            className="group p-4 bg-white border border-gray-200 rounded-2xl shadow-2xs hover:border-emerald-500 hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-gray-900 text-sm group-hover:text-teal-700 transition-colors">View Mandis</div>
              <div className="text-xs text-gray-500 mt-0.5">Directory of 21 APMC yards</div>
            </div>
          </Link>

          <Link
            to="/compare"
            className="group p-4 bg-white border border-gray-200 rounded-2xl shadow-2xs hover:border-emerald-500 hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <BarChart3 className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-gray-900 text-sm group-hover:text-sky-700 transition-colors">Price Trends</div>
              <div className="text-xs text-gray-500 mt-0.5">30-day historical chart analysis</div>
            </div>
          </Link>

          <Link
            to="/compare"
            className="group p-4 bg-white border border-gray-200 rounded-2xl shadow-2xs hover:border-emerald-500 hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <CloudSun className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-gray-900 text-sm group-hover:text-amber-700 transition-colors">Weather Advisory</div>
              <div className="text-xs text-gray-500 mt-0.5">Harvest weather forecasts</div>
            </div>
          </Link>
        </div>
      </div>

      {/* AP Region Highlights: Today's Best Prices */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <span>🌾</span>
              <span>Andhra Pradesh & Telangana Best Mandi Rates</span>
            </h2>
            <p className="text-sm text-gray-500">Live rate cards across major AP & Telangana trade centers</p>
          </div>
          <Link
            to="/compare"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800"
          >
            Explore all 15 crops <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {apHighlights.map((item) => (
            <div
              key={item.crop}
              className="card bg-white border border-gray-200/90 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-emerald-300 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                  <div className="flex items-center gap-2.5">
                    <span className="text-2xl">{item.icon}</span>
                    <div>
                      <h3 className="font-bold text-gray-900 text-base">{item.crop}</h3>
                      <span className="text-[11px] text-gray-400 uppercase font-semibold">Per {item.unit}</span>
                    </div>
                  </div>
                  <Link
                    to="/compare"
                    className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg hover:bg-emerald-100 transition-colors"
                  >
                    Compare
                  </Link>
                </div>

                <div className="mt-3 space-y-2">
                  {item.rates.map((r, i) => (
                    <div key={i} className="flex items-center justify-between py-1 px-2 rounded-lg bg-gray-50 text-xs">
                      <span className="font-medium text-gray-700">{r.market}</span>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-gray-900">₹{r.price}/{item.unit}</span>
                        <span className={`text-[10px] font-bold ${r.trend.startsWith('+') ? 'text-emerald-600' : 'text-gray-400'}`}>
                          {r.trend}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Farmer Tips Section */}
      <div className="bg-gradient-to-br from-emerald-50/70 via-white to-teal-50/50 border border-emerald-200/70 rounded-3xl p-6 sm:p-8">
        <div className="flex items-center gap-2.5 mb-5">
          <div className="p-2 bg-emerald-600 text-white rounded-xl">
            <Lightbulb className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900">Expert Farmer Trade Advisory</h2>
            <p className="text-xs text-gray-500">Market intelligence recommendations for AP & Telangana farmers</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {farmerTips.map((tip, i) => (
            <div key={i} className="p-4 bg-white rounded-2xl border border-emerald-100 shadow-2xs space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-800">{tip.title}</span>
                <span className="text-[10px] uppercase font-extrabold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-md">
                  {tip.tag}
                </span>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">{tip.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
