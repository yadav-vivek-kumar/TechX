/**
 * TechX — Next-Gen Hardware Storefront & E-Commerce Engine
 * High-performance vanilla JS SPA with live filtering, slide drawers,
 * quick-view modals, coupon engine, and theme persistence.
 */

// =============================================================================
// 1. PRODUCT CATALOG DATASET
// =============================================================================

const products = [
  {
    id: 0,
    name: 'Pulse Pro Wireless Headphones',
    category: 'Audio',
    price: 19990,
    originalPrice: 24990,
    rating: 4.9,
    reviewsCount: 142,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80',
    badge: 'BESTSELLER',
    inStock: true,
    colors: ['#0d1117', '#e2e8f0', '#ff5e1f'],
    description: 'Studio-grade acoustic architecture with active hybrid noise cancellation and 40-hour ultra-low latency playback.',
    specs: {
      'Acoustic Driver': '40mm Custom Titanium',
      'Battery Life': '40 Hours (ANC On)',
      'Connectivity': 'Bluetooth 5.4 / 2.4GHz Lossless',
      'Weight': '248g',
      'Fast Charge': '10 mins = 5 hrs',
      'Warranty': '2 Years Official'
    }
  },
  {
    id: 1,
    name: 'Orbit X1 Titanium Smartwatch',
    category: 'Wearables',
    price: 14990,
    originalPrice: 18990,
    rating: 4.8,
    reviewsCount: 98,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80',
    badge: 'NEW',
    inStock: true,
    colors: ['#1e293b', '#64748b', '#ff5e1f'],
    description: 'Aerospace-grade titanium chassis with sapphire crystal AMOLED display and advanced biometric health sensors.',
    specs: {
      'Display': '1.43" AMOLED 1000 nits',
      'Material': 'Grade 5 Titanium',
      'Battery': '14 Days Typical Use',
      'Water Resistance': '50m (5 ATM)',
      'Sensors': 'ECG, SpO2, HRV, Dual GPS',
      'Warranty': '2 Years Official'
    }
  },
  {
    id: 2,
    name: 'NovaBook Air M3 Flagship',
    category: 'Computers',
    price: 89990,
    originalPrice: 99990,
    rating: 5.0,
    reviewsCount: 64,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&auto=format&fit=crop&q=80',
    badge: 'FEATURED',
    inStock: true,
    colors: ['#0f172a', '#cbd5e1'],
    description: 'Unmatched computational efficiency in an ultrathin CNC aluminum unibody. Engineered for creators and engineers.',
    specs: {
      'Processor': '12-Core Neural Silicon',
      'Memory': '32GB Unified LPDDR5X',
      'Storage': '1TB NVMe PCIe 4.0',
      'Display': '14.2" Liquid Retina XDR',
      'Battery': 'Up to 22 Hours',
      'Warranty': '3 Years AppleCare+'
    }
  },
  {
    id: 3,
    name: 'Lens Mini 4K Cinema Pocket',
    category: 'Cameras',
    price: 39990,
    originalPrice: 45990,
    rating: 4.7,
    reviewsCount: 45,
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&auto=format&fit=crop&q=80',
    badge: 'POPULAR',
    inStock: true,
    colors: ['#000000'],
    description: 'Compact 4K 120fps video powerhouse with 1-inch stacked CMOS sensor, 3-axis mechanical stabilization, and ProRes raw recording.',
    specs: {
      'Sensor': '1-Inch Stacked CMOS 20MP',
      'Video': '4K @ 120fps 10-bit HDR',
      'Stabilization': '3-Axis Gimbal Built-in',
      'Storage': 'MicroSD UHS-II & NVMe',
      'Weight': '179g',
      'Warranty': '2 Years'
    }
  },
  {
    id: 4,
    name: 'Arc Mechanical Tactile Keyboard',
    category: 'Accessories',
    price: 8990,
    originalPrice: 10990,
    rating: 4.9,
    reviewsCount: 112,
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&auto=format&fit=crop&q=80',
    badge: 'HOT',
    inStock: true,
    colors: ['#1e1e2e', '#e2e8f0'],
    description: 'Gasket-mounted mechanical keyboard with CNC aluminum frame, hot-swappable tactile switches, and acoustic foam dampening.',
    specs: {
      'Layout': '75% Compact (82 Keys)',
      'Switches': 'Custom Pre-lubed Tactile',
      'Keycaps': 'Double-shot PBT Cherry Profile',
      'Connectivity': 'Tri-mode (Type-C / 2.4G / BT)',
      'Battery': '4000 mAh Rechargeable',
      'Warranty': '2 Years'
    }
  },
  {
    id: 5,
    name: 'Halo Smart Hub & Ambient Core',
    category: 'Smart Home',
    price: 12990,
    originalPrice: 15990,
    rating: 4.6,
    reviewsCount: 38,
    image: 'https://images.unsplash.com/photo-1543512214-318c7553f230?w=800&auto=format&fit=crop&q=80',
    badge: 'NEW',
    inStock: true,
    colors: ['#0f172a', '#ffffff'],
    description: 'Matter & Thread unified smart home command center with localized AI edge processing and ambient aura projection.',
    specs: {
      'Protocol': 'Matter, Thread, Zigbee 3.0',
      'Audio': '360 Spatial Acoustic Engine',
      'Microphones': 'Far-field 4-mic Array',
      'Edge AI': 'Local Voice Execution',
      'Security': 'Encrypted Hardware Vault',
      'Warranty': '2 Years'
    }
  },
  {
    id: 6,
    name: 'Vertex Precision Gaming Mouse',
    category: 'Gaming',
    price: 4990,
    originalPrice: 6490,
    rating: 4.8,
    reviewsCount: 89,
    image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=800&auto=format&fit=crop&q=80',
    badge: '20% OFF',
    inStock: true,
    colors: ['#090d16', '#ff5e1f'],
    description: 'Ultralight 49g competitive gaming mouse with 32,000 DPI optical sensor, optical switches, and 8,000Hz polling rate.',
    specs: {
      'Sensor': 'PixArt 3395 (32K DPI)',
      'Polling Rate': '8000Hz Ultra-Low Latency',
      'Weight': '49g Featherweight',
      'Switches': 'Optical 100M Clicks',
      'Battery': '90 Hours Gaming',
      'Warranty': '2 Years'
    }
  },
  {
    id: 7,
    name: 'Vision OLED 55 4K 144Hz Monitor',
    category: 'Computers',
    price: 74990,
    originalPrice: 84990,
    rating: 4.9,
    reviewsCount: 52,
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&auto=format&fit=crop&q=80',
    badge: 'FEATURED',
    inStock: true,
    colors: ['#0f172a'],
    description: 'Quantum Dot OLED display with true black 0.03ms response time, 99.3% DCI-P3 color gamut, and 90W USB-C power delivery.',
    specs: {
      'Panel': 'QD-OLED 4K UHD 144Hz',
      'Response Time': '0.03ms (GtG)',
      'Color Accuracy': 'Delta E < 1, 99.3% DCI-P3',
      'Ports': 'HDMI 2.1, DP 1.4, USB-C 90W',
      'HDR': 'VESA DisplayHDR True Black 400',
      'Warranty': '3 Years Burn-in Guarantee'
    }
  },
  {
    id: 8,
    name: 'Echo Mini Hi-Fi Spatial Speaker',
    category: 'Audio',
    price: 6990,
    originalPrice: 8990,
    rating: 4.7,
    reviewsCount: 76,
    image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&auto=format&fit=crop&q=80',
    badge: 'SALE',
    inStock: true,
    colors: ['#1e293b', '#cbd5e1', '#ff5e1f'],
    description: 'Room-filling 360-degree acoustic clarity with dual passive bass radiators, IP67 waterproof certification, and party sync.',
    specs: {
      'Output': '35W RMS Hi-Fi Driver',
      'Waterproof': 'IP67 Submersible',
      'Battery': '18 Hours Continuous',
      'Stereo Pair': 'Multi-room Sync Support',
      'Bluetooth': '5.3 LE Audio Ready',
      'Warranty': '1 Year'
    }
  },
  {
    id: 9,
    name: 'PixelTab 11 Ultra Pro Tablet',
    category: 'Computers',
    price: 32990,
    originalPrice: 38990,
    rating: 4.8,
    reviewsCount: 41,
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&auto=format&fit=crop&q=80',
    badge: 'NEW',
    inStock: true,
    colors: ['#0f172a', '#94a3b8'],
    description: '120Hz 2.8K OLED display paired with stylus pressure sensitivity, quad Dolby Atmos speakers, and desktop productivity mode.',
    specs: {
      'Display': '11.2" OLED 120Hz 2.8K',
      'Processor': 'Snapdragon 8-Gen Chip',
      'Stylus': 'Magnetic 4096 Levels (Included)',
      'Storage': '256GB UFS 4.0 / 8GB RAM',
      'Battery': '8600 mAh Fast Charge',
      'Warranty': '2 Years'
    }
  },
  {
    id: 10,
    name: 'Aero Drone 4K Pro Cinematics',
    category: 'Cameras',
    price: 54990,
    originalPrice: 62990,
    rating: 4.9,
    reviewsCount: 33,
    image: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=800&auto=format&fit=crop&q=80',
    badge: 'PRO',
    inStock: true,
    colors: ['#334155'],
    description: 'Sub-249g regulation-friendly drone with omnidirectional obstacle avoidance, 4K HDR 60fps camera, and 12km video transmission.',
    specs: {
      'Weight': '246g (No License Required)',
      'Flight Time': '38 Minutes Max',
      'Camera': '1/1.3" CMOS f/1.7 4K HDR',
      'Range': '12km OcuSync 4.0',
      'Wind Resistance': 'Level 5 (38 km/h)',
      'Warranty': '2 Years Care Refresh'
    }
  },
  {
    id: 11,
    name: 'ChargeDock Duo MagSafe Stand',
    category: 'Accessories',
    price: 3490,
    originalPrice: 4490,
    rating: 4.9,
    reviewsCount: 168,
    image: 'https://images.unsplash.com/photo-1586816879360-004f5b0c51e3?w=800&auto=format&fit=crop&q=80',
    badge: 'POPULAR',
    inStock: true,
    colors: ['#0f172a', '#e2e8f0'],
    description: 'Precision machined anodized aluminum 2-in-1 fast wireless charging tree for your phone and earbuds simultaneously.',
    specs: {
      'Output': '15W Fast MagSafe + 5W Qi',
      'Material': 'Aerospace Anodized Aluminum',
      'Safety': 'Foreign Object & Thermal Guard',
      'Cable': 'Braided 1.5m USB-C Included',
      'Footprint': 'Weighted Anti-Slip Base',
      'Warranty': 'Lifetime Limited'
    }
  },
  {
    id: 12,
    name: 'CyberAura Smart RGB Bar Light',
    category: 'Smart Home',
    price: 3990,
    originalPrice: 4990,
    rating: 4.7,
    reviewsCount: 84,
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=80',
    badge: 'TRENDING',
    inStock: true,
    colors: ['#1e293b'],
    description: 'Screen-sync ambient backlighting with music rhythm reaction, Matter integration, and 16 million customizable dynamic gradients.',
    specs: {
      'Luminance': '600 Lumens Full RGBIC',
      'Connectivity': 'Wi-Fi 2.4G & Bluetooth',
      'Screen Sync': 'Zero-Lag HDMI/PC Software',
      'App Control': 'TechX Aura iOS/Android',
      'Length': '38cm Dual Lightbars',
      'Warranty': '1 Year'
    }
  },
  {
    id: 13,
    name: 'Stealth ANC True Wireless Earbuds',
    category: 'Audio',
    price: 7990,
    originalPrice: 9990,
    rating: 4.8,
    reviewsCount: 92,
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&auto=format&fit=crop&q=80',
    badge: 'HOT',
    inStock: true,
    colors: ['#090d16', '#ffffff'],
    description: 'Ultra-ergonomic fit with 48dB active noise reduction, dual driver clarity, and crystal-clear triple-mic ENC calling.',
    specs: {
      'Driver': '10mm Dynamic + Balanced Armature',
      'Battery': '32 Hours Total with Case',
      'Waterproof': 'IPX5 Sweat & Rain Resistance',
      'Audio Codec': 'LDAC, AAC, AptX Adaptive',
      'Wireless Charge': 'Qi Case Supported',
      'Warranty': '2 Years'
    }
  },
  {
    id: 14,
    name: 'Quantum 100W GaN Fast PowerBank',
    category: 'Accessories',
    price: 5490,
    originalPrice: 6990,
    rating: 4.9,
    reviewsCount: 119,
    image: 'https://images.unsplash.com/photo-1609592424369-0df4b3ffc6b0?w=800&auto=format&fit=crop&q=80',
    badge: 'ESSENTIAL',
    inStock: true,
    colors: ['#1e293b'],
    description: '25,000mAh airline-approved power hub capable of charging laptops, phones, and consoles at full 100W Power Delivery speed.',
    specs: {
      'Capacity': '25,000mAh / 92.5Wh (Flight Safe)',
      'Max Output': '100W PD 3.0 via Type-C',
      'Ports': '2x USB-C + 1x USB-A Fast Charge',
      'Smart Screen': 'Live Wattage, Temp, Battery %',
      'Recharge Time': '0 to 100% in 50 minutes',
      'Warranty': '2 Years'
    }
  },
  {
    id: 15,
    name: 'AeroPulse Ergonomic Studio Chair',
    category: 'Accessories',
    price: 24990,
    originalPrice: 29990,
    rating: 4.9,
    reviewsCount: 57,
    image: 'https://images.unsplash.com/photo-1580481077190-7361346d1807?w=800&auto=format&fit=crop&q=80',
    badge: 'NEW',
    inStock: true,
    colors: ['#0f172a', '#64748b'],
    description: 'Dynamic spinal support engineered with breathable matrix mesh, 4D adjustable armrests, and 135-degree recline balance.',
    specs: {
      'Chassis': 'Die-cast Aluminum Base',
      'Mesh': 'Breathable Elastomeric Polymer',
      'Armrests': '4D (Height, Angle, Depth, Width)',
      'Weight Capacity': '150 kg (330 lbs)',
      'Gas Lift': 'Class 4 Heavy Duty Cylinder',
      'Warranty': '5 Years Comprehensive'
    }
  },
  {
    id: 16,
    name: 'Vision Spatial AR Pro Glasses',
    category: 'Wearables',
    price: 64990,
    originalPrice: 74990,
    rating: 4.9,
    reviewsCount: 67,
    image: 'https://images.unsplash.com/photo-1622979135225-d2ba269bc1df?w=800&auto=format&fit=crop&q=80',
    badge: 'SPATIAL AI',
    inStock: true,
    colors: ['#090d16', '#334155'],
    description: 'Dual 4K Micro-OLED spatial display with 120Hz refresh, neural hand-tracking, and integrated binaural acoustic transducers.',
    specs: {
      'Display': 'Dual 4K Micro-OLED (4000 PPI)',
      'FOV': '52° Immersive Optical Prism',
      'Audio': 'Binaural Spatial Acoustic Engine',
      'Weight': '78g Ultralight Titanium',
      'Battery': '4 Hours Active + Pocket Hub',
      'Warranty': '2 Years Official'
    }
  },
  {
    id: 17,
    name: 'Titanium Halo Smart Health Ring',
    category: 'Wearables',
    price: 18490,
    originalPrice: 22990,
    rating: 4.8,
    reviewsCount: 83,
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&auto=format&fit=crop&q=80',
    badge: 'NEW',
    inStock: true,
    colors: ['#0f172a', '#cbd5e1', '#ff5e1f'],
    description: 'Medical-grade biometric sensor suite cast in grade 5 titanium. Continuous body temperature, sleep stages, and real-time stress index.',
    specs: {
      'Material': 'Grade 5 Medical Titanium',
      'Water Resistance': '100m Submersible (10 ATM)',
      'Battery': '8 Days on Single Charge',
      'Weight': '3.8 grams Featherweight',
      'Sensors': 'Dual PPG, Skin Temp, 3D Accelerometer',
      'Warranty': '2 Years Official'
    }
  },
  {
    id: 18,
    name: 'AeroSound 192kHz Studio Broadcast Mic',
    category: 'Audio',
    price: 11990,
    originalPrice: 14990,
    rating: 4.9,
    reviewsCount: 94,
    image: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=800&auto=format&fit=crop&q=80',
    badge: 'CREATOR PICK',
    inStock: true,
    colors: ['#090d16', '#ff5e1f'],
    description: 'Broadcast-ready 25mm large gold-sputtered cardioid condenser with integrated analog hardware limiter and zero-latency monitoring.',
    specs: {
      'Polar Pattern': 'Cardioid / Figure-8 / Omni',
      'Sample Rate': '192kHz / 24-bit Lossless',
      'Output': 'USB-C & XLR Dual Interface',
      'Capsule': '25mm Gold-Plated Diaphragm',
      'Build': 'Solid Zinc Alloy Frame',
      'Warranty': '3 Years Official'
    }
  },
  {
    id: 19,
    name: 'SteamDeck Elite OLED Handheld',
    category: 'Gaming',
    price: 58990,
    originalPrice: 64990,
    rating: 4.9,
    reviewsCount: 147,
    image: 'https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?w=800&auto=format&fit=crop&q=80',
    badge: 'FLAGSHIP',
    inStock: true,
    colors: ['#090d16'],
    description: '7.4-inch 90Hz HDR OLED gaming handheld with custom 6nm AMD APU, 1TB NVMe storage, and hall-effect anti-drift thumbsticks.',
    specs: {
      'Screen': '7.4" HDR OLED 90Hz 1000 nits',
      'APU': 'Custom 6nm AMD Zen2 + RDNA2',
      'Storage': '1TB PCIe Gen4 NVMe SSD',
      'Controls': 'Hall Effect Sticks + Haptic Pads',
      'Battery': '50Wh (3-12 Hours Gaming)',
      'Warranty': '2 Years Official'
    }
  },
  {
    id: 20,
    name: 'MagFlow 3-in-1 Foldable Travel Tree',
    category: 'Accessories',
    price: 4490,
    originalPrice: 5990,
    rating: 4.8,
    reviewsCount: 215,
    image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=800&auto=format&fit=crop&q=80',
    badge: 'BESTSELLER',
    inStock: true,
    colors: ['#1e293b', '#e2e8f0'],
    description: 'Pocket-sized folding CNC aluminum charging tree with certified 15W Qi2 MagSafe, Apple Watch fast charging, and AirPods pad.',
    specs: {
      'MagSafe Output': '15W Fast Charge (Qi2 Certified)',
      'Folded Size': 'Card Wallet Dimension (18mm)',
      'Material': 'Space Grey Anodized Aluminum',
      'Cable': 'Braided 60W Type-C (Included)',
      'Case': 'Velvet Travel Pouch Included',
      'Warranty': 'Lifetime Limited'
    }
  },
  {
    id: 21,
    name: 'CyberDeck Mechanical Macro Pad',
    category: 'Accessories',
    price: 6290,
    originalPrice: 7990,
    rating: 4.9,
    reviewsCount: 78,
    image: 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=800&auto=format&fit=crop&q=80',
    badge: 'HOT',
    inStock: true,
    colors: ['#0f172a', '#e2e8f0'],
    description: '12-key CNC brass weighted programmable macro pad with dual clickable rotary encoders, IPS mini status screen, and hot-swap sockets.',
    specs: {
      'Firmware': 'QMK / VIA Configurable',
      'Switches': 'Gateron Oil King Linear (Pre-lubed)',
      'Body': 'CNC Solid Aluminum + Brass Weight',
      'Screen': '0.96" IPS Live Telemetry',
      'Connectivity': 'Detachable USB-C Braided',
      'Warranty': '2 Years'
    }
  },
  {
    id: 22,
    name: 'OmniView 360 AI Patrol Security Bot',
    category: 'Smart Home',
    price: 16990,
    originalPrice: 21990,
    rating: 4.7,
    reviewsCount: 49,
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&auto=format&fit=crop&q=80',
    badge: 'SMART AI',
    inStock: true,
    colors: ['#ffffff', '#0f172a'],
    description: 'Autonomous motorized smart home security companion with dual 4K night-vision cameras, obstacle climbing wheels, and local face recognition.',
    specs: {
      'Camera': 'Dual 4K Starlight Night Vision',
      'Movement': 'Autonomous Patrol & Charging Dock',
      'AI Engine': 'Local Person & Pet Tracking',
      'Audio': 'Two-way Encrypted Intercom',
      'Battery': 'Auto-Dock 5000 mAh',
      'Warranty': '2 Years'
    }
  },
  {
    id: 23,
    name: 'AeroShield Biometric Kevlar Pack',
    category: 'Accessories',
    price: 8490,
    originalPrice: 10990,
    rating: 4.9,
    reviewsCount: 104,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop&q=80',
    badge: 'NEW',
    inStock: true,
    colors: ['#090d16', '#334155'],
    description: 'Waterproof Kevlar ballistic weave tech backpack with 0.3s biometric fingerprint TSA zipper lock and integrated 65W GaN charging pass-through.',
    specs: {
      'Security': '0.3s Fingerprint TSA Lock',
      'Material': 'Ballistic Kevlar & Cordura 1000D',
      'Laptop Sleeve': 'Shockproof Suspended 16"',
      'Capacity': '24L Expandable to 30L',
      'Power Pass': 'USB-C PD 65W Fast Port',
      'Warranty': '10 Years Warranty'
    }
  }
];

