/* Digital Platforms Test Drive — app logic (no dependencies).
   Routes: #welcome · #objectives · #schedule · #readings/prof|guest · #game/<n> · #play · #results · #locked/<n> */
(function () {
  'use strict';

  var C = window.COURSE;
  var state = { readTab: 'prof', readSession: 1, hubSession: 1, game: null, sound: true };
  try { state.sound = localStorage.getItem('dp-sound') !== 'off'; } catch (e) {}

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
    (children || []).forEach(function (c) { if (c) node.appendChild(typeof c === 'string' ? document.createTextNode(c) : c); });
    return node;
  }
  function clear(node) { while (node.firstChild) node.removeChild(node.firstChild); }
  function shuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Dropdown menu ---------- */
  var menuBtn = $('menu-btn'), menuPanel = $('menu-panel');
  function buildMenu() {
    clear(menuPanel);
    function group(title, items) {
      var g = el('div', { class: 'menu-group' }, [el('p', { class: 'menu-title', text: title })]);
      items.forEach(function (it) {
        g.appendChild(el('a', { href: it[0], class: 'menu-item' + (it[2] ? ' is-locked' : ''), 'data-route': it[0] }, [
          el('span', { text: it[1] }), it[2] ? el('span', { class: 'menu-note', text: 'Locked' }) : null
        ]));
      });
      menuPanel.appendChild(g);
    }
    group('The course', [['#welcome', 'Welcome'], ['#objectives', 'Objectives'], ['#schedule', 'Schedule']]);
    group('Readings', [['#readings/prof', "Professor's lectures"], ['#readings/guest', 'Guest lectures']]);
    group('Game Hub', C.sessions.map(function (s) { return [s.open ? '#game/' + s.n : '#locked/' + s.n, 'Session ' + pad(s.n) + ' · ' + s.title, !s.open]; }));
  }
  function setMenu(open) {
    menuPanel.hidden = !open;
    menuBtn.setAttribute('aria-expanded', String(open));
    if (open) { var cur = menuPanel.querySelector('[aria-current="page"]') || menuPanel.querySelector('a'); if (cur) cur.focus(); }
  }
  menuBtn.addEventListener('click', function (e) { e.stopPropagation(); setMenu(menuPanel.hidden); });
  menuPanel.addEventListener('click', function (e) { if (e.target.closest('a')) setMenu(false); });
  document.addEventListener('click', function (e) { if (!menuPanel.hidden && !e.target.closest('.menu-wrap')) setMenu(false); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !menuPanel.hidden) { setMenu(false); menuBtn.focus(); } });

  /* ---------- Static sections ---------- */
  function renderObjectives() {
    var roman = ['i.', 'ii.', 'iii.', 'iv.', 'v.', 'vi.', 'vii.', 'viii.'];
    var list = $('objectives-list'); clear(list);
    C.objectives.forEach(function (o, i) {
      list.appendChild(el('li', {}, [
        el('span', { class: 'numeral', text: roman[i] || (i + 1) + '.' }),
        el('div', {}, [el('div', { class: 'item-title', text: o.title }), el('div', { class: 'item-text', text: o.text })])
      ]));
    });
    var gl = $('glance'); clear(gl);
    C.glance.forEach(function (g) { gl.appendChild(el('div', {}, [el('dt', { text: g[0] }), el('dd', { text: g[1] })])); });
  }

  function renderSchedule() {
    var swatches = ['#FFBE98', '#F7A986', '#F4C6BD', '#E9A3A0', '#E8B79F'];
    var body = $('schedule-body'); clear(body);
    C.sessions.forEach(function (s, i) {
      var dot = el('span', { class: 'dot', 'aria-hidden': 'true' });
      dot.style.background = swatches[i % swatches.length];
      body.appendChild(el('tr', {}, [
        el('td', {}, [el('span', { class: 's-n' }, [dot, el('span', { text: pad(s.n) })])]),
        el('td', { text: s.date }),
        el('td', { class: 's-topic', text: s.title }),
        el('td', {}, [el('span', { class: 'tag' + (s.format.indexOf('Guest') !== -1 ? ' tag-peach' : ''), text: s.format })]),
        el('td', { text: s.speaker }),
        el('td', {}, [el('a', { class: 'btn btn-sm ' + (s.open ? 'btn-secondary' : 'btn-ghost'), href: s.open ? '#game/' + s.n : '#locked/' + s.n, text: s.open ? 'Play' : 'Locked' })])
      ]));
    });
  }

  /* ---------- Readings ---------- */
  function renderReadings() {
    var isProf = state.readTab === 'prof';
    $('read-eyebrow').textContent = 'Readings';
    var t = $('read-type-title'); clear(t);
    t.appendChild(document.createTextNode(isProf ? "Professor's " : 'Guest '));
    t.appendChild(el('em', { text: 'lectures' }));
    var sTabs = $('read-session-tabs'); clear(sTabs);
    C.sessions.forEach(function (s) {
      sTabs.appendChild(el('button', {
        type: 'button', role: 'tab', 'aria-selected': String(state.readSession === s.n), text: 'Session ' + pad(s.n),
        on: { click: function () { state.readSession = s.n; renderReadings(); } }
      }));
    });
    var session = C.sessions[state.readSession - 1];
    $('read-heading').textContent = (isProf ? "Professor's lectures" : 'Guest lectures') + ' · Session ' + pad(state.readSession);
    $('read-title').textContent = session.title;
    var items = (C.readings[state.readTab] || {})[state.readSession] || [];
    var list = $('reading-list'); clear(list);
    items.forEach(function (r) {
      list.appendChild(el('li', {}, [
        el('span', { class: 'r-kind', text: r.kind }),
        el('div', { class: 'r-body' }, [el('div', { class: 'r-title', text: r.title }), el('div', { class: 'r-meta', text: r.meta })]),
        el('a', { class: 'btn btn-secondary', href: r.url || '#', target: r.url && r.url !== '#' ? '_blank' : '_self', rel: 'noopener', text: r.action || 'Open' })
      ]));
    });
    list.hidden = items.length === 0;
    var empty = $('reading-empty');
    empty.hidden = items.length > 0;
    empty.textContent = isProf ? 'This session is a guest lecture — see Guest lectures in the menu.' : 'No guest lecture in this session.';
  }

  /* ---------- Game hub ---------- */
  function playable(game) { return game.rounds.filter(function (r) { return r.questions.length > 0; }); }
  function maxScore(game) { return playable(game).reduce(function (s, r) { return s + r.questions.length * r.points; }, 0); }

  function renderHub() {
    var s = C.sessions[state.hubSession - 1];
    var game = C.games[s.n];
    $('hub-eyebrow').textContent = 'Session ' + s.n + ' · The game';
    $('hub-title').textContent = s.title;
    $('hub-desc').textContent = s.summary;
    var facts = $('hub-facts'); clear(facts);
    [['Date', s.date], ['Speaker', s.speaker], ['Rounds', game ? String(game.rounds.length) : '[–]'], ['Max score', game ? maxScore(game) + ' pts' : '[–]']]
      .forEach(function (f) { facts.appendChild(el('div', {}, [el('dt', { text: f[0] }), el('dd', { text: f[1] })])); });
    $('hub-rounds-panel').hidden = !game;
    $('hub-empty').hidden = !!game;
    $('hub-empty').textContent = '[Session ' + s.n + ' game rounds to be added]';
    if (!game) return;
    var words = ['One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight'];
    var rt = $('hub-rounds-title'); clear(rt);
    rt.appendChild(document.createTextNode((words[game.rounds.length - 1] || game.rounds.length) + ' rounds, '));
    rt.appendChild(el('em', { text: 'one clock' }));
    var rounds = $('hub-rounds'); clear(rounds);
    var typeLabel = { choice: 'Multiple choice', oldai: 'Swipe: old or AI', higherlower: 'Higher or lower' };
    game.rounds.forEach(function (r, i) {
      var n = r.questions.length;
      rounds.appendChild(el('li', {}, [
        el('span', { class: 'numeral', text: pad(i + 1) }),
        el('div', {}, [el('div', { class: 'item-title', text: r.name }), el('div', { class: 'item-text', text: r.desc + ' · ' + typeLabel[r.type] })]),
        el('span', { class: 'r-meta', text: n ? n + (n > 1 ? ' questions' : ' question') + ' · ' + r.points + (r.points > 1 ? ' pts' : ' pt') : 'Coming soon' })
      ]));
    });
  }

  /* ---------- Sound (Web Audio, no files) ---------- */
  var audio = null;
  function tone(freqs, dur) {
    if (!state.sound) return;
    try {
      audio = audio || new (window.AudioContext || window.webkitAudioContext)();
      freqs.forEach(function (f, i) {
        var o = audio.createOscillator(), g = audio.createGain(), t = audio.currentTime + i * 0.09;
        o.type = 'sine'; o.frequency.value = f;
        g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.12, t + 0.02); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
        o.connect(g); g.connect(audio.destination); o.start(t); o.stop(t + dur + 0.05);
      });
    } catch (e) {}
  }
  var sfx = {
    good: function () { tone([660, 880], 0.25); },
    streak: function () { tone([660, 880, 1175], 0.28); },
    bad: function () { tone([220, 180], 0.3); },
    tick: function () { tone([1000], 0.06); },
    win: function () { tone([523, 659, 784, 1047], 0.4); }
  };
  function renderSound() {
    var b = $('sound-btn');
    b.setAttribute('aria-pressed', String(state.sound));
    b.setAttribute('aria-label', state.sound ? 'Sound on' : 'Sound off');
    b.classList.toggle('is-muted', !state.sound);
  }
  $('sound-btn').addEventListener('click', function () {
    state.sound = !state.sound;
    try { localStorage.setItem('dp-sound', state.sound ? 'on' : 'off'); } catch (e) {}
    renderSound();
  });

  /* ---------- Playing ---------- */
  var timerId = null;
  function stopTimer() { if (timerId) { clearInterval(timerId); timerId = null; } }

  function startGame() {
    stopTimer();
    var def = C.games[state.hubSession];
    var rounds = def.rounds.map(function (r, ri) { return { def: r, ri: ri, qs: shuffle(r.questions) }; }).filter(function (r) { return r.qs.length; });
    var total = rounds.reduce(function (s, r) { return s + r.qs.length; }, 0);
    state.game = {
      def: def, rounds: rounds, r: 0, q: 0, n: 0, total: total, max: maxScore(def),
      score: 0, perRound: def.rounds.map(function () { return 0; }), streak: 0, best: 0, correct: 0,
      results: [], answered: false, timeLeft: 0, started: 0, times: []
    };
    renderDots(); renderHud(); showRoundIntro();
  }

  function cur() { var g = state.game; var r = g.rounds[g.r]; return { g: g, round: r, def: r.def, q: r.qs[g.q] }; }

  function renderHud() {
    var g = state.game, c = cur();
    $('hud-round').textContent = 'Round ' + (c.round.ri + 1) + ' · ' + c.def.name;
    $('hud-score').textContent = g.score + ' / ' + g.max;
    var st = $('hud-streak');
    st.hidden = g.streak < 2;
    $('hud-streak-n').textContent = 'Streak ×' + g.streak;
  }
  function renderDots() {
    var g = state.game, d = $('dots'); clear(d);
    for (var i = 0; i < g.total; i++) {
      var cls = 'dot-q';
      if (g.results[i] === true) cls += ' is-good'; else if (g.results[i] === false) cls += ' is-bad'; else if (i === g.n) cls += ' is-now';
      d.appendChild(el('span', { class: cls }));
    }
  }

  function showRoundIntro() {
    var c = cur();
    $('stage').hidden = true;
    $('round-intro').hidden = false;
    $('round-intro').classList.remove('enter'); void $('round-intro').offsetWidth; $('round-intro').classList.add('enter');
    $('ri-n').textContent = 'Round ' + (c.round.ri + 1) + ' of ' + c.g.def.rounds.length;
    $('ri-name').textContent = c.def.name;
    $('ri-how').textContent = c.def.how;
    $('ri-meta').textContent = c.round.qs.length + (c.round.qs.length > 1 ? ' questions' : ' question') + ' · ' + c.def.points + (c.def.points > 1 ? ' pts each' : ' pt each') + ' · ' + c.g.def.secondsPerQuestion + 's per question';
    $('ri-go').focus();
  }
  $('ri-go').addEventListener('click', function () { $('round-intro').hidden = true; showQuestion(); });

  function showQuestion() {
    var c = cur(), g = c.g, q = c.q, area = $('q-area');
    var stage = $('stage');
    stage.hidden = false;
    stage.classList.remove('enter', 'shake'); void stage.offsetWidth; stage.classList.add('enter');
    $('q-feedback').hidden = true; $('q-footer').hidden = true; clear($('fx'));
    g.answered = false;
    $('q-count').textContent = 'Question ' + (g.q + 1) + ' of ' + c.round.qs.length;
    clear(area);

    if (c.def.type === 'choice') {
      area.appendChild(el('h2', { class: 'q-title', text: q.title }));
      area.appendChild(el('p', { class: 'muted', text: q.prompt }));
      var opts = shuffle(q.options || C.platformTypes);
      var grid = el('div', { class: 'answers' });
      opts.forEach(function (o, i) {
        grid.appendChild(el('button', { type: 'button', class: 'answer', 'data-value': o, on: { click: function () { answer(o); } } }, [
          el('span', { class: 'key', text: String.fromCharCode(65 + i) }), el('span', { text: o })
        ]));
      });
      area.appendChild(grid);
    } else if (c.def.type === 'oldai') {
      area.appendChild(el('p', { class: 'kicker center', text: 'Old way or AI way?' }));
      area.appendChild(el('div', { class: 'swipe-card', id: 'swipe-card' }, [el('p', { class: 'swipe-text', text: q.statement })]));
      area.appendChild(el('div', { class: 'swipe-actions' }, [
        el('button', { type: 'button', class: 'answer swipe-btn', 'data-value': 'old', on: { click: function () { answer('old'); } } }, [el('span', { class: 'arrow', text: '←' }), el('span', { text: 'Old way' })]),
        el('button', { type: 'button', class: 'answer swipe-btn', 'data-value': 'ai', on: { click: function () { answer('ai'); } } }, [el('span', { text: 'AI way' }), el('span', { class: 'arrow', text: '→' })])
      ]));
    } else if (c.def.type === 'higherlower') {
      area.appendChild(el('p', { class: 'kicker center', text: q.prompt || 'Higher or lower?' }));
      area.appendChild(el('div', { class: 'hl' }, [
        el('div', { class: 'hl-card' }, [el('p', { class: 'hl-label', text: q.a.label }), el('p', { class: 'hl-value', text: q.a.display })]),
        el('span', { class: 'hl-vs', text: 'vs' }),
        el('div', { class: 'hl-card hl-hidden', id: 'hl-b' }, [el('p', { class: 'hl-label', text: q.b.label }), el('p', { class: 'hl-value', id: 'hl-b-value', text: '?' })])
      ]));
      area.appendChild(el('div', { class: 'swipe-actions' }, [
        el('button', { type: 'button', class: 'answer swipe-btn', 'data-value': 'higher', on: { click: function () { answer('higher'); } } }, [el('span', { class: 'arrow', text: '↑' }), el('span', { text: 'Higher' })]),
        el('button', { type: 'button', class: 'answer swipe-btn', 'data-value': 'lower', on: { click: function () { answer('lower'); } } }, [el('span', { class: 'arrow', text: '↓' }), el('span', { text: 'Lower' })])
      ]));
    }

    // timer
    var secs = g.def.secondsPerQuestion || 20;
    g.timeLeft = secs; g.started = Date.now();
    var fill = $('timer-fill');
    fill.style.transition = 'none'; fill.style.width = '100%'; fill.classList.remove('is-low'); void fill.offsetWidth;
    fill.style.transition = 'width ' + secs + 's linear'; fill.style.width = '0%';
    $('time-left').textContent = secs + 's';
    stopTimer();
    timerId = setInterval(function () {
      var left = Math.max(0, secs - Math.floor((Date.now() - g.started) / 1000));
      if (left !== g.timeLeft) {
        g.timeLeft = left;
        $('time-left').textContent = left + 's';
        if (left <= 5 && left > 0) { fill.classList.add('is-low'); sfx.tick(); }
      }
      if (left <= 0) { stopTimer(); answer(null); }
    }, 200);
    renderHud(); renderDots();
  }

  function correctFor(c) {
    if (c.def.type === 'higherlower') return c.q.b.value > c.q.a.value ? 'higher' : 'lower';
    return c.q.answer;
  }

  function answer(value) {
    var c = cur(), g = c.g;
    if (g.answered) return;
    g.answered = true; stopTimer();
    var fill = $('timer-fill'); var w = getComputedStyle(fill).width; fill.style.transition = 'none'; fill.style.width = w;
    g.times.push((Date.now() - g.started) / 1000);
    var right = correctFor(c), ok = value === right;
    g.results[g.n] = ok;
    if (ok) {
      g.score += c.def.points; g.perRound[c.round.ri] += c.def.points; g.correct++; g.streak++; g.best = Math.max(g.best, g.streak);
      (g.streak >= 3 ? sfx.streak : sfx.good)();
      burst('+' + c.def.points);
    } else {
      g.streak = 0; sfx.bad();
      var st = $('stage'); st.classList.remove('shake'); void st.offsetWidth; st.classList.add('shake');
    }
    Array.prototype.forEach.call($('q-area').querySelectorAll('.answer'), function (b) {
      b.disabled = true;
      var v = b.getAttribute('data-value');
      if (v === right) b.classList.add('is-correct');
      else if (v === value) b.classList.add('is-wrong');
      else b.classList.add('is-dim');
    });
    if (c.def.type === 'oldai') { var card = $('swipe-card'); if (card) card.classList.add(value === 'old' ? 'fly-left' : value === 'ai' ? 'fly-right' : 'fly-down'); }
    if (c.def.type === 'higherlower') { var b = $('hl-b'); b.classList.remove('hl-hidden'); countUp($('hl-b-value'), c.q.b.value, c.q.b.display); }

    var labels = { old: 'Old way', ai: 'AI way', higher: 'Higher', lower: 'Lower' };
    var fb = $('q-feedback'); clear(fb);
    fb.className = 'feedback ' + (ok ? 'ok' : 'bad');
    var title = value === null ? "Time's up · it was " + (labels[right] || right)
      : ok ? (g.streak >= 3 ? 'On fire · ' + g.streak + ' in a row' : 'Correct') + ' · +' + c.def.points
      : 'Not quite · it was ' + (labels[right] || right);
    fb.appendChild(el('p', { class: 'fb-title', text: title }));
    if (c.q.explain) fb.appendChild(el('p', { class: 'fb-text', text: c.q.explain }));
    fb.hidden = false;
    var last = g.r === g.rounds.length - 1 && g.q === c.round.qs.length - 1;
    var endRound = g.q === c.round.qs.length - 1;
    $('q-next').textContent = last ? 'See results' : endRound ? 'Next round' : 'Next question';
    $('q-footer').hidden = false;
    $('q-next').focus();
    renderHud(); renderDots();
  }

  function countUp(node, value, display) {
    if (reduceMotion || typeof value !== 'number') { node.textContent = display; return; }
    var start = Date.now(), dur = 700;
    (function step() {
      var p = Math.min(1, (Date.now() - start) / dur);
      node.textContent = p < 1 ? String(Math.round(value * p)) : display;
      if (p < 1) requestAnimationFrame(step);
    })();
  }

  function burst(label) {
    var fx = $('fx'); clear(fx);
    fx.appendChild(el('span', { class: 'plus', text: label }));
    if (reduceMotion) return;
    var colors = ['#FFBE98', '#F7A986', '#F4C6BD', '#E9A3A0', '#D9B48F'];
    for (var i = 0; i < 18; i++) {
      var s = el('span', { class: 'spark' });
      var a = (Math.PI * 2 * i) / 18, d = 70 + Math.random() * 60;
      s.style.setProperty('--x', Math.cos(a) * d + 'px');
      s.style.setProperty('--y', Math.sin(a) * d + 'px');
      s.style.background = colors[i % colors.length];
      fx.appendChild(s);
    }
  }

  function next() {
    var g = state.game, c = cur();
    g.n++;
    if (g.q < c.round.qs.length - 1) { g.q++; showQuestion(); return; }
    if (g.r < g.rounds.length - 1) { g.r++; g.q = 0; renderHud(); renderDots(); showRoundIntro(); return; }
    location.hash = 'results';
  }
  $('q-next').addEventListener('click', next);

  document.addEventListener('keydown', function (e) {
    if (currentPage !== 'play' || !state.game || !menuPanel.hidden) return;
    var g = state.game;
    if (!$('round-intro').hidden) { if (e.key === 'Enter') { e.preventDefault(); $('ri-go').click(); } return; }
    if (g.answered) { if (e.key === 'Enter') { e.preventDefault(); next(); } return; }
    var c = cur();
    if (c.def.type === 'oldai') { if (e.key === 'ArrowLeft') answer('old'); if (e.key === 'ArrowRight') answer('ai'); }
    if (c.def.type === 'higherlower') { if (e.key === 'ArrowUp') { e.preventDefault(); answer('higher'); } if (e.key === 'ArrowDown') { e.preventDefault(); answer('lower'); } }
    if (c.def.type === 'choice' && /^[a-j]$/i.test(e.key)) {
      var btn = $('q-area').querySelectorAll('.answer')[e.key.toUpperCase().charCodeAt(0) - 65];
      if (btn) btn.click();
    }
  });

  function renderResults() {
    var g = state.game;
    if (!g) { location.hash = 'game/' + state.hubSession; return; }
    stopTimer();
    var pct = g.max ? Math.round((g.score / g.max) * 100) : 0;
    var badge = g.def.badges.filter(function (b) { return pct >= b.min; })[0];
    $('ring-num').textContent = String(g.score);
    $('ring-sub').textContent = 'OF ' + g.max + ' PTS';
    $('ring').setAttribute('aria-label', 'Score ' + g.score + ' of ' + g.max);
    var arc = $('ring-arc'); arc.setAttribute('stroke-dasharray', '0 377');
    setTimeout(function () { arc.setAttribute('stroke-dasharray', (377 * g.score / (g.max || 1)).toFixed(1) + ' 377'); }, 60);
    $('r-kicker').textContent = 'Session complete · ' + pct + '%';
    $('r-badge').textContent = badge.name;
    $('r-message').textContent = badge.message;
    var avg = g.times.length ? (g.times.reduce(function (a, b) { return a + b; }, 0) / g.times.length).toFixed(1) : '0';
    var stats = $('r-stats'); clear(stats);
    [['Correct', g.correct + ' / ' + g.total], ['Best streak', '×' + g.best], ['Avg. time', avg + 's']].forEach(function (s) {
      stats.appendChild(el('div', { class: 'stat' }, [el('span', { class: 'stat-v', text: s[1] }), el('span', { class: 'stat-l', text: s[0] })]));
    });
    $('r-takeaway').textContent = '“' + g.def.takeaway + '”';
    var table = $('r-table'); clear(table);
    g.def.rounds.forEach(function (r, i) {
      var possible = r.questions.length * r.points;
      table.appendChild(el('tr', {}, [el('td', { text: pad(i + 1) + ' · ' + r.name }), el('td', { text: possible ? g.perRound[i] + ' / ' + possible : '—' })]));
    });
    table.appendChild(el('tr', { class: 'total' }, [el('td', { text: 'Total' }), el('td', { text: g.score + ' / ' + g.max })]));
    var conf = $('confetti'); clear(conf);
    if (pct >= 80) {
      sfx.win();
      if (!reduceMotion) {
        var colors = ['#FFBE98', '#F7A986', '#F4C6BD', '#E9A3A0', '#D9B48F', '#2E1A17'];
        for (var i = 0; i < 60; i++) {
          var p = el('span', { class: 'confetto' });
          p.style.left = Math.random() * 100 + '%';
          p.style.background = colors[i % colors.length];
          p.style.animationDelay = Math.random() * 0.8 + 's';
          p.style.animationDuration = 2.2 + Math.random() * 1.6 + 's';
          p.style.setProperty('--r', (Math.random() * 720 - 360) + 'deg');
          conf.appendChild(p);
        }
      }
    }
  }

  /* ---------- Router ---------- */
  var currentPage = 'welcome';
  var labels = { welcome: 'Welcome', objectives: 'Objectives', schedule: 'Schedule', readings: 'Readings', game: 'Game Hub', play: 'Game Hub', results: 'Game Hub', locked: 'Game Hub' };

  function route() {
    var parts = (location.hash || '#welcome').slice(1).split('/');
    var page = parts[0], arg = parts[1];
    if (!labels[page]) page = 'welcome';
    if (page !== 'play') stopTimer();

    if (page === 'readings') { state.readTab = arg === 'guest' ? 'guest' : 'prof'; renderReadings(); }
    if (page === 'game') {
      var n = parseInt(arg, 10);
      if (n && C.sessions[n - 1]) { if (!C.sessions[n - 1].open) { location.replace('#locked/' + n); return; } state.hubSession = n; }
      renderHub();
    }
    if (page === 'locked') $('locked-n').textContent = 'Session ' + pad(parseInt(arg, 10) || 3);
    if (page === 'play') {
      if (!C.games[state.hubSession]) { location.replace('#game/' + state.hubSession); return; }
      startGame();
    }
    if (page === 'results') renderResults();

    currentPage = page;
    Array.prototype.forEach.call(document.querySelectorAll('.page'), function (p) { p.hidden = p.getAttribute('data-page') !== page; });

    var label = labels[page];
    if (page === 'readings') label = state.readTab === 'guest' ? 'Guest lectures' : "Professor's lectures";
    if (page === 'game' || page === 'play' || page === 'results') label = 'Game · Session ' + pad(state.hubSession);
    $('menu-current').textContent = label;
    var hash = location.hash || '#welcome';
    if (page === 'play' || page === 'results') hash = '#game/' + state.hubSession;
    Array.prototype.forEach.call(menuPanel.querySelectorAll('a'), function (a) {
      if (a.getAttribute('data-route') === hash || (page === 'game' && a.getAttribute('data-route') === '#game/' + state.hubSession)) a.setAttribute('aria-current', 'page');
      else a.removeAttribute('aria-current');
    });
    window.scrollTo(0, 0);
  }

  window.addEventListener('hashchange', route);
  buildMenu();
  renderObjectives();
  renderSchedule();
  renderSound();
  route();
})();
