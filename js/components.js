/* ============================================================
   components.js — 動態載入 Nav 與 Footer
============================================================ */

function loadComponent(selector, path, callback) {
  fetch(path)
    .then(res => {
      if (!res.ok) throw new Error(`無法載入 ${path}（${res.status}）`);
      return res.text();
    })
    .then(html => {
      document.querySelector(selector).innerHTML = html;
      if (callback) callback();
    })
    .catch(err => console.error(err));
}

// 載入 Nav，完成後重新初始化 Bootstrap Dropdown
loadComponent('#nav-placeholder', './components/_nav.html', () => {
  document.querySelectorAll('[data-bs-toggle="dropdown"]').forEach(el => {
    new bootstrap.Dropdown(el);
  });
});

// 載入 Footer
loadComponent('#footer-placeholder', './components/_footer.html');