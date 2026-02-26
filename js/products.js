/* ============================================================
   products.js — 商品資料、卡片渲染、加入購物車
   僅供 index.html 使用
   依賴：cart.js（getCart / saveCart）
============================================================ */

/* ── 四張文章卡片資料 ── */
const cards = [
  {
    img: './img/four-card-1.jpeg',
    smallTitle: '用香調選，找到自己的步調',
    title: '找到你的第一款香',
    description: '從柑橘、花香、木質，到海鹽的中性氣息。想像你最常出現的時刻：早晨通勤、夜晚閱讀、睡前放鬆。'
  },
  {
    img: './img/four-card-2.jpeg',
    smallTitle: '正確點蠟，香氣才完整',
    title: '第一次點燃很重要',
    description: '第一次點燃時，讓蠟面融成一整片，避免形成「蠟洞」。每次燃燒建議控制在 3–4 小時，味道會更柔和、乾淨。'
  },
  {
    img: './img/four-card-3.png',
    smallTitle: '儀式感有了，安全更不能少',
    title: '安全使用',
    description: '將蠟燭放在穩固、耐熱的桌面，遠離窗簾與紙張。熄滅前再確認一次周圍環境，放心享受每一次點蠟儀式。'
  },
  {
    img: './img/four-card-4.jpeg',
    smallTitle: '香氣是日常的小陪伴',
    title: '讓香氣住進日常',
    description: '一杯咖啡、一首輕音樂、一盞柔和燭光，就是屬於你的片刻空白。點起蠟燭，替今天劃下一個慢下來的界線'
  }
];

/* ── 八張商品卡片資料 ── */
const shoppingList = [
  { img: './img/CitrusDawn.png',    tag: '柑橘 / 葡萄柚 / 白花',            title: '柑橘晨光 Citrus Dawn',      price: '650' },
  { img: './img/SeaBreeze.png',     tag: '海鹽 / 迷迭香 / 白松木',           title: '湖岸海鹽 Sea Breeze',       price: '650' },
  { img: './img/WarmCedar.png',     tag: '雪松木 / 琥珀 / 香根草',           title: '木質溫室 Warm Cedar',       price: '690' },
  { img: './img/TwilightBloom.png', tag: '薰衣草 / 白花 / 琥珀',            title: '暮色花園 Twilight Bloom',   price: '720' },
  { img: './img/AutumnFig.png',     tag: '無花果 / 黑加侖 / 香草',           title: '秋日無花果 Autumn Fig',     price: '690' },
  { img: './img/WhiteTeaMist.png',  tag: '白茶 / 竹 / 麝香',               title: '白茶晨霧 White Tea Mist',  price: '680' },
  { img: './img/ForestWhisper.png', tag: '松木 / 苔蘚 / 雪松',              title: '黎明森林 Forest Whisper',  price: '690' },
  { img: './img/RoseDusk.png',      tag: '大馬士革玫瑰 / 雨後泥土 / 白麝香',  title: '玫瑰暮雨 Rose Dusk',        price: '720' }
];

/* ── 渲染四張文章卡片 ── */
const cardList = document.querySelector('#card-list');
cards.forEach(item => {
  cardList.innerHTML += `
    <div class="col-sm-12 col-md-6 col-xl-3">
      <div class="card p-4 h-100">
        <div class="ratio ratio-16x9 overflow-hidden">
          <img class="rounded object-fit-cover" src="${item.img}" alt="${item.title}">
        </div>
        <div class="card-body px-3 px-xl-1 px-xxl-3">
          <small class="text-sub">${item.smallTitle}</small>
          <h5 class="card-title mt-2 mb-3 text-main fw-bold">${item.title}</h5>
          <p class="card-text text-warm lh-lg">${item.description}</p>
        </div>
      </div>
    </div>
  `;
});

/* ── 渲染八張商品卡片 ── */
const shoppingListEl = document.querySelector('#shopping-list');
shoppingListEl.innerHTML = '';
shoppingList.forEach(item => {
  shoppingListEl.innerHTML += `
    <div class="col-12 col-md-6 col-lg-3">
      <div class="mb-3 text-center p-1">
        <img class="w-100 eight-card img-fluid" src="${item.img}" alt="${item.title}">
      </div>
      <small class="text-sub d-inline-block mb-2">${item.tag}</small>
      <h6 class="card-title fw-bold text-main">${item.title}</h6>
      <div class="d-flex justify-content-between align-items-center mt-3">
        <p class="text-warm m-0">$${item.price}</p>
        <button type="button" class="btn btn-sm bg-btn bg-btn-hover shopping-btn"
          data-shoppingname="${item.title}">加入購物車</button>
      </div>
    </div>
  `;
});

/* ── 將商品資料存進 localStorage 供購物車頁使用 ── */
localStorage.setItem('shoppingList', JSON.stringify(shoppingList));

/* ── 加入購物車按鈕事件 ── */
document.querySelectorAll('.shopping-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const title    = btn.dataset.shoppingname;
    const cart     = getCart();
    const product  = shoppingList.find(item => item.title === title);
    const existing = cart.items.find(item => item.title === title);

    if (existing) {
      existing.qty += 1;
    } else {
      cart.items.push({
        title: product.title,
        price: Number(product.price),
        img:   product.img,
        tag:   product.tag,
        qty:   1
      });
    }

    saveCart(cart);
    console.log('目前 cart：', cart);
  });
});