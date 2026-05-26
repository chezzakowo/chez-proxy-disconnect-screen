// clock.js — updates #clock every second with HH:MM:SS

const pad = v => String(v).padStart(2, '0');

function tick() {
  const n = new Date();
  const el = document.getElementById('clock');
  if (el) el.textContent = `${pad(n.getHours())}:${pad(n.getMinutes())}:${pad(n.getSeconds())}`;
}

export function startClock() {
  tick();
  setInterval(tick, 1000);
}
