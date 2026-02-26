/* ============================================================
   cart.js — 全站共用購物車工具函式
   所有需要存取 localStorage.cart 的頁面都引入這個檔案
============================================================ */

/**
 * 讀取購物車
 * @returns {{ items: Array, shipping: number }}
 */
function getCart() {
  return JSON.parse(localStorage.getItem('cart')) || { items: [], shipping: 60 };
}

/**
 * 將購物車存回 localStorage
 * @param {{ items: Array, shipping: number }} cart
 */
function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}

/**
 * 讀取 cart 並將金額 Summary 顯示到畫面
 * cart-02 / cart-03 / cart-04 共用
 */
function renderSummary() {
  const cart     = getCart();
  const count    = cart.items.reduce((sum, item) => sum + item.qty, 0);
  const subtotal = cart.items.reduce((sum, item) => sum + item.qty * item.price, 0);
  const shipping = cart.shipping ?? 0;
  const total    = subtotal + shipping;

  document.querySelector('#shopping-count').innerText = count;
  document.querySelector('#shopping-sum').innerText   = `$${subtotal.toLocaleString()}`;
  document.querySelector('#shopping-tax').innerText   = `$${shipping.toLocaleString()}`;
  document.querySelector('#shopping-total').innerText = `$${total.toLocaleString()}`;
}