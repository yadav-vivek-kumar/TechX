const products = [
  ['Pulse Pro Headphones', 'Audio', 'Rs. 19,990', 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=85'],
  ['Orbit X1 Watch', 'Wearables', 'Rs. 14,990', 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=85'],
  ['NovaBook Air', 'Computers', 'Rs. 89,990', 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=900&q=85'],
  ['Lens Mini 4K', 'Cameras', 'Rs. 39,990', 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=900&q=85'],
  ['Arc Mechanical Keys', 'Accessories', 'Rs. 8,990', 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=900&q=85'],
  ['Halo Smart Hub', 'Smart Home', 'Rs. 12,990', 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=900&q=85'],
  ['Vertex Gaming Mouse', 'Accessories', 'Rs. 4,990', 'https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=900&q=85'],
  ['Vision OLED 55', 'Home entertainment', 'Rs. 74,990', 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=900&q=85'],
  ['Echo Mini Speaker', 'Audio', 'Rs. 6,990', 'https://images.unsplash.com/photo-1589003077984-894e133dabab?auto=format&fit=crop&w=900&q=85'],
  ['PixelTab 11', 'Tablets', 'Rs. 32,990', 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=900&q=85'],
  ['Aero Drone', 'Cameras', 'Rs. 54,990', 'https://images.unsplash.com/photo-1506947411487-a56738267384?auto=format&fit=crop&w=900&q=85'],
  ['ChargeDock Duo', 'Accessories', 'Rs. 3,490', 'https://images.unsplash.com/photo-1615526675159-e248c3021d3f?auto=format&fit=crop&w=900&q=85']
];

const ANALYTICS_URL = 'https://script.google.com/macros/s/AKfycbwmStIqTFyRjoakSGbLmIEBH89HUCLF9tMVdXa1KL6SNOuUf7QlbOlqelsZIAuIeC6O/exec';

const pages = {
  '/': ['Home', 'Technology,<br>made human.', 'The devices you want. The guidance you deserve.'],
  '/shop': ['Shop', 'The future is<br>in your hands.', 'Explore technology built for the way you live.'],
  '/categories': ['Categories', 'Find your<br>next obsession.', 'A considered collection of technology that matters.'],
  '/deals': ['Deals', 'Good tech.<br>Better prices.', 'Limited releases and special savings.'],
  '/new-arrivals': ['New arrivals', 'Fresh from<br>the frontier.', 'The newest technology, before it becomes ordinary.'],
  '/audio': ['Audio', 'Hear every<br>detail.', 'Sound that makes space for everything else to disappear.'],
  '/computers': ['Computers', 'Work without<br>limits.', 'Remarkable performance for your biggest ideas.'],
  '/mobiles': ['Mobiles', 'Your world,<br>in hand.', 'Phones that keep your life beautifully in sync.'],
  '/wearables': ['Wearables', 'Made to<br>move with you.', 'A better read on every day.'],
  '/cameras': ['Cameras', 'Keep the<br>moment close.', 'Tools for seeing your world differently.'],
  '/smart-home': ['Smart home', 'Home,<br>reimagined.', 'Thoughtful technology that works in the background.'],
  '/accessories': ['Accessories', 'The finishing<br>touches.', 'Small details. Significant upgrades.'],
  '/about': ['About us', 'Curious by<br>design.', 'Great technology should feel clear and useful.'],
  '/contact': ['Contact us', 'Lets talk<br>technology.', 'Our specialists are here seven days a week.'],
  '/faq': ['FAQs', 'Questions,<br>answered.', 'Everything you want to know about TechX.'],
  '/support': ['Support', 'We are here<br>to help.', 'Fast answers and genuine support.'],
  '/shipping': ['Shipping', 'Delivered,<br>delightfully.', 'Simple, trackable delivery across India.'],
  '/returns': ['Returns', 'Easy does<br>it.', 'If it is not right, we will make it right.'],
  '/privacy': ['Privacy', 'Your data,<br>your choice.', 'A clear and respectful approach to privacy.'],
  '/checkout': ['Checkout', 'Nearly yours.', 'Review your bag and finish your order.'],
  '/account': ['My account', 'Everything,<br>in one place.', 'Your details, orders and saved products.'],
  '/wishlist': ['Wishlist', 'Saved for<br>later.', 'A beautiful list of things you are considering.'],
  '/track-order': ['Track order', 'Follow your<br>delivery.', 'Enter your order number to see where it is.'],
  '/login': ['Login', 'Welcome<br>back.', 'Sign in to keep your TechX picks close.']
};

const route = () => location.hash.slice(1) || '/';
const state = {
  cart: JSON.parse(localStorage.getItem('tx-cart') || '[]'),
  wish: JSON.parse(localStorage.getItem('tx-wish') || '[]'),
  seen: new Set([route()]),
  maxScroll: 0,
  purchased: false,
  purchaseAmount: 0
};

const visitor = localStorage.getItem('tx-visitor') || crypto.randomUUID();
const returning = !!localStorage.getItem('tx-visitor');
localStorage.setItem('tx-visitor', visitor);
const started = Date.now();
const sessionId = crypto.randomUUID();

const count = () => state.cart.length;
const getCartTotal = () => state.cart.reduce((sum, id) => sum + Number(products[id][2].replace(/[^0-9]/g, '')), 0);

function showToast(msg) {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.innerText = msg;
  toast.classList.remove('hidden');
  setTimeout(() => toast.classList.add('hidden'), 3500);
}

function nav() {
  const user = localStorage.getItem('tx-user');
  return `
    <header>
      <a class="brand" href="/">
        <img src="logo.png" alt="TechX" class="brand-logo">
      </a>
      <nav>
        <a href="/shop">Shop</a>
        <a href="/new-arrivals">New Arrivals</a>
        <a href="/deals">Deals</a>
        <a href="/about">About</a>
      </nav>
      <div class="nav-right">
        <button class="login" onclick="go('${user ? '/account' : '/login'}')">${user ? user : 'Sign In'}</button>
        <button class="bag" onclick="go('/checkout')">Bag <b>${count()}</b></button>
      </div>
    </header>
  `;
}

function cards() {
  return `
    <section class="products">
      <div class="section-top">
        <div>
          <p class="eyebrow">CURATED COLLECTION</p>
          <h2>Precision engineering.</h2>
        </div>
        <a href="/shop">Explore all (${products.length}) &rarr;</a>
      </div>
      <div class="grid">
        ${products.map((p, i) => `
          <article class="product">
            <div class="product-art">
              <img src="${p[3]}" alt="${p[0]}" loading="lazy">
              <span>${i % 3 === 0 ? 'FEATURED' : 'NEW'}</span>
            </div>
            <p class="category">${p[1]}</p>
            <h3>${p[0]}</h3>
            <p class="price">${p[2]}</p>
            <div class="product-actions">
              <button onclick="add(${i})">Add to bag +</button>
              <button class="heart ${state.wish.includes(i) ? 'saved' : ''}" onclick="toggleWish(${i})">
                ${state.wish.includes(i) ? 'Saved' : 'Save'}
              </button>
            </div>
          </article>
        `).join('')}
      </div>
    </section>
  `;
}

function lineItems() {
  const grouped = state.cart.reduce((a, i) => (a[i] = (a[i] || 0) + 1, a), {});
  return Object.entries(grouped).map(([id, qty]) => `
    <div class="cart-line">
      <img src="${products[id][3]}" alt="${products[id][0]}">
      <div>
        <strong>${products[id][0]}</strong>
        <p class="category" style="margin:0">${products[id][2]}</p>
      </div>
      <div class="qty">
        <button onclick="changeQty(${id}, -1)">&minus;</button>
        <b>${qty}</b>
        <button onclick="changeQty(${id}, 1)">&#43;</button>
      </div>
      <button class="remove" onclick="removeItem(${id})">Remove</button>
    </div>
  `).join('');
}

function info(path) {
  if (path === '/login') {
    return `
      <section class="info auth">
        <form class="login-card" onsubmit="login(event)">
          <p class="eyebrow">TECHX ID</p>
          <h2>Sign in</h2>
          <p class="category">Enter your details to access saved items and tracking.</p>
          <input id="login-name" placeholder="Your Name" required>
          <input type="email" placeholder="Email Address" required>
          <input type="password" placeholder="Password" required>
          <button type="submit">Sign In</button>
        </form>
      </section>
    `;
  }
  if (path === '/account') {
    const u = localStorage.getItem('tx-user');
    return `
      <section class="info">
        <p class="eyebrow">ACCOUNT</p>
        <h2>${u ? `Welcome, ${u}.` : 'Please sign in.'}</h2>
        <p class="sub" style="margin: 16px 0;">You have ${count()} item(s) in your bag and ${state.wish.length} product(s) on your wishlist.</p>
        ${u ? '<button onclick="logout()">Log Out</button>' : '<a class="button" href="/login">Sign In</a>'}
      </section>
    `;
  }
  if (path === '/wishlist') {
    return `
      <section class="info">
        <p class="eyebrow">WISHLIST</p>
        <h2>${state.wish.length ? 'Saved for later.' : 'Your wishlist is empty.'}</h2>
        <div class="grid" style="margin-top: 30px;">
          ${state.wish.map(i => `
            <article class="product">
              <div class="product-art"><img src="${products[i][3]}"></div>
              <h3>${products[i][0]}</h3>
              <p class="price">${products[i][2]}</p>
              <button class="button" style="margin-top:12px; width:100%" onclick="add(${i})">Move to Bag</button>
            </article>
          `).join('')}
        </div>
      </section>
    `;
  }
  if (path === '/checkout') {
    const total = getCartTotal();
    return `
      <section class="info">
        <p class="eyebrow">BAG SUMMARY</p>
        <h2>${count() ? `${count()} item(s) ready.` : 'Your bag is empty.'}</h2>
        ${count() ? `
          <div class="checkout-wrapper">
            <div>${lineItems()}</div>
            <div class="order-summary">
              <h3 style="margin-bottom:16px;">Order Summary</h3>
              <div class="summary-row"><span>Subtotal</span><span>Rs. ${total.toLocaleString('en-IN')}</span></div>
              <div class="summary-row"><span>Standard Shipping</span><span>FREE</span></div>
              <div class="summary-row total"><span>Total</span><span>Rs. ${total.toLocaleString('en-IN')}</span></div>
              <button class="button" style="width: 100%; margin-top: 20px;" onclick="purchase()">Complete Purchase</button>
            </div>
          </div>
        ` : `<a class="button" href="/shop" style="margin-top: 20px;">Browse Catalog</a>`}
      </section>
    `;
  }
  return `
    <section class="info">
      <p class="eyebrow">TECHX ${pages[path] ? pages[path][0].toUpperCase() : ''}</p>
      <h2>Designed around performance.</h2>
      <p class="sub" style="margin-top:16px;">Explore curated hardware engineered for high standards and reliability.</p>
    </section>
  `;
}

function page() {
  const path = pages[route()] ? route() : '/';
  state.seen.add(path);
  const d = pages[path];
  document.title = `TechX - ${d[0]}`;
  const isListing = ['/shop', '/categories', '/deals', '/new-arrivals', '/audio', '/computers', '/mobiles', '/wearables', '/cameras', '/smart-home', '/accessories'].includes(path);

  document.querySelector('#app').innerHTML = `
    ${nav()}
    <main>
      <section class="hero">
        <div class="orb"></div>
        <p class="eyebrow">${path === '/' ? 'THE 2026 EDITION' : d[0]}</p>
        <h1>${d[1]}</h1>
        <p class="sub">${d[2]}</p>
        ${path === '/' ? '<a class="button" href="/shop">Explore Collection</a>' : ''}
        <div class="hero-number">01 // 24</div>
      </section>
      ${isListing || path === '/' ? cards() : info(path)}
      <section class="promise">
        <p class="eyebrow" style="color:var(--orange)">TECHX STANDARD</p>
        <h2>Engineered for durability.<br>Designed for clarity.</h2>
        <div>
          <div><span>01</span> Curated Quality</div>
          <div><span>02</span> Direct Logistics</div>
          <div><span>03</span> Lifetime Support</div>
        </div>
      </section>
    </main>
    <footer>
      <a class="brand" href="/">
        <img src="logo.png" alt="TechX" class="brand-logo footer-logo">
      </a>
      <div>
        <a href="/contact">Contact</a>
        <a href="/support">Support</a>
        <a href="/wishlist">Wishlist</a>
      </div>
      <p>&copy; 2026 TechX Systems. All rights reserved.</p>
    </footer>
    <div id="toast" class="toast hidden"></div>
  `;
  scrollTo({ top: 0, behavior: 'instant' });
}

function go(x) { location.hash = x; }
function save() {
  localStorage.setItem('tx-cart', JSON.stringify(state.cart));
  localStorage.setItem('tx-wish', JSON.stringify(state.wish));
}

function add(i) {
  state.cart.push(i);
  save();
  showToast(`Added ${products[i][0]} to Bag`);
  page();
}

function changeQty(i, n) {
  if (n > 0) {
    state.cart.push(i);
  } else {
    const idx = state.cart.indexOf(i);
    if (idx > -1) state.cart.splice(idx, 1);
  }
  save();
  page();
}

function removeItem(i) {
  state.cart = state.cart.filter(x => x !== i);
  save();
  showToast('Item removed');
  page();
}

function toggleWish(i) {
  if (state.wish.includes(i)) {
    state.wish = state.wish.filter(x => x !== i);
    showToast('Removed from Wishlist');
  } else {
    state.wish.push(i);
    showToast('Saved to Wishlist');
  }
  save();
  page();
}

function purchase() {
  state.purchaseAmount = getCartTotal();
  state.purchased = true;
  sendAnalytics(true);
  state.cart = [];
  state.purchased = false;
  state.purchaseAmount = 0;
  save();
  showToast('Order confirmed! Sending details...');
  setTimeout(() => go('/'), 1200);
}

function login(e) {
  e.preventDefault();
  const name = document.querySelector('#login-name').value;
  localStorage.setItem('tx-user', name);
  showToast(`Signed in as ${name}`);
  go('/account');
}

function logout() {
  localStorage.removeItem('tx-user');
  showToast('Signed out');
  go('/');
}

Object.assign(window, { go, add, changeQty, removeItem, toggleWish, purchase, login, logout });

document.addEventListener('click', e => {
  const a = e.target.closest('a[href^="/"]');
  if (a) {
    e.preventDefault();
    go(a.getAttribute('href'));
  }
});

addEventListener('hashchange', page);
addEventListener('scroll', () => {
  const h = document.documentElement.scrollHeight - innerHeight;
  state.maxScroll = Math.max(state.maxScroll, h ? Math.round(scrollY / h * 100) : 100);
});

function sendAnalytics(force = false) {
  const pad = n => String(n).padStart(2, '0');
  const now = new Date();
  const formattedDate = `${pad(now.getDate())}/${pad(now.getMonth() + 1)}/${now.getFullYear()}, ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;

  const data = {
    timestamp: formattedDate,
    sessionId: sessionId,
    visitorId: visitor,
    duration: Math.max(Math.round((Date.now() - started) / 1000), 1),
    pages: state.seen.size,
    scroll: state.maxScroll,
    purchased: state.purchased,
    purchaseAmount: state.purchaseAmount,
    returning: returning
  };

  fetch(ANALYTICS_URL, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'text/plain' },
    body: JSON.stringify(data)
  });
}

addEventListener('pagehide', () => sendAnalytics(false));
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'hidden') sendAnalytics(false);
});

page();