// Available coupon codes
const COUPONS = {
  'TECHX20': { discountPercent: 20, description: '20% Off Storewide' },
  'LAUNCH10': { discountPercent: 10, description: '10% Off New Arrival' },
  'FREESHIP': { discountPercent: 5, description: '5% Express Discount' }
};

// =============================================================================
// 2. APPLICATION STATE & ROUTING
// =============================================================================

const route = () => {
  const hash = location.hash.slice(1);
  return hash ? hash.split('?')[0] : '/';
};

const state = {
  cart: JSON.parse(localStorage.getItem('tx-cart') || '[]'),
  wish: JSON.parse(localStorage.getItem('tx-wish') || '[]'),
  theme: localStorage.getItem('tx-theme') || 'dark',
  appliedCoupon: JSON.parse(localStorage.getItem('tx-coupon') || 'null'),
  activeCategory: 'all',
  searchQuery: '',
  sortBy: 'featured',
  activeQuickViewId: null,
  isCartOpen: false,
  isMobileMenuOpen: false,
  isSearchOpen: false,
  seen: new Set([route()]),
  maxScroll: 0,
  orders: JSON.parse(localStorage.getItem('tx-orders') || '[]')
};

// Formatting utilities
const formatRupee = (num) => `₹${Number(num).toLocaleString('en-IN')}`;

// Cart Computations
const getCartCount = () => state.cart.reduce((total, item) => total + item.qty, 0);

const getCartSubtotal = () => {
  return state.cart.reduce((sum, item) => {
    const p = products.find(x => x.id === item.id);
    return sum + (p ? p.price * item.qty : 0);
  }, 0);
};

const getDiscountAmount = () => {
  if (!state.appliedCoupon) return 0;
  const subtotal = getCartSubtotal();
  return Math.round((subtotal * state.appliedCoupon.discountPercent) / 100);
};

const getCartTotal = () => Math.max(0, getCartSubtotal() - getDiscountAmount());

function saveState() {
  localStorage.setItem('tx-cart', JSON.stringify(state.cart));
  localStorage.setItem('tx-wish', JSON.stringify(state.wish));
  localStorage.setItem('tx-coupon', JSON.stringify(state.appliedCoupon));
  localStorage.setItem('tx-theme', state.theme);
  localStorage.setItem('tx-orders', JSON.stringify(state.orders));
}

// =============================================================================
// 3. TOAST NOTIFICATION ENGINE
// =============================================================================

function showToast(message, type = 'info') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const icons = {
    info: '⚡',
    success: '✓',
    heart: '♥',
    cart: '🛒'
  };

  const item = document.createElement('div');
  item.className = 'toast-item';
  item.innerHTML = `<span>${icons[type] || '⚡'}</span> <span>${message}</span>`;
  container.appendChild(item);

  setTimeout(() => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(10px)';
    item.style.transition = 'all 0.3s ease';
    setTimeout(() => item.remove(), 300);
  }, 3200);
}

