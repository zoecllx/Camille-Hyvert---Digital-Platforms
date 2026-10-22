/* Digital Platforms Test Drive — app logic (no dependencies).
   Routing is hash-based: #welcome, #objectives, #schedule, #readings, #game, #play, #results, #locked */
(function () {
  'use strict';

  var C = window.COURSE;
  var state = { readTab: 'prof', readSession: 1, hubSession: 1, lockedN: 3, game: null };

  var $ = function (id) { return document.getElementById(id); };
  var pad = function (n) { return (n < 10 ? '0' : '') + n; };
  function el(tag, attrs, children) {
    var node = document.createElement(tag);
    Object.keys(attrs || {}).forEach(function (k) {
      if (k === 'text') node.textContent = attrs[k];
      else if (k === 'class') node.className = attrs[k];
      else if (k === 'on') Object.keys(attrs.on).forEach(function (ev) { node.addEventListener(ev, attrs.on[ev]); });
      else node.setAttribute(k, attrs[k]);
    });
    (children || []).forEach(function (c) { if (c) node.appendChild(c); });
    return node;
  }
  function clear(node) { while (node.firstChild) node.removeChild(node.firstChild); }

  /* ---------- Static sections ---------- */
  function renderObjectives() {
    var list = $('objectives-list'); clear(list);
    C.objectives.forEach(function (o, i) {
      list.appendChild(el('li', {}, [
        el('span', { class: 'num', text: String(i + 1) }),
        el('div', {}, [el('div', { class: 'item-title', text: o.title }), el('div', { class: 'item-text', text: o.text })])
      ]));
    });
    var gl = $('glance'); clear(gl);
    C.glance.forEach(function (g) { gl.appendChild(el('div', {}, [el('dt', { text: g[0] }), el('dd', { text: g[1] })])); });
  }

  function renderSchedule() {
    var body = $('schedule-body'); clear(body);
    C.sessions.forEach(function (s) {
      body.appendChild(el('tr', {}, [
        el('td', { class: 's-n', text: pad(s.n) }),
        el('td', { text: s.date }),
        el('td', { class: 's-topic', text: s.title }),
        el('td', {}, [el('span', { class: 'tag' + (s.format.indexOf('Guest') !== -1 ? ' tag-peach' : ''), text: s.format })]),
        el('td', { text: s.speaker }),
        el('td', {}, [el('button', { type: 'button', class: 'btn btn-secondary btn-sm', text: s.open ? 'Play' : 'Locked', on: { click: function () { openSessionGame(s.n); } } })])
      ]));
    });
  }

  /* ---------- Readings ---------- */
  function renderReadings() {
    var typeTabs = $('read-type-tabs'); clear(typeTabs);
    [['prof', "Professor's lectures"], ['guest', 'Guest lectures']].forEach(function (t) {
      typeTabs.appendChild(el('button', {
        type: 'button', role: 'tab', 'aria-selected': String(state.readTab === t[0]), text: t[1],
        on: { click: function () { state.readTab = t[0]; renderReadings(); } }
      }));
    });
    var sTabs = $('read-session-tabs'); clear(sTabs);
    C.sessions.forEach(function (s) {
      sTabs.appendChild(el('button', {
        type: 'button', role: 'tab', 'aria-selected': String(state.readSession === s.n), text: 'Session ' + pad(s.n),
        on: { click: function () { state.readSession = s.n; renderReadings(); } }
      }));
    });
    var session = C.sessions[state.readSession - 1];
    var isProf = state.readTab === 'prof';
    $('read-heading').textContent = (isProf ? "Professor's lectures" : 'Guest lectures') + ' · Session ' + pad(state.readSession);
    $('read-title').textContent = session.title;
    var items = (C.readings[state.readTab] || {})[state.readSession] || [];
    var list = $('reading-list'); clear(list);
    items.forEach(function (r) {
      list.appendChild(el('li', {}, [
        el('span', { class: 'tag tag-peach', text: r.kind }),
        el('div', { class: 'r-body' }, [el('div', { class: 'r-title', text: r.title }), el('div', { class: 'r-meta', text: r.meta })]),
        el('a', { class: 'btn btn-secondary', href: r.url || '#', target: r.url && r.url !== '#' ? '_blank' : '_self', rel: 'noopener', text: r.action || 'Open' })
      ]));
    });
    list.hidden = items.length === 0;
    var empty = $('reading-empty');
    empty.hidden = items.length > 0;
    empty.textContent = isProf ? 'This session is a guest lecture — see the Guest lectures tab.' : 'No guest lecture in this session.';
  }

  /* ---------- Game hub ---------- */
  function openSessionGame(n) {
    var s = C.sessions[n - 1];
    if (s.open) { state.hubSession = n; go('game'); }
    else { state.lockedN = n; go('locked'); }
  }

  function renderHub() {
    var tabs = $('hub-tabs'); clear(tabs);
    C.sessions.forEach(function (s) {
      tabs.appendChild(el('button', {
        type: 'button', role: 'tab', class: s.open ? '' : 'is-locked',
        'aria-selected': String(state.hubSession === s.n),
        text: 'Session ' + pad(s.n) + (s.open ? '' : ' · locked'),
        on: { click: function () { openSessionGame(s.n); } }
      }));
    });
    var s = C.sessions[state.hubSession - 1];
    var game = C.games[s.n];
    $('hub-eyebrow').textContent = 'Session ' + s.n + ' · Game';
    $('hub-title').textContent = s.title;
    $('hub-desc').textContent = s.summary;
    var facts = $('hub-facts'); clear(facts);
    [['Date', s.date], ['Speaker', s.speaker], ['Rounds', game ? String(game.rounds.length) : '[–]'], ['Max score', game ? game.maxScore + ' pts' : '[–]']]
      .forEach(function (f) { facts.appendChild(el('div', {}, [el('dt', { text: f[0] }), el('dd', { text: f[1] })])); });

    $('hub-rounds-panel').hidden = !game;
    $('hub-empty').hidden = !!game;
    $('hub-empty').textContent = '[Session ' + s.n + ' game rounds to be added]';
    if (!game) return;
    var rounds = $('hub-rounds'); clear(rounds);
    game.rounds.forEach(function (r, i) {
      rounds.appendChild(el('li', {}, [
        el('span', { class: 'num', text: pad(i + 1) }),
        el('div', {}, [el('div', { class: 'item-title', text: r.name }), el('div', { class: 'item-text', text: r.desc })]),
        el('span', { class: 'r-meta', text: r.count + (r.count > 1 ? ' questions' : ' question') + ' · ' + r.points + (r.points > 1 ? ' pts' : ' pt') })
      ]));
    });
  }

  /* ---------- Playing ---------- */
  // Fisher–Yates shuffle on a copy, so each play gets a new question order
  function shuffle(list) {
    var copy = list.slice();
    for (var i = copy.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = copy[i]; copy[i] = copy[j]; copy[j] = tmp;
    }
    return copy;
  }

  // Lowercase and strip punctuation, so "A.I. Visibility!" matches "ai visibility"
  function normalise(text) {
    return text.toLowerCase().replace(/[^a-z0-9 ]/g, '').replace(/\s+/g, ' ').trim();
  }

  function startGame() {
    var game = C.games[state.hubSession];
    var queue = [];
    game.rounds.forEach(function (r, ri) {
      shuffle(r.questions).forEach(function (q) { queue.push({ q: q, round: ri, points: r.points }); });
    });
    state.game = { def: game, queue: queue, i: 0, score: 0, perRound: game.rounds.map(function () { return 0; }), answered: false };
  }

  function renderQuestion() {
    var g = state.game;
    if (!g || !g.queue.length) { go('game'); return; }
    var item = g.queue[g.i], q = item.q, round = g.def.rounds[item.round];
    $('q-round').textContent = 'Round ' + (item.round + 1) + ' · ' + round.name;
    $('q-count').textContent = 'Question ' + (g.i + 1) + ' of ' + g.queue.length;
    $('q-title').textContent = q.title;
    $('q-prompt').textContent = q.prompt;
    $('q-score').textContent = g.score + ' / ' + g.def.maxScore;
    var pct = Math.round((g.i / g.queue.length) * 100);
    $('q-progress-fill').style.width = pct + '%';
    $('q-progress').setAttribute('aria-valuemax', String(g.queue.length));
    $('q-progress').setAttribute('aria-valuenow', String(g.i));

    var answers = $('q-answers'); clear(answers);
    $('q-feedback').hidden = true;
    $('q-footer').hidden = true;
    g.answered = false;

    // Typed answer (bonus questions): a form with a text field
    if (q.accept) {
      var input = el('input', { type: 'text', id: 'q-text', class: 'text-input', autocomplete: 'off', spellcheck: 'false' });
      var form = el('form', { class: 'text-answer', novalidate: '' , on: { submit: function (e) {
        e.preventDefault();
        if (!input.value.trim()) { input.focus(); return; }
        var guess = normalise(input.value);
        var ok = q.accept.some(function (a) { return guess === normalise(a) || guess.indexOf(normalise(a)) !== -1; });
        input.disabled = true;
        form.querySelector('button').disabled = true;
        answer(input.value, ok);
      } } }, [
        el('label', { for: 'q-text', class: 'small strong', text: 'Your answer' }),
        el('div', { class: 'text-row' }, [input, el('button', { type: 'submit', class: 'btn btn-primary', text: 'Check' })])
      ]);
      answers.appendChild(form);
      return;
    }

    q.options.forEach(function (opt) {
      answers.appendChild(el('button', { type: 'button', class: 'answer', text: opt, on: { click: function () { answer(opt); } } }));
    });
  }

  // `ok` is passed in for typed answers; for buttons it is worked out here
  function answer(opt, ok) {
    var g = state.game;
    if (g.answered) return;
    g.answered = true;
    var item = g.queue[g.i], q = item.q;
    if (ok === undefined) ok = opt === q.answer;
    if (ok) { g.score += item.points; g.perRound[item.round] += item.points; }
    Array.prototype.forEach.call($('q-answers').querySelectorAll('.answer'), function (b) {
      b.disabled = true;
      if (b.textContent === q.answer) b.classList.add('is-correct');
      else if (b.textContent === opt) b.classList.add('is-wrong');
      else b.classList.add('is-dim');
    });
    var fb = $('q-feedback'); clear(fb);
    fb.className = 'feedback ' + (ok ? 'ok' : 'bad');
    fb.appendChild(el('p', { class: 'fb-title', text: ok ? 'Correct · +' + item.points + (item.points > 1 ? ' points' : ' point') : 'Not quite · the answer is ' + q.answer }));
    if (q.explain) fb.appendChild(el('p', { class: 'fb-text', text: q.explain }));
    fb.hidden = false;
    $('q-score').textContent = g.score + ' / ' + g.def.maxScore;
    $('q-next').textContent = g.i + 1 < g.queue.length ? 'Next question' : 'See results';
    $('q-footer').hidden = false;
    $('q-next').focus();
  }

  function next() {
    var g = state.game;
    if (g.i + 1 < g.queue.length) { g.i++; renderQuestion(); }
    else go('results');
  }

  function renderResults() {
    var g = state.game;
    if (!g) { go('game'); return; }
    var max = g.def.maxScore;
    // Scale the score to the questions actually available while content is incomplete
    var possible = g.queue.reduce(function (s, it) { return s + it.points; }, 0) || 1;
    var pct = Math.round((g.score / possible) * 100);
    var badge = g.def.badges.filter(function (b) { return pct >= b.min; })[0];
    $('ring-num').textContent = String(g.score);
    $('ring-sub').textContent = 'of ' + max + ' pts';
    $('ring').setAttribute('aria-label', 'Score ' + g.score + ' of ' + max);
    $('ring-arc').setAttribute('stroke-dasharray', (377 * g.score / max).toFixed(1) + ' 377');
    $('r-kicker').textContent = 'Session complete · ' + pct + '%';
    $('r-badge').textContent = badge.name;
    $('r-message').textContent = badge.message;
    $('r-takeaway').textContent = g.def.takeaway;
    var table = $('r-table'); clear(table);
    g.def.rounds.forEach(function (r, i) {
      table.appendChild(el('tr', {}, [el('td', { text: pad(i + 1) + ' · ' + r.name }), el('td', { text: g.perRound[i] + ' / ' + (r.count * r.points) })]));
    });
    table.appendChild(el('tr', { class: 'total' }, [el('td', { text: 'Total' }), el('td', { text: g.score + ' / ' + max })]));
  }

  /* ---------- Router ---------- */
  var navFor = { welcome: 'welcome', objectives: 'objectives', schedule: 'schedule', readings: 'readings', game: 'game', play: 'game', results: 'game', locked: 'game' };

  function go(page) { if (location.hash !== '#' + page) location.hash = page; else route(); }

  function route() {
    var page = (location.hash || '#welcome').slice(1);
    if (!navFor[page]) page = 'welcome';
    if (page === 'play') { startGame(); renderQuestion(); }
    if (page === 'results') renderResults();
    if (page === 'game') renderHub();
    if (page === 'readings') renderReadings();
    if (page === 'locked') $('locked-n').textContent = 'Session ' + pad(state.lockedN);

    Array.prototype.forEach.call(document.querySelectorAll('.page'), function (p) { p.hidden = p.getAttribute('data-page') !== page; });
    Array.prototype.forEach.call(document.querySelectorAll('[data-nav]'), function (a) {
      if (a.getAttribute('data-nav') === navFor[page]) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
    });
    window.scrollTo(0, 0);
  }

  $('q-next').addEventListener('click', next);
  window.addEventListener('hashchange', route);
  renderObjectives();
  renderSchedule();
  route();
})();
