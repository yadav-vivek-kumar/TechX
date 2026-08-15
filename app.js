const products = [
  ['Pulse Pro Headphones','Audio','Rs. 19,990','https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=85'],
  ['Orbit X1 Watch','Wearables','Rs. 14,990','https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=85'],
  ['NovaBook Air','Computers','Rs. 89,990','https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=900&q=85'],
  ['Lens Mini 4K','Cameras','Rs. 39,990','https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=900&q=85'],
  ['Arc Mechanical Keys','Accessories','Rs. 8,990','https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=900&q=85'],
  ['Halo Smart Hub','Smart Home','Rs. 12,990','https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=900&q=85'],
  ['Vertex Gaming Mouse','Accessories','Rs. 4,990','https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=900&q=85'],
  ['Vision OLED 55','Home entertainment','Rs. 74,990','https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=900&q=85'],
  ['Echo Mini Speaker','Audio','Rs. 6,990','https://images.unsplash.com/photo-1589003077984-894e133dabab?auto=format&fit=crop&w=900&q=85'],
  ['PixelTab 11','Tablets','Rs. 32,990','https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=900&q=85'],
  ['Aero Drone','Cameras','Rs. 54,990','https://images.unsplash.com/photo-1506947411487-a56738267384?auto=format&fit=crop&w=900&q=85'],
  ['ChargeDock Duo','Accessories','Rs. 3,490','https://images.unsplash.com/photo-1615526675159-e248c3021d3f?auto=format&fit=crop&w=900&q=85']
];

const ANALYTICS_URL = 'https://script.google.com/macros/s/AKfycbwmStIqTFyRjoakSGbLmIEBH89HUCLF9tMVdXa1KL6SNOuUf7QlbOlqelsZIAuIeC6O/exec';

const pages={
 '/':['Home','Technology,<br>made human.','The devices you want. The guidance you deserve.'], '/shop':['Shop','The future is<br>in your hands.','Explore technology built for the way you live.'], '/categories':['Categories','Find your<br>next obsession.','A considered collection of technology that matters.'], '/deals':['Deals','Good tech.<br>Better prices.','Limited releases and special savings.'], '/new-arrivals':['New arrivals','Fresh from<br>the frontier.','The newest technology, before it becomes ordinary.'], '/audio':['Audio','Hear every<br>detail.','Sound that makes space for everything else to disappear.'], '/computers':['Computers','Work without<br>limits.','Remarkable performance for your biggest ideas.'], '/mobiles':['Mobiles','Your world,<br>in hand.','Phones that keep your life beautifully in sync.'], '/wearables':['Wearables','Made to<br>move with you.','A better read on every day.'], '/cameras':['Cameras','Keep the<br>moment close.','Tools for seeing your world differently.'], '/smart-home':['Smart home','Home,<br>reimagined.','Thoughtful technology that works in the background.'], '/accessories':['Accessories','The finishing<br>touches.','Small details. Significant upgrades.'], '/about':['About us','Curious by<br>design.','Great technology should feel clear and useful.'], '/contact':['Contact us','Lets talk<br>technology.','Our specialists are here seven days a week.'], '/faq':['FAQs','Questions,<br>answered.','Everything you want to know about TechX.'], '/support':['Support','We are here<br>to help.','Fast answers and genuine support.'], '/shipping':['Shipping','Delivered,<br>delightfully.','Simple, trackable delivery across India.'], '/returns':['Returns','Easy does<br>it.','If it is not right, we will make it right.'], '/privacy':['Privacy','Your data,<br>your choice.','A clear and respectful approach to privacy.'], '/checkout':['Checkout','Nearly yours.','Review your bag and finish your order.'], '/account':['My account','Everything,<br>in one place.','Your details, orders and saved products.'], '/wishlist':['Wishlist','Saved for<br>later.','A beautiful list of things you are considering.'], '/track-order':['Track order','Follow your<br>delivery.','Enter your order number to see where it is.'], '/login':['Login','Welcome<br>back.','Sign in to keep your TechX picks close.']
};

