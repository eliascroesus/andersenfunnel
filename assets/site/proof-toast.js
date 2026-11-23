/* Small proof cards that pop up bottom-left. Hidden while someone is typing (any input focused, so the phone
   keyboard never gets covered) and while the sign-up / application form is on screen on phones. */
(function () {
  var ITEMS = [
    { name: "BRANDON", text: "Zero trading experience → first payout about 2 weeks in", img: "/assets/ace/web/result-01.webp" },
    { name: "SLADE", text: "Failed 7 of 8 months → passed 3 accounts + a payout in one month", img: "/assets/ace/web/result-02.webp" },
    { name: "KOI", text: "On-and-off payouts with ICT → 2 payouts back to back", img: "/assets/ace/web/result-03.webp" },
    { name: "TRAVIS", text: "First Discord member → multiple payouts running the ACE Model", img: "/assets/ace/web/result-04.webp" },
  ];
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  var el = document.createElement("div");
  el.className = "ptoast"; el.setAttribute("role", "status");
  el.innerHTML = '<button class="ptoast__x" aria-label="Close">×</button><img class="ptoast__img" alt="" width="52" height="52"><div class="ptoast__body"><b class="ptoast__name"></b><p class="ptoast__text"></p><div class="ptoast__foot"><span class="ptoast__stars">★★★★★</span><span class="ptoast__nt">Not Typical</span></div></div>';
  document.body.appendChild(el);
  var i = 0, closed = false, typing = false, formOnScreen = false, timer;
  var mobile = matchMedia("(max-width: 700px)");
  function blocked() { return closed || typing || (mobile.matches && formOnScreen); }
  function show() {
    if (blocked()) { timer = setTimeout(show, 4000); return; }
    var it = ITEMS[i++ % ITEMS.length];
    el.querySelector(".ptoast__img").src = it.img;
    el.querySelector(".ptoast__name").textContent = it.name;
    el.querySelector(".ptoast__text").textContent = it.text;
    el.classList.add("on");
    timer = setTimeout(function () { el.classList.remove("on"); timer = setTimeout(show, 9000); }, 6000);
  }
  el.querySelector(".ptoast__x").onclick = function () { closed = true; el.classList.remove("on"); clearTimeout(timer); };
  document.addEventListener("focusin", function (e) { if (e.target.matches("input, textarea, select")) { typing = true; el.classList.remove("on"); } });
  document.addEventListener("focusout", function () { setTimeout(function () { typing = !!document.activeElement && document.activeElement.matches("input, textarea, select"); }, 50); });
  var form = document.querySelector("#optin-form, .book-panel");
  if (form && "IntersectionObserver" in window) new IntersectionObserver(function (en) {
    formOnScreen = en[0].isIntersecting; if (formOnScreen && mobile.matches) el.classList.remove("on");
  }).observe(form);
  timer = setTimeout(show, 5000);
})();
