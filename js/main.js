/* =========================================================
   T2 Cell Imports — interações
   ========================================================= */
(function () {
  "use strict";

  /* ---------- Ano do rodapé ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Header: sombra/borda ao rolar ---------- */
  var header = document.querySelector(".site-header");
  var onScroll = function () {
    if (!header) return;
    header.classList.toggle("scrolled", window.scrollY > 10);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- Menu mobile ---------- */
  var toggle = document.querySelector(".nav-toggle");
  var navList = document.getElementById("nav-list");
  if (toggle && navList) {
    var closeMenu = function () {
      navList.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Abrir menu");
    };
    toggle.addEventListener("click", function () {
      var open = navList.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
    });
    navList.addEventListener("click", function (e) {
      if (e.target.closest("a")) closeMenu();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeMenu();
    });
  }

  /* ---------- Scroll reveal ---------- */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && reveals.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---------- Contagem de números (stats) ---------- */
  var counted = false;
  var statNums = document.querySelectorAll(".stat-num[data-count]");
  var animateCount = function () {
    if (counted) return;
    counted = true;
    statNums.forEach(function (el) {
      var target = parseFloat(el.getAttribute("data-count"));
      var decimals = parseInt(el.getAttribute("data-decimals") || "0", 10);
      var suffix = el.getAttribute("data-suffix") || "";
      var format = el.getAttribute("data-format") || "";
      var start = 0;
      var dur = 1400;
      var t0 = null;
      var step = function (ts) {
        if (!t0) t0 = ts;
        var p = Math.min((ts - t0) / dur, 1);
        var eased = 1 - Math.pow(1 - p, 3);
        var val = start + (target - start) * eased;
        var out;
        if (format === "k") {
          out = (val / 1000).toFixed(1).replace(".", ",") + "K";
        } else {
          out = val.toFixed(decimals).replace(".", ",");
        }
        el.textContent = out + suffix;
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    });
  };
  var statsWrap = document.querySelector(".about-stats");
  if (statsWrap && "IntersectionObserver" in window) {
    var statObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { animateCount(); statObserver.disconnect(); }
      });
    }, { threshold: 0.4 });
    statObserver.observe(statsWrap);
  }

  /* ---------- Horário: destaca o dia atual e status "aberto agora" ----------
     Os horários reais ainda estão como [A CONFIRMAR]. Quando preenchidos na
     tabela, ajuste o objeto HOURS abaixo (24h) para ativar o status automático.
     Formato: { dia: [ [abreMin, fechaMin], ... ] }  (minutos desde 00:00)
     Deixe o array vazio [] para dia fechado. Mantido nulo = status indefinido. */
  // Seg–Sáb: 08:00–19:00 (480–1140). Dom: 08:00–12:00 (480–720). Sem pausa de almoço.
  var HOURS = { 1:[[480,1140]], 2:[[480,1140]], 3:[[480,1140]], 4:[[480,1140]], 5:[[480,1140]], 6:[[480,1140]], 0:[[480,720]] };

  var now = new Date();
  var todayIdx = now.getDay(); // 0=domingo
  var todayRow = document.querySelector('.hours-table tr[data-day="' + todayIdx + '"]');
  if (todayRow) todayRow.classList.add("today");

  var statusEl = document.getElementById("open-status");
  if (statusEl) {
    var textEl = statusEl.querySelector(".status-text");
    if (HOURS && HOURS[todayIdx]) {
      var mins = now.getHours() * 60 + now.getMinutes();
      var ranges = HOURS[todayIdx];
      var isOpen = ranges.some(function (r) { return mins >= r[0] && mins < r[1]; });
      statusEl.classList.add(isOpen ? "is-open" : "is-closed");
      textEl.textContent = isOpen ? "Aberto agora" : "Fechado agora";
    } else {
      textEl.textContent = "Horário a confirmar";
    }
  }

  /* ---------- Carrossel (álbum de clientes) ---------- */
  document.querySelectorAll(".carousel").forEach(function (car) {
    var viewport = car.querySelector(".carousel-viewport");
    var track = car.querySelector(".carousel-track");
    var slides = track ? Array.prototype.slice.call(track.children) : [];
    var prev = car.querySelector(".carousel-btn.prev");
    var next = car.querySelector(".carousel-btn.next");
    var dotsWrap = car.querySelector(".carousel-dots");
    if (!viewport || slides.length === 0) return;

    var step = function () {
      var gap = parseFloat(getComputedStyle(track).columnGap || getComputedStyle(track).gap || "0") || 0;
      return slides[0].offsetWidth + gap;
    };

    // Monta os indicadores (dots)
    var dots = [];
    if (dotsWrap) {
      slides.forEach(function (_, i) {
        var b = document.createElement("button");
        b.type = "button";
        b.setAttribute("role", "tab");
        b.setAttribute("aria-label", "Foto " + (i + 1));
        b.addEventListener("click", function () { goTo(i); });
        dotsWrap.appendChild(b);
        dots.push(b);
      });
    }

    var current = 0;
    var setActive = function (i) {
      current = i;
      dots.forEach(function (d, j) { d.classList.toggle("active", j === i); });
    };
    var goTo = function (i) {
      i = (i + slides.length) % slides.length;
      viewport.scrollTo({ left: slides[i].offsetLeft - slides[0].offsetLeft, behavior: "smooth" });
      setActive(i);
    };

    if (prev) prev.addEventListener("click", function () { goTo(current - 1); });
    if (next) next.addEventListener("click", function () { goTo(current + 1); });

    // Atualiza o dot ativo conforme o scroll (inclui arrasto/swipe no celular)
    var raf;
    viewport.addEventListener("scroll", function () {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(function () {
        var s = step() || 1;
        var i = Math.round(viewport.scrollLeft / s);
        setActive(Math.max(0, Math.min(slides.length - 1, i)));
      });
    }, { passive: true });

    // Autoplay
    var delay = parseInt(car.getAttribute("data-autoplay") || "0", 10);
    var timer = null;
    var play = function () {
      if (!delay) return;
      stop();
      timer = setInterval(function () { goTo(current + 1); }, delay);
    };
    var stop = function () { if (timer) { clearInterval(timer); timer = null; } };
    car.addEventListener("mouseenter", stop);
    car.addEventListener("mouseleave", play);
    viewport.addEventListener("touchstart", stop, { passive: true });

    setActive(0);
    play();
  });
})();