const route=()=>location.hash.slice(1)||'/';
const state={cart:JSON.parse(localStorage.getItem('tx-cart')||'[]'),wish:JSON.parse(localStorage.getItem('tx-wish')||'[]'),seen:new Set([route()]),maxScroll:0,purchased:false,purchaseAmount:0};
const visitor=localStorage.getItem('tx-visitor')||crypto.randomUUID();const returning=!!localStorage.getItem('tx-visitor');localStorage.setItem('tx-visitor',visitor);const started=Date.now();const sessionId=crypto.randomUUID();
const count=()=>state.cart.length;

const getCartTotal=()=>state.cart.reduce((sum,id)=>sum+Number(products[id][2].replace(/[^0-9]/g,'')),0);

function nav(){const user=localStorage.getItem('tx-user');return `<header><a class="brand" href="/">TECH<span>X</span></a><nav><a href="/shop">Shop</a><a href="/new-arrivals">New arrivals</a><a href="/deals">Offers</a><a href="/about">Our story</a></nav><div class="nav-right"><button class="login" onclick="go('${user?'/account':'/login'}')">${user?'Account':'Log in'}</button><button class="bag" onclick="go('/checkout')">Bag <b>${count()}</b></button></div></header>`}
function cards(){return `<section class="products"><div class="section-top"><p class="eyebrow">CURATED FOR YOU</p><h2>Worth a closer look.</h2><a href="/shop">All products</a></div><div class="grid">${products.map((p,i)=>`<article class="product"><div class="product-art"><img src="${p[3]}" alt="${p[0]}"><span>${i%3?'NEW':'TECHX PICK'}</span></div><p class="category">${p[1]}</p><h3>${p[0]}</h3><p>${p[2]}</p><div class="product-actions"><button onclick="add(${i})">Add to bag +</button><button class="heart" onclick="toggleWish(${i})">${state.wish.includes(i)?'Saved':'Save'}</button></div></article>`).join('')}</div></section>`}
function lineItems(){const grouped=state.cart.reduce((a,i)=>(a[i]=(a[i]||0)+1,a),{});return Object.entries(grouped).map(([id,qty])=>`<div class="cart-line"><img src="${products[id][3]}" alt=""><div><strong>${products[id][0]}</strong><small>${products[id][2]}</small></div><div class="qty"><button onclick="changeQty(${id},-1)">-</button><b>${qty}</b><button onclick="changeQty(${id},1)">+</button></div><button class="remove" onclick="removeItem(${id})">Remove</button></div>`).join('')}
function info(path){
  if(path==='/login')return `<section class="info auth"><form class="login-card" onsubmit="login(event)"><p class="eyebrow">TECHX ACCOUNT</p><h2>Sign in.</h2><p>Use any email and password for this demo account.</p><input id="login-name" placeholder="Your name" required><input type="email" placeholder="Email address" required><input type="password" placeholder="Password" minlength="4" required><button>Log in</button></form></section>`;
  if(path==='/account'){const u=localStorage.getItem('tx-user');return `<section class="info"><p class="eyebrow">MY TECHX</p><h2>${u?'Hi, '+u+'.':'Sign in to your account.'}</h2><p>Your bag has ${count()} item(s) and you have ${state.wish.length} saved product(s).</p>${u?'<button onclick="logout()">Log out</button>':'<a class="button" href="/login">Log in</a>'}</section>`}
  if(path==='/wishlist')return `<section class="info"><p class="eyebrow">SAVED PRODUCTS</p><h2>${state.wish.length?'Your shortlist.':'Nothing saved yet.'}</h2><div class="saved-grid">${state.wish.map(i=>'<div class="saved"><img src="'+products[i][3]+'" alt="'+products[i][0]+'"><p>'+products[i][0]+'</p><button onclick="add('+i+')">Add to bag +</button></div>').join('')}</div></section>`;
  if(path==='/checkout')return `<section class="info checkout"><div><p class="eyebrow">YOUR BAG</p><h2>${count()?count()+' item'+(count()>1?'s':'')+', excellent choice.':'Your bag is waiting.'}</h2><div class="cart-items">${lineItems()}</div></div>${count()?'<button onclick="purchase()">Complete purchase</button>':'<a class="button" href="/shop">Explore products</a>'}</section>`;
  if(path==='/contact')return `<section class="info contact"><div><p class="eyebrow">CONTACT TECHX</p><h2>How can we help?</h2><p>Our team is available 9am-9pm, every day.</p></div><form onsubmit="event.preventDefault();alert('Thank you. We will be in touch soon.')"><input placeholder="Your name" required><input placeholder="Email address" type="email" required><textarea placeholder="Tell us what you need"></textarea><button>Send message</button></form></section>`;
  if(path==='/faq')return `<section class="info"><p class="eyebrow">THE ESSENTIALS</p><div class="faq">${['When will my order arrive?','Can I return a product?','Are products covered by warranty?','How do I track delivery?','How can I pay?'].map(q=>`<details><summary>${q}<i>+</i></summary><p>Our team makes every step simple. Visit Support or contact a TechX specialist for help.</p></details>`).join('')}</div></section>`;
  return `<section class="info"><p class="eyebrow">TECHX ${pages[path][0].toUpperCase()}</p><div class="columns"><h2>Designed around real life.</h2><p>Technology should create possibilities, not complications. TechX brings together thoughtful devices, clear advice, and support that stays with you long after checkout.</p><p>Explore with confidence. Every product is selected for quality, performance, and its power to make everyday moments feel better.</p></div></section>`
}
function page(){const path=pages[route()]?route():'/';state.seen.add(path);const d=pages[path];document.title=`TechX - ${d[0]}`;const listing=['/shop','/categories','/deals','/new-arrivals','/audio','/computers','/mobiles','/wearables','/cameras','/smart-home','/accessories'].includes(path);document.querySelector('#app').innerHTML=`${nav()}<main><section class="hero"><div class="orb"></div><p class="eyebrow">${path==='/'?'THE TECHX EDIT':d[0]}</p><h1>${d[1]}</h1><p class="sub">${d[2]}</p>${path==='/'?'<a class="button" href="/shop">Shop the collection</a>':''}<div class="hero-number">01 - 24</div></section>${listing||path==='/'?cards():info(path)}<section class="promise"><p>TECHX STANDARD</p><h2>Better tech begins<br>with better choices.</h2><div><span>01</span> Considered selection <span>02</span> Human support <span>03</span> Made to last</div></section></main><footer><a class="brand" href="/">TECH<span>X</span></a><div><a href="/contact">Contact</a><a href="/support">Support</a><a href="/track-order">Track order</a><a href="/wishlist">Wishlist</a></div><p>2026 TechX. Better everyday.</p></footer>`;scrollTo({top:0,behavior:'instant'})}
function go(x){location.hash=x}function save(){localStorage.setItem('tx-cart',JSON.stringify(state.cart));localStorage.setItem('tx-wish',JSON.stringify(state.wish))}function add(i){state.cart.push(i);save();page()}function changeQty(i,n){if(n>0)state.cart.push(i);else state.cart.splice(state.cart.indexOf(i),1);save();page()}function removeItem(i){state.cart=state.cart.filter(x=>x!==i);save();page()}function toggleWish(i){state.wish.includes(i)?state.wish=state.wish.filter(x=>x!==i):state.wish.push(i);save();page()}