// =============================================================================
// 4. THEME TOGGLE
// =============================================================================

function toggleTheme() {
  state.theme = state.theme === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', state.theme);
  const themeMeta = document.getElementById('theme-color-meta');
  if (themeMeta) {
    themeMeta.setAttribute('content', state.theme === 'dark' ? '#0b0f19' : '#f8fafc');
  }
  saveState();
  showToast(`Switched to ${state.theme.toUpperCase()} mode`, 'info');
  renderHeader();
}

// =============================================================================
// 5. CART & WISHLIST ACTIONS
// =============================================================================

function addToCart(productId, qty = 1, color = null) {
  const existing = state.cart.find(item => item.id === productId);
  const p = products.find(x => x.id === productId);
  if (!p) return;

  if (existing) {
    existing.qty += qty;
  } else {
    state.cart.push({
      id: productId,
      qty: qty,
      color: color || p.colors[0]
    });
  }

  saveState();
  showToast(`Added ${p.name} to bag`, 'cart');
  renderHeader();
  renderCartDrawer();
}

function updateCartQty(productId, delta) {
  const item = state.cart.find(x => x.id === productId);
  if (!item) return;

  item.qty += delta;
  if (item.qty <= 0) {
    state.cart = state.cart.filter(x => x.id !== productId);
    showToast('Item removed from bag');
  }

  saveState();
  renderHeader();
  renderCartDrawer();
  if (route() === '/checkout') page();
}

function removeCartItem(productId) {
  state.cart = state.cart.filter(x => x.id !== productId);
  saveState();
  showToast('Item removed');
  renderHeader();
  renderCartDrawer();
  if (route() === '/checkout') page();
}

function toggleWishlist(productId) {
  const p = products.find(x => x.id === productId);
  if (state.wish.includes(productId)) {
    state.wish = state.wish.filter(id => id !== productId);
    showToast(`Removed from wishlist`, 'heart');
  } else {
    state.wish.push(productId);
    showToast(`Saved ${p ? p.name : 'item'} to wishlist`, 'heart');
  }
  saveState();
  page();
}

function applyCoupon(code) {
  const clean = String(code).trim().toUpperCase();
  if (COUPONS[clean]) {
    state.appliedCoupon = { code: clean, ...COUPONS[clean] };
    saveState();
    showToast(`Applied ${clean}: ${COUPONS[clean].description}`, 'success');
    renderCartDrawer();
    if (route() === '/checkout') page();
  } else {
    showToast('Invalid promo code. Try TECHX20 or LAUNCH10', 'info');
  }
}

function removeCoupon() {
  state.appliedCoupon = null;
  saveState();
  showToast('Coupon removed');
  renderCartDrawer();
  if (route() === '/checkout') page();
}

// =============================================================================
// 6. QUICK VIEW MODAL
// =============================================================================

function openQuickView(productId) {
  state.activeQuickViewId = productId;
  renderQuickViewModal();
}

function closeQuickView() {
  state.activeQuickViewId = null;
  renderQuickViewModal();
}

