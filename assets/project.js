/* ============================================================
   Case-study renderer for project.html
   Reads the id from the hash (project.html#trashney) or ?id=,
   looks it up in SITE.cs and re-renders on hash/lang change.
   Category pages (mascot, poster, …) get their gallery from SITE.works.
   ============================================================ */
(function () {
  'use strict';
  var SITE = window.SITE;
  var root = document.getElementById('cs');
  if (!SITE || !root) return;

  function L() { return window.getLang ? window.getLang() : 'en'; }
  function t(v) { return v == null ? '' : (typeof v === 'string' ? v : (v[L()] || v.en)); }
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  var UI = {
    back:    { en: 'Back to work', id: 'Kembali ke karya' },
    details: { en: 'Project details', id: 'Detail proyek' },
    contact: { en: 'Get in touch', id: 'Hubungi saya' },
    all:     { en: 'See all work', id: 'Lihat semua karya' },
    next:    { en: 'Next project', id: 'Proyek berikutnya' },
    overview:{ en: 'Overview', id: 'Ringkasan' },
    gallery: { en: 'Gallery', id: 'Galeri' },
    role:    { en: 'Role', id: 'Peran' },
    org:     { en: 'Organization', id: 'Organisasi' },
    tools:   { en: 'Tools', id: 'Tools' },
    pieces:  { en: 'Pieces', id: 'Jumlah karya' },
    gd:      { en: 'Graphic Designer', id: 'Desainer Grafis' },
    missing: { en: 'Case study not found.', id: 'Case study tidak ditemukan.' }
  };
  var ARROW_L = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>';
  var ARROW_R = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>';

  function figure(f, group) {
    var cap = t(f.cap);
    return '<figure class="cs-figure glass">' +
      '<a href="' + f.full + '" data-lb="' + group + '" data-caption="' + esc(cap) + '">' +
      '<img src="' + f.src + '" alt="' + esc(cap) + '" loading="lazy" decoding="async"></a>' +
      (cap ? '<figcaption>' + esc(cap) + '</figcaption>' : '') + '</figure>';
  }
  function workTile(w, group) {
    var title = t(w.title);
    return '<a class="work glass-card" href="' + w.full + '" data-lb="' + group + '" data-caption="' + esc(title) + '" data-meta="' + esc(w.org || '') + '">' +
      '<div class="work-media' + (w.contain ? ' contain' : '') + '"><img src="' + w.thumb + '" width="' + w.tw + '" height="' + w.th + '" alt="' + esc(title) + '" loading="lazy" decoding="async"></div>' +
      '<div class="work-cap"><div class="work-title">' + esc(title) + '</div>' + (w.org ? '<div class="work-meta">' + esc(w.org) + '</div>' : '') + '</div></a>';
  }

  function block(b, group) {
    switch (b.type) {
      case 'p': return '<p>' + t(b.text) + '</p>';
      case 'ul': return '<ul>' + b.items.map(function (i) { return '<li>' + t(i) + '</li>'; }).join('') + '</ul>';
      case 'callout': return '<div class="cs-callout glass">' + t(b.text) + '</div>';
      case 'figure': return figure(b, group);
      case 'pair': return '<div class="cs-pair">' + b.items.map(function (f) { return figure(f, group); }).join('') + '</div>';
      case 'gallery': return '<div class="cs-gallery masonry">' + b.items.map(function (f) {
        var cap = t(f.cap);
        return '<a class="work glass-card" href="' + f.full + '" data-lb="' + group + '" data-caption="' + esc(cap) + '"><div class="work-media"><img src="' + f.src + '" alt="' + esc(cap) + '" loading="lazy" decoding="async"></div><div class="work-cap"><div class="work-title">' + esc(cap) + '</div></div></a>';
      }).join('') + '</div>';
      case 'stats': return '<div class="cs-stats">' + b.items.map(function (s) {
        return '<div class="cs-stat glass"><div class="v">' + s.v + '</div><div class="k">' + esc(t(s.k)) + '</div></div>';
      }).join('') + '</div>';
    }
    return '';
  }

  function render() {
    var params = new URLSearchParams(location.search);
    var id = (location.hash.slice(1) || params.get('id') || 'trashney').toLowerCase();
    var c = SITE.cs[id];
    if (!c) {
      root.innerHTML = '<div class="cs-missing glass"><p>' + esc(t(UI.missing)) + '</p><p style="margin-top:1rem"><a class="btn btn-primary" href="index.html#work">' + esc(t(UI.all)) + '</a></p></div>';
      return;
    }
    var title = t(c.title);
    document.title = title + ' — Nadine Azzadiena Farahdiansyah';
    var group = 'cs-' + id;
    var works = SITE.works.filter(function (w) { return w.cat === id; });

    var meta = c.meta || [
      [UI.role, UI.gd],
      [UI.org, c.org],
      [UI.tools, c.tools],
      [UI.pieces, String(works.length)]
    ];
    var sections = c.sections || [
      { h: UI.overview, blocks: [{ type: 'p', text: c.body }] },
      { h: UI.gallery, raw: '<div class="cs-gallery masonry">' + works.map(function (w) { return workTile(w, group); }).join('') + '</div>' }
    ];

    var i = SITE.order.indexOf(id);
    var nextId = SITE.order[(i + 1) % SITE.order.length];
    var next = SITE.cs[nextId];

    root.innerHTML =
      '<a class="breadcrumb" href="index.html#work">' + ARROW_L + '<span>' + esc(t(UI.back)) + '</span></a>' +
      '<header class="cs-hero">' +
        '<div class="cs-hero-bg ' + c.theme + '"></div>' +
        (c.art ? '<img class="cs-hero-art' + (c.artCard === false ? '' : ' card') + '" src="' + c.art + '" alt="" aria-hidden="true">' : '') +
        '<div class="cs-hero-inner">' +
          '<div class="cs-kicker">' + esc(t(c.kicker)) + '</div>' +
          '<h1 class="cs-title">' + esc(title) + '</h1>' +
          '<p class="cs-tagline">' + esc(t(c.tagline)) + '</p>' +
        '</div>' +
      '</header>' +
      '<div class="cs-layout">' +
        '<article class="cs-body">' + sections.map(function (s) {
          return '<h2>' + esc(t(s.h)) + '</h2>' + (s.raw || s.blocks.map(function (b) { return block(b, group); }).join(''));
        }).join('') + '</article>' +
        '<aside class="cs-side">' +
          '<div class="panel glass"><div class="panel-title">' + esc(t(UI.details)) + '</div>' +
            meta.map(function (m) {
              return '<div class="meta-row"><span class="meta-k">' + esc(t(m[0])) + '</span><span class="meta-v">' + esc(t(m[1])) + '</span></div>';
            }).join('') +
          '</div>' +
          '<div><a class="btn btn-primary" href="mailto:nadine.farahdiansyah@gmail.com">' + esc(t(UI.contact)) + '</a>' +
          '<a class="btn btn-ghost" href="index.html#work">' + esc(t(UI.all)) + '</a></div>' +
        '</aside>' +
      '</div>' +
      '<a class="cs-next glass-card" href="project.html#' + nextId + '">' +
        '<span><span class="label">' + esc(t(UI.next)) + '</span><br><span class="name">' + esc(t(next.title)) + '</span></span>' +
        '<span class="plink"><span>' + esc(t(next.kicker)) + '</span>' + ARROW_R + '</span>' +
      '</a>';
  }

  render();
  window.addEventListener('hashchange', function () { render(); window.scrollTo(0, 0); });
  document.addEventListener('langchange', render);
})();
