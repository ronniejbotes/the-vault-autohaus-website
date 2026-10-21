(function () {
  'use strict';

  var WA = 'https://wa.me/27844076980?text=';
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- small colour helpers ---------- */
  function rgb(hex) {
    var n = parseInt(hex.slice(1), 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  }
  function hex(c) {
    return '#' + c.map(function (v) {
      v = Math.max(0, Math.min(255, Math.round(v)));
      return (v < 16 ? '0' : '') + v.toString(16);
    }).join('');
  }
  function mix(a, b, t) {
    var x = rgb(a), y = rgb(b);
    return hex([x[0] + (y[0] - x[0]) * t, x[1] + (y[1] - x[1]) * t, x[2] + (y[2] - x[2]) * t]);
  }
  function darken(a, t) { return mix(a, '#000000', t); }
  function luminance(a) {
    var c = rgb(a).map(function (v) { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); });
    return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
  }
  function shiftHue(a, deg) {
    var c = rgb(a).map(function (v) { return v / 255; });
    var max = Math.max.apply(null, c), min = Math.min.apply(null, c), l = (max + min) / 2, h = 0, s = 0, d = max - min;
    if (d) {
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      h = max === c[0] ? (c[1] - c[2]) / d + (c[1] < c[2] ? 6 : 0) : max === c[1] ? (c[2] - c[0]) / d + 2 : (c[0] - c[1]) / d + 4;
      h *= 60;
    }
    h = (h + deg + 360) % 360; s = Math.min(1, s + 0.15);
    function f(n) { var k = (n + h / 30) % 12, a2 = s * Math.min(l, 1 - l); return l - a2 * Math.max(-1, Math.min(k - 3, 9 - k, 1)); }
    return hex([f(0) * 255, f(8) * 255, f(4) * 255]);
  }
  function hueOf(a) {
    var c = rgb(a), max = Math.max.apply(null, c), min = Math.min.apply(null, c), d = max - min, h = 0;
    if (!d) return -1;
    h = max === c[0] ? (c[1] - c[2]) / d : max === c[1] ? (c[2] - c[0]) / d + 2 : (c[0] - c[1]) / d + 4;
    return (h * 60 + 360) % 360;
  }

  /* ---------- header, menu, year ---------- */
  var top = document.getElementById('top');
  var menu = top && top.querySelector('.top__menu');
  function onScroll() { if (top) top.classList.toggle('is-scrolled', window.scrollY > 24); }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  if (menu) {
    menu.addEventListener('click', function () {
      var open = top.classList.toggle('is-open');
      menu.setAttribute('aria-expanded', open ? 'true' : 'false');
      menu.setAttribute('aria-label', open ? 'Close the menu' : 'Open the menu');
    });
    top.querySelectorAll('.top__nav a').forEach(function (a) {
      a.addEventListener('click', function () {
        top.classList.remove('is-open');
        menu.setAttribute('aria-expanded', 'false');
        menu.setAttribute('aria-label', 'Open the menu');
      });
    });
  }
  var year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());

  /* ---------- hero entrance, reveals, heading light sweep ---------- */
  requestAnimationFrame(function () { document.body.classList.add('hero-in'); });
  if ('IntersectionObserver' in window && !reduceMotion) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add(e.target.classList.contains('lit') ? 'is-lit' : 'is-in');
        io.unobserve(e.target);
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.12 });
    document.querySelectorAll('.reveal, .lit').forEach(function (el) { io.observe(el); });
  } else {
    document.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('is-in'); });
  }

  /* ---------- the colour vault ---------- */
  var FILMS = (window.VAULT_FILMS || []).map(function (f, i) {
    var film = { id: i, name: f[0], finish: f[1], family: f[2], shadow: f[3], base: f[4], hi: f[5] };
    if (film.family === 'White') {
      film.base = mix(film.base, '#f3f3f1', 0.55);
      film.hi = mix(film.hi, '#ffffff', 0.6);
      film.shadow = mix(film.shadow, '#c9cbcc', 0.4);
    }
    return film;
  });
  if (!FILMS.length) return;

  var FINISHES = ['Gloss', 'Satin', 'Matte', 'Metallic', 'Pearl & shift', 'Chrome', 'Carbon', 'Holographic'];
  var FAMILIES = [
    ['Black', '#111214'], ['Grey', '#8a8f95'], ['White', '#f1f1ef'], ['Red', '#b8191c'], ['Pink', '#e05a98'],
    ['Orange', '#e06a1b'], ['Gold', '#c9a24a'], ['Brown', '#7a5236'], ['Green', '#2f7a4b'], ['Blue', '#2a64c8'], ['Purple', '#6b3fb3']
  ];
  var state = { finish: 'All', family: 'All', q: '', selected: null, touched: false };

  function swatchBg(f) {
    var b = f.base, h = f.hi, s = f.shadow;
    switch (f.finish) {
      case 'Matte': return 'radial-gradient(circle at 34% 32%, ' + mix(b, '#ffffff', 0.12) + ', ' + b + ' 58%, ' + mix(b, s, 0.6) + ')';
      case 'Satin': return 'radial-gradient(circle at 32% 30%, ' + mix(b, h, 0.5) + ' 0 12%, ' + b + ' 48%, ' + s + ')';
      case 'Chrome': return 'linear-gradient(135deg, ' + mix(b, '#ffffff', 0.7) + ', ' + darken(b, 0.55) + ' 34%, ' + mix(b, '#ffffff', 0.45) + ' 54%, ' + b + ' 74%, ' + darken(b, 0.75) + ')';
      case 'Pearl & shift': return 'linear-gradient(135deg, ' + mix(h, '#ffffff', 0.3) + ', ' + b + ' 38%, ' + shiftHue(b, 55) + ' 70%, ' + darken(s, 0.3) + ')';
      case 'Carbon': return 'repeating-linear-gradient(45deg, ' + mix(b, '#ffffff', 0.12) + ' 0 3px, ' + darken(b, 0.35) + ' 3px 6px)';
      case 'Holographic': return 'linear-gradient(135deg, #ff5ea8, #ffd23f 25%, #4dffb5 50%, #3fb8ff 75%, #9b5cff)';
      default: return 'radial-gradient(circle at 30% 28%, ' + mix(h, '#ffffff', 0.3) + ' 0 9%, ' + b + ' 40%, ' + darken(s, 0.25) + ')';
    }
  }

  function carStops(f) {
    var b = f.base, h = f.hi, s = f.shadow;
    switch (f.finish) {
      case 'Matte': return [mix(b, '#ffffff', 0.1), b, b, mix(b, s, 0.45), darken(s, 0.3)];
      case 'Satin': return [mix(b, h, 0.45), b, b, mix(b, s, 0.6), darken(s, 0.4)];
      case 'Metallic': return [mix(h, '#ffffff', 0.45), mix(b, h, 0.15), b, s, darken(s, 0.5)];
      case 'Pearl & shift': return [mix(h, '#ffffff', 0.35), b, shiftHue(b, 55), s, darken(s, 0.5)];
      case 'Chrome': return [mix(b, '#ffffff', 0.7), mix(b, '#ffffff', 0.12), darken(b, 0.62), mix(b, '#ffffff', 0.48), darken(b, 0.78)];
      case 'Carbon': return [mix(b, '#ffffff', 0.25), b, b, s, darken(s, 0.5)];
      case 'Holographic': return ['#ffffff', mix(b, '#ffffff', 0.4), b, s, darken(s, 0.4)];
      default: return [mix(h, '#ffffff', 0.35), b, b, s, darken(s, 0.55)];
    }
  }

  var car = document.getElementById('car');
  var stops = ['p0', 'p1', 'p2', 'p3', 'p4'].map(function (id) { return document.getElementById(id); });
  var nameEl = document.getElementById('film-name');
  var metaEl = document.getElementById('film-meta');
  var cta = document.getElementById('film-cta');
  var grid = document.getElementById('swatches');
  var countEl = document.getElementById('film-count');
  var search = document.getElementById('film-search');
  var root = document.documentElement;

  function applyFilm(f, fromUser) {
    state.selected = f;
    carStops(f).forEach(function (c, i) { if (stops[i]) stops[i].setAttribute('stop-color', c); });
    if (car) car.setAttribute('data-finish', f.finish);
    if (nameEl) nameEl.textContent = f.name;
    if (metaEl) metaEl.textContent = f.finish + ' · ' + f.family;
    var accent = f.finish === 'Holographic' ? '#9fd7ff' : (luminance(f.base) < 0.05 ? mix(f.base, f.hi, 0.6) : f.base);
    root.style.setProperty('--film', accent);
    if (fromUser) state.touched = true;
    if (cta) {
      cta.href = WA + encodeURIComponent('Hi The Vault Autohaus, I\'m interested in colour PPF in ' + f.name + ' (' + f.finish + '). My car is: ');
      cta.textContent = 'Ask about ' + f.name + ' on WhatsApp';
    }
    grid.querySelectorAll('.sw').forEach(function (el) {
      var on = Number(el.dataset.id) === f.id;
      el.setAttribute('aria-pressed', on ? 'true' : 'false');
      el.tabIndex = on ? 0 : -1;
    });
  }

  function visibleFilms() {
    var q = state.q.trim().toLowerCase();
    return FILMS.filter(function (f) {
      if (state.finish !== 'All' && f.finish !== state.finish) return false;
      if (state.family !== 'All' && f.family !== state.family) return false;
      if (q && (f.name + ' ' + f.finish + ' ' + f.family).toLowerCase().indexOf(q) === -1) return false;
      return true;
    });
  }

  function renderSwatches() {
    var list = visibleFilms();
    grid.innerHTML = '';
    var frag = document.createDocumentFragment();
    list.forEach(function (f) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'sw';
      b.dataset.id = f.id;
      b.style.setProperty('--sw', swatchBg(f));
      b.setAttribute('aria-label', f.name + ', ' + f.finish.toLowerCase());
      b.title = f.name + ' (' + f.finish + ')';
      b.setAttribute('aria-pressed', state.selected && state.selected.id === f.id ? 'true' : 'false');
      b.tabIndex = -1;
      frag.appendChild(b);
    });
    grid.appendChild(frag);
    if (!list.length) {
      var p = document.createElement('p');
      p.className = 'empty';
      p.textContent = 'No film matches that. Clear the search or pick another finish.';
      grid.appendChild(p);
    }
    var current = grid.querySelector('.sw[aria-pressed="true"]') || grid.querySelector('.sw');
    if (current) current.tabIndex = 0;
    countEl.textContent = list.length + ' of ' + FILMS.length + ' films';
  }

  function makeChips(container, items, key, withDots) {
    var all = [['All']].concat(items.map(function (x) { return Array.isArray(x) ? x : [x]; }));
    all.forEach(function (it) {
      var name = it[0];
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'chip' + (withDots && it[1] ? ' chip--fam' : '');
      b.setAttribute('aria-pressed', state[key] === name ? 'true' : 'false');
      if (withDots && it[1]) {
        var dot = document.createElement('i');
        dot.style.background = it[1];
        dot.setAttribute('aria-hidden', 'true');
        b.appendChild(dot);
      }
      b.appendChild(document.createTextNode(name === 'All' ? (key === 'finish' ? 'All finishes' : 'All colours') : name));
      b.addEventListener('click', function () {
        state[key] = name;
        container.querySelectorAll('.chip').forEach(function (c) { c.setAttribute('aria-pressed', c === b ? 'true' : 'false'); });
        renderSwatches();
      });
      container.appendChild(b);
    });
  }

  makeChips(document.getElementById('finish-chips'), FINISHES.filter(function (fin) {
    return FILMS.some(function (f) { return f.finish === fin; });
  }), 'finish', false);
  makeChips(document.getElementById('family-chips'), FAMILIES, 'family', true);

  grid.addEventListener('click', function (e) {
    var b = e.target.closest('.sw');
    if (!b) return;
    applyFilm(FILMS[Number(b.dataset.id)], true);
  });
  grid.addEventListener('keydown', function (e) {
    var keys = ['ArrowRight', 'ArrowLeft', 'ArrowDown', 'ArrowUp', 'Home', 'End'];
    if (keys.indexOf(e.key) === -1) return;
    var items = Array.prototype.slice.call(grid.querySelectorAll('.sw'));
    var i = items.indexOf(document.activeElement);
    if (i === -1) return;
    var cols = getComputedStyle(grid).gridTemplateColumns.split(' ').length || 1;
    var next = { ArrowRight: i + 1, ArrowLeft: i - 1, ArrowDown: i + cols, ArrowUp: i - cols, Home: 0, End: items.length - 1 }[e.key];
    next = Math.max(0, Math.min(items.length - 1, next));
    e.preventDefault();
    items[i].tabIndex = -1;
    items[next].tabIndex = 0;
    items[next].focus();
  });
  var t;
  search.addEventListener('input', function () {
    clearTimeout(t);
    t = setTimeout(function () { state.q = search.value; renderSwatches(); }, 120);
  });

  var start = FILMS.filter(function (f) { return f.name === 'Racing Orange'; })[0] || FILMS[0];
  renderSwatches();
  applyFilm(start, false);
  root.style.setProperty('--film', '#dcebf7');

  /* a mosaic of real films for the Colour PPF service row */
  var mosaic = document.getElementById('svc-swatches');
  if (mosaic) {
    var vivid = FILMS.filter(function (f) { return hueOf(f.base) >= 0 && f.finish !== 'Carbon' && luminance(f.base) > 0.03; })
      .sort(function (a, b) { return hueOf(a.base) - hueOf(b.base); });
    var pick = [];
    for (var k = 0; k < 48; k++) pick.push(vivid[Math.floor(k * vivid.length / 48)]);
    mosaic.style.gridTemplateRows = 'repeat(6, 1fr)';
    pick.forEach(function (f) {
      var s = document.createElement('span');
      s.style.background = swatchBg(f).replace('circle at 30% 28%', 'circle at 30% 20%');
      s.title = f.name;
      mosaic.appendChild(s);
    });
  }
})();