function renderQuickViewModal() {
  const portal = document.getElementById('quickview-portal');
  if (!portal) return;

  if (state.activeQuickViewId === null) {
    portal.innerHTML = '';
    return;
  }

  const p = products.find(x => x.id === state.activeQuickViewId);
  if (!p) return;

  portal.innerHTML = `
    <div class="modal-backdrop active" onclick="if(event.target === this) closeQuickView()">
      <div class="modal-content">
        <button class="modal-close-btn" onclick="closeQuickView()">&times;</button>
        <div class="modal-product-layout">
          <div class="modal-gallery">
            <img src="${p.image}" alt="${p.name}" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80';" />
          </div>
          <div>
            <div class="eyebrow">${p.category} // SPECIFICATION</div>
            <h2 style="font-family: 'Space Grotesk', sans-serif; font-size: 26px; margin-bottom: 8px;">${p.name}</h2>
            <div class="card-rating" style="margin-bottom: 14px;">
              ★★★★★ <strong>${p.rating}</strong>
              <span class="review-count">(${p.reviewsCount} verified reviews)</span>
            </div>
            <div class="card-price-row" style="margin-bottom: 16px;">
              <span class="current-price" style="font-size: 26px;">${formatRupee(p.price)}</span>
              <span class="original-price" style="font-size: 16px;">${formatRupee(p.originalPrice)}</span>
              <span class="badge badge-featured">Save ${Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100)}%</span>
            </div>
            <p style="color: var(--text-secondary); font-size: 14px; line-height: 1.6; margin-bottom: 20px;">
              ${p.description}
            </p>

            <div style="margin-bottom: 20px;">
              <label style="display: block; font: 700 11px 'DM Mono', monospace; color: var(--text-tertiary); margin-bottom: 8px;">COLOR FINISH</label>
              <div style="display: flex; gap: 8px;">
                ${p.colors.map((c, i) => `
                  <div style="width: 24px; height: 24px; border-radius: 50%; background: ${c}; border: 2px solid ${i === 0 ? 'var(--accent-orange)' : 'var(--border-medium)'}; cursor: pointer;"></div>
                `).join('')}
              </div>
            </div>

            <div class="spec-grid">
              ${Object.entries(p.specs).map(([k, v]) => `
                <div class="spec-item">
                  <span class="label">${k}</span>
                  <span class="val">${v}</span>
                </div>
              `).join('')}
            </div>

            <div style="display: flex; gap: 12px; margin-top: 24px;">
              <button class="btn-primary" style="flex-grow: 1;" onclick="addToCart(${p.id}); closeQuickView(); toggleCart(true);">
                Add to Bag • ${formatRupee(p.price)}
              </button>
              <button class="btn-secondary" onclick="toggleWishlist(${p.id}); closeQuickView();">
                ${state.wish.includes(p.id) ? '♥ Saved' : '♡ Wishlist'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

// =============================================================================
// 7. SLIDE-OUT CART DRAWER
// =============================================================================

function toggleCart(forceOpen) {
  state.isCartOpen = forceOpen !== undefined ? forceOpen : !state.isCartOpen;
  renderCartDrawer();
}

function renderCartDrawer() {
  const portal = document.getElementById('cart-drawer-portal');
  if (!portal) return;

  const count = getCartCount();
  const subtotal = getCartSubtotal();
  const discount = getDiscountAmount();
  const total = getCartTotal();
  const freeShippingThreshold = 50000;
  const progress = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  portal.innerHTML = `
    <div class="drawer-backdrop ${state.isCartOpen ? 'active' : ''}" onclick="toggleCart(false)"></div>
    <div class="cart-drawer ${state.isCartOpen ? 'active' : ''}">
      <div class="drawer-header">
        <div>
          <h3>Shopping Bag</h3>
          <p style="font-size: 12px; color: var(--text-tertiary); font-family: 'DM Mono', monospace;">${count} items selected</p>
        </div>
        <button class="modal-close-btn" onclick="toggleCart(false)">&times;</button>
      </div>

      <div class="free-shipping-progress">
        <div style="display: flex; justify-content: space-between; font-weight: 600;">
          <span>${subtotal >= freeShippingThreshold ? '🎉 Free Express Shipping Unlocked!' : `Add ${formatRupee(freeShippingThreshold - subtotal)} for Free Express Shipping`}</span>
          <span style="font-family: 'DM Mono', monospace;">${progress}%</span>
        </div>
        <div class="progress-bar-track">
          <div class="progress-bar-fill" style="width: ${progress}%"></div>
        </div>
      </div>

      <div class="drawer-items-list">
        ${count === 0 ? `
          <div style="text-align: center; padding: 60px 20px; color: var(--text-secondary);">
            <div style="font-size: 48px; margin-bottom: 12px;">🛍️</div>
            <h4 style="font-family: 'Space Grotesk', sans-serif; font-size: 18px; color: var(--text-primary); margin-bottom: 6px;">Your bag is empty</h4>
            <p style="font-size: 13px; margin-bottom: 24px;">Explore our precision engineering collection to get started.</p>
            <button class="btn-primary" onclick="toggleCart(false); go('/shop');">Explore Catalog</button>
          </div>
        ` : state.cart.map(item => {
          const p = products.find(x => x.id === item.id);
          if (!p) return '';
          return `
            <div class="drawer-item">
              <img src="${p.image}" alt="${p.name}" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80';" />
              <div>
                <strong style="font-size: 13px; display: block; line-height: 1.3;">${p.name}</strong>
                <span style="font-family: 'DM Mono', monospace; font-size: 12px; color: var(--accent-orange); font-weight: 700;">
                  ${formatRupee(p.price)}
                </span>
                <div style="display: flex; align-items: center; gap: 6px; margin-top: 6px;">
                  <button style="background: var(--border-subtle); border: none; width: 22px; height: 22px; border-radius: 4px; cursor: pointer;" onclick="updateCartQty(${p.id}, -1)">&minus;</button>
                  <span style="font-size: 12px; font-weight: 700; padding: 0 4px;">${item.qty}</span>
                  <button style="background: var(--border-subtle); border: none; width: 22px; height: 22px; border-radius: 4px; cursor: pointer;" onclick="updateCartQty(${p.id}, 1)">&#43;</button>
                </div>
              </div>
              <button style="background: none; border: none; color: var(--text-tertiary); cursor: pointer; padding: 4px;" onclick="removeCartItem(${p.id})" title="Remove">
                &times;
              </button>
            </div>
          `;
        }).join('')}
      </div>

      ${count > 0 ? `
        <div class="drawer-footer">
          <div class="coupon-box">
            <input type="text" id="drawer-coupon-input" placeholder="Coupon (e.g. TECHX20)" value="${state.appliedCoupon ? state.appliedCoupon.code : ''}" />
            <button onclick="applyCoupon(document.getElementById('drawer-coupon-input').value)">Apply</button>
          </div>

          <div style="display: flex; flex-direction: column; gap: 8px; margin-bottom: 20px; font-size: 13px;">
            <div style="display: flex; justify-content: space-between; color: var(--text-secondary);">
              <span>Subtotal</span>
              <span style="font-family: 'DM Mono', monospace;">${formatRupee(subtotal)}</span>
            </div>
            ${discount > 0 ? `
              <div style="display: flex; justify-content: space-between; color: var(--accent-green);">
                <span>Discount (${state.appliedCoupon.code})</span>
                <span style="font-family: 'DM Mono', monospace;">-${formatRupee(discount)}</span>
              </div>
            ` : ''}
            <div style="display: flex; justify-content: space-between; color: var(--text-secondary);">
              <span>Estimated Shipping</span>
              <span>${subtotal >= freeShippingThreshold ? 'FREE' : '₹490'}</span>
            </div>
            <div style="display: flex; justify-content: space-between; font-size: 16px; font-weight: 800; border-top: 1px solid var(--border-subtle); padding-top: 12px; margin-top: 4px;">
              <span>Total</span>
              <span style="font-family: 'Space Grotesk', sans-serif; color: var(--accent-orange);">${formatRupee(total + (subtotal >= freeShippingThreshold ? 0 : 490))}</span>
            </div>
          </div>

          <button class="btn-primary" style="width: 100%;" onclick="toggleCart(false); go('/checkout');">
            Proceed to Checkout &rarr;
          </button>
        </div>
      ` : ''}
    </div>
  `;
}

// =============================================================================
// 8. NAVIGATION BAR
// =============================================================================

function nav() {
  const currentPath = route();
  const count = getCartCount();
  const wishCount = state.wish.length;
  const user = localStorage.getItem('tx-user');

  return `
    <header>
      <a class="brand" href="#/">
        TECH<span>X</span>
        <span class="brand-badge">2026</span>
      </a>

      <nav class="main-nav">
        <a href="#/" class="${currentPath === '/' ? 'active' : ''}">Home</a>
        <a href="#/shop" class="${currentPath === '/shop' ? 'active' : ''}">Shop</a>
        <a href="#/new-arrivals" class="${currentPath === '/new-arrivals' ? 'active' : ''}">New Arrivals</a>
        <a href="#/deals" class="${currentPath === '/deals' ? 'active' : ''}">Deals</a>
        <a href="#/track-order" class="${currentPath === '/track-order' ? 'active' : ''}">Track</a>
        <a href="#/about" class="${currentPath === '/about' ? 'active' : ''}">About</a>
      </nav>

      <div class="nav-actions">
        <button class="search-trigger-btn" onclick="openSearchModal()" title="Search catalog">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          <span>Search gear...</span>
          <kbd>Ctrl+K</kbd>
        </button>

        <button class="nav-btn" onclick="toggleTheme()" title="Toggle Dark/Light Mode">
          ${state.theme === 'dark' ? '☀️' : '🌙'}
        </button>

        <button class="nav-btn" onclick="go('/wishlist')" title="Wishlist">
          ♥ ${wishCount > 0 ? `<span style="position: absolute; top: -4px; right: -4px; background: #ff3366; color: #fff; font-size: 9px; padding: 1px 5px; border-radius: 10px; font-weight: 800;">${wishCount}</span>` : ''}
        </button>

        <button class="nav-btn" onclick="go(localStorage.getItem('tx-user') ? '/account' : '/login')" title="Account">
          👤
        </button>

        <button class="bag-btn" onclick="toggleCart(true)">
          <span>Bag</span>
          <span class="count">${count}</span>
        </button>

        <button class="menu-toggle" onclick="toggleMobileMenu()">
          ☰
        </button>
      </div>
    </header>
  `;
}

function renderHeader() {
  const header = document.querySelector('header');
  if (header) {
    header.outerHTML = nav();
  }
}

function toggleMobileMenu() {
  state.isMobileMenuOpen = !state.isMobileMenuOpen;
  showToast(state.isMobileMenuOpen ? 'Menu opened' : 'Menu closed');
}

// =============================================================================
// 9. SEARCH MODAL & COMMAND PALETTE
// =============================================================================

function openSearchModal() {
  state.isSearchOpen = true;
  renderSearchModal();
}

function closeSearchModal() {
  state.isSearchOpen = false;
  renderSearchModal();
}

function renderSearchModal() {
  const portal = document.getElementById('search-modal-portal');
  if (!portal) return;

  if (!state.isSearchOpen) {
    portal.innerHTML = '';
    return;
  }

  portal.innerHTML = `
    <div class="modal-backdrop active" onclick="if(event.target === this) closeSearchModal()">
      <div class="modal-content" style="max-width: 650px; padding: 24px;">
        <div style="display: flex; align-items: center; gap: 12px; border-bottom: 1px solid var(--border-medium); padding-bottom: 16px; margin-bottom: 16px;">
          <span style="font-size: 20px;">🔍</span>
          <input type="text" id="cmd-search-input" placeholder="Type to search headphones, cameras, laptops, deals..." style="flex-grow: 1; background: transparent; border: none; font-size: 16px; color: var(--text-primary); outline: none;" autofocus oninput="handleModalSearch(this.value)" />
          <kbd style="background: var(--border-subtle); padding: 4px 8px; border-radius: 4px; font: 11px 'DM Mono', monospace;">ESC</kbd>
        </div>
        <div id="modal-search-results" style="max-height: 380px; overflow-y: auto; display: flex; flex-direction: column; gap: 8px;">
          <p style="color: var(--text-tertiary); font-size: 13px; padding: 12px 0;">Popular searches: "Pulse Pro", "NovaBook", "4K Drone", "Titanium Watch", "GaN Charger"</p>
        </div>
      </div>
    </div>
  `;

  setTimeout(() => {
    const input = document.getElementById('cmd-search-input');
    if (input) input.focus();
  }, 50);
}

function handleModalSearch(val) {
  const query = val.toLowerCase().trim();
  const resultsBox = document.getElementById('modal-search-results');
  if (!resultsBox) return;

  if (!query) {
    resultsBox.innerHTML = `<p style="color: var(--text-tertiary); font-size: 13px; padding: 12px 0;">Start typing to explore 16+ high-tech hardware models...</p>`;
    return;
  }

  const matches = products.filter(p => p.name.toLowerCase().includes(query) || p.category.toLowerCase().includes(query) || p.description.toLowerCase().includes(query));

  if (matches.length === 0) {
    resultsBox.innerHTML = `<div style="text-align: center; padding: 30px; color: var(--text-tertiary);">No matching tech found for "${val}"</div>`;
    return;
  }

  resultsBox.innerHTML = matches.map(p => `
    <div style="display: flex; align-items: center; justify-content: space-between; padding: 10px 12px; border-radius: var(--radius-xs); background: var(--bg-card); cursor: pointer; transition: var(--transition);" onclick="closeSearchModal(); openQuickView(${p.id})">
      <div style="display: flex; align-items: center; gap: 12px;">
        <img src="${p.image}" alt="${p.name}" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80';" style="width: 40px; height: 40px; border-radius: 6px; object-fit: cover;" />
        <div>
          <strong style="font-size: 14px; display: block;">${p.name}</strong>
          <span style="font-size: 11px; color: var(--text-tertiary); font-family: 'DM Mono', monospace;">${p.category}</span>
        </div>
      </div>
      <span style="font-family: 'Space Grotesk', sans-serif; font-weight: 700; color: var(--accent-orange);">${formatRupee(p.price)}</span>
    </div>
  `).join('');
}

// =============================================================================
// 10. PRODUCT CARD COMPONENT
// =============================================================================

function productCard(p) {
  const isSaved = state.wish.includes(p.id);

  return `
    <article class="product-card" data-id="${p.id}">
      <div class="card-badges">
        ${p.badge ? `<span class="badge ${p.badge.includes('OFF') || p.badge.includes('SALE') ? 'badge-deal' : p.badge === 'NEW' ? 'badge-new' : 'badge-featured'}">${p.badge}</span>` : ''}
      </div>

      <button class="wishlist-heart-btn ${isSaved ? 'active' : ''}" onclick="toggleWishlist(${p.id})" title="${isSaved ? 'Remove from wishlist' : 'Save to wishlist'}">
        ${isSaved ? '♥' : '♡'}
      </button>

      <div class="card-media" onclick="openQuickView(${p.id})">
        <img src="${p.image}" alt="${p.name}" loading="lazy" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80';" />
        <div class="quick-view-overlay">
          <button class="quick-view-btn">Quick View 🔍</button>
        </div>
      </div>

      <div class="card-body">
        <div class="card-category">${p.category}</div>
        <h3 class="card-title" onclick="openQuickView(${p.id})">${p.name}</h3>
        
        <div class="card-rating">
          ★★★★★ <span>${p.rating}</span>
          <span class="review-count">(${p.reviewsCount})</span>
        </div>

        <div class="card-price-row">
          <span class="current-price">${formatRupee(p.price)}</span>
          <span class="original-price">${formatRupee(p.originalPrice)}</span>
        </div>

        <div class="card-actions">
          <button class="add-cart-btn" onclick="addToCart(${p.id})">
            Add to Bag +
          </button>
        </div>
      </div>
    </article>
  `;
}

// =============================================================================
// 11. PAGE RENDERERS
// =============================================================================

function renderHomePage() {
  const featured = products.slice(0, 8);

  return `
    <!-- Hero Section -->
    <section class="hero">
      <div class="ambient-orb"></div>
      <div class="hero-grid">
        <div class="hero-content">
          <div class="hero-pill">
            <span class="live-dot"></span>
            <span>2026 FLAGSHIP RELEASES LIVE</span>
          </div>
          <h1>
            Engineered for <span class="gradient-text">speed</span>, built for precision.
          </h1>
          <p class="sub">
            A radical synthesis of industrial design, computational intelligence, and uncompromising tactile feedback.
          </p>
          <div class="hero-actions">
            <button class="btn-primary" onclick="go('/shop')">
              Explore Collection &rarr;
            </button>
            <button class="btn-secondary" onclick="openQuickView(0)">
              Spotlight Hardware
            </button>
          </div>
          <div class="hero-stats">
            <div class="stat-item">
              <strong>50K+</strong>
              <span>GLOBAL CREATORS</span>
            </div>
            <div class="stat-item">
              <strong>4.9★</strong>
              <span>TRUSTSCORE</span>
            </div>
            <div class="stat-item">
              <strong>2 YRS</strong>
              <span>WARRANTY</span>
            </div>
          </div>
        </div>

        <div class="hero-visual">
          <div class="hero-card-featured">
            <div class="image-box">
              <img src="${products[0].image}" alt="Pulse Pro Headphones" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80';" />
            </div>
            <div style="margin-top: 16px;">
              <span class="badge badge-featured">FLAGSHIP OF THE YEAR</span>
              <h3 style="font-family: 'Space Grotesk', sans-serif; font-size: 20px; margin: 8px 0 4px;">Pulse Pro Wireless</h3>
              <p style="color: var(--text-secondary); font-size: 13px;">40mm Custom Titanium Drivers with Lossless Ultra-Low Latency.</p>
            </div>
            <div class="floating-pill-stat">
              <span style="font-size: 22px;">⚡</span>
              <div>
                <strong style="display: block; font-size: 13px;">Lossless 2.4G</strong>
                <span style="font-size: 11px; color: var(--text-tertiary);">0.01ms Latency</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Bento Grid Category Showcase -->
    <section class="bento-section">
      <div class="section-header">
        <div>
          <div class="eyebrow">CURATED VERTICALS</div>
          <h2>Designed by Category</h2>
        </div>
        <a href="#/shop" class="explore-link" style="font-size: 13px; font-weight: 700; color: var(--accent-orange);">Browse All Hardware (${products.length}) &rarr;</a>
      </div>

      <div class="bento-grid">
        <div class="bento-card col-6 row-2" onclick="setCategoryFilter('Audio'); go('/shop');">
          <img class="bg-img" src="${products[0].image}" alt="Audio" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80';" />
          <div class="content">
            <span class="badge badge-featured">FLAGSHIP ACOUSTICS</span>
            <h3>Studio Audio & Wireless</h3>
            <p>Spatial audio engines engineered with custom acoustic chambers and hybrid active noise cancellation.</p>
          </div>
          <span class="explore-link">Explore Audio (4) &rarr;</span>
        </div>

        <div class="bento-card col-6" onclick="setCategoryFilter('Computers'); go('/shop');">
          <img class="bg-img" src="${products[2].image}" alt="Computers" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&auto=format&fit=crop&q=80';" />
          <div class="content">
            <span class="badge badge-new">COMPUTATIONAL</span>
            <h3>High-Performance Computing</h3>
            <p>Next-generation silicon in ultralight CNC unibodies.</p>
          </div>
          <span class="explore-link">Explore Computing (3) &rarr;</span>
        </div>

        <div class="bento-card col-4" onclick="setCategoryFilter('Wearables'); go('/shop');">
          <img class="bg-img" src="${products[1].image}" alt="Wearables" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80';" />
          <div class="content">
            <span class="badge badge-deal">BIOMETRIC</span>
            <h3>Titanium Wearables</h3>
            <p>Grade 5 titanium chassis with continuous HRV.</p>
          </div>
          <span class="explore-link">Explore (1) &rarr;</span>
        </div>

        <div class="bento-card col-4" onclick="setCategoryFilter('Cameras'); go('/shop');">
          <img class="bg-img" src="${products[3].image}" alt="Cameras" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&auto=format&fit=crop&q=80';" />
          <div class="content">
            <span class="badge badge-featured">CINEMATIC</span>
            <h3>4K Pocket & Aerial</h3>
            <p>ProRes capture in pocketable footprints.</p>
          </div>
          <span class="explore-link">Explore (2) &rarr;</span>
        </div>

        <div class="bento-card col-4" onclick="setCategoryFilter('Smart Home'); go('/shop');">
          <img class="bg-img" src="${products[5].image}" alt="Smart Home" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1543512214-318c7553f230?w=800&auto=format&fit=crop&q=80';" />
          <div class="content">
            <span class="badge badge-new">MATTER & THREAD</span>
            <h3>Smart Ecosystems</h3>
            <p>Encrypted edge AI automation.</p>
          </div>
          <span class="explore-link">Explore (2) &rarr;</span>
        </div>
      </div>
    </section>

    <!-- Trending Products Grid -->
    <section class="catalog-section">
      <div class="section-header">
        <div>
          <div class="eyebrow">TRENDING HARDWARE</div>
          <h2>Featured Essentials</h2>
        </div>
        <a href="#/shop" class="explore-link" style="color: var(--accent-orange); font-weight: 700;">View Complete Store &rarr;</a>
      </div>
      <div class="products-grid">
        ${featured.map(productCard).join('')}
      </div>
    </section>

    <!-- Hardware Comparison Matrix -->
    <section class="comparison-section">
      <div style="text-align: center; margin-bottom: 40px;">
        <div class="eyebrow">THE TECHX DIFFERENCE</div>
        <h2 style="font-family: 'Space Grotesk', sans-serif; font-size: clamp(28px, 3.5vw, 42px); font-weight: 800;">
          Engineered Beyond Industry Standards
        </h2>
      </div>

      <div class="table-wrapper">
        <table class="tech-table">
          <thead>
            <tr>
              <th>Feature & Capability</th>
              <th class="highlight-col">TechX Elite Hardware</th>
              <th>Standard Retail Brands</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Materials & Chassis</strong></td>
              <td class="highlight-col">CNC Aerospace Aluminum & Grade 5 Titanium</td>
              <td>Recycled Polymer & Stamped Sheet Metal</td>
            </tr>
            <tr>
              <td><strong>Acoustic Latency</strong></td>
              <td class="highlight-col">&lt; 0.01ms Lossless 2.4GHz Direct</td>
              <td>120ms - 250ms Standard Bluetooth</td>
            </tr>
            <tr>
              <td><strong>Warranty & Support</strong></td>
              <td class="highlight-col">2 to 5 Years No-Hassle Direct Replacement</td>
              <td>1 Year Limited Repair Warranty</td>
            </tr>
            <tr>
              <td><strong>Privacy & Edge Processing</strong></td>
              <td class="highlight-col">100% Local Encrypted Hardware Vault</td>
              <td>Cloud-Dependent Telemetry</td>
            </tr>
            <tr>
              <td><strong>Packaging & Sustainability</strong></td>
              <td class="highlight-col">100% Plastic-Free Molded Bamboo Pulp</td>
              <td>Mixed Non-Recyclable Blister Packs</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- Testimonials Section -->
    <section class="catalog-section" style="padding-top: 20px;">
      <div style="text-align: center; margin-bottom: 30px;">
        <div class="eyebrow">COMMUNITY VERIFIED</div>
        <h2 style="font-family: 'Space Grotesk', sans-serif; font-size: 32px; font-weight: 800;">Loved by Creators & Builders</h2>
      </div>

      <div class="testimonials-grid">
        <div class="testimonial-card">
          <div class="card-rating">★★★★★ <span>5.0</span></div>
          <p style="color: var(--text-secondary); font-size: 14px; line-height: 1.6;">
            "The Pulse Pro headphones are the finest cans I have ever used for production. The acoustic stage and comfort during 10-hour mix sessions are unmatched."
          </p>
          <div class="user-profile">
            <div class="user-avatar">AK</div>
            <div>
              <strong style="font-size: 14px;">Aarav Kapoor</strong>
              <p style="font-size: 11px; color: var(--text-tertiary); font-family: 'DM Mono', monospace;">Audio Engineer, Mumbai</p>
            </div>
          </div>
        </div>

        <div class="testimonial-card">
          <div class="card-rating">★★★★★ <span>5.0</span></div>
          <p style="color: var(--text-secondary); font-size: 14px; line-height: 1.6;">
            "I ordered the Arc Mechanical Keys and NovaBook stand. The delivery took 2 days, packaging was pristine, and the keystroke tactile feel is heavenly."
          </p>
          <div class="user-profile">
            <div class="user-avatar">SR</div>
            <div>
              <strong style="font-size: 14px;">Sneha Roy</strong>
              <p style="font-size: 11px; color: var(--text-tertiary); font-family: 'DM Mono', monospace;">Software Architect, Bengaluru</p>
            </div>
          </div>
        </div>

        <div class="testimonial-card">
          <div class="card-rating">★★★★★ <span>5.0</span></div>
          <p style="color: var(--text-secondary); font-size: 14px; line-height: 1.6;">
            "Cleanest tech storefront I have seen. The simulated tracking updates and 2-year warranty give immense peace of mind."
          </p>
          <div class="user-profile">
            <div class="user-avatar">VM</div>
            <div>
              <strong style="font-size: 14px;">Vikram Mehta</strong>
              <p style="font-size: 11px; color: var(--text-tertiary); font-family: 'DM Mono', monospace;">Creative Technologist, Delhi</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQs Accordion -->
    <section class="catalog-section" style="padding-top: 10px;">
      <div style="text-align: center;">
        <div class="eyebrow">COMMON QUESTIONS</div>
        <h2 style="font-family: 'Space Grotesk', sans-serif; font-size: 32px; font-weight: 800;">Frequently Asked</h2>
      </div>

      <div class="faq-accordion">
        <div class="faq-item open">
          <button class="faq-question" onclick="this.parentElement.classList.toggle('open')">
            <span>What warranty comes with TechX hardware?</span>
            <span>↓</span>
          </button>
          <div class="faq-answer">
            Every hardware device sold by TechX includes a minimum 2-year official replacement warranty. If anything fails under normal usage, our direct courier will pick up your unit and deliver a fresh replacement within 48 hours.
          </div>
        </div>

        <div class="faq-item">
          <button class="faq-question" onclick="this.parentElement.classList.toggle('open')">
            <span>How fast is shipping across India?</span>
            <span>↓</span>
          </button>
          <div class="faq-answer">
            We provide Free Express Air Shipping on all orders above ₹50,000. Metro cities receive delivery in 24-48 hours. All other locations across India are delivered within 2-4 business days with real-time GPS tracking.
          </div>
        </div>

        <div class="faq-item">
          <button class="faq-question" onclick="this.parentElement.classList.toggle('open')">
            <span>Can I return an item if it doesn't fit my workflow?</span>
            <span>↓</span>
          </button>
          <div class="faq-answer">
            Yes! We offer a 14-day no-questions-asked satisfaction window. Keep original packaging intact, click 'Return Order' in your account dashboard, and our courier will collect it free of charge.
          </div>
        </div>
      </div>
    </section>

    <!-- Newsletter Banner with instant reward code -->
    <section class="newsletter-banner">
      <div>
        <div class="eyebrow" style="color: #fff;">INSIDER PRIVILEGES</div>
        <h3 style="font-family: 'Space Grotesk', sans-serif; font-size: 26px; font-weight: 800; color: #fff; margin-bottom: 6px;">
          Unlock 20% Off Your First Order
        </h3>
        <p style="color: rgba(255,255,255,0.8); font-size: 13px;">Subscribe for zero-spam hardware drops, engineering breakdowns, and early access codes.</p>
      </div>

      <form class="newsletter-form" onsubmit="handleNewsletterSubmit(event)">
        <input type="email" id="newsletter-email" placeholder="Enter your work email..." required />
        <button type="submit" class="btn-primary" style="white-space: nowrap;">
          Claim 20% Code
        </button>
      </form>
    </section>
  `;
}

function handleNewsletterSubmit(e) {
  e.preventDefault();
  const email = document.getElementById('newsletter-email').value;
  showToast(`Welcome! Use code 'TECHX20' for 20% off your purchase.`, 'success');
  applyCoupon('TECHX20');
}

// =============================================================================
// 12. CATALOG / SHOP PAGE WITH LIVE FILTERING
// =============================================================================

function setCategoryFilter(category) {
  state.activeCategory = category;
  page();
}

function renderShopPage(filterCategory = null) {
  const currentCategory = filterCategory || state.activeCategory;
  const categories = ['all', 'Audio', 'Computers', 'Wearables', 'Cameras', 'Smart Home', 'Accessories', 'Gaming'];

  let filtered = products.filter(p => {
    const matchesCategory = currentCategory === 'all' || p.category.toLowerCase() === currentCategory.toLowerCase();
    const matchesSearch = !state.searchQuery || p.name.toLowerCase().includes(state.searchQuery.toLowerCase()) || p.description.toLowerCase().includes(state.searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Sort logic
  if (state.sortBy === 'price-low') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (state.sortBy === 'price-high') {
    filtered.sort((a, b) => b.price - a.price);
  } else if (state.sortBy === 'rating') {
    filtered.sort((a, b) => b.rating - a.rating);
  }

  return `
    <section class="catalog-section" style="padding-top: 40px;">
      <div class="section-header">
        <div>
          <div class="eyebrow">${currentCategory.toUpperCase()} HARDWARE</div>
          <h2>${currentCategory === 'all' ? 'Complete Tech Catalog' : currentCategory}</h2>
          <p style="color: var(--text-secondary); font-size: 14px; margin-top: 4px;">Showing ${filtered.length} high-spec products engineered to last.</p>
        </div>
      </div>

      <!-- Filter Controls Bar -->
      <div class="filter-bar">
        <div class="category-pills">
          ${categories.map(c => `
            <button class="pill-btn ${currentCategory.toLowerCase() === c.toLowerCase() ? 'active' : ''}" onclick="setCategoryFilter('${c}')">
              ${c === 'all' ? 'All Gear' : c}
            </button>
          `).join('')}
        </div>

        <div class="sort-and-search">
          <div class="search-input-box">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            <input type="text" placeholder="Filter current list..." value="${state.searchQuery}" oninput="state.searchQuery = this.value; page();" />
          </div>

          <div class="select-box">
            <select onchange="state.sortBy = this.value; page();">
              <option value="featured" ${state.sortBy === 'featured' ? 'selected' : ''}>Sort: Featured</option>
              <option value="price-low" ${state.sortBy === 'price-low' ? 'selected' : ''}>Price: Low to High</option>
              <option value="price-high" ${state.sortBy === 'price-high' ? 'selected' : ''}>Price: High to Low</option>
              <option value="rating" ${state.sortBy === 'rating' ? 'selected' : ''}>Highest Rated</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Grid or Empty State -->
      ${filtered.length === 0 ? `
        <div style="text-align: center; padding: 80px 20px; background: var(--bg-card); border-radius: var(--radius-md); border: 1px solid var(--border-subtle);">
          <div style="font-size: 40px; margin-bottom: 12px;">🔎</div>
          <h3 style="font-family: 'Space Grotesk', sans-serif; font-size: 20px; margin-bottom: 8px;">No hardware found</h3>
          <p style="color: var(--text-secondary); font-size: 14px; margin-bottom: 20px;">Try adjusting your search query or selecting another category.</p>
          <button class="btn-primary" onclick="state.searchQuery = ''; state.activeCategory = 'all'; page();">Reset Filters</button>
        </div>
      ` : `
        <div class="products-grid">
          ${filtered.map(productCard).join('')}
        </div>
      `}
    </section>
  `;
}

// =============================================================================
// 13. DEALS & NEW ARRIVALS
// =============================================================================

function renderDealsPage() {
  const deals = products.filter(p => p.originalPrice > p.price);

  return `
    <section class="catalog-section" style="padding-top: 40px;">
      <div style="background: linear-gradient(135deg, rgba(255, 94, 31, 0.15) 0%, rgba(139, 92, 246, 0.1) 100%); border: 1px solid var(--border-glow); border-radius: var(--radius-lg); padding: 40px; margin-bottom: 40px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 20px;">
        <div>
          <span class="badge badge-deal" style="margin-bottom: 12px;">LIMITED TIME FLASH SAVINGS</span>
          <h2 style="font-family: 'Space Grotesk', sans-serif; font-size: 32px; font-weight: 800;">Exclusive Tech Deals</h2>
          <p style="color: var(--text-secondary); font-size: 14px; margin-top: 6px;">Special price reductions on flagship hardware. All units backed by standard 2-year warranty.</p>
        </div>
        <div style="background: var(--bg-glass-strong); padding: 16px 24px; border-radius: var(--radius-md); border: 1px solid var(--border-medium); font-family: 'DM Mono', monospace; font-size: 16px; font-weight: 700; color: var(--accent-orange); display: flex; align-items: center; gap: 8px;">
          <span>⏳ Ends in:</span>
          <span id="flash-deal-timer">08h : 42m : 19s</span>
        </div>
      </div>

      <div class="products-grid">
        ${deals.map(productCard).join('')}
      </div>
    </section>
  `;
}

// =============================================================================
// 14. CHECKOUT WIZARD & ORDER GENERATOR
// =============================================================================

function renderCheckoutPage() {
  const subtotal = getCartSubtotal();
  const discount = getDiscountAmount();
  const total = getCartTotal();
  const count = getCartCount();

  if (count === 0) {
    return `
      <section class="checkout-container" style="text-align: center; padding: 100px 20px;">
        <div style="font-size: 54px; margin-bottom: 16px;">🛒</div>
        <h2 style="font-family: 'Space Grotesk', sans-serif; font-size: 28px; font-weight: 800; margin-bottom: 8px;">Your bag is empty</h2>
        <p style="color: var(--text-secondary); font-size: 14px; margin-bottom: 24px;">Please add some hardware items to your bag before proceeding to checkout.</p>
        <button class="btn-primary" onclick="go('/shop')">Explore Catalog</button>
      </section>
    `;
  }

  return `
    <section class="checkout-container">
      <div class="eyebrow">ENCRYPTED CHECKOUT // 256-BIT SSL</div>
      <h1 style="font-family: 'Space Grotesk', sans-serif; font-size: 32px; font-weight: 800; margin-bottom: 30px;">Complete Your Order</h1>

      <div class="checkout-grid">
        <!-- Left: Form steps -->
        <div class="checkout-card">
          <form onsubmit="handleOrderSubmission(event)">
            <h3 style="font-family: 'Space Grotesk', sans-serif; font-size: 18px; margin-bottom: 20px; border-bottom: 1px solid var(--border-subtle); padding-bottom: 10px;">
              1. Delivery Information
            </h3>

            <div class="form-row">
              <div class="form-group">
                <label>Full Name *</label>
                <input type="text" id="cust-name" required placeholder="Aarav Sharma" value="${localStorage.getItem('tx-user') || ''}" />
              </div>
              <div class="form-group">
                <label>Email Address *</label>
                <input type="email" id="cust-email" required placeholder="aarav@company.com" />
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label>Phone Number *</label>
                <input type="tel" id="cust-phone" required placeholder="+91 98765 43210" />
              </div>
              <div class="form-group">
                <label>PIN Code *</label>
                <input type="text" id="cust-pin" required placeholder="560001" />
              </div>
            </div>

            <div class="form-group">
              <label>Street Address *</label>
              <textarea id="cust-address" rows="2" required placeholder="Flat 402, Quantum Towers, Indiranagar, Bengaluru"></textarea>
            </div>

            <h3 style="font-family: 'Space Grotesk', sans-serif; font-size: 18px; margin: 30px 0 20px; border-bottom: 1px solid var(--border-subtle); padding-bottom: 10px;">
              2. Payment Method
            </h3>

            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-bottom: 24px;">
              <label style="background: var(--bg-input); border: 2px solid var(--accent-orange); border-radius: var(--radius-sm); padding: 14px; text-align: center; cursor: pointer;">
                <input type="radio" name="paymethod" value="upi" checked style="display:none;" />
                <div style="font-size: 20px; margin-bottom: 4px;">⚡</div>
                <strong style="font-size: 12px; display: block;">Instant UPI</strong>
                <span style="font-size: 10px; color: var(--accent-orange);">0% Fees</span>
              </label>

              <label style="background: var(--bg-input); border: 1px solid var(--border-medium); border-radius: var(--radius-sm); padding: 14px; text-align: center; cursor: pointer;">
                <input type="radio" name="paymethod" value="card" style="display:none;" />
                <div style="font-size: 20px; margin-bottom: 4px;">💳</div>
                <strong style="font-size: 12px; display: block;">Credit / Debit</strong>
                <span style="font-size: 10px; color: var(--text-tertiary);">All Cards</span>
              </label>

              <label style="background: var(--bg-input); border: 1px solid var(--border-medium); border-radius: var(--radius-sm); padding: 14px; text-align: center; cursor: pointer;">
                <input type="radio" name="paymethod" value="cod" style="display:none;" />
                <div style="font-size: 20px; margin-bottom: 4px;">📦</div>
                <strong style="font-size: 12px; display: block;">Pay on Delivery</strong>
                <span style="font-size: 10px; color: var(--text-tertiary);">Verified OTP</span>
              </label>
            </div>

            <button type="submit" class="btn-primary" style="width: 100%; justify-content: center; font-size: 15px; padding: 16px;">
              Confirm & Pay ${formatRupee(total)}
            </button>
          </form>
        </div>

        <!-- Right: Summary -->
        <div class="checkout-card" style="height: fit-content;">
          <h3 style="font-family: 'Space Grotesk', sans-serif; font-size: 18px; margin-bottom: 16px;">Order Summary (${count})</h3>
          
          <div style="max-height: 260px; overflow-y: auto; display: flex; flex-direction: column; gap: 12px; margin-bottom: 20px; padding-right: 6px;">
            ${state.cart.map(item => {
              const p = products.find(x => x.id === item.id);
              if (!p) return '';
              return `
                <div style="display: flex; align-items: center; justify-content: space-between; gap: 12px; font-size: 13px;">
                  <div style="display: flex; align-items: center; gap: 10px;">
                    <img src="${p.image}" alt="${p.name}" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80';" style="width: 44px; height: 44px; border-radius: 6px; object-fit: cover;" />
                    <div>
                      <strong style="display: block;">${p.name}</strong>
                      <span style="color: var(--text-tertiary); font-size: 11px;">Qty: ${item.qty}</span>
                    </div>
                  </div>
                  <span style="font-family: 'DM Mono', monospace; font-weight: 700;">${formatRupee(p.price * item.qty)}</span>
                </div>
              `;
            }).join('')}
          </div>

          <div class="coupon-box">
            <input type="text" id="checkout-coupon" placeholder="Coupon (e.g. TECHX20)" value="${state.appliedCoupon ? state.appliedCoupon.code : ''}" />
            <button onclick="applyCoupon(document.getElementById('checkout-coupon').value)">Apply</button>
          </div>

          <div style="display: flex; flex-direction: column; gap: 8px; font-size: 13px; margin-top: 16px;">
            <div style="display: flex; justify-content: space-between; color: var(--text-secondary);">
              <span>Subtotal</span>
              <span style="font-family: 'DM Mono', monospace;">${formatRupee(subtotal)}</span>
            </div>
            ${discount > 0 ? `
              <div style="display: flex; justify-content: space-between; color: var(--accent-green);">
                <span>Discount (${state.appliedCoupon.code})</span>
                <span style="font-family: 'DM Mono', monospace;">-${formatRupee(discount)}</span>
              </div>
            ` : ''}
            <div style="display: flex; justify-content: space-between; color: var(--text-secondary);">
              <span>Express Delivery</span>
              <span style="color: var(--accent-green);">FREE</span>
            </div>
            <div style="display: flex; justify-content: space-between; font-size: 18px; font-weight: 800; border-top: 1px solid var(--border-subtle); padding-top: 14px; margin-top: 4px;">
              <span>Total Amount</span>
              <span style="font-family: 'Space Grotesk', sans-serif; color: var(--accent-orange);">${formatRupee(total)}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}

