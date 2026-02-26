const isLocal = location.hostname === '127.0.0.1' || location.hostname === 'localhost';
const base = isLocal ? './' : '/scented-candle-ecommerce/';


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

loadComponent('#nav-placeholder', `${base}components/_nav.html`, () => {
  document.querySelectorAll('[data-bs-toggle="dropdown"]').forEach(el => {
    new bootstrap.Dropdown(el);
  });
});

loadComponent('#footer-placeholder', `${base}components/_footer.html`);