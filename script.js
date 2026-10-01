// Breeds
const breeds = [
  { name: "Maine Coon", origin: "USA", coat: "long", size: "5.5–8 kg", text: "A big, shaggy farm cat with tufted ears. Sociable, chirps more than it meows, and often likes water.", energy: 3, talk: 3, cuddle: 4 },
  { name: "Siamese", origin: "Thailand", coat: "short", size: "3.5–5 kg", text: "Pointed coat, blue eyes, and a loud opinion on everything. Bonds hard and hates being alone.", energy: 4, talk: 5, cuddle: 4 },
  { name: "British Shorthair", origin: "UK", coat: "short", size: "4–8 kg", text: "Dense plush coat, round copper eyes. Calm and self-contained; prefers sitting beside you to on you.", energy: 2, talk: 1, cuddle: 2 },
  { name: "Persian", origin: "Iran", coat: "long", size: "3–5.5 kg", text: "Flat face, enormous coat, very low drama. Needs daily combing and a quiet home.", energy: 1, talk: 1, cuddle: 4 },
  { name: "Bengal", origin: "USA", coat: "short", size: "3.5–7 kg", text: "Leopard-spotted, glittery coat and endless energy. Climbs, fetches, and needs a job to do.", energy: 5, talk: 3, cuddle: 2 },
  { name: "Sphynx", origin: "Canada", coat: "none", size: "3–5 kg", text: "Hairless, warm as a hot water bottle, and an attention seeker. Needs weekly baths for skin oil.", energy: 4, talk: 3, cuddle: 5 },
  { name: "Ragdoll", origin: "USA", coat: "long", size: "4.5–9 kg", text: "Goes limp when picked up. Gentle, follows you between rooms, and greets visitors at the door.", energy: 2, talk: 2, cuddle: 5 },
  { name: "Abyssinian", origin: "Ethiopia", coat: "short", size: "3–4.5 kg", text: "Ticked ruddy coat and a curious, busy mind. Less a lap cat, more a supervisor.", energy: 5, talk: 2, cuddle: 2 },
  { name: "Norwegian Forest", origin: "Norway", coat: "long", size: "4–9 kg", text: "Waterproof double coat built for Scandinavian winters. Strong climber, patient with children.", energy: 3, talk: 2, cuddle: 3 },
];
const coatLabel = { short: "Short hair", long: "Long hair", none: "Hairless" };
const meter = n => '<span class="meter">' + [1,2,3,4,5].map(i => `<i class="${i <= n ? 'on' : ''}"></i>`).join('') + '</span>';
const grid = document.getElementById('breedGrid');
function renderBreeds(f) {
  grid.innerHTML = breeds.filter(b => f === 'all' || b.coat === f).map(b => `
    <article class="breed">
      <div class="breed-top"><h3>${b.name}</h3><span class="origin">${b.origin}</span></div>
      <div class="swatch">${coatLabel[b.coat]} · ${b.size}</div>
      <p>${b.text}</p>
      <div class="traits">
        <span>Energy</span>${meter(b.energy)}
        <span>Chatter</span>${meter(b.talk)}
        <span>Lap time</span>${meter(b.cuddle)}
      </div>
    </article>`).join('');
}
document.querySelectorAll('.chip').forEach(c => c.addEventListener('click', () => {
  document.querySelectorAll('.chip').forEach(x => x.setAttribute('aria-pressed', x === c));
  renderBreeds(c.dataset.f);
}));
renderBreeds('all');

// Age
function humanYears(a) {
  if (a <= 1) return Math.round(a * 15);
  if (a <= 2) return Math.round(15 + (a - 1) * 9);
  return Math.round(24 + (a - 2) * 4);
}
function stage(a) {
  if (a < 1) return "Kitten";
  if (a < 3) return "Young adult";
  if (a < 7) return "Mature adult";
  if (a < 11) return "Middle-aged";
  return "Senior";
}
const ageIn = document.getElementById('ageInput');
function updateAge() {
  const a = parseFloat(ageIn.value);
  document.getElementById('ageOut').textContent = a === 1 ? '1 year' : `${a} years`;
  document.getElementById('humanAge').innerHTML = `${humanYears(a)}<small>human years</small>`;
  document.getElementById('stage').textContent = stage(a);
}
ageIn.addEventListener('input', updateAge);
updateAge();

// Watching cat
const cat = document.getElementById('cat');
const svg = cat.querySelector('svg');
const pupils = [...cat.querySelectorAll('.pupil')];
const centers = [[148, 210], [252, 210]];
window.addEventListener('pointermove', e => {
  const r = svg.getBoundingClientRect();
  const s = 400 / r.width;
  const px = (e.clientX - r.left) * s, py = (e.clientY - r.top) * s;
  pupils.forEach((p, i) => {
    const [cx, cy] = centers[i];
    const dx = px - cx, dy = py - cy, d = Math.hypot(dx, dy) || 1;
    const m = Math.min(d / 8, 20);
    p.setAttribute('cx', cx + dx / d * m);
    p.setAttribute('cy', cy + dy / d * Math.min(m, 4));
  });
  const near = Math.hypot(px - 200, py - 220) < 260;
  cat.classList.toggle('alert', near);
});
function blink() {
  cat.classList.remove('blink'); void cat.offsetWidth; cat.classList.add('blink');
}
cat.addEventListener('click', () => { blink(); setTimeout(blink, 600); });
setInterval(() => { if (Math.random() < 0.5) blink(); }, 4000);