function handleOrderSubmission(e) {
  e.preventDefault();
  const orderId = `TX-${Math.floor(100000 + Math.random() * 900000)}`;
  const custName = document.getElementById('cust-name').value;
  const custEmail = document.getElementById('cust-email').value;
  const total = getCartTotal();

  const newOrder = {
    id: orderId,
    date: new Date().toISOString(),
    customerName: custName,
    customerEmail: custEmail,
    items: [...state.cart],
    total: total,
    status: 'Confirmed'
  };

  state.orders.unshift(newOrder);
  state.purchased = true;
  state.purchaseAmount = total;
  sendAnalytics(true);
  state.purchased = false;
  state.purchaseAmount = 0;
  state.cart = [];
  state.appliedCoupon = null;
  saveState();

  // Show simulated receipt view
  const app = document.querySelector('#app');
  app.innerHTML = `
    ${nav()}
    <main>
      <section class="receipt-card">
        <div class="success-icon-badge">✓</div>
        <div class="eyebrow" style="color: var(--accent-green);">PAYMENT CONFIRMED</div>
        <h2 style="font-family: 'Space Grotesk', sans-serif; font-size: 28px; font-weight: 800; margin-bottom: 8px;">Thank You, ${custName}!</h2>
        <p style="color: var(--text-secondary); font-size: 14px; margin-bottom: 24px;">Your order has been routed to our automated fulfillment hub. A confirmation has been dispatched to <strong>${custEmail}</strong>.</p>
        
        <div style="background: var(--bg-glass); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); padding: 18px; text-align: left; margin-bottom: 24px; font-family: 'DM Mono', monospace; font-size: 13px;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
            <span style="color: var(--text-tertiary);">Order ID:</span>
            <strong>${orderId}</strong>
          </div>
          <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
            <span style="color: var(--text-tertiary);">Total Paid:</span>
            <strong>${formatRupee(total)}</strong>
          </div>
          <div style="display: flex; justify-content: space-between;">
            <span style="color: var(--text-tertiary);">Delivery Carrier:</span>
            <span>BlueDart Air Express (Tracked)</span>
          </div>
        </div>

        <div style="display: flex; gap: 12px; justify-content: center;">
          <button class="btn-primary" onclick="go('/track-order?id=${orderId}')">
            Track Live Shipment &rarr;
          </button>
          <button class="btn-secondary" onclick="go('/shop')">
            Continue Shopping
          </button>
        </div>
      </section>
    </main>
    ${footer()}
  `;
}

