/* ============================================================
   cart-04.js — 訂單完成頁邏輯
   依賴：cart.js（getCart / renderSummary）
============================================================ */

const cart = getCart();

/* ── 渲染訂單明細 ── */
const orderItems = document.querySelector('#order-items');

if (!cart.items || cart.items.length === 0) {
  orderItems.innerHTML = '<p class="text-sub">沒有訂單資料</p>';
} else {
  cart.items.forEach(item => {
    orderItems.innerHTML += `
      <div class="d-flex justify-content-between align-items-center">
        <div class="d-flex gap-5">
          <img class="circle rounded-circle" src="${item.img}" alt="${item.title}">
          <div>
            <div class="fw-semibold text-main mb-1">${item.title}</div>
            <small class="text-sub">香調：<span class="fst-italic">${item.tag}</span></small>
            <div class="text-xs text-sub">容量：200g</div>
          </div>
        </div>
        <div class="d-flex align-items-center justify-content-between" style="min-width: 100px;">
          <div class="text-main">x${item.qty}</div>
          <div class="text-main">💲${(item.qty * item.price).toLocaleString()}</div>
        </div>
      </div>
      <hr>
    `;
  });
}

/* ── 渲染寄送資料 ── */
const receiverBox = document.querySelector('#order-receiver');
const r = cart.receiver;

if (r) {
  receiverBox.innerHTML = `
    <div class="col-12 d-flex mb-2">
      <div class="fw-semibold text-sub" style="width: 70px;">姓名:</div>
      <div>${r.name}</div>
    </div>
    <div class="col-12 d-flex mb-2">
      <div class="fw-semibold text-sub" style="width: 70px;">電話:</div>
      <div>${r.phone}</div>
    </div>
    <div class="col-12 d-flex mb-2">
      <div class="fw-semibold text-sub" style="width: 70px;">Email:</div>
      <div>${r.email}</div>
    </div>
    <div class="col-12 d-flex mb-2">
      <div class="fw-semibold text-sub" style="width: 70px;">地址:</div>
      <div>${r.zip} ${r.city}${r.state}${r.address}</div>
    </div>
  `;
}

/* ── 金額 Summary ── */
renderSummary();

/* ── 返回首頁並清空購物車 ── */
document.querySelector('#backHomeBtn').addEventListener('click', () => {
  localStorage.removeItem('cart');
  window.location.href = './index.html';
});