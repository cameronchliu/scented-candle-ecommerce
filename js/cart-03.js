/* ============================================================
   cart-03.js — 寄送資料頁邏輯
   依賴：cart.js（getCart / renderSummary）
============================================================ */

/* ── 付款與運送方式對照表 ── */
const paymentLabels = {
  'payment-credit': '信用卡付款',
  'payment-atm': '網路 ATM',
  'payment-cvs': '超商代碼'
};

const shippingLabels = {
  'shipping-home': '黑貓宅配',
  'shipping-cvs': '超商店到店'
};

/* ── 顯示付款與運送方式 ── */
const summaryEl = document.querySelector('#order-summary');
const cart = getCart();

if (cart.payment || cart.shipping_method) {
  summaryEl.innerHTML = `
    <div class="d-flex mb-2">
      <div class="fw-semibold text-sub" style="width: 80px;">付款方式</div>
      <div>${paymentLabels[cart.payment] ?? '未選擇'}</div>
    </div>
    <div class="d-flex mb-2">
      <div class="fw-semibold text-sub" style="width: 80px;">運送方式</div>
      <div>${shippingLabels[cart.shipping_method] ?? '未選擇'}</div>
    </div>
  `;
}


/* ── 台灣 22 縣市與完整鄉鎮市區資料 ── */
const districts = {
  '台北市': [
    '中正區', '大同區', '中山區', '松山區', '大安區', '萬華區',
    '信義區', '士林區', '北投區', '內湖區', '南港區', '文山區'
  ],
  '新北市': [
    '板橋區', '三重區', '中和區', '永和區', '新莊區', '新店區', '土城區',
    '蘆洲區', '樹林區', '汐止區', '鶯歌區', '三峽區', '淡水區', '瑞芳區',
    '五股區', '泰山區', '林口區', '深坑區', '石碇區', '坪林區',
    '三芝區', '石門區', '八里區', '平溪區', '雙溪區', '貢寮區', '金山區', '萬里區', '烏來區'
  ],
  '桃園市': [
    '桃園區', '中壢區', '平鎮區', '八德區', '楊梅區', '蘆竹區',
    '大溪區', '龍潭區', '龜山區', '大園區', '觀音區', '新屋區', '復興區'
  ],
  '台中市': [
    '中區', '東區', '西區', '南區', '北區', '西屯區', '南屯區', '北屯區',
    '豐原區', '大里區', '太平區', '清水區', '沙鹿區', '大甲區',
    '東勢區', '梧棲區', '烏日區', '神岡區', '大肚區', '大雅區',
    '后里區', '霧峰區', '潭子區', '龍井區', '外埔區', '和平區'
  ],
  '台南市': [
    '中西區', '東區', '南區', '北區', '安平區', '安南區',
    '永康區', '歸仁區', '新化區', '左鎮區', '玉井區', '楠西區',
    '南化區', '仁德區', '關廟區', '龍崎區', '官田區', '麻豆區',
    '佳里區', '西港區', '七股區', '將軍區', '學甲區', '北門區',
    '新營區', '後壁區', '白河區', '東山區', '六甲區', '下營區',
    '柳營區', '鹽水區', '善化區', '大內區', '山上區', '新市區', '安定區'
  ],
  '高雄市': [
    '楠梓區', '左營區', '鼓山區', '三民區', '苓雅區', '新興區',
    '前金區', '鹽埕區', '前鎮區', '旗津區', '小港區',
    '鳳山區', '大寮區', '林園區', '仁武區', '大社區', '岡山區',
    '橋頭區', '燕巢區', '田寮區', '阿蓮區', '路竹區', '湖內區',
    '茄萣區', '永安區', '彌陀區', '梓官區', '旗山區', '美濃區',
    '六龜區', '甲仙區', '杉林區', '內門區', '茂林區', '桃源區', '那瑪夏區'
  ],
  '基隆市': ['仁愛區', '信義區', '中正區', '中山區', '安樂區', '暖暖區', '七堵區'],
  '新竹市': ['東區', '北區', '香山區'],
  '新竹縣': [
    '竹北市', '竹東鎮', '新埔鎮', '關西鎮', '湖口鄉', '新豐鄉',
    '芎林鄉', '橫山鄉', '北埔鄉', '寶山鄉', '峨眉鄉', '尖石鄉', '五峰鄉'
  ],
  '苗栗縣': [
    '苗栗市', '頭份市', '竹南鎮', '後龍鎮', '通霄鎮', '苑裡鎮',
    '卓蘭鎮', '造橋鄉', '西湖鄉', '頭屋鄉', '公館鄉', '銅鑼鄉',
    '三義鄉', '大湖鄉', '獅潭鄉', '三灣鄉', '南庄鄉', '泰安鄉'
  ],
  '彰化縣': [
    '彰化市', '鹿港鎮', '和美鎮', '員林市', '溪湖鎮', '田中鎮',
    '北斗鎮', '二林鎮', '線西鄉', '伸港鄉', '福興鄉', '秀水鄉',
    '花壇鄉', '芬園鄉', '大村鄉', '埔鹽鄉', '埔心鄉', '永靖鄉',
    '社頭鄉', '二水鄉', '田尾鄉', '埤頭鄉', '芳苑鄉', '大城鄉', '竹塘鄉', '溪州鄉'
  ],
  '南投縣': [
    '南投市', '埔里鎮', '草屯鎮', '竹山鎮', '集集鎮', '名間鄉',
    '鹿谷鄉', '中寮鄉', '魚池鄉', '國姓鄉', '水里鄉', '信義鄉', '仁愛鄉'
  ],
  '雲林縣': [
    '斗六市', '斗南鎮', '虎尾鎮', '西螺鎮', '土庫鎮', '北港鎮',
    '古坑鄉', '大埤鄉', '莿桐鄉', '林內鄉', '二崙鄉', '崙背鄉',
    '麥寮鄉', '東勢鄉', '褒忠鄉', '臺西鄉', '元長鄉', '四湖鄉', '口湖鄉', '水林鄉'
  ],
  '嘉義市': ['東區', '西區'],
  '嘉義縣': [
    '太保市', '朴子市', '布袋鎮', '大林鎮', '民雄鄉', '溪口鄉',
    '新港鄉', '六腳鄉', '東石鄉', '義竹鄉', '鹿草鄉', '水上鄉',
    '中埔鄉', '竹崎鄉', '梅山鄉', '番路鄉', '大埔鄉', '阿里山鄉'
  ],
  '屏東縣': [
    '屏東市', '潮州鎮', '東港鎮', '恆春鎮', '萬丹鄉', '長治鄉',
    '麟洛鄉', '九如鄉', '里港鄉', '鹽埔鄉', '高樹鄉', '萬巒鄉',
    '內埔鄉', '竹田鄉', '新埤鄉', '枋寮鄉', '新園鄉', '崁頂鄉',
    '林邊鄉', '南州鄉', '佳冬鄉', '琉球鄉', '車城鄉', '滿州鄉',
    '枋山鄉', '三地門鄉', '霧臺鄉', '瑪家鄉', '泰武鄉', '來義鄉', '春日鄉', '獅子鄉', '牡丹鄉'
  ],
  '宜蘭縣': [
    '宜蘭市', '羅東鎮', '蘇澳鎮', '頭城鎮', '礁溪鄉', '壯圍鄉',
    '員山鄉', '冬山鄉', '五結鄉', '三星鄉', '大同鄉', '南澳鄉'
  ],
  '花蓮縣': [
    '花蓮市', '鳳林鎮', '玉里鎮', '新城鄉', '吉安鄉', '壽豐鄉',
    '光復鄉', '豐濱鄉', '瑞穗鄉', '富里鄉', '秀林鄉', '萬榮鄉', '卓溪鄉'
  ],
  '台東縣': [
    '台東市', '成功鎮', '關山鎮', '卑南鄉', '鹿野鄉', '池上鄉',
    '東河鄉', '長濱鄉', '太麻里鄉', '大武鄉', '綠島鄉', '海端鄉', '延平鄉', '金峰鄉', '達仁鄉', '蘭嶼鄉'
  ],
  '澎湖縣': ['馬公市', '湖西鄉', '白沙鄉', '西嶼鄉', '望安鄉', '七美鄉'],
  '金門縣': ['金城鎮', '金湖鎮', '金沙鎮', '金寧鄉', '烈嶼鄉', '烏坵鄉'],
  '連江縣': ['南竿鄉', '北竿鄉', '莒光鄉', '東引鄉']
};