// =============================================================================
// 15. ORDER TRACKING SIMULATOR
// =============================================================================

function renderTrackOrderPage() {
  const urlParams = new URLSearchParams(location.hash.split('?')[1] || '');
  const queryId = urlParams.get('id') || (state.orders.length > 0 ? state.orders[0].id : 'TX-892147');

  return `
    <section class="checkout-container" style="max-width: 800px;">
      <div style="text-align: center; margin-bottom: 36px;">
        <div class="eyebrow">GLOBAL TELEMETRY</div>
        <h1 style="font-family: 'Space Grotesk', sans-serif; font-size: 36px; font-weight: 800;">Real-Time Order Tracking</h1>
        <p style="color: var(--text-secondary); font-size: 14px; margin-top: 6px;">Enter your TechX tracking number to inspect live status & flight manifest.</p>
      </div>

      <div class="checkout-card" style="margin-bottom: 30px;">
        <div style="display: flex; gap: 10px;">
          <input type="text" id="track-id-input" value="${queryId}" placeholder="Enter order ID (e.g. TX-892147)" style="flex-grow: 1; background: var(--bg-input); border: 1px solid var(--border-medium); padding: 12px 16px; border-radius: var(--radius-sm); font-family: 'DM Mono', monospace; font-size: 14px;" />
          <button class="btn-primary" onclick="showToast('Refreshed GPS status for ' + document.getElementById('track-id-input').value, 'info')">Track</button>
        </div>
      </div>

      <div class="checkout-card">
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-subtle); padding-bottom: 16px; margin-bottom: 24px;">
          <div>
            <span class="badge badge-featured">AIR EXPRESS COURIER</span>
            <h3 style="font-family: 'Space Grotesk', sans-serif; font-size: 20px; margin-top: 6px;">Tracking ID: ${queryId}</h3>
          </div>
          <div style="text-align: right;">
            <span style="font-size: 11px; color: var(--text-tertiary); font-family: 'DM Mono', monospace;">ESTIMATED DELIVERY</span>
            <strong style="display: block; color: var(--accent-green); font-size: 15px;">Tomorrow, By 2:00 PM</strong>
          </div>
        </div>

        <div class="tracking-timeline">
          <div class="timeline-step completed">
            <div class="step-node">✓</div>
            <strong style="display: block; font-size: 12px;">Order Placed</strong>
            <span style="font-size: 10px; color: var(--text-tertiary); font-family: 'DM Mono', monospace;">10:30 AM</span>
          </div>

          <div class="timeline-step completed">
            <div class="step-node">✓</div>
            <strong style="display: block; font-size: 12px;">Quality Cleared</strong>
            <span style="font-size: 10px; color: var(--text-tertiary); font-family: 'DM Mono', monospace;">11:15 AM</span>
          </div>

          <div class="timeline-step active">
            <div class="step-node">⚡</div>
            <strong style="display: block; font-size: 12px;">In Flight Transit</strong>
            <span style="font-size: 10px; color: var(--accent-orange); font-family: 'DM Mono', monospace;">Live</span>
          </div>

          <div class="timeline-step">
            <div class="step-node">📦</div>
            <strong style="display: block; font-size: 12px;">Out for Delivery</strong>
            <span style="font-size: 10px; color: var(--text-tertiary); font-family: 'DM Mono', monospace;">Pending</span>
          </div>
        </div>

        <div style="background: var(--bg-glass); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); padding: 16px; display: flex; align-items: center; gap: 14px;">
          <span style="font-size: 24px;">📍</span>
          <div style="font-size: 13px;">
            <strong>Latest Event: Air Cargo Arrived at Bengaluru Sort Facility Hub</strong>
            <p style="color: var(--text-secondary); margin-top: 2px;">Sorted and assigned to express delivery fleet for morning dispatch.</p>
          </div>
        </div>
      </div>
    </section>
  `;
}

