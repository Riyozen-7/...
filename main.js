const grid = document.getElementById('grid');
const dlg = document.getElementById('viewer'), player = document.getElementById('player');
const frame = document.getElementById('frame');
let opener = null;

window.PROJECTS.forEach(p => {
  const li = document.createElement('li');
  li.className = 'card';
  li.innerHTML = `<button type="button" class="thumb" aria-label="Play: ${p.title}">
      <span class="ph" style="aspect-ratio:${p.aspect}"><img src="${p.thumbnail}" alt="${p.alt || p.title}" loading="lazy" decoding="async"><i class="play" aria-hidden="true">▶</i></span>
    </button>
    <h3>${p.title}</h3>${p.description ? `<p>${p.description}</p>` : ''}`;
  li.querySelector('button').addEventListener('click', e => open(p, e.currentTarget));
  grid.appendChild(li);
});

function open(p, btn) {
  opener = btn;
  frame.style.aspectRatio = p.aspect;
  frame.classList.toggle('wide', (+p.aspect.split("/")[0]) / (+p.aspect.split("/")[1]) > 1);
  player.poster = p.thumbnail; player.src = p.video;
  document.getElementById('vt').textContent = p.title;
  document.getElementById('vd').textContent = p.description || '';
  dlg.showModal(); player.play().catch(() => {});
}
function shut() { player.pause(); player.removeAttribute('src'); player.load(); dlg.close(); }
document.getElementById('close').addEventListener('click', shut);
dlg.addEventListener('click', e => { if (e.target === dlg) shut(); });
dlg.addEventListener('close', () => { player.pause(); opener && opener.focus(); });
player.addEventListener('error', () => { if (player.getAttribute('src')) document.getElementById('vd').textContent = 'This video could not be loaded.'; });

document.getElementById('yr').textContent = new Date().getFullYear();
document.getElementById('copy').addEventListener('click', async () => {
  const s = document.getElementById('copied');
  try { await navigator.clipboard.writeText('habiburrashid498@gmail.com'); s.textContent = 'Email copied'; }
  catch { const r = document.createRange(); r.selectNodeContents(document.getElementById('addr')); getSelection().removeAllRanges(); getSelection().addRange(r); s.textContent = 'Press copy to copy the selected email'; }
});
