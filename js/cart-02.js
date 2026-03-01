/* ============================================================
   cart-02.js — 付款與運送方式頁邏輯
   依賴：cart.js（renderSummary）
============================================================ */

/* ── 金額 Summary ── */
renderSummary();

/* ── 還原已儲存的選擇 ── */
const savedCart = getCart();

if (savedCart.payment && savedCart.payment.startsWith('payment-')) {
   document.querySelector(`#${savedCart.payment}`).checked = true;
}
if (savedCart.shipping_method && savedCart.shipping_method.startsWith('shipping-')) {
   document.querySelector(`#${savedCart.shipping_method}`).checked = true;
}

/* ── 下一步：儲存選擇並跳頁 ── */
document.querySelector('#next-btn').addEventListener('click', () => {
   const payment = document.querySelector('input[name="payment"]:checked').id;
   const shipping = document.querySelector('input[name="shipping"]:checked').id;

   const cart = getCart();
   cart.payment = payment;   // 'payment-credit' / 'payment-atm' / 'payment-cvs'
   cart.shipping_method = shipping; // 'shipping-home' / 'shipping-cvs'
   saveCart(cart);

   window.location.href = './cart-03.html';
});