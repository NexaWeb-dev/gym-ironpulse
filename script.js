/* =========================================================
   IronPulse Fitness: script.js
   1. CONFIG  : every business detail lives here. Edit freely.
   2. Behaviour below. No dependencies.
   ========================================================= */

const CONFIG = {
  name: 'IronPulse Fitness',
  phone: '+91 98XXX XXXXX',          // as displayed on the page
  phoneTel: '+9198XXXXXXXX',         // used for tap-to-call
  whatsapp: '91XXXXXXXXXX',          // country code + number, digits only
  address: ['2nd Floor, Shalimar Plaza', 'Raj Nagar Extension', 'Ghaziabad, Uttar Pradesh 201017'],
  social: [['Instagram', 'https://www.instagram.com/'], ['YouTube', 'https://www.youtube.com/'], ['Facebook', 'https://www.facebook.com/']],

  // Monday first: [day, opens, closes] in 24-hour time. Use null, null for a closed day.
  hours: [
    ['Monday', '05:30', '22:00'], ['Tuesday', '05:30', '22:00'], ['Wednesday', '05:30', '22:00'],
    ['Thursday', '05:30', '22:00'], ['Friday', '05:30', '22:00'], ['Saturday', '06:00', '21:00'],
    ['Sunday', '07:00', '13:00']
  ],

  // Count-up numbers: [value, suffix, label]
  stats: [[1850, '+', 'Active members'], [12, '', 'Certified coaches'], [12000, '', 'Sq ft of training floor']],

  // Plans. m = months per payment. g = gym-only price, c = gym + classes price (₹). pop = highlight.
  plans: [
    { n: 'Monthly', m: 1, g: 1999, c: 2799, f: ['Full gym floor access', 'Locker and shower', 'Fitness assessment'] },
    { n: 'Quarterly', m: 3, g: 4999, c: 6999, pop: 1, f: ['Everything in Monthly', 'One free personal training session', 'Written diet guidance'] },
    { n: 'Yearly', m: 12, g: 14999, c: 20999, f: ['Everything in Quarterly', 'Two freeze weeks', 'A guest pass every quarter'] }
  ],
  classesPerk: 'Unlimited group classes',

  // Trainers. Set photo to an image path (e.g. 'img/rohit.jpg') to replace the placeholder.
  trainers: [
    { name: 'Rohit Chauhan', spec: 'Strength and powerlifting', yrs: 9, photo: 'img/trainer-rohit.jpg' },
    { name: 'Neha Tyagi', spec: 'Yoga and mobility', yrs: 7, photo: 'img/trainer-neha.jpg' },
    { name: 'Imran Qureshi', spec: 'CrossFit-style conditioning', yrs: 8, photo: 'img/trainer-imran.jpg' },
    { name: 'Simran Kaur', spec: 'Fat loss and Zumba', yrs: 6, photo: 'img/trainer-simran.jpg' }
  ],

  goals: ['Lose fat', 'Build muscle', 'Improve stamina', 'Flexibility and yoga', 'Learn the basics'],
  times: ['Early morning (5 to 8 AM)', 'Late morning (8 to 12)', 'Afternoon (12 to 4 PM)', 'Evening (4 to 8 PM)', 'Night (8 to 10 PM)'],

  // Weekly timetable, Monday first. Each class: [time, class, coach, minutes]
  schedule: [
    [['6:00 AM', 'Strength Foundations', 'Rohit', 60], ['7:30 AM', 'Yoga Flow', 'Neha', 60], ['6:30 PM', 'CrossFit-style WOD', 'Imran', 60], ['8:00 PM', 'Zumba', 'Simran', 50]],
    [['6:00 AM', 'Cardio Intervals', 'Simran', 45], ['7:00 PM', 'Strength: Upper Body', 'Rohit', 60], ['8:15 PM', 'Mobility Reset', 'Neha', 45]],
    [['6:00 AM', 'Strength: Lower Body', 'Rohit', 60], ['7:30 AM', 'Yoga Flow', 'Neha', 60], ['6:30 PM', 'CrossFit-style WOD', 'Imran', 60], ['8:00 PM', 'Zumba', 'Simran', 50]],
    [['6:00 AM', 'Cardio Intervals', 'Simran', 45], ['7:00 PM', 'Strength: Push and Pull', 'Rohit', 60], ['8:15 PM', 'Power Yoga', 'Neha', 50]],
    [['6:00 AM', 'Strength: Full Body', 'Rohit', 60], ['6:30 PM', 'CrossFit-style WOD', 'Imran', 60], ['8:00 PM', 'Zumba', 'Simran', 50]],
    [['7:00 AM', 'Zumba', 'Simran', 50], ['8:15 AM', 'CrossFit-style Team WOD', 'Imran', 60], ['10:00 AM', 'Yoga Flow', 'Neha', 60]],
    [['8:00 AM', 'Yoga and Stretch', 'Neha', 60], ['10:00 AM', 'Open Mobility Floor', 'Coach on duty', 60]]
  ]
};

