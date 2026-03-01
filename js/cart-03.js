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

/* ── 表單驗證規則 ── */
const rules = [
  {
    id: 'inputName',
    validate: v => v.trim() !== '',
    message: '請輸入姓名'
  },
  {
    id: 'inputNumber',
    validate: v => /^09\d{8}$/.test(v.trim()),
    message: '請輸入正確的手機號碼（09 開頭，共 10 碼）'
  },
  {
    id: 'inputEmail',
    validate: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()),
    message: '請輸入正確的電子郵件格式'
  },
  {
    id: 'inputCity',
    validate: v => v !== '請選擇...',
    message: '請選擇縣市'
  },
  {
    id: 'inputState',
    validate: v => v !== '請選擇...',
    message: '請選擇鄉鎮市區'
  },
  {
    id: 'inputAddress2',
    validate: v => v.trim() !== '',
    message: '請輸入詳細地址'
  }
];

/* ── 顯示 / 清除單一欄位的錯誤提示 ── */
function showError(id, message) {
  const input   = document.querySelector(`#${id}`);
  const existed = document.querySelector(`#${id}-error`);
  if (existed) existed.remove();

  input.classList.add('is-invalid');

  const hint = document.createElement('div');
  hint.id        = `${id}-error`;
  hint.className = 'invalid-feedback';
  hint.textContent = message;
  input.after(hint);
}

function clearError(id) {
  const input = document.querySelector(`#${id}`);
  input.classList.remove('is-invalid');
  input.classList.add('is-valid');
  document.querySelector(`#${id}-error`)?.remove();
}

/* ── 執行所有驗證，回傳是否全部通過 ── */
function validateForm() {
  let isValid = true;

  rules.forEach(rule => {
    const value = document.querySelector(`#${rule.id}`).value;
    if (rule.validate(value)) {
      clearError(rule.id);
    } else {
      showError(rule.id, rule.message);
      isValid = false;
    }
  });

  return isValid;
}

/* ── 即時驗證：離開欄位時觸發 ── */
rules.forEach(rule => {
  document.querySelector(`#${rule.id}`)
    .addEventListener('blur', () => {
      const value = document.querySelector(`#${rule.id}`).value;
      if (rule.validate(value)) {
        clearError(rule.id);
      } else {
        showError(rule.id, rule.message);
      }
    });
});

/* ── 下一步按鈕：驗證全部通過才跳頁 ── */
document.querySelector('#next-btn').addEventListener('click', () => {
  if (validateForm()) {
    window.location.href = './cart-04.html';
  }
});