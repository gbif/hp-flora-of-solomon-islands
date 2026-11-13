/*
 * Flora of Solomon Islands: small behaviours for the designed pages.
 *   1. Navbar: mark the current menu item; make the menu button keyboard-operable.
 *   2. Home hero: specimen box rotation and its one-line name rule.
 *   3. Home hero: "Table 1. Dataset summary" figures, fetched from the GBIF API.
 * Loaded with `defer` from _includes/head.html. No dependencies.
 */
(function () {
  'use strict';

  var GBIF_API = 'https://api.gbif.org/v1';

  /* ---------- 1. Navbar ---------- */

  // The theme only marks dropdown items, so the top-level items are matched here.
  // A link matches when its path is the current path and all of its query
  // parameters are in the current URL; the most specific match wins.
  // With no match, a section link that the current path sits under is marked instead.
  function markCurrentNavItem() {
    var here = new URL(window.location.href);
    var best = null;
    var bestScore = -1;
    var items = document.querySelectorAll('.navbar-start a.navbar-top-item[href]');
    items.forEach(function (a) {
      a.classList.remove('is-active');
      a.removeAttribute('aria-current');
      var link = new URL(a.href, here);
      if (link.origin !== here.origin) return;
      if (link.pathname.replace(/\/$/, '') !== here.pathname.replace(/\/$/, '')) return;
      var score = 0;
      var matches = true;
      link.searchParams.forEach(function (value, key) {
        if (key === 'view') return; // which tab is open does not change what is shown
        if (here.searchParams.getAll(key).indexOf(value) === -1) matches = false;
        score += 1;
      });
      if (matches && score > bestScore) {
        best = a;
        bestScore = score;
      }
    });
    if (best) {
      best.classList.add('is-active');
      best.setAttribute('aria-current', 'page');
      return;
    }
    // A section link (path ending in "/", no query, such as /publications/) is also
    // current on the pages below it, such as a post at /publications/<slug>/.
    items.forEach(function (a) {
      if (best) return;
      var link = new URL(a.href, here);
      if (link.origin !== here.origin || link.search) return;
      if (!/\/$/.test(link.pathname) || link.pathname === '/') return;
      if (here.pathname.indexOf(link.pathname) === 0) best = a;
    });
    if (best) {
      best.classList.add('is-active');
      best.setAttribute('aria-current', 'true');
    }
  }

  // The theme's menu button is an <a> with no href, which the Tab key skips.
  function makeBurgerOperable() {
    var burger = document.getElementById('navbarBurger');
    if (!burger) return;
    burger.setAttribute('tabindex', '0');
    burger.addEventListener('keydown', function (event) {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        burger.click();
      }
    });
  }

  /* ---------- 2. Specimen box ---------- */

  var ROTATE_MS = 6000;
  var ICON_PAUSE = '<svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M4.5 3v8M9.5 3v8" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"></path></svg>';
  var ICON_PLAY = '<svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M4.5 2.8l6 4.2-6 4.2z" fill="currentColor"></path></svg>';

  function initSpecimenBox(box) {
    var caption = box.querySelector('[data-fsi-caption]');
    var controls = box.querySelector('[data-fsi-controls]');
    var nameEl = box.querySelector('.fsi-specimens__name');
    var metaEl = box.querySelector('.fsi-specimens__meta');
    if (!caption || !controls || !nameEl || !metaEl) return;

    // Name rule: the caption is one line and the box never changes height.
    // Characters that fit = (box width - 160) / 7.8, which is 37 at 450 px.
    // Show the name with authorship if it fits, else the name alone,
    // else leave the specimen out of the rotation.
    var maxChars = Math.floor((box.clientWidth - 160) / 7.8);
    var slides = [];
    box.querySelectorAll('.fsi-specimens__slide').forEach(function (img) {
      var name = img.dataset.name || '';
      var authorship = img.dataset.authorship || '';
      var full = authorship ? name + ' ' + authorship : name;
      if (name.length > maxChars) {
        img.hidden = true;
        return;
      }
      slides.push({
        img: img,
        name: name,
        authorship: full.length <= maxChars ? authorship : '',
        full: full,
        family: img.dataset.family || '',
        id: img.dataset.id || ''
      });
    });
    if (!slides.length) return;

    var current = 0;
    var paused = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var held = false; // hover or keyboard focus inside the box
    var dots = [];
    var toggle = null;

    function show(index) {
      current = index;
      slides.forEach(function (slide, n) {
        var on = n === index;
        slide.img.classList.toggle('is-current', on);
        slide.img.setAttribute('aria-hidden', on ? 'false' : 'true');
        if (dots[n]) dots[n].setAttribute('aria-pressed', on ? 'true' : 'false');
      });
      var slide = slides[index];
      nameEl.title = slide.full;
      nameEl.textContent = '';
      var italic = document.createElement('i');
      italic.textContent = slide.name;
      nameEl.appendChild(italic);
      if (slide.authorship) nameEl.appendChild(document.createTextNode(' ' + slide.authorship));
      metaEl.textContent = slide.family + ', ';
      var code = document.createElement('span');
      code.className = 'fsi-code';
      code.textContent = slide.id;
      metaEl.appendChild(code);
    }

    function setPaused(value) {
      paused = value;
      // Announce a change only when the reader chose it, not on every rotation.
      caption.setAttribute('aria-live', paused ? 'polite' : 'off');
      if (toggle) {
        toggle.innerHTML = paused ? ICON_PLAY : ICON_PAUSE;
        toggle.setAttribute('aria-label', paused ? box.dataset.labelPlay : box.dataset.labelPause);
      }
    }

    if (slides.length > 1) {
      slides.forEach(function (slide, n) {
        var dot = document.createElement('button');
        dot.type = 'button';
        dot.className = 'fsi-specimens__dot';
        dot.setAttribute('aria-label', (box.dataset.labelShow || '').replace('{n}', n + 1).replace('{total}', slides.length));
        dot.appendChild(document.createElement('span'));
        dot.addEventListener('click', function () { show(n); });
        controls.appendChild(dot);
        dots.push(dot);
      });
      toggle = document.createElement('button');
      toggle.type = 'button';
      toggle.className = 'fsi-specimens__toggle';
      toggle.addEventListener('click', function () { setPaused(!paused); });
      controls.appendChild(toggle);
      controls.hidden = false;

      box.addEventListener('mouseenter', function () { held = true; });
      box.addEventListener('mouseleave', function () { held = false; });
      box.addEventListener('focusin', function () { held = true; });
      box.addEventListener('focusout', function (event) {
        if (!box.contains(event.relatedTarget)) held = false;
      });

      window.setInterval(function () {
        if (!paused && !held && !document.hidden) show((current + 1) % slides.length);
      }, ROTATE_MS);
    }

    setPaused(paused);
    show(0);
  }

  /* ---------- 3. Table 1: live figures ---------- */

  // One request: images (records with a StillImage), species and the year range.
  // If anything is missing the dated fallback text in the page stays as it is.
  function loadSummary(table) {
    var keys = typeof DATASET_KEYS !== 'undefined' ? DATASET_KEYS : []; // from _includes/js/config.js
    var recordsEl = table.querySelector('[data-fsi-records]');
    var collectedEl = table.querySelector('[data-fsi-collected]');
    if (!keys.length || !recordsEl || !collectedEl || !window.fetch) return;

    var FACET_LIMIT = 5000;
    var params = new URLSearchParams({ limit: '0' });
    keys.forEach(function (key) { params.append('datasetKey', key); });
    ['mediaType', 'speciesKey', 'year'].forEach(function (facet) {
      params.append('facet', facet);
      params.append(facet + '.facetLimit', String(FACET_LIMIT));
    });

    fetch(GBIF_API + '/occurrence/search?' + params.toString())
      .then(function (response) {
        if (!response.ok) throw new Error('GBIF API ' + response.status);
        return response.json();
      })
      .then(function (data) {
        var facets = {};
        (data.facets || []).forEach(function (facet) { facets[facet.field] = facet.counts || []; });
        var media = (facets.MEDIA_TYPE || []).filter(function (c) { return c.name === 'StillImage'; })[0];
        var species = facets.SPECIES_KEY || [];
        var years = (facets.YEAR || []).map(function (c) { return parseInt(c.name, 10); }).filter(isFinite);
        if (!media || !species.length || species.length >= FACET_LIMIT || !years.length) return;

        var locale = document.documentElement.lang || 'en';
        recordsEl.textContent = recordsEl.dataset.template
          .replace('{images}', media.count.toLocaleString(locale))
          .replace('{species}', species.length.toLocaleString(locale));
        collectedEl.textContent = collectedEl.dataset.template
          .replace('{from}', Math.min.apply(null, years))
          .replace('{to}', Math.max.apply(null, years));
        var asOf = table.querySelector('[data-fsi-asof]');
        if (asOf) asOf.remove(); // the figures are now live
      })
      .catch(function () { /* keep the fallback */ });
  }

  /* ---------- Start ---------- */

  markCurrentNavItem();
  window.addEventListener('gbifUrlChange', markCurrentNavItem); // widgets change the URL without a page load
  window.addEventListener('popstate', markCurrentNavItem);
  makeBurgerOperable();

  var box = document.querySelector('[data-fsi-specimens]');
  if (box) initSpecimenBox(box);

  var summary = document.querySelector('[data-fsi-summary]');
  if (summary) loadSummary(summary);
})();
