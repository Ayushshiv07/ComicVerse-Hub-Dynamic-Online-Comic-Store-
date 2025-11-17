/* ============================================================
   ComicVerse Hub — FIXED script.js (Carousel + GSAP Cleaned)
============================================================ */

/* Utilities */
const qs = (s, r=document) => r.querySelector(s);
const qsa = (s, r=document) => Array.from((r||document).querySelectorAll(s));
const fmt = p => `₹${Number(p).toFixed(2)}`;

/* CART STORAGE */
const CART_KEY = 'comicverse_cart_v1';
const getCart = ()=> JSON.parse(localStorage.getItem(CART_KEY) || '{}');
const saveCart = c => localStorage.setItem(CART_KEY, JSON.stringify(c));

/* CART ACTIONS */
const addToCart = (id, qty=1) => { 
    const cart = getCart(); 
    cart[id] = (cart[id]||0)+qty; 
    saveCart(cart); 
    updateCartUI(); 
};
const updateQty = (id, qty) => { 
    const cart = getCart(); 
    if(qty<=0) delete cart[id]; 
    else cart[id]=qty; 
    saveCart(cart); 
    updateCartUI(); 
};
const removeFromCart = (id) => { 
    const cart = getCart(); 
    delete cart[id]; 
    saveCart(cart); 
    updateCartUI(); 
};

/* SLIDE CART */
function openCart(){ qs('#slide-cart').classList.add('open'); renderSlideCart(); }
function closeCart(){ qs('#slide-cart').classList.remove('open'); }

document.addEventListener("click", e=>{
    if(e.target.matches("#open-cart-btn") ||
       e.target.matches("#open-cart-btn-2") ||
       e.target.matches("#open-cart-btn-3") ||
       e.target.matches("#open-cart-btn-4"))
        openCart();

    if(e.target.matches("#close-cart"))
        closeCart();
});

/* RENDER SLIDE CART */
function renderSlideCart(){
  const body = qs('#slide-cart-body');
  const totalEl = qs('#slide-cart-total');
  if(!body) return;

  body.innerHTML = '';
  const cart = getCart();
  let total = 0;

  for(const id in cart){
    const qty = cart[id];
    const comic = COMICS.find(c=>c.id===id);
    if(!comic) continue;
    const sub = comic.price * qty;
    total += sub;

    const row = document.createElement('div');
    row.className = 'cart-item';
    row.innerHTML = `
      <img src="${comic.cover}">
      <div style="flex:1">
        <div style="font-weight:700">${comic.title}</div>
        <div class="muted">${fmt(comic.price)} × ${qty}</div>
      </div>
      <button class="remove-small" data-id="${id}">Remove</button>
    `;
    body.appendChild(row);
  }

  totalEl.textContent = fmt(total);

  qsa(".remove-small").forEach(btn =>
    btn.addEventListener("click", () => removeFromCart(btn.dataset.id))
  );
}

/* UPDATE CART BADGE */
function updateCartUI(){
  const cart = getCart();
  const cnt = Object.values(cart).reduce((a,b)=>a+b,0);

  qsa("#cart-count, #cart-count-2, #cart-count-3, #cart-count-4")
    .forEach(b => b.textContent = cnt);

  renderSlideCart();
}

/* ============================================================
   FIXED CAROUSEL (NO OVERLAP, SMOOTH, WORKS PERFECTLY)
============================================================ */
function initCarousel(){
  const slides = qsa(".hero-carousel .slide");
  const dots = qs("#carousel-dots");
  let idx = 0;

  if(slides.length === 0) return;

  /* INITIALIZE ALL SLIDES AS HIDDEN */
  gsap.set(slides, { opacity: 0, y: 30, pointerEvents: "none" });

  /* SHOW FIRST SLIDE */
  gsap.set(slides[0], { opacity: 1, y: 0, pointerEvents: "auto" });

  /* CREATE DOTS */
  slides.forEach((s, i) => {
    const d = document.createElement("div");
    d.className = "dot";
    if(i === 0) d.classList.add("active");
    d.addEventListener("click", () => go(i));
    dots.appendChild(d);
  });

  function go(i){
    slides.forEach((slide, j) => {
      const active = j === i;

      gsap.to(slide, {
        opacity: active ? 1 : 0,
        y: active ? 0 : 30,
        pointerEvents: active ? "auto" : "none",
        duration: 0.45,
        ease: "power2.out"
      });
    });

    qsa(".dot").forEach((d, j) => 
      d.classList.toggle("active", j === i)
    );

    idx = i;
  }

  setInterval(() => go((idx + 1) % slides.length), 4800);
}

/* ============================================================
   HOME LISTS
============================================================ */
function initHomeLists(){
  const releases = qs('#home-releases');
  const featured = qs('#featured-grid');
  if(!releases || !featured) return;

  COMICS.slice(0,3).forEach(c=>{
    releases.innerHTML += `
      <div style="display:flex; gap:0.6rem; margin-bottom:0.6rem;">
        <img src="${c.cover}" style="width:72px;height:98px;border-radius:8px">
        <div>
          <div style="font-weight:700">${c.title}</div>
          <div class="muted">${c.publisher}</div>
        </div>
      </div>
    `;
  });

  COMICS.forEach(c => featured.appendChild(createCard(c)));
}

function createCard(comic){
  const el = document.createElement("article");
  el.className = "comic-card card";
  el.innerHTML = `
    <a href="comic-detail.html?id=${comic.id}">
      <img src="${comic.cover}">
    </a>
    <div class="meta">
      <h3>${comic.title}</h3>
      <div class="muted">${comic.publisher} · ${new Date(comic.releaseDate).getFullYear()}</div>
      <div style="margin-top:.4rem"><strong>${fmt(comic.price)}</strong></div>
    </div>
  `;
  return el;
}

/* ============================================================
   DETAIL PAGE
============================================================ */
function initDetail(){
  if(!qs('#comic-title')) return;

  const id = new URLSearchParams(location.search).get("id");
  const comic = COMICS.find(c => c.id === id);

  if(!comic){
    qs('#detail').innerHTML = "<p>Not found</p>";
    return;
  }

  qs('#comic-title').textContent = comic.title;
  qs('#comic-creators').textContent = comic.creators;
  qs('#comic-cover').src = comic.cover;
  qs('#comic-synopsis').textContent = comic.synopsis;
  qs('#comic-price').textContent = fmt(comic.price);

  qs('#add-to-cart').addEventListener("click", () => addToCart(comic.id, 1));
}

/* ============================================================
   GSAP CURSOR
============================================================ */
document.addEventListener("mousemove", e => {
  gsap.to("#cursor", {
    x: e.clientX,
    y: e.clientY,
    duration: 0.18,
    ease: "power2.out"
  });
});

qsa("a, button, .comic-card, .cta").forEach(el => {
  el.addEventListener("mouseenter", () =>
    gsap.to("#cursor", { scale: 2.2, background: "#ffb86b", duration: 0.2 })
  );
  el.addEventListener("mouseleave", () =>
    gsap.to("#cursor", { scale: 1, background: "var(--accent)", duration: 0.2 })
  );
});

/* ============================================================
   STARTUP
============================================================ */
window.addEventListener("DOMContentLoaded", () => {
  initCarousel();
  initHomeLists();
  initDetail();
  updateCartUI();
});