(() => {
  'use strict';
  const C = CONFIG, html = document.documentElement;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const on = (el, ev, fn, o) => el.addEventListener(ev, fn, o);
  const pad = n => String(n).padStart(2, '0');
  const inr = n => '₹' + n.toLocaleString('en-IN');
  const mins = s => { const a = s.split(':'); return a[0] * 60 + +a[1]; };
  const t12 = m => ((m / 60 | 0) % 12 || 12) + (m % 60 ? ':' + pad(m % 60) : '') + ' ' + (m < 720 ? 'AM' : 'PM');
  const reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  const PH = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';
  const day = () => (new Date().getDay() + 6) % 7;   // Monday = 0

  /* ---------- Business details ---------- */
  $$('[data-cfg=name]').forEach(e => { e.textContent = C.name; });
  $('#yr').textContent = new Date().getFullYear();
  $$('.js-tel').forEach(a => { a.href = 'tel:' + C.phoneTel; a.textContent = (a.dataset.pre || '') + C.phone; });
  $$('.js-maps').forEach(a => {
    a.href = 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent([C.name].concat(C.address).join(', '));
  });
  $('#addr').textContent = C.address.join('\n');
  $('#social').innerHTML = C.social.map(s => `<li><a href="${s[1]}" target="_blank" rel="noopener">${s[0]}<span class="sr"> (opens in a new tab)</span></a></li>`).join('');
  const wa = text => 'https://wa.me/' + C.whatsapp + '?text=' + encodeURIComponent(text);

  /* ---------- Hours table and the live Open / Closed badge ---------- */
  $('#hours').innerHTML = C.hours.map((h, i) =>
    `<tr${i === day() ? ' class="today" aria-current="date"' : ''}><th scope="row">${h[0]}${i === day() ? '<span class="tag">Today</span>' : ''}</th><td>${h[1] ? t12(mins(h[1])) + ' – ' + t12(mins(h[2])) : 'Closed'}</td></tr>`
  ).join('');

  const badge = $('#openNow');
  const status = () => {
    const n = new Date(), d = day(), m = n.getHours() * 60 + n.getMinutes(), h = C.hours[d];
    let txt, open = false;
    if (h[1] && m >= mins(h[1]) && m < mins(h[2])) { open = true; txt = 'Open now · Closes at ' + t12(mins(h[2])); }
    else if (h[1] && m < mins(h[1])) txt = 'Closed · Opens at ' + t12(mins(h[1]));
    else {
      for (let i = 1; i < 8; i++) {
        const nx = C.hours[(d + i) % 7];
        if (nx[1]) { txt = 'Closed · Opens ' + (i === 1 ? 'tomorrow' : nx[0]) + ' at ' + t12(mins(nx[1])); break; }
      }
    }
    $('#openTxt').textContent = txt || 'Closed';
    badge.classList.toggle('is-open', open);
  };
  status();
  setInterval(status, 60000);

  /* ---------- Theme toggle (saved choice; storage may be blocked) ---------- */
  const themeBtn = $('#themeBtn');
  const themeLabel = () => themeBtn.setAttribute('aria-label', 'Switch to ' + (html.dataset.theme === 'dark' ? 'light' : 'dark') + ' theme');
  themeLabel();
  on(themeBtn, 'click', () => {
    const t = html.dataset.theme === 'dark' ? 'light' : 'dark';
    html.dataset.theme = t;
    themeLabel();
    try { localStorage.setItem('theme', t); } catch (e) {}
  });

  /* ---------- Header: fades in once it leaves the hero; mobile menu ---------- */
  const hdr = $('#hdr'), hero = $('.hero'), navBtn = $('#navBtn'), nav = $('#nav');
  let ticking = false;
  const scrolled = () => { ticking = false; hdr.classList.toggle('is-scrolled', window.pageYOffset > hero.offsetHeight - hdr.offsetHeight); };
  on(window, 'scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(scrolled); } }, { passive: true });
  on(window, 'resize', scrolled);
  scrolled();

  const navOpen = () => navBtn.getAttribute('aria-expanded') === 'true';
  const setNav = open => {
    navBtn.setAttribute('aria-expanded', open);
    navBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    hdr.classList.toggle('nav-open', open);
    document.body.classList.toggle('navlock', open);
  };
  on(navBtn, 'click', () => { const o = !navOpen(); setNav(o); if (o) nav.querySelector('a').focus(); });
  on(nav, 'click', e => { if (e.target.closest('a')) setNav(false); });
  on(document, 'keydown', e => { if (e.key === 'Escape' && navOpen()) { setNav(false); navBtn.focus(); } });
  if (window.matchMedia) {
    const mq = matchMedia('(min-width: 60em)');
    if (mq.addEventListener) on(mq, 'change', () => setNav(false));
  }

  /* ---------- Stats: count up once when scrolled into view ---------- */
  const statsEl = $('#stats');
  statsEl.innerHTML = C.stats.map(s => `<li><strong class="num" data-to="${s[0]}" data-sfx="${s[1]}">${s[0].toLocaleString('en-IN')}${s[1]}</strong><span>${s[2]}</span></li>`).join('');
  if ('IntersectionObserver' in window && !reduce) {
    const nums = $$('.num', statsEl);
    nums.forEach(n => { n.textContent = '0'; });
    const io = new IntersectionObserver(es => {
      if (!es[0].isIntersecting) return;
      io.disconnect();
      const t0 = performance.now();
      const step = now => {
        const p = Math.min((now - t0) / 1600, 1), e = 1 - Math.pow(1 - p, 3);
        nums.forEach(n => { n.textContent = Math.round(n.dataset.to * e).toLocaleString('en-IN') + (p === 1 ? n.dataset.sfx : ''); });
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }, { threshold: .4 });
    io.observe(statsEl);
  }

  /* ---------- Plans, with a Gym only / Gym + classes switch ---------- */
  let kind = 'g';
  const renderPlans = () => {
    $('#plansGrid').innerHTML = C.plans.map(p => {
      const price = p[kind], per = Math.round(price / p.m);
      const feats = p.f.concat(kind === 'c' ? [C.classesPerk] : []);
      return `<article class="plan${p.pop ? ' plan--pop' : ''}">${p.pop ? '<span class="pill">Most popular</span>' : ''}<h3>${p.n}</h3>
        <p class="price"><span class="num">${inr(per)}</span> <span>/ month</span></p>
        <p class="bill">${p.m === 1 ? 'Billed monthly' : 'Billed ' + inr(price) + ' every ' + (p.m === 12 ? 'year' : p.m + ' months')}</p>
        <ul>${feats.map(f => `<li>${f}</li>`).join('')}</ul>
        <a class="btn ${p.pop ? 'btn--lime' : ''}" href="#trial">Start with a free trial</a></article>`;
    }).join('');
  };
  $$('.seg__b').forEach(b => on(b, 'click', () => {
    kind = b.dataset.k;
    $$('.seg__b').forEach(x => x.setAttribute('aria-pressed', x === b));
    renderPlans();
  }));
  renderPlans();

  /* ---------- BMI calculator ---------- */
  const bh = $('#bmi-h-in'), bw = $('#bmi-w-in');
  const bands = [
    [18.5, 'Underweight', 'Below the healthy range. Strength training and enough protein help you build mass safely.'],
    [25, 'Healthy range', 'Within the healthy range. Focus on getting stronger and fitter, not on the scale.'],
    [30, 'Overweight', 'Above the healthy range. Coached strength work, regular cardio and steady habits move this well.'],
    [99, 'Obese range', 'Well above the healthy range. Start with low-impact cardio and coached strength work. Ask a doctor for advice too.']
  ];
  const bmi = () => {
    const h = +bh.value, w = +bw.value, ok = h >= 100 && h <= 250 && w >= 25 && w <= 300;
    $('#bmiRes').hidden = !ok;
    $('#bmiHint').hidden = ok;
    if (!ok) return;
    const b = w / ((h / 100) * (h / 100)), band = bands.find(x => b < x[0]);
    $('#bmiN').textContent = b.toFixed(1);
    $('#bmiC').textContent = band[1];
    $('#bmiT').textContent = band[2];
    $('#bmiM').style.transform = 'translateX(' + Math.max(0, Math.min(100, (b - 15) / 25 * 100)) + '%)';
    $('#bmiWa').href = wa('Hi ' + C.name + ', my BMI is ' + b.toFixed(1) + ' (' + band[1] + '), height ' + h + ' cm, weight ' + w + ' kg. Can a trainer advise me?');
  };
  on(bh, 'input', bmi);
  on(bw, 'input', bmi);

  /* ---------- Trainers ---------- */
  $('#trainerGrid').innerHTML = C.trainers.map(t =>
    `<article class="trainer"><div class="ph slot" data-label="Photo slot"><img src="${t.photo || PH}" alt="${t.spec} training, coach ${t.name}" width="800" height="1000" loading="lazy" decoding="async"></div>
      <h3>${t.name}</h3><p>${t.spec}</p><p class="yrs"><strong class="num">${t.yrs}</strong> years coaching</p></article>`
  ).join('');

  /* ---------- Weekly schedule tabs; today opens by default ---------- */
  const tabs = $('#dayTabs'), panel = $('#dayPanel');
  let cur = day();
  tabs.innerHTML = C.hours.map((h, i) => `<button type="button" class="tab" role="tab" id="d${i}" aria-controls="dayPanel">${h[0].slice(0, 3)}</button>`).join('');
  const tabBtns = $$('.tab', tabs);
  const showDay = i => {
    cur = i;
    tabBtns.forEach((b, j) => { b.setAttribute('aria-selected', j === i); b.tabIndex = j === i ? 0 : -1; });
    panel.setAttribute('aria-labelledby', 'd' + i);
    panel.innerHTML = '<ul class="classes">' + C.schedule[i].map(c =>
      `<li><span class="t">${c[0]}</span><span class="n">${c[1]}<small>with ${c[2]} · ${c[3]} min</small></span></li>`).join('') + '</ul>';
  };
  on(tabs, 'click', e => { const b = e.target.closest('.tab'); if (b) showDay(tabBtns.indexOf(b)); });
  on(tabs, 'keydown', e => {
    const n = tabBtns.length, step = { ArrowRight: 1, ArrowLeft: -1 }[e.key];
    let i;
    if (step) i = (cur + step + n) % n; else if (e.key === 'Home') i = 0; else if (e.key === 'End') i = n - 1; else return;
    e.preventDefault(); showDay(i); tabBtns[i].focus();
  });
  showDay(cur);

  /* ---------- Free trial form: validate, then hand off to WhatsApp ---------- */
  const F = $('#trialForm'), msg = $('#trialMsg');
  const opts = (el, list) => { el.innerHTML = '<option value="">Select</option>' + list.map(x => `<option>${x}</option>`).join(''); };
  opts(F.elements.goal, C.goals);
  opts(F.elements.time, C.times);

  const rules = {
    name: v => v.trim().length > 1 || 'Please enter your name.',
    phone: v => /^(\+?91)?[6-9]\d{9}$/.test(v.replace(/[\s-]/g, '')) || 'Please enter a valid 10-digit mobile number.',
    goal: v => !!v || 'Please choose a goal.',
    time: v => !!v || 'Please choose a preferred time.'
  };
  const setErr = (k, r) => { $('#e-' + k).textContent = r === true ? '' : r; F.elements[k].setAttribute('aria-invalid', r !== true); };
  on(F, 'input', e => { if (rules[e.target.name]) setErr(e.target.name, true); });

  on(F, 'submit', e => {
    e.preventDefault();
    let bad = null;
    Object.keys(rules).forEach(k => {
      const r = rules[k](F.elements[k].value);
      setErr(k, r);
      if (r !== true && !bad) bad = F.elements[k];
    });
    if (bad) { msg.textContent = ''; bad.focus(); return; }

    const v = k => F.elements[k].value.trim();
    const url = wa(['Free trial request for ' + C.name, 'Name: ' + v('name'), 'Phone: ' + v('phone'), 'Goal: ' + v('goal'), 'Preferred time: ' + v('time')].join('\n'));
    window.open(url, '_blank', 'noopener');

    const a = document.createElement('a');
    a.href = url; a.target = '_blank'; a.rel = 'noopener'; a.className = 'link'; a.textContent = 'open it here';
    msg.textContent = 'Opening WhatsApp. Press send there and we will confirm your slot. If nothing opened, ';
    msg.appendChild(a);
    msg.appendChild(document.createTextNode('.'));
  });
})();
