// background.js
// Fetch credits từ config/background_credits.json (giống web chính),
// chọn ngẫu nhiên 1 file, set background + cập nhật credit vào DOM.

const BG_FOLDER         = './assets/background/';
const BG_CREDITS_PATH   = './config/background_credits.json';

let _credits = {};
let _current = null;

async function loadCredits() {
  try {
    const res = await fetch(BG_CREDITS_PATH);
    if (res.ok) _credits = await res.json();
  } catch {
    _credits = {};
  }
}

function applyCredit() {
  const el = document.getElementById('credit-name');
  if (el) el.textContent = _credits[_current] || 'Unknown';
}

function applyBg() {
  const files = Object.keys(_credits);
  if (!files.length) return;

  _current = files[Math.floor(Math.random() * files.length)];

  const img = new Image();
  img.onload = () => {
    const bg = document.getElementById('bg');
    if (!bg) return;
    bg.style.backgroundImage = `url('${BG_FOLDER}${_current}')`;
    requestAnimationFrame(() => bg.classList.add('loaded'));
  };
  img.onerror = () => {
    // Thử file tiếp theo nếu ảnh không load được
    const files = Object.keys(_credits).filter(f => f !== _current);
    if (!files.length) return;
    _current = files[Math.floor(Math.random() * files.length)];
    img.src  = BG_FOLDER + _current;
  };
  img.src = BG_FOLDER + _current;

  applyCredit();
}

export async function loadBackground() {
  await loadCredits();
  applyBg();
}