// =============================================================================
// 16. WISHLIST & ACCOUNT
// =============================================================================

function renderWishlistPage() {
  const wishProducts = products.filter(p => state.wish.includes(p.id));

  return `
    <section class="catalog-section" style="padding-top: 40px;">
      <div class="section-header">
        <div>
          <div class="eyebrow">SAVED HARDWARE</div>
          <h2>My Wishlist (${wishProducts.length})</h2>
          <p style="color: var(--text-secondary); font-size: 14px; margin-top: 4px;">Items you are watching for price alerts and upcoming stock.</p>
        </div>
        ${wishProducts.length > 0 ? `
          <button class="btn-primary" onclick="wishProducts.forEach(p => addToCart(p.id)); showToast('Moved all saved gear to bag', 'cart');">
            Add All to Bag
          </button>
        ` : ''}
      </div>

      ${wishProducts.length === 0 ? `
        <div style="text-align: center; padding: 80px 20px; background: var(--bg-card); border-radius: var(--radius-md); border: 1px solid var(--border-subtle);">
          <div style="font-size: 40px; margin-bottom: 12px;">♥</div>
          <h3 style="font-family: 'Space Grotesk', sans-serif; font-size: 20px; margin-bottom: 8px;">Your wishlist is clean</h3>
          <p style="color: var(--text-secondary); font-size: 14px; margin-bottom: 20px;">Click the heart icon on any hardware model to keep it on your radar.</p>
          <button class="btn-primary" onclick="go('/shop')">Discover Tech</button>
        </div>
      ` : `
        <div class="products-grid">
          ${wishProducts.map(productCard).join('')}
        </div>
      `}
    </section>
  `;
}