/* ── 動態產生縣市選項 ── */
const cityEl = document.querySelector('#inputCity');
const stateEl = document.querySelector('#inputState');

Object.keys(districts).forEach(city => {
  const option = document.createElement('option');
  option.value = city;
  option.textContent = city;
  cityEl.appendChild(option);
});

/* ── 縣市變動時，更新鄉鎮市區選項 ── */
cityEl.addEventListener('change', () => {
  const selectedCity = cityEl.value;

  // 清空並重設鄉鎮市區
  stateEl.innerHTML = '<option value="">請選擇...</option>';

  if (!selectedCity) return;

  districts[selectedCity].forEach(district => {
    const option = document.createElement('option');
    option.value = district;
    option.textContent = district;
    stateEl.appendChild(option);
  });
});

/* ── 金額 Summary ── */
renderSummary();

/* ── 還原已儲存的表單欄位 ── */
const savedCart = getCart();

if (savedCart?.receiver) {
  const r = savedCart.receiver;
  document.querySelector('#inputName').value = r.name || '';
  document.querySelector('#inputNumber').value = r.phone || '';
  document.querySelector('#inputTel').value = r.tel || '';
  document.querySelector('#inputEmail').value = r.email || '';
  document.querySelector('#inputCity').value = r.city || '';
  document.querySelector('#inputState').value = r.state || '';
  document.querySelector('#inputZip').value = r.zip || '';
  document.querySelector('#inputAddress2').value = r.address || '';
}

/* ── 即時儲存表單變動 ── */
function saveReceiver() {
  const current = getCart();
  current.receiver = {
    name: document.querySelector('#inputName').value,
    phone: document.querySelector('#inputNumber').value,
    tel: document.querySelector('#inputTel').value,
    email: document.querySelector('#inputEmail').value,
    city: document.querySelector('#inputCity').value,
    state: document.querySelector('#inputState').value,
    zip: document.querySelector('#inputZip').value,
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
    validate: v => v !== '',
    message: '請選擇縣市'
  },
  {
    id: 'inputState',
    validate: v => v !== '',
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
  const input = document.querySelector(`#${id}`);
  const existed = document.querySelector(`#${id}-error`);
  if (existed) existed.remove();

  input.classList.add('is-invalid');

  const hint = document.createElement('div');
  hint.id = `${id}-error`;
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