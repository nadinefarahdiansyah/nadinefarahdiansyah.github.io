/* ============================================================
   Shared behaviour for the portfolio (index.html + project.html)
   Everything is guarded so it no-ops on pages missing an element.
   ============================================================ */
(function () {
  'use strict';
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var hover = window.matchMedia('(hover: hover)').matches;
  var SITE = window.SITE || {};

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  /* ── i18n (English ⇄ Indonesian) ───────────────────────────
     Text lives inline on each element as data-en / data-id.
     Add `data-html` when the value contains markup.            */
  function getLang() {
    try { return localStorage.getItem('lang') || 'en'; } catch (e) { return 'en'; }
  }
  function applyLang(lang) {
    document.querySelectorAll('[data-en]').forEach(function (el) {
      var val = el.getAttribute('data-' + lang);
      if (val == null) return;
      if (el.hasAttribute('data-html')) el.innerHTML = val;
      else el.textContent = val;
    });
    document.querySelectorAll('[data-en-aria]').forEach(function (el) {
      var v = el.getAttribute('data-' + lang + '-aria');
      if (v != null) el.setAttribute('aria-label', v);
    });
    document.documentElement.setAttribute('lang', lang);
    var t = document.getElementById('langToggle');
    if (t) {
      t.querySelectorAll('[data-lang]').forEach(function (s) {
        s.classList.toggle('on', s.getAttribute('data-lang') === lang);
      });
    }
    document.dispatchEvent(new CustomEvent('langchange', { detail: { lang: lang } }));
  }
  window.getLang = getLang;
  var lang = getLang();
  applyLang(lang);
  var langToggle = document.getElementById('langToggle');
  if (langToggle) {
    langToggle.addEventListener('click', function () {
      lang = (getLang() === 'en') ? 'id' : 'en';
      try { localStorage.setItem('lang', lang); } catch (e) {}
      applyLang(lang);
    });
  }

  /* ── Theme toggle (dark ⇄ light) ───────────────────────────── */
  var themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      var cur = document.documentElement.getAttribute('data-theme');
      var next = cur === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch (e) {}
      var meta = document.querySelector('meta[name="theme-color"]');
      if (meta) meta.setAttribute('content', next === 'dark' ? '#060611' : '#e9ecfb');
    });
  }

  /* ── Mobile nav drawer ─────────────────────────────────────── */
  var navBtn = document.getElementById('navToggle');
  var navMenu = document.getElementById('navLinks');
  if (navBtn && navMenu) {
    var setNav = function (open) {
      navMenu.classList.toggle('open', open);
      navBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    };
    navBtn.addEventListener('click', function () { setNav(!navMenu.classList.contains('open')); });
    navMenu.addEventListener('click', function (e) { if (e.target.closest('a')) setNav(false); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navMenu.classList.contains('open')) { setNav(false); navBtn.focus(); }
    });
    window.addEventListener('resize', function () { if (window.innerWidth > 980) setNav(false); });
  }

  /* ── Scroll progress bar ───────────────────────────────────── */
  var bar = document.getElementById('progress');
  if (bar) {
    var onScroll = function () {
      var h = document.documentElement;
      var max = h.scrollHeight - h.clientHeight;
      bar.style.width = (max > 0 ? (h.scrollTop / max) * 100 : 0) + '%';
    };
    document.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ── Scroll reveal ─────────────────────────────────────────── */
  var reveals = document.querySelectorAll('.reveal');
  if (reveals.length) {
    if ('IntersectionObserver' in window && !reduce) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
        });
      }, { threshold: 0.12 });
      reveals.forEach(function (el) { io.observe(el); });
      reveals.forEach(function (el) {
        if (el.getBoundingClientRect().top < window.innerHeight) el.classList.add('visible');
      });
    } else {
      reveals.forEach(function (el) { el.classList.add('visible'); });
    }
  }

  /* ── Cursor-tracked glass glow + 3D tilt ───────────────────────
     Glow is delegated so cards rendered later (gallery) get it too. */
  if (!reduce && hover) {
    document.addEventListener('mousemove', function (e) {
      var card = e.target.closest && e.target.closest('.glass-card');
      if (!card) return;
      var r = card.getBoundingClientRect();
      card.style.setProperty('--mx', (e.clientX - r.left) + 'px');
      card.style.setProperty('--my', (e.clientY - r.top) + 'px');
    }, { passive: true });
    document.querySelectorAll('[data-tilt]').forEach(function (el) {
      var max = 7;
      el.addEventListener('mousemove', function (e) {
        var r = el.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width - 0.5;
        var py = (e.clientY - r.top) / r.height - 0.5;
        el.style.transform = 'perspective(900px) rotateX(' + (-py * max) + 'deg) rotateY(' + (px * max) + 'deg) translateY(-4px)';
      });
      el.addEventListener('mouseleave', function () { el.style.transform = ''; });
    });
  }

  /* ── Count-up stats ─────────────────────────────────────────
     data-count="85.8" (decimals inferred) or data-count="works"
     to show the live number of gallery pieces.                  */
  var counters = document.querySelectorAll('[data-count]');
  function runCount(el) {
    var raw = el.getAttribute('data-count');
    if (raw === 'works') raw = String((SITE.works || []).length);
    var target = parseFloat(raw);
    var dec = (raw.split('.')[1] || '').length;
    var fmt = function (n) { return n.toFixed(dec); };
    if (reduce) { el.textContent = fmt(target); return; }
    var start = performance.now(), dur = 1400;
    function step(now) {
      var p = Math.min((now - start) / dur, 1);
      el.textContent = fmt((1 - Math.pow(1 - p, 3)) * target);
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  if (counters.length) {
    if ('IntersectionObserver' in window) {
      var co = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) { if (e.isIntersecting) { runCount(e.target); co.unobserve(e.target); } });
      }, { threshold: 0.5 });
      counters.forEach(function (el) { co.observe(el); });
    } else { counters.forEach(runCount); }
  }

  /* ── Scrollspy nav ─────────────────────────────────────────── */
  var navLinks = {};
  document.querySelectorAll('.nav-links a[href^="#"]').forEach(function (a) {
    navLinks[a.getAttribute('href').slice(1)] = a;
  });
  var spyIds = Object.keys(navLinks);
  if (spyIds.length && 'IntersectionObserver' in window) {
    var so = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          spyIds.forEach(function (id) { navLinks[id].classList.remove('active'); });
          var id = e.target.getAttribute('id');
          if (navLinks[id]) navLinks[id].classList.add('active');
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    spyIds.forEach(function (id) { var s = document.getElementById(id); if (s) so.observe(s); });
  }

  /* ── Gallery (index.html) ──────────────────────────────────────
     Rendered from SITE.works so adding a piece is a one-line edit. */
  var grid = document.getElementById('gallery');
  var filterBar = document.getElementById('filters');
  var moreLink = document.getElementById('galleryMore');
  var activeCat = 'all';
  function renderGallery() {
    if (!grid || !SITE.works) return;
    var L = getLang();
    var counts = { all: SITE.works.length };
    SITE.works.forEach(function (w) { counts[w.cat] = (counts[w.cat] || 0) + 1; });

    if (filterBar) {
      var keys = ['all'].concat(Object.keys(SITE.cats));
      filterBar.innerHTML = keys.map(function (k) {
        var label = k === 'all' ? (L === 'id' ? 'Semua' : 'All') : SITE.cats[k][L];
        return '<button type="button" class="filter" data-filter="' + k + '" aria-pressed="' + (k === activeCat) + '">' +
          esc(label) + '<span class="n">' + counts[k] + '</span></button>';
      }).join('');
    }

    grid.innerHTML = SITE.works.map(function (w) {
      var title = w.title[L] || w.title.en;
      var meta = SITE.cats[w.cat][L] + (w.org ? ' · ' + w.org : '');
      return '<a class="work glass-card" href="' + w.full + '" data-lb="gallery" data-cat="' + w.cat + '"' +
        ' data-caption="' + esc(title) + '" data-meta="' + esc(meta) + '">' +
        '<div class="work-media' + (w.contain ? ' contain' : '') + '">' +
        '<img src="' + w.thumb + '" width="' + w.tw + '" height="' + w.th + '" alt="' + esc(title) + '" loading="lazy" decoding="async"></div>' +
        '<div class="work-cap"><div class="work-title">' + esc(title) + '</div><div class="work-meta">' + esc(meta) + '</div></div></a>';
    }).join('');
    applyFilter(activeCat);
  }
  function applyFilter(cat) {
    activeCat = cat;
    grid.querySelectorAll('.work').forEach(function (el) {
      el.classList.toggle('is-hidden', cat !== 'all' && el.getAttribute('data-cat') !== cat);
    });
    if (filterBar) {
      filterBar.querySelectorAll('.filter').forEach(function (b) {
        b.setAttribute('aria-pressed', String(b.getAttribute('data-filter') === cat));
      });
    }
    if (moreLink) {
      var L = getLang();
      moreLink.hidden = cat === 'all';
      if (cat !== 'all') {
        moreLink.href = 'project.html#' + cat;
        moreLink.querySelector('span').textContent = (L === 'id' ? 'Buka halaman ' : 'Open the ') +
          SITE.cats[cat][L] + (L === 'id' ? '' : ' page');
      }
    }
  }
  if (grid) {
    renderGallery();
    document.addEventListener('langchange', renderGallery);
    if (filterBar) {
      filterBar.addEventListener('click', function (e) {
        var b = e.target.closest('.filter');
        if (b) applyFilter(b.getAttribute('data-filter'));
      });
    }
  }

  /* ── Lightbox ────────────────────────────────────────────────
     Any <a data-lb="group" href="large.webp"> opens here; the group
     scopes prev/next. Without JS the link simply opens the image. */
  var lb = document.getElementById('lightbox');
  if (lb) {
    var lbImg = lb.querySelector('img');
    var lbCap = lb.querySelector('.lb-title');
    var lbMeta = lb.querySelector('.lb-meta');
    var lbCount = lb.querySelector('.lb-count');
    var items = [], idx = 0, opener = null;

    var show = function (i) {
      idx = (i + items.length) % items.length;
      var a = items[idx];
      lbImg.src = a.getAttribute('href');
      lbImg.alt = a.getAttribute('data-caption') || '';
      lbCap.textContent = a.getAttribute('data-caption') || '';
      lbMeta.textContent = a.getAttribute('data-meta') || '';
      lbCount.textContent = (idx + 1) + ' / ' + items.length;
    };
    var open = function (a) {
      var group = a.getAttribute('data-lb');
      items = Array.prototype.filter.call(document.querySelectorAll('[data-lb="' + group + '"]'), function (el) {
        return el.offsetParent !== null;
      });
      opener = a;
      show(items.indexOf(a));
      lb.classList.add('open');
      lb.setAttribute('aria-hidden', 'false');
      document.body.classList.add('lb-lock');
      // wait a frame so the dialog is visible before moving focus into it
      requestAnimationFrame(function () { lb.querySelector('.lb-close').focus(); });
    };
    var close = function () {
      lb.classList.remove('open');
      lb.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('lb-lock');
      if (opener) opener.focus();
    };

    document.addEventListener('click', function (e) {
      var a = e.target.closest('[data-lb]');
      if (!a || e.metaKey || e.ctrlKey) return;
      e.preventDefault();
      open(a);
    });
    lb.querySelector('.lb-close').addEventListener('click', close);
    lb.querySelector('.lb-prev').addEventListener('click', function () { show(idx - 1); });
    lb.querySelector('.lb-next').addEventListener('click', function () { show(idx + 1); });
    lb.addEventListener('click', function (e) { if (e.target === lb) close(); });
    document.addEventListener('keydown', function (e) {
      if (!lb.classList.contains('open')) return;
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowLeft') show(idx - 1);
      else if (e.key === 'ArrowRight') show(idx + 1);
      else if (e.key === 'Tab') {
        // keep focus inside the dialog
        var f = lb.querySelectorAll('button');
        if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f[f.length - 1].focus(); }
        else if (!e.shiftKey && document.activeElement === f[f.length - 1]) { e.preventDefault(); f[0].focus(); }
      }
    });
  }

  /* ── Footer year ───────────────────────────────────────────── */
  document.querySelectorAll('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });

  /* ── Toast helper ──────────────────────────────────────────── */
  function toast(msg) {
    var t = document.createElement('div');
    t.className = 'toast';
    t.textContent = msg;
    document.body.appendChild(t);
    requestAnimationFrame(function () { t.classList.add('show'); });
    setTimeout(function () {
      t.classList.remove('show');
      setTimeout(function () { t.remove(); }, 500);
    }, 4200);
  }

  /* ── Easter egg: the Konami code makes the IAC cats rain ───── */
  var seq = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
  var pos = 0, raining = false;
  document.addEventListener('keydown', function (e) {
    var k = e.key.length === 1 ? e.key.toLowerCase() : e.key;
    pos = (k === seq[pos]) ? pos + 1 : (k === seq[0] ? 1 : 0);
    if (pos === seq.length) { pos = 0; catRain(); }
  });
  function catRain() {
    if (raining) return;
    raining = true;
    var layer = document.createElement('div');
    layer.className = 'rain-layer';
    var n = reduce ? 0 : 24;
    for (var i = 0; i < n; i++) {
      var c = document.createElement('img');
      c.className = 'cat-drop';
      c.src = 'assets/works/mascot/cat-happy-thumb.webp';
      c.alt = '';
      c.style.left = Math.random() * 96 + 'vw';
      c.style.width = (36 + Math.random() * 40) + 'px';
      c.style.animationDuration = (2.2 + Math.random() * 2) + 's';
      c.style.animationDelay = (Math.random() * 1.6) + 's';
      layer.appendChild(c);
    }
    document.body.appendChild(layer);
    toast(getLang() === 'id' ? '🐱  Kamu menemukan kucing-kucing IAC!' : '🐱  You found the IAC cats!');
    setTimeout(function () {
      layer.style.opacity = '0';
      setTimeout(function () { layer.remove(); raining = false; }, 1200);
    }, 7000);
  }

  /* ── Console greeting ──────────────────────────────────────── */
  try {
    console.log('%cNadine Azzadiena Farahdiansyah', 'color:#8b7ef8;font-size:20px;font-weight:bold');
    console.log('%cThanks for peeking 👀  Try the Konami code: ↑ ↑ ↓ ↓ ← → ← → B A\nLet\'s create something → nadine.farahdiansyah@gmail.com', 'color:#22d3ee;font-size:12px');
  } catch (e) {}
})();