function renderAccountPage() {
  const user = localStorage.getItem('tx-user') || 'Aarav Sharma';
  const email = localStorage.getItem('tx-email') || 'aarav@techx.dev';

  return `
    <section class="checkout-container" style="max-width: 900px;">
      <div class="eyebrow">TECHX COMMAND CENTER</div>
      <h1 style="font-family: 'Space Grotesk', sans-serif; font-size: 32px; font-weight: 800; margin-bottom: 30px;">Account & Orders</h1>

      <div style="display: grid; grid-template-columns: 1fr 2fr; gap: 24px;">
        <div class="checkout-card" style="text-align: center;">
          <div style="width: 72px; height: 72px; border-radius: 50%; background: var(--grad-cyber); color: #fff; font-size: 24px; font-weight: 800; display: flex; align-items: center; justify-content: center; margin: 0 auto 16px;">
            ${user.slice(0, 2).toUpperCase()}
          </div>
          <h3 style="font-family: 'Space Grotesk', sans-serif; font-size: 18px;">${user}</h3>
          <p style="color: var(--text-secondary); font-size: 12px; font-family: 'DM Mono', monospace; margin-bottom: 20px;">${email}</p>
          <button class="btn-secondary" style="width: 100%; justify-content: center; font-size: 12px;" onclick="logout()">
            Sign Out
          </button>
        </div>

        <div class="checkout-card">
          <h3 style="font-family: 'Space Grotesk', sans-serif; font-size: 18px; margin-bottom: 16px;">Past Orders (${state.orders.length})</h3>
          
          ${state.orders.length === 0 ? `
            <p style="color: var(--text-tertiary); font-size: 13px;">No past orders found in local session.</p>
          ` : state.orders.map(o => `
            <div style="background: var(--bg-glass); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); padding: 14px; margin-bottom: 12px; display: flex; justify-content: space-between; align-items: center;">
              <div>
                <strong style="font-size: 13px; display: block;">Order ${o.id}</strong>
                <span style="font-size: 11px; color: var(--text-tertiary); font-family: 'DM Mono', monospace;">${new Date(o.date).toLocaleDateString()} • ${o.items.length} items</span>
              </div>
              <div style="text-align: right;">
                <span style="font-family: 'Space Grotesk', sans-serif; font-weight: 700; color: var(--accent-orange);">${formatRupee(o.total)}</span>
                <a href="#/track-order?id=${o.id}" style="display: block; font-size: 11px; color: var(--accent-cyan); margin-top: 2px;">Track &rarr;</a>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `;
}

function renderLoginPage() {
  return `
    <section class="checkout-container" style="max-width: 460px; padding-top: 80px;">
      <div class="checkout-card" style="padding: 40px;">
        <div class="eyebrow">TECHX ID ACCESS</div>
        <h2 style="font-family: 'Space Grotesk', sans-serif; font-size: 26px; font-weight: 800; margin-bottom: 8px;">Sign In</h2>
        <p style="color: var(--text-secondary); font-size: 13px; margin-bottom: 24px;">Access your saved hardware, order history, and tracking.</p>

        <form onsubmit="handleLogin(event)">
          <div class="form-group">
            <label>Name</label>
            <input type="text" id="auth-name" required placeholder="Aarav Sharma" />
          </div>
          <div class="form-group">
            <label>Email</label>
            <input type="email" id="auth-email" required placeholder="aarav@techx.dev" />
          </div>
          <div class="form-group">
            <label>Password</label>
            <input type="password" required placeholder="••••••••" />
          </div>
          <button type="submit" class="btn-primary" style="width: 100%; justify-content: center; margin-top: 10px;">
            Sign In to TechX
          </button>
        </form>
      </div>
    </section>
  `;
}

function handleLogin(e) {
  e.preventDefault();
  const name = document.getElementById('auth-name').value;
  const email = document.getElementById('auth-email').value;
  localStorage.setItem('tx-user', name);
  localStorage.setItem('tx-email', email);
  showToast(`Welcome back, ${name}!`, 'success');
  renderHeader();
  go('/account');
}

function logout() {
  localStorage.removeItem('tx-user');
  localStorage.removeItem('tx-email');
  showToast('Signed out');
  renderHeader();
  go('/');
}

// =============================================================================
// 17. STATIC / SUPPORT PAGES (About, Contact, Privacy)
// =============================================================================

function renderAboutPage() {
  return `
    <section class="checkout-container" style="max-width: 800px;">
      <div class="eyebrow">OUR PHILOSOPHY</div>
      <h1 style="font-family: 'Space Grotesk', sans-serif; font-size: clamp(32px, 4vw, 54px); font-weight: 800; line-height: 1.1; margin-bottom: 24px;">
        Curious by design. Built for high performance.
      </h1>
      <div class="checkout-card" style="font-size: 15px; line-height: 1.8; color: var(--text-secondary);">
        <p style="margin-bottom: 16px;">
          TechX was founded on a simple conviction: technology should feel sharp, tangible, and durable. In an era of disposable plastic electronics, we curate and engineer hardware crafted with aerospace materials and uncompromising attention to detail.
        </p>
        <p style="margin-bottom: 16px;">
          From acoustic resonance chambers tuned to absolute perfection, to CNC-machined titanium frames that endure decades of intense daily usage, every single item in our catalog passes rigorous benchmarking.
        </p>
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-top: 30px; border-top: 1px solid var(--border-subtle); padding-top: 24px;">
          <div>
            <strong style="display: block; font-family: 'Space Grotesk', sans-serif; font-size: 24px; color: var(--text-primary);">100%</strong>
            <span style="font-size: 11px; font-family: 'DM Mono', monospace;">Original Authentic</span>
          </div>
          <div>
            <strong style="display: block; font-family: 'Space Grotesk', sans-serif; font-size: 24px; color: var(--text-primary);">48h</strong>
            <span style="font-size: 11px; font-family: 'DM Mono', monospace;">Express Dispatch</span>
          </div>
          <div>
            <strong style="display: block; font-family: 'Space Grotesk', sans-serif; font-size: 24px; color: var(--text-primary);">2 Years</strong>
            <span style="font-size: 11px; font-family: 'DM Mono', monospace;">Minimum Warranty</span>
          </div>
        </div>
      </div>
    </section>
  `;
}

function renderContactPage() {
  return `
    <section class="checkout-container" style="max-width: 960px; padding-top: 40px;">
      <div style="text-align: center; margin-bottom: 40px;">
        <div class="eyebrow">DIRECT COMMUNICATION // SPECIALIST SUPPORT</div>
        <h1 style="font-family: 'Space Grotesk', sans-serif; font-size: clamp(32px, 4vw, 48px); font-weight: 800; margin-bottom: 8px;">
          Let's Talk Hardware
        </h1>
        <p style="color: var(--text-secondary); font-size: 15px; max-width: 540px; margin: 0 auto;">
          Have questions about our precision tech lineup, custom bulk orders, or warranty claims? Connect directly with our lead hardware specialist.
        </p>
      </div>

      <!-- Quick Action Cards Grid -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 20px; margin-bottom: 36px;">
        <!-- Phone & WhatsApp Card -->
        <div class="checkout-card" style="display: flex; flex-direction: column; justify-content: space-between; border-color: rgba(255, 94, 31, 0.3);">
          <div>
            <div style="width: 44px; height: 44px; border-radius: var(--radius-sm); background: rgba(255, 94, 31, 0.15); color: var(--accent-orange); display: flex; align-items: center; justify-content: center; font-size: 20px; margin-bottom: 14px;">
              📞
            </div>
            <span style="font: 700 11px 'DM Mono', monospace; color: var(--accent-orange); text-transform: uppercase;">Direct Line & WhatsApp</span>
            <h3 style="font-family: 'Space Grotesk', sans-serif; font-size: 20px; margin: 6px 0 4px;">+91 93727 85040</h3>
            <p style="color: var(--text-secondary); font-size: 12px;">Instant voice support & WhatsApp catalog orders.</p>
          </div>
          <div style="display: flex; gap: 8px; margin-top: 16px;">
            <a href="tel:+919372785040" class="btn-primary" style="flex: 1; padding: 8px 12px; font-size: 12px; justify-content: center;">Call Now</a>
            <a href="https://wa.me/919372785040?text=Hi%20Vivek,%20I%20am%20interested%20in%20TechX%20hardware" target="_blank" rel="noopener" class="btn-secondary" style="flex: 1; padding: 8px 12px; font-size: 12px; justify-content: center; background: rgba(37, 211, 102, 0.15); border-color: rgba(37, 211, 102, 0.4); color: #25d366;">WhatsApp</a>
          </div>
        </div>

        <!-- Email Card -->
        <div class="checkout-card" style="display: flex; flex-direction: column; justify-content: space-between; border-color: rgba(0, 229, 255, 0.3);">
          <div>
            <div style="width: 44px; height: 44px; border-radius: var(--radius-sm); background: rgba(0, 229, 255, 0.15); color: var(--accent-cyan); display: flex; align-items: center; justify-content: center; font-size: 20px; margin-bottom: 14px;">
              ✉️
            </div>
            <span style="font: 700 11px 'DM Mono', monospace; color: var(--accent-cyan); text-transform: uppercase;">Official Inbox</span>
            <h3 style="font-family: 'Space Grotesk', sans-serif; font-size: 16px; margin: 6px 0 4px; word-break: break-all;">vivekwilsoncollege@gmail.com</h3>
            <p style="color: var(--text-secondary); font-size: 12px;">Enterprise queries, custom specs, and reviews.</p>
          </div>
          <div style="margin-top: 16px;">
            <a href="mailto:vivekwilsoncollege@gmail.com?subject=TechX%20Hardware%20Inquiry" class="btn-secondary" style="width: 100%; padding: 8px 12px; font-size: 12px; justify-content: center; border-color: var(--accent-cyan); color: var(--accent-cyan);">Send Email &rarr;</a>
          </div>
        </div>

        <!-- Headquarters / Hours Card -->
        <div class="checkout-card" style="display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="width: 44px; height: 44px; border-radius: var(--radius-sm); background: rgba(139, 92, 246, 0.15); color: var(--accent-purple); display: flex; align-items: center; justify-content: center; font-size: 20px; margin-bottom: 14px;">
              📍
            </div>
            <span style="font: 700 11px 'DM Mono', monospace; color: var(--accent-purple); text-transform: uppercase;">HQ & Campus Office</span>
            <h3 style="font-family: 'Space Grotesk', sans-serif; font-size: 18px; margin: 6px 0 4px;">Wilson College Area</h3>
            <p style="color: var(--text-secondary); font-size: 12px;">Chowpatty, Mumbai, Maharashtra 400007</p>
          </div>
          <div style="background: var(--bg-glass); padding: 8px 12px; border-radius: var(--radius-xs); border: 1px solid var(--border-subtle); margin-top: 16px; font-size: 11px; font-family: 'DM Mono', monospace; color: var(--accent-green);">
            ● Mon - Sun: 9:00 AM - 9:00 PM IST
          </div>
        </div>
      </div>

      <!-- Interactive Contact Form -->
      <div class="checkout-card" style="padding: 36px;">
        <h2 style="font-family: 'Space Grotesk', sans-serif; font-size: 22px; font-weight: 800; margin-bottom: 6px;">Send a Direct Message</h2>
        <p style="color: var(--text-secondary); font-size: 13px; margin-bottom: 24px;">Fill out the form below and Vivek will get back to you within 2 hours.</p>

        <form onsubmit="event.preventDefault(); showToast('Message dispatched to Vivek! You will receive a response shortly.', 'success'); this.reset();">
          <div class="form-row">
            <div class="form-group">
              <label>Full Name *</label>
              <input type="text" required placeholder="Aarav Sharma" />
            </div>
            <div class="form-group">
              <label>Email Address *</label>
              <input type="email" required placeholder="your.email@example.com" />
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label>Phone Number</label>
              <input type="tel" placeholder="+91 98765 43210" />
            </div>
            <div class="form-group">
              <label>Inquiry Topic</label>
              <select style="width: 100%; background: var(--bg-input); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); padding: 12px 14px; color: var(--text-primary);">
                <option>Hardware Specifications & Stock</option>
                <option>Order Tracking & Fast Delivery</option>
                <option>Bulk / Enterprise Purchases</option>
                <option>Warranty & Technical Assistance</option>
                <option>Other / Feedback</option>
              </select>
            </div>
          </div>

          <div class="form-group">
            <label>Message *</label>
            <textarea rows="4" required placeholder="How can we assist you with TechX hardware today?"></textarea>
          </div>

          <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px;">
            <span style="font-size: 12px; color: var(--text-tertiary); font-family: 'DM Mono', monospace;">
              🔒 Direct forwarding to vivekwilsoncollege@gmail.com
            </span>
            <button type="submit" class="btn-primary" style="padding: 14px 32px;">
              Dispatch Message &rarr;
            </button>
          </div>
        </form>
      </div>
    </section>
  `;
}

// =============================================================================
// 18. FOOTER COMPONENT
// =============================================================================

function footer() {
  return `
    <footer>
      <div class="footer-top">
        <div class="footer-brand">
          <a class="brand" href="#/">TECH<span>X</span></a>
          <p>Precision-engineered audio, high-performance computing, smart wearables, and advanced creator hardware.</p>
          <div style="margin-top: 16px; font-size: 13px; line-height: 1.6;">
            <p style="color: var(--text-secondary);"><strong style="color: var(--text-primary);">Lead Contact:</strong> Vivek</p>
            <p style="color: var(--text-secondary);"><a href="tel:+919372785040" style="color: var(--accent-orange);">📞 +91 93727 85040</a></p>
            <p style="color: var(--text-secondary);"><a href="mailto:vivekwilsoncollege@gmail.com" style="color: var(--accent-cyan);">✉️ vivekwilsoncollege@gmail.com</a></p>
          </div>
        </div>

        <div class="footer-col">
          <h4>Catalog</h4>
          <ul>
            <li><a href="#/shop" onclick="setCategoryFilter('Audio')">Audio & Hi-Fi</a></li>
            <li><a href="#/shop" onclick="setCategoryFilter('Computers')">Computers & OLED</a></li>
            <li><a href="#/shop" onclick="setCategoryFilter('Wearables')">Titanium Wearables</a></li>
            <li><a href="#/shop" onclick="setCategoryFilter('Gaming')">Gaming Hardware</a></li>
            <li><a href="#/deals">Flash Deals</a></li>
          </ul>
        </div>

        <div class="footer-col">
          <h4>Support & Contact</h4>
          <ul>
            <li><a href="#/contact">Contact Vivek (Specialist)</a></li>
            <li><a href="https://wa.me/919372785040" target="_blank" rel="noopener">WhatsApp Support</a></li>
            <li><a href="#/track-order">Track Shipment</a></li>
            <li><a href="#/about">About TechX</a></li>
            <li><a href="#/wishlist">Saved Wishlist</a></li>
          </ul>
        </div>

        <div class="footer-col">
          <h4>Location</h4>
          <p style="font-size: 13px; color: var(--text-secondary); line-height: 1.6; margin-bottom: 12px;">
            Wilson College Campus Area,<br>
            Chowpatty, Mumbai,<br>
            Maharashtra 400007, India
          </p>
          <span style="font-family: 'DM Mono', monospace; font-size: 11px; color: var(--accent-green);">● Active Support 9 AM - 9 PM</span>
        </div>
      </div>

      <div class="footer-bottom">
        <p>&copy; 2026 TechX Systems Inc. Precision hardware engineered for the future.</p>
        <div style="display: flex; gap: 16px;">
          <span>🔒 256-Bit SSL Encrypted</span>
          <span>⚡ Direct WhatsApp & Call Support</span>
        </div>
      </div>
    </footer>
  `;
}

// =============================================================================
// 19. MAIN ROUTER & PAGE DISPATCHER
// =============================================================================

function page() {
  const currentPath = route();
  state.seen.add(currentPath);
  window.scrollTo({ top: 0, behavior: 'instant' });

  let mainContent = '';

  if (currentPath === '/') {
    document.title = 'TechX — Next-Gen Hardware & Modern Tech Ecosystem';
    mainContent = renderHomePage();
  } else if (currentPath === '/shop') {
    document.title = 'TechX — Shop All Precision Hardware';
    mainContent = renderShopPage();
  } else if (['/audio', '/computers', '/wearables', '/cameras', '/smart-home', '/accessories', '/gaming'].includes(currentPath)) {
    const cat = currentPath.slice(1).replace('-', ' ');
    const formattedCat = cat.charAt(0).toUpperCase() + cat.slice(1);
    document.title = `TechX — ${formattedCat} Hardware`;
    mainContent = renderShopPage(formattedCat);
  } else if (currentPath === '/deals') {
    document.title = 'TechX — Flash Deals & Limited Releases';
    mainContent = renderDealsPage();
  } else if (currentPath === '/new-arrivals') {
    document.title = 'TechX — 2026 New Arrivals';
    mainContent = renderShopPage();
  } else if (currentPath === '/checkout') {
    document.title = 'TechX — Secure Checkout';
    mainContent = renderCheckoutPage();
  } else if (currentPath === '/track-order') {
    document.title = 'TechX — Order Tracking & Shipment Status';
    mainContent = renderTrackOrderPage();
  } else if (currentPath === '/wishlist') {
    document.title = 'TechX — Saved Wishlist';
    mainContent = renderWishlistPage();
  } else if (currentPath === '/account') {
    document.title = 'TechX — My Account';
    mainContent = renderAccountPage();
  } else if (currentPath === '/login') {
    document.title = 'TechX — Sign In';
    mainContent = renderLoginPage();
  } else if (currentPath === '/about') {
    document.title = 'TechX — About & Engineering Philosophy';
    mainContent = renderAboutPage();
  } else if (currentPath === '/contact') {
    document.title = 'TechX — Contact Specialists';
    mainContent = renderContactPage();
  } else {
    document.title = 'TechX — Precision Hardware';
    mainContent = renderHomePage();
  }

  const app = document.querySelector('#app');
  if (app) {
    app.innerHTML = `
      ${nav()}
      <main>${mainContent}</main>
      ${footer()}
    `;
  }

  // Re-render open portals
  renderQuickViewModal();
  renderCartDrawer();
}

function go(path) {
  location.hash = path;
}

// =============================================================================
// 20. KEYBOARD SHORTCUTS & EVENT LISTENERS
// =============================================================================

window.addEventListener('keydown', (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
    e.preventDefault();
    openSearchModal();
  }
  if (e.key === 'Escape') {
    closeSearchModal();
    closeQuickView();
    toggleCart(false);
  }
});

window.addEventListener('hashchange', page);

// Expose globals for inline event handlers
Object.assign(window, {
  go,
  addToCart,
  updateCartQty,
  removeCartItem,
  toggleWishlist,
  applyCoupon,
  removeCoupon,
  toggleTheme,
  toggleCart,
  openQuickView,
  closeQuickView,
  openSearchModal,
  closeSearchModal,
  handleModalSearch,
  handleNewsletterSubmit,
  handleOrderSubmission,
  handleLogin,
  logout,
  setCategoryFilter,
  toggleMobileMenu
});

// =============================================================================
// 21. GOOGLE SPREADSHEET & ANALYTICS INTEGRATION
// =============================================================================

const ANALYTICS_URL = 'https://script.google.com/macros/s/AKfycbwmStIqTFyRjoakSGbLmIEBH89HUCLF9tMVdXa1KL6SNOuUf7QlbOlqelsZIAuIeC6O/exec';

const visitor = localStorage.getItem('tx-visitor') || (typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : 'vis-' + Math.random().toString(36).slice(2));
const returning = !!localStorage.getItem('tx-visitor');
localStorage.setItem('tx-visitor', visitor);
const started = Date.now();
const sessionId = (typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : 'ses-' + Math.random().toString(36).slice(2));

function sendAnalytics(force = false) {
  const pad = n => String(n).padStart(2, '0');
  const now = new Date();
  const formattedDate = `${pad(now.getDate())}/${pad(now.getMonth() + 1)}/${now.getFullYear()}, ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;

  const data = {
    timestamp: formattedDate,
    sessionId: sessionId,
    visitorId: visitor,
    duration: Math.round((Date.now() - started) / 1000),
    pages: state.seen.size,
    scroll: state.maxScroll || 0,
    purchased: state.purchased || false,
    purchaseAmount: state.purchaseAmount || 0,
    returning: returning
  };

  // 1. Google Spreadsheet webhook (Google Apps Script)
  try {
    fetch(ANALYTICS_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'text/plain' },
      body: JSON.stringify(data)
    }).catch(() => {});
  } catch (e) {}

  // 2. Local Node server endpoint (if running server.js)
  try {
    fetch('/api/analytics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).catch(() => {});
  } catch (e) {}
}

window.addEventListener('pagehide', () => sendAnalytics(false));
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'hidden') sendAnalytics(false);
});

window.addEventListener('scroll', () => {
  const h = document.documentElement.scrollHeight - window.innerHeight;
  state.maxScroll = Math.max(state.maxScroll || 0, h > 0 ? Math.round((window.scrollY / h) * 100) : 100);
});

// Flash deal ticking simulator
setInterval(() => {
  const timer = document.getElementById('flash-deal-timer');
  if (timer) {
    const now = new Date();
    const h = String(23 - now.getHours()).padStart(2, '0');
    const m = String(59 - now.getMinutes()).padStart(2, '0');
    const s = String(59 - now.getSeconds()).padStart(2, '0');
    timer.innerText = `${h}h : ${m}m : ${s}s`;
  }
}, 1000);

// Expose sendAnalytics globally
Object.assign(window, { sendAnalytics });

// Initialize application
page();

