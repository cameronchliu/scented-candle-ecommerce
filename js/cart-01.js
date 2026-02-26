/* ============================================================
   cart-01.js — 購物車確認頁邏輯
   依賴：cart.js（getCart / saveCart）
============================================================ */

/* ── 讀取資料 ── */
// shoppingData：商品資料庫（補充 img / tag 等欄位用）
const shoppingData = JSON.parse(localStorage.getItem('shoppingList')) || [];
// savedCart：唯一真相，紀錄實際加入購物車的商品與數量
const savedCart = getCart();

/* ── 產生 nowshopping（以 cart.items 為主，缺欄位才從 shoppingData 補）── */
let nowshopping = (savedCart.items || []).map(ci => {
  const full = shoppingData.find(p => p.title === ci.title);
  return {
    title: ci.title,
    price: Number(ci.price ?? full?.price ?? 0),
    img:   ci.img  ?? full?.img  ?? '',
    tag:   ci.tag  ?? full?.tag  ?? '',
    total: Number(ci.qty ?? 1)     // qty（cart）→ total（畫面用）
  };
});

/* ── 渲染商品列表 ── */
const shoppingListEl = document.querySelector('#shopping-list');
shoppingListEl.innerHTML = '';

if (nowshopping.length === 0) {
  shoppingListEl.innerHTML = `
    <div class="text-center text-sub py-5">
      購物車目前是空的喔 🛒
    </div>
  `;
} else {
  nowshopping.forEach(item => {
    shoppingListEl.innerHTML += `
      <div class="d-flex justify-content-between align-items-center">
        <div class="d-flex gap-3 gap-md-5">
          <img class="circle rounded-circle" src="${item.img}" alt="${item.title}">
          <div>
            <div class="fw-semibold text-main mb-1">${item.title}</div>
            <small class="text-sub">香調：<span class="fst-italic">${item.tag}</span></small>
            <div class="text-xs text-sub">容量：200g</div>
          </div>
        </div>
        <div class="d-flex align-items-center">
          <div class="input-group mx-3" style="width: 120px;">
            <button class="btn btn-click" data-calculate="-1">-</button>
            <input type="text" class="form-control text-center"
              value="${item.total}" data-shoppingname="${item.title}">
            <button class="btn btn-click" data-calculate="1">+</button>
          </div>
          <div class="text-main">💲 ${Number(item.price).toLocaleString()}</div>
        </div>
      </div>
      <hr>
    `;
  });
}

/* ── 數量加減按鈕（+ / -）── */
document.querySelectorAll('.btn-click').forEach(btn => {
  btn.addEventListener('click', () => {
    const input = btn.parentNode.children[1];
    const title = input.dataset.shoppingname;
    const delta = parseInt(btn.dataset.calculate, 10);
    let   qty   = parseInt(input.value, 10) + delta;
    if (qty < 1) qty = 1;

    input.value = qty;

    const item = nowshopping.find(p => p.title === title);
    if (!item) return;

    item.total = qty;
    btn.parentNode.nextElementSibling.innerHTML =
      `💲${(Number(item.price) * qty).toLocaleString()}`;

    calculatePrice();
  });
});

/* ── 手動輸入數量 ── */
document.querySelectorAll('input[data-shoppingname]').forEach(input => {
  input.addEventListener('change', () => {
    const title = input.dataset.shoppingname;
    let   qty   = parseInt(input.value, 10);
    if (isNaN(qty) || qty < 1) qty = 1;
    input.value = qty;

    const item = nowshopping.find(p => p.title === title);
    if (!item) return;

    item.total = qty;
    calculatePrice();
  });
});

/* ── 計算並更新頁面金額，同步存回 cart ── */
function calculatePrice() {
  const taxEl    = document.querySelector('#shopping-tax');
  const shipping = Number(taxEl.innerHTML.replace('$', '').replace(',', ''));

  let totalQty = 0;
  let subtotal = 0;
  nowshopping.forEach(item => {
    totalQty += item.total;
    subtotal += Number(item.total) * Number(item.price);
  });

  document.querySelector('#shopping-count').innerHTML = totalQty;
  document.querySelector('#shopping-sum').innerHTML   = `$${subtotal.toLocaleString()}`;
  document.querySelector('#shopping-total').innerHTML = `$${(subtotal + shipping).toLocaleString()}`;

  // 更新後存回 cart
  saveCart({
    items: nowshopping.map(i => ({
      title: i.title,
      price: Number(i.price),
      qty:   Number(i.total),
      img:   i.img,
      tag:   i.tag
    })),
    shipping
  });
}

/* ── 初始化計算 ── */
calculatePrice();