function purchase(){
  state.purchaseAmount = getCartTotal();
  state.purchased = true;
  sendAnalytics(true);
  state.cart = [];
  state.purchased = false;
  state.purchaseAmount = 0;
  save();
  alert('Order confirmed. Thank you for choosing TechX!');
  page();
}

function login(e){e.preventDefault();localStorage.setItem('tx-user',document.querySelector('#login-name').value);go('/account')}function logout(){localStorage.removeItem('tx-user');go('/')}
Object.assign(window,{go,add,changeQty,removeItem,toggleWish,purchase,login,logout});
document.addEventListener('click',e=>{const a=e.target.closest('a[href^="/"]');if(a){e.preventDefault();go(a.getAttribute('href'))}});addEventListener('hashchange',page);addEventListener('scroll',()=>{const h=document.documentElement.scrollHeight-innerHeight;state.maxScroll=Math.max(state.maxScroll,h?Math.round(scrollY/h*100):100)});

function sendAnalytics(force=false){
  const pad = n => String(n).padStart(2, '0');
  const now = new Date();
  const formattedDate = `${pad(now.getDate())}/${pad(now.getMonth()+1)}/${now.getFullYear()}, ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;

  const data = {
    timestamp: formattedDate,
    sessionId: sessionId,
    visitorId: visitor,
    duration: Math.round((Date.now()-started)/1000),
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
