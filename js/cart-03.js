/* ============================================================
   cart-03.js — 寄送資料頁邏輯
   依賴：cart.js（getCart / renderSummary）
============================================================ */

/* ── 金額 Summary ── */
renderSummary();

/* ── 還原已儲存的表單欄位 ── */
const savedCart = getCart();

if (savedCart?.receiver) {
  const r = savedCart.receiver;
  document.querySelector('#inputName').value     = r.name    || '';
  document.querySelector('#inputNumber').value   = r.phone   || '';
  document.querySelector('#inputTel').value      = r.tel     || '';
  document.querySelector('#inputEmail').value    = r.email   || '';
  document.querySelector('#inputCity').value     = r.city    || '';
  document.querySelector('#inputState').value    = r.state   || '';
  document.querySelector('#inputZip').value      = r.zip     || '';
  document.querySelector('#inputAddress2').value = r.address || '';
}

/* ── 即時儲存表單變動 ── */
function saveReceiver() {
  const current = getCart();
  current.receiver = {
    name:    document.querySelector('#inputName').value,
    phone:   document.querySelector('#inputNumber').value,
    tel:     document.querySelector('#inputTel').value,
    email:   document.querySelector('#inputEmail').value,
    city:    document.querySelector('#inputCity').value,
    state:   document.querySelector('#inputState').value,
    zip:     document.querySelector('#inputZip').value,
    address: document.querySelector('#inputAddress2').value
  };
  saveCart(current);
}

document.querySelectorAll(
  '#inputName, #inputNumber, #inputTel, #inputEmail, #inputCity, #inputState, #inputZip, #inputAddress2'
).forEach(input => input.addEventListener('input', saveReceiver));