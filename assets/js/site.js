(function () {
  'use strict';

  var root = document.documentElement;
  var WA = 'https://wa.me/27844076980?text=';
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fine = window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  var hasGsap = !!(window.gsap && window.ScrollTrigger) && !reduce;
  function q(s, el) { return (el || document).querySelector(s); }
  function qa(s, el) { return Array.prototype.slice.call((el || document).querySelectorAll(s)); }

  /* ---------- colour helpers ---------- */
  function rgb(hex) { var n = parseInt(hex.slice(1), 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255]; }
  function hex(c) { return '#' + c.map(function (v) { v = Math.max(0, Math.min(255, Math.round(v))); return (v < 16 ? '0' : '') + v.toString(16); }).join(''); }
  function mix(a, b, t) { var x = rgb(a), y = rgb(b); return hex([x[0] + (y[0] - x[0]) * t, x[1] + (y[1] - x[1]) * t, x[2] + (y[2] - x[2]) * t]); }
  function darken(a, t) { return mix(a, '#000000', t); }
  function luminance(a) {
    var c = rgb(a).map(function (v) { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); });
    return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
  }
  function hsl(h, s, l) {
    function f(n) { var k = (n + h / 30) % 12, a = s * Math.min(l, 1 - l); return l - a * Math.max(-1, Math.min(k - 3, 9 - k, 1)); }
    return [f(0) * 255, f(8) * 255, f(4) * 255];
  }
  function toHsl(a) {
    var c = rgb(a).map(function (v) { return v / 255; });
    var max = Math.max.apply(null, c), min = Math.min.apply(null, c), l = (max + min) / 2, h = 0, s = 0, d = max - min;
    if (d) {
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      h = max === c[0] ? (c[1] - c[2]) / d + (c[1] < c[2] ? 6 : 0) : max === c[1] ? (c[2] - c[0]) / d + 2 : (c[0] - c[1]) / d + 4;
      h *= 60;
    }
    return [h, s, l, d];
  }
  function shiftHue(a, deg) { var x = toHsl(a); return hex(hsl((x[0] + deg + 360) % 360, Math.min(1, x[1] + 0.15), x[2])); }
  function hueOf(a) { var x = toHsl(a); return x[3] ? x[0] : -1; }
  function fmt(v) { return String(v).replace(/\B(?=(\d{3})+(?!\d))/g, ' '); }

  /* ---------- header, menu, year ---------- */
  var top = q('#top');
  var menu = top && q('.top__menu', top);
  var lastY = 0;
  function onScroll() {
    var y = window.scrollY;
    if (top) {
      top.classList.toggle('is-scrolled', y > 24);
      if (!top.classList.contains('is-open')) top.classList.toggle('is-hidden', y > 500 && y > lastY + 2);
      if (y < lastY - 2) top.classList.remove('is-hidden');
    }
    lastY = y;
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  if (menu) {
    menu.addEventListener('click', function () {
      var open = top.classList.toggle('is-open');
      menu.setAttribute('aria-expanded', open ? 'true' : 'false');
      var lab = menu.querySelector('b');
      if (lab) lab.textContent = open ? 'Close' : 'Menu';
    });
    qa('.top__nav a', top).forEach(function (a) {
      a.addEventListener('click', function () {
        top.classList.remove('is-open');
        menu.setAttribute('aria-expanded', 'false');
        var lab = menu.querySelector('b');
        if (lab) lab.textContent = 'Menu';
      });
    });
  }
  var year = q('#year');
  if (year) year.textContent = String(new Date().getFullYear());

  /* ---------- films ---------- */
  var FILMS = (window.VAULT_FILMS || []).map(function (f, i) {
    var film = { id: i, name: f[0], finish: f[1], family: f[2], shadow: f[3], base: f[4], hi: f[5] };
    if (film.family === 'White') {
      film.base = mix(film.base, '#f3f3f1', 0.55);
      film.hi = mix(film.hi, '#ffffff', 0.6);
      film.shadow = mix(film.shadow, '#c9cbcc', 0.4);
    }
    if (film.family === 'Black') {
      film.base = darken(film.base, 0.45);
      film.shadow = darken(film.shadow, 0.4);
    }
    return film;
  });
  function byName(n) { for (var i = 0; i < FILMS.length; i++) if (FILMS[i].name === n) return FILMS[i]; return null; }
  function accentOf(f) { return f.finish === 'Holographic' ? '#9fd7ff' : (luminance(f.base) < 0.05 ? mix(f.base, f.hi, 0.6) : f.base); }
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

  /* ---------- the car: one real photo, repainted per film from a shading map and a paint mask ---------- */
  var Car = (function () {
    var W = 1400, H = 761, base, shade, mask, ready = false, cache = {}, order = [], loading = null, waiting = [];
    function img(src) {
      return new Promise(function (res, rej) { var i = new Image(); i.decoding = 'async'; i.onload = function () { res(i); }; i.onerror = rej; i.src = src; });
    }
    function pixels(im) {
      var c = document.createElement('canvas'); c.width = W; c.height = H;
      var x = c.getContext('2d', { willReadFrequently: true });
      x.drawImage(im, 0, 0, W, H);
      return x.getImageData(0, 0, W, H).data;
    }
    function load() {
      if (loading) return loading;
      var want = Math.min(window.innerWidth, 1400) * Math.min(window.devicePixelRatio || 1, 2);
      var scale = Math.min(1, Math.max(0.5, want / 1400));
      W = Math.round(1400 * scale); H = Math.round(761 * scale);
      loading = Promise.all([img('assets/car/car-base.webp'), img('assets/car/car-shade.webp'), img('assets/car/car-mask.png')]).then(function (ims) {
        base = pixels(ims[0]); shade = pixels(ims[1]); mask = pixels(ims[2]);
        qa('canvas.car-canvas').forEach(function (c) { c.width = W; c.height = H; });
        ready = true;
        root.classList.add('car-ready');
        waiting.splice(0).forEach(function (fn) { fn(); });
      }).catch(function () { /* canvas not available (for example opened from a file): the plain photo stays */ });
      return loading;
    }
    function render(f) {
      if (cache[f.id]) return cache[f.id];
      var c = document.createElement('canvas'); c.width = W; c.height = H;
      var x = c.getContext('2d'), out = x.createImageData(W, H), o = out.data;
      var col = rgb(f.base), fr = col[0], fg = col[1], fb = col[2];
      var fin = f.finish, sh = fin === 'Pearl & shift' ? rgb(shiftHue(f.base, 55)) : null;
      var gain = 1.08, sg = 0.95, n = W * H;
      for (var p = 0, i = 0; p < n; p++, i += 4) {
        var m = mask[i] / 255;
        if (m < 0.004) { o[i] = base[i]; o[i + 1] = base[i + 1]; o[i + 2] = base[i + 2]; o[i + 3] = 255; continue; }
        var d = shade[i] / 127.5, s = shade[i + 1] / 255, r = fr, g = fg, b = fb;
        if (fin === 'Matte') { d = 0.42 + 0.5 * Math.min(d, 1.3); s *= 0.06; }
        else if (fin === 'Satin') { d = 0.35 + 0.65 * d; s *= 0.32; }
        else if (fin === 'Chrome') { d = Math.max(0.05, Math.min(1.8, (d - 0.55) * 2 + 0.6)); s = Math.min(1, s * 1.4); }
        else if (fin === 'Metallic') { var hh = ((p * 2654435761) >>> 0) % 1000; if (hh < 7) s = Math.min(1, s + 0.22 * d); d *= 0.97 + (hh % 7) * 0.008; }
        else if (fin === 'Pearl & shift') { var t = Math.min(1, Math.max(0, d - 0.35)); r += (sh[0] - fr) * t; g += (sh[1] - fg) * t; b += (sh[2] - fb) * t; }
        else if (fin === 'Carbon') { var xx = p % W, yy = (p / W) | 0; if ((((xx + yy) >> 2) + ((xx - yy + 8192) >> 2)) & 1) d *= 0.74; }
        else if (fin === 'Holographic') { var hc = hsl(((p % W) / W * 300 + d * 140) % 360, 0.8, 0.62); r = hc[0]; g = hc[1]; b = hc[2]; }
        var cr = r * d * gain + s * 255 * sg, cg = g * d * gain + s * 255 * sg, cb = b * d * gain + s * 255 * sg;
        if (cr > 255) cr = 255; if (cg > 255) cg = 255; if (cb > 255) cb = 255;
        o[i] = base[i] + (cr - base[i]) * m;
        o[i + 1] = base[i + 1] + (cg - base[i + 1]) * m;
        o[i + 2] = base[i + 2] + (cb - base[i + 2]) * m;
        o[i + 3] = 255;
      }
      x.putImageData(out, 0, 0);
      cache[f.id] = c; order.push(f.id);
      if (order.length > 16) delete cache[order.shift()];
      return c;
    }
    return {
      load: load, render: render,
      ready: function () { return ready; },
      whenReady: function (fn) { if (ready) fn(); else { waiting.push(fn); load(); } }
    };
  })();

  /* a stage: two stacked canvases; a new film is wiped on with a squeegee line */
  function Stage(aId, bId, sqId) {
    var a = q(aId), b = q(bId), sq = q(sqId);
    if (!a || !b) return null;
    var ax = a.getContext('2d'), bx = b.getContext('2d'), current = null, busy = null;
    function paint(ctx, f) { ctx.drawImage(Car.render(f), 0, 0); }
    return {
      show: function (f, animate) {
        Car.whenReady(function () {
          if (!current || !animate || !hasGsap) { paint(ax, f); current = f; return; }
          if (busy) busy.progress(1);
          paint(bx, f);
          var st = { p: 0 };
          sq.style.opacity = 1;
          busy = gsap.to(st, {
            p: 1, duration: 1, ease: 'power3.inOut',
            onUpdate: function () { b.style.clipPath = 'inset(0 ' + ((1 - st.p) * 100) + '% 0 0)'; sq.style.left = (st.p * 100) + '%'; },
            onComplete: function () { paint(ax, f); b.style.clipPath = 'inset(0 100% 0 0)'; sq.style.opacity = 0; busy = null; }
          });
          current = f;
        });
      },
      scrub: function (from, to, t) {
        if (!Car.ready()) return;
        if (this._from !== from) { paint(ax, from); this._from = from; }
        if (this._to !== to) { paint(bx, to); this._to = to; }
        b.style.clipPath = 'inset(0 ' + ((1 - t) * 100) + '% 0 0)';
        sq.style.left = (t * 100) + '%';
        sq.style.opacity = t > 0.015 && t < 0.985 ? 1 : 0;
      }
    };
  }

  /* ---------- the picker ---------- */
  var FINISHES = ['Gloss', 'Satin', 'Matte', 'Metallic', 'Pearl & shift', 'Chrome', 'Carbon', 'Holographic'];
  var FAMILIES = [['Black', '#111214'], ['Grey', '#8a8f95'], ['White', '#f1f1ef'], ['Red', '#b8191c'], ['Pink', '#e05a98'],
    ['Orange', '#e06a1b'], ['Gold', '#c9a24a'], ['Brown', '#7a5236'], ['Green', '#2f7a4b'], ['Blue', '#2a64c8'], ['Purple', '#6b3fb3']];
  var state = { finish: 'All', family: 'All', q: '', selected: null };
  var grid = q('#swatches'), countEl = q('#film-count'), search = q('#film-search');
  var nameEl = q('#film-name'), metaEl = q('#film-meta'), cta = q('#film-cta');
  var stage = Stage('#car-a', '#car-b', '#car-squeegee');

  function applyFilm(f, fromUser) {
    state.selected = f;
    if (stage) stage.show(f, fromUser);
    if (nameEl) nameEl.textContent = f.name;
    if (metaEl) metaEl.textContent = f.finish + ' · ' + f.family;
    if (fromUser) root.style.setProperty('--film', accentOf(f));
    if (cta) {
      cta.href = WA + encodeURIComponent('Hi The Vault, I\'m interested in colour PPF in ' + f.name + ' (' + f.finish + '). My car is: ');
      var label = cta.querySelector('span') || cta;
      label.textContent = 'Ask about ' + f.name + ' on WhatsApp';
      var dockCta = q('.dock .btn--cta'); if (dockCta && q('.vault--page')) dockCta.href = cta.href;
    }
    if (grid) qa('.sw', grid).forEach(function (el) {
      var on = Number(el.dataset.id) === f.id;
      el.setAttribute('aria-pressed', on ? 'true' : 'false');
      el.tabIndex = on ? 0 : -1;
    });
  }
  function visibleFilms() {
    var s = state.q.trim().toLowerCase();
    return FILMS.filter(function (f) {
      if (state.finish !== 'All' && f.finish !== state.finish) return false;
      if (state.family !== 'All' && f.family !== state.family) return false;
      if (s && (f.name + ' ' + f.finish + ' ' + f.family).toLowerCase().indexOf(s) === -1) return false;
      return true;
    });
  }
  function renderSwatches() {
    var list = visibleFilms(), frag = document.createDocumentFragment();
    grid.innerHTML = '';
    list.forEach(function (f) {
      var b = document.createElement('button');
      b.type = 'button'; b.className = 'sw'; b.dataset.id = f.id;
      b.style.setProperty('--sw', swatchBg(f));
      b.setAttribute('aria-label', f.name + ', ' + f.finish.toLowerCase());
      b.title = f.name + ' (' + f.finish + ')';
      b.setAttribute('aria-pressed', state.selected && state.selected.id === f.id ? 'true' : 'false');
      b.tabIndex = -1;
      frag.appendChild(b);
    });
    grid.appendChild(frag);
    if (!list.length) { var p = document.createElement('p'); p.className = 'empty'; p.textContent = 'No film matches that. Clear the search or pick another finish.'; grid.appendChild(p); }
    var cur = q('.sw[aria-pressed="true"]', grid) || q('.sw', grid);
    if (cur) cur.tabIndex = 0;
    countEl.textContent = list.length + ' of ' + FILMS.length + ' films';
    if (hasGsap) gsap.fromTo(qa('.sw', grid).slice(0, 70), { opacity: 0 }, { opacity: 1, duration: 0.45, ease: 'power2.out', stagger: { each: 0.006, from: 'start' } });
  }
  function makeChips(container, items, key, dots) {
    [['All']].concat(items.map(function (x) { return Array.isArray(x) ? x : [x]; })).forEach(function (it) {
      var name = it[0], b = document.createElement('button');
      b.type = 'button'; b.className = 'chip' + (dots && it[1] ? ' chip--fam' : '');
      b.setAttribute('aria-pressed', state[key] === name ? 'true' : 'false');
      if (dots && it[1]) { var i = document.createElement('i'); i.style.background = it[1]; i.setAttribute('aria-hidden', 'true'); b.appendChild(i); }
      b.appendChild(document.createTextNode(name === 'All' ? (key === 'finish' ? 'All finishes' : 'All colours') : name));
      b.addEventListener('click', function () {
        state[key] = name;
        qa('.chip', container).forEach(function (c) { c.setAttribute('aria-pressed', c === b ? 'true' : 'false'); });
        renderSwatches();
      });
      container.appendChild(b);
    });
  }
  if (FILMS.length && grid) {
    grid.setAttribute('data-lenis-prevent', '');
    makeChips(q('#finish-chips'), FINISHES.filter(function (fin) { return FILMS.some(function (f) { return f.finish === fin; }); }), 'finish', false);
    makeChips(q('#family-chips'), FAMILIES, 'family', true);
    grid.addEventListener('click', function (e) { var b = e.target.closest('.sw'); if (b) applyFilm(FILMS[Number(b.dataset.id)], true); });
    grid.addEventListener('keydown', function (e) {
      var keys = ['ArrowRight', 'ArrowLeft', 'ArrowDown', 'ArrowUp', 'Home', 'End'];
      if (keys.indexOf(e.key) === -1) return;
      var items = qa('.sw', grid), i = items.indexOf(document.activeElement);
      if (i === -1) return;
      var cols = getComputedStyle(grid).gridTemplateColumns.split(' ').length || 1;
      var next = { ArrowRight: i + 1, ArrowLeft: i - 1, ArrowDown: i + cols, ArrowUp: i - cols, Home: 0, End: items.length - 1 }[e.key];
      next = Math.max(0, Math.min(items.length - 1, next));
      e.preventDefault(); items[i].tabIndex = -1; items[next].tabIndex = 0; items[next].focus();
    });
    var st;
    search.addEventListener('input', function () { clearTimeout(st); st = setTimeout(function () { state.q = search.value; renderSwatches(); }, 120); });
    renderSwatches();
    applyFilm(byName('Racing Orange') || FILMS[0], false);
  }

  /* a mosaic of real films for the Colour PPF row, and a ribbon of film names */
  var vivid = FILMS.filter(function (f) { return hueOf(f.base) >= 0 && f.finish !== 'Carbon' && luminance(f.base) > 0.03; })
    .sort(function (a, b) { return hueOf(a.base) - hueOf(b.base); });
  var mosaic = q('#svc-swatches');
  if (mosaic && vivid.length) {
    for (var k = 0; k < 48; k++) {
      var f = vivid[Math.floor(k * vivid.length / 48)], s = document.createElement('span');
      s.style.background = swatchBg(f).replace('circle at 30% 28%', 'circle at 30% 20%');
      s.title = f.name;
      mosaic.appendChild(s);
    }
  }
  var ribbonFilms = q('#ribbon-films');
  if (ribbonFilms && vivid.length) {
    for (var r = 0; r < 36; r++) {
      var fr = vivid[Math.floor(r * vivid.length / 36)], sp = document.createElement('span');
      sp.innerHTML = '<i style="background:' + fr.base + '"></i>';
      sp.appendChild(document.createTextNode(fr.name));
      ribbonFilms.appendChild(sp);
    }
  }

  /* the showroom: eight films, wiped on one after another as you scroll */
  var SHOW = ['Racing Orange', 'Miami Blue', 'Super Matte Black', 'Volcanic Yellow', 'Metallic Sepang Blue', "Liquid Metallic Dragon's Blood Red", 'Tiffany', 'Ferrari Red']
    .map(byName).filter(Boolean);
  var show = Stage('#show-a', '#show-b', '#show-squeegee');
  var showName = q('#show-name'), showBg = q('#show-name-bg'), showCount = q('#show-count'), showFinish = q('#show-finish');
  var shownIdx = -1;
  function label(i) {
    if (i === shownIdx || !SHOW[i]) return;
    shownIdx = i;
    var f = SHOW[i];
    if (showName) showName.textContent = f.name;
    if (showFinish) showFinish.textContent = f.finish;
    if (showCount) showCount.textContent = (i < 9 ? '0' : '') + (i + 1) + ' / ' + (SHOW.length < 10 ? '0' : '') + SHOW.length;
    root.style.setProperty('--film', accentOf(f));
    if (showBg) {
      if (hasGsap) gsap.fromTo(showBg, { yPercent: 30, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.6, ease: 'expo.out', onStart: function () { showBg.textContent = f.name; } });
      else showBg.textContent = f.name;
    }
  }
  if (show && SHOW.length) Car.whenReady(function () { show.scrub(SHOW[0], SHOW[1] || SHOW[0], 0); });

  /* start loading the car once the page has settled */
  function warmCar() {
    Car.load().then(function () {
      SHOW.forEach(function (f, i) { setTimeout(function () { Car.render(f); }, 60 * i); });
    });
  }
  if (q('.car-canvas')) { if ('requestIdleCallback' in window) requestIdleCallback(warmCar, { timeout: 2500 }); else setTimeout(warmCar, 1500); }

  /* ---------- without the motion libraries: everything shows, nothing moves ---------- */
  if (!hasGsap) {
    root.classList.add('motion-failed', 'no-motion');
    return;
  }

  /* ================= motion ================= */
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.config({ ignoreMobileResize: true });

  /* smooth scrolling */
  var lenis = null;
  if (window.Lenis) {
    lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(function (t) { lenis.raf(t * 1000); });
    gsap.ticker.lagSmoothing(0);
  }
  document.addEventListener('click', function (e) {
    var a = e.target.closest('a[href^="#"]');
    if (!a) return;
    var id = a.getAttribute('href');
    if (id.length < 2) return;
    var el = q(id);
    if (!el) return;
    e.preventDefault();
    if (lenis) lenis.scrollTo(el, { offset: id === '#main' ? 0 : -70, duration: 1.4 });
    else el.scrollIntoView();
    if (history.replaceState) history.replaceState(null, '', id);
  });

  function startMotion() {
  /* hero: the studio lights come on behind the words (the words themselves show at once) */
  var heroPic = q('.hero__media picture'), heroImg = q('.hero__media img');
  var intro = gsap.timeline({ defaults: { ease: 'expo.out' }, delay: 0.05 });
  if (heroPic) intro.set(heroPic, { filter: 'brightness(0.15)', scale: 1.08 })
    .to(heroPic, { keyframes: [
      { filter: 'brightness(0.6)', duration: 0.05 }, { filter: 'brightness(0.2)', duration: 0.09 },
      { filter: 'brightness(1)', duration: 0.45 }
    ], ease: 'none' }, 0.1)
    .to(heroPic, { scale: 1, duration: 2.2, ease: 'expo.out' }, 0.1);
  if (q('.hero__glare')) intro.fromTo('.hero__glare', { xPercent: -60 }, { xPercent: 60, duration: 1.8, ease: 'power2.inOut' }, 0.5);
  root.classList.add('motion-ready');

  /* hero on scroll: the car pushes in slowly; the words stay put */
  if (q('#hero') && heroImg) gsap.timeline({ scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: true } })
    .to(heroImg, { scale: 1.12, yPercent: 6, ease: 'none' }, 0);

  /* the torch: a paint-inspection light that follows the cursor (or drifts on its own on touch screens) */
  var hm = q('[data-hero-media]');
  if (hm) {
    var tx = 0.72, ty = 0.46, cx = tx, cy = ty;
    if (fine) {
      q('#hero').addEventListener('mousemove', function (e) { var r = hm.getBoundingClientRect(); tx = (e.clientX - r.left) / r.width; ty = (e.clientY - r.top) / r.height; });
    }
    gsap.ticker.add(function (time) {
      if (!fine) { tx = 0.62 + Math.sin(time * 0.45) * 0.22; ty = 0.48 + Math.sin(time * 0.7) * 0.12; }
      cx += (tx - cx) * 0.12; cy += (ty - cy) * 0.12;
      hm.style.setProperty('--mx', (cx * 100).toFixed(2) + '%');
      hm.style.setProperty('--my', (cy * 100).toFixed(2) + '%');
    });
  }

  /* ribbon: two marquees; they speed up with the scroll and turn when the scroll turns */
  var marquees = qa('.ribbon__track').map(function (track) {
    var dir = Number(track.dataset.dir) || -1;
    var html = track.innerHTML;
    var guard = 0;
    while (track.scrollWidth < window.innerWidth * 2.2 && guard++ < 6) track.innerHTML += html;
    track.innerHTML += track.innerHTML;
    var tw = dir < 0
      ? gsap.fromTo(track, { xPercent: 0 }, { xPercent: -50, duration: 38, ease: 'none', repeat: -1 })
      : gsap.fromTo(track, { xPercent: -50 }, { xPercent: 0, duration: 60, ease: 'none', repeat: -1 });
    tw.totalTime(tw.duration() * 200);
    return tw;
  });
  var mqTarget = 1, mqNow = 1, mqBase = 1;
  ScrollTrigger.create({
    start: 0, end: 'max',
    onUpdate: function (self) {
      mqBase = self.direction < 0 ? -1 : 1;
      mqTarget = mqBase * (1 + Math.min(Math.abs(self.getVelocity()) / 260, 6));
    }
  });
  gsap.ticker.add(function () {
    mqTarget += (mqBase - mqTarget) * 0.04;
    mqNow += (mqTarget - mqNow) * 0.1;
    marquees.forEach(function (tw) { tw.timeScale(mqNow); });
  });

  /* scroll progress */
  if (q('.progress span')) gsap.to('.progress span', { scaleX: 1, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: 0.3 } });

  /* text and small blocks rise in */
  ScrollTrigger.batch('.reveal', {
    start: 'top 90%', once: true,
    onEnter: function (els) { gsap.to(els, { opacity: 1, y: 0, duration: 1, ease: 'expo.out', stagger: 0.08, overwrite: true }); }
  });

  /* services: each picture is laid like film, a squeegee edge running across it */
  qa('.svc__media').forEach(function (m) {
    var frame = q('.svc__frame', m), pic = q('img', frame), sq = q('.svc__squeegee', m);
    var tl = gsap.timeline({ scrollTrigger: { trigger: m, start: 'top 82%', once: true } });
    tl.fromTo(frame, { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 1.3, ease: 'power4.inOut' }, 0);
    if (sq) tl.fromTo(sq, { left: '0%', opacity: 1 }, { left: '100%', duration: 1.3, ease: 'power4.inOut' }, 0).to(sq, { opacity: 0, duration: 0.35 }, 1.1);
    if (pic) tl.from(pic, { scale: 1.2, duration: 1.6, ease: 'expo.out' }, 0);
  });
  if (mosaic) gsap.fromTo(qa('span', mosaic), { opacity: 0, clipPath: 'inset(0 0 100% 0)' }, {
    opacity: 1, clipPath: 'inset(0 0 0% 0)', duration: 0.7, ease: 'power3.out',
    stagger: { each: 0.012, from: 'random' }, scrollTrigger: { trigger: mosaic, start: 'top 82%', once: true }
  });

  /* showroom: pinned while eight films wipe across the car */
  if (SHOW.length > 1 && q('#showroom')) {
    var segs = SHOW.length - 1;
    ScrollTrigger.create({
      trigger: '#showroom', start: 'top top', end: '+=' + (segs * 42) + '%', pin: true,
      onEnter: function () { Car.load(); },
      onUpdate: function (self) {
        var pos = self.progress * segs, i = Math.min(segs - 1, Math.floor(pos)), t = pos - i;
        if (show) show.scrub(SHOW[i], SHOW[i + 1], t);
        label(t > 0.5 ? i + 1 : i);
      }
    });
    gsap.fromTo('.car-wrap--show', { scale: 0.86, y: 40 }, { scale: 1, y: 0, ease: 'none', scrollTrigger: { trigger: '#showroom', start: 'top bottom', end: 'top top', scrub: true } });
  }
  if (q('#prices')) ScrollTrigger.create({ trigger: '#prices', start: 'top bottom', once: true, onEnter: function () { Car.load(); } });
  if (q('.vault--page')) ScrollTrigger.create({ trigger: '.vault--page', start: 'top bottom', once: true, onEnter: function () { Car.load(); } });

  /* booking: a line fills and each step lights up as it is reached */
  var stepsEls = qa('.steps li');
  if (stepsEls.length) gsap.to('.steps__line span', {
    scaleX: 1, ease: 'none',
    scrollTrigger: {
      trigger: '.steps-wrap', start: 'top 78%', end: 'bottom 60%', scrub: 0.6,
      onUpdate: function (self) { stepsEls.forEach(function (li, i) { li.classList.toggle('is-on', self.progress >= i / stepsEls.length + 0.04); }); }
    }
  });
  if (stepsEls.length) gsap.from(stepsEls, { y: 40, opacity: 0, duration: 1, ease: 'expo.out', stagger: 0.12, scrollTrigger: { trigger: '.steps', start: 'top 85%', once: true } });
  /* service pages: prose sections and related cards rise in */
  ScrollTrigger.batch(qa('.prose__section > :not(.prose__title), .rel-card'), {
    start: 'top 90%', once: true,
    onEnter: function (els) { gsap.fromTo(els, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: 'expo.out', stagger: 0.06, overwrite: true }); }
  });

  /* FAQ opens and closes smoothly */
  qa('.faq details').forEach(function (d) {
    var s = q('summary', d), body = q('div', d);
    s.addEventListener('click', function (e) {
      e.preventDefault();
      if (d.open) {
        gsap.to(body, { height: 0, paddingBottom: 0, opacity: 0, duration: 0.42, ease: 'power2.inOut', onComplete: function () { d.open = false; gsap.set(body, { clearProps: 'height,paddingBottom,opacity' }); ScrollTrigger.refresh(); } });
      } else {
        d.open = true;
        gsap.from(body, { height: 0, paddingBottom: 0, opacity: 0, duration: 0.55, ease: 'power3.out', clearProps: 'height,paddingBottom,opacity', onComplete: function () { ScrollTrigger.refresh(); } });
      }
    });
  });

  window.addEventListener('load', function () { ScrollTrigger.refresh(); });
  }

  /* start once the fonts are in (the marquee is measured by width), but never wait longer than 1.2 s */
  var started = false;
  function go() { if (started) return; started = true; startMotion(); }
  if (document.fonts && document.fonts.load) Promise.all([document.fonts.load('800 1em "Big Shoulders Display"'), document.fonts.load('400 1em "Martian Mono"')]).then(go, go);
  setTimeout(go, 1200);
})();
