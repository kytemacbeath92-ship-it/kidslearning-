(function(){const l=document.createElement("link").relList;if(l&&l.supports&&l.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))r(o);new MutationObserver(o=>{for(const c of o)if(c.type==="childList")for(const s of c.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&r(s)}).observe(document,{childList:!0,subtree:!0});function i(o){const c={};return o.integrity&&(c.integrity=o.integrity),o.referrerPolicy&&(c.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?c.credentials="include":o.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function r(o){if(o.ep)return;o.ep=!0;const c=i(o);fetch(o.href,c)}})();const ue=["#FF3B5C","#FFD56A","#7C5CFF","#4CD964","#5AD2FF","#FF8A3D","#FF7AD9"];function We(t=1400){const l=document.getElementById("confetti");if(!l)return;const i=l.getContext("2d"),r=[];(()=>{l.width=window.innerWidth,l.height=window.innerHeight})();for(let a=0;a<90;a+=1)r.push({x:Math.random()*l.width,y:-20-Math.random()*80,r:4+Math.random()*6,c:ue[a%ue.length],vy:3+Math.random()*4,vx:-2+Math.random()*4,a:Math.random()*Math.PI,va:.1+Math.random()*.2});const c=performance.now();function s(a){i.clearRect(0,0,l.width,l.height),r.forEach(h=>{h.x+=h.vx,h.y+=h.vy,h.a+=h.va,i.save(),i.translate(h.x,h.y),i.rotate(h.a),i.fillStyle=h.c,i.fillRect(-h.r,-h.r/2,h.r*2,h.r),i.restore()}),a-c<t?requestAnimationFrame(s):i.clearRect(0,0,l.width,l.height)}requestAnimationFrame(s)}let $,be=!0,ve=!0;function Me(t){be=t}function qe(t){ve=t,!t&&window.speechSynthesis&&window.speechSynthesis.cancel()}function oe(){if(!$){const t=window.AudioContext||window.webkitAudioContext;if(!t)return;$=new t}$.state==="suspended"&&$.resume()}function E(t,l,i,r="sine",o=.08,c){if(!$)return;const s=$.createOscillator(),a=$.createGain();s.type=r,s.frequency.setValueAtTime(t,$.currentTime+l),c&&s.frequency.exponentialRampToValueAtTime(c,$.currentTime+l+i),a.gain.setValueAtTime(1e-4,$.currentTime+l),a.gain.exponentialRampToValueAtTime(o,$.currentTime+l+.02),a.gain.exponentialRampToValueAtTime(1e-4,$.currentTime+l+i),s.connect(a),a.connect($.destination),s.start($.currentTime+l),s.stop($.currentTime+l+i+.02)}function M(t){be&&(oe(),$&&(t==="tap"?E(520,0,.08,"triangle",.05):t==="pop"?E(320,0,.12,"square",.04,180):t==="correct"?(E(523,0,.12,"triangle",.08),E(659,.09,.12,"triangle",.08),E(784,.18,.18,"triangle",.09)):t==="wrong"?E(330,0,.16,"sine",.05,220):t==="star"?(E(784,0,.1,"sine",.07),E(988,.1,.16,"sine",.07)):t==="fanfare"?[523,659,784,1046].forEach((l,i)=>E(l,i*.12,.22,"triangle",.09)):t==="lock"?E(180,0,.14,"square",.03):t==="whoosh"&&E(240,0,.2,"sawtooth",.03,520)))}function se(t){if(!ve||!t||!window.speechSynthesis)return;window.speechSynthesis.cancel();const l=new SpeechSynthesisUtterance(t);l.rate=.92,l.pitch=1.18,l.volume=.95;const r=window.speechSynthesis.getVoices().find(o=>/child|kid|samantha|google us|female/i.test(`${o.name} ${o.lang}`));r&&(l.voice=r),window.speechSynthesis.speak(l)}function De(t){t.querySelectorAll("button, [data-choice], [data-hunt], [data-continent]").forEach(l=>{l.disabled=!0,l.setAttribute("aria-disabled","true")})}function Ie(t){return t.type==="hunt"?Be(t):t.type==="map"?Ge(t):t.type==="spell"?ze(t):Pe(t)}function Pe(t){const l=t.choices.map((i,r)=>`
      <button class="choice-card" data-choice="${i.id}" data-correct="${i.correct}" type="button">
        <span class="choice-key">${r+1}</span>
        <div class="choice-art">${i.html}</div>
        <span class="choice-label">${i.label}</span>
      </button>`).join("");return`
    <div class="q-stem">${t.stem||""}</div>
    <div class="choice-grid">${l}</div>
  `}function Be(t){return`<div class="playfield">${t.items.map((i,r)=>{const o=6+r%3*31+r%2*4,c=8+Math.floor(r/3)*46+r%2*6;return`
        <button class="hunt-item roam-${r%4+1}" data-hunt="${i.id}" data-correct="${i.correct}"
          style="left:${o}%; top:${c}%" type="button" aria-label="${i.label}">
          ${i.html}
        </button>`}).join("")}</div>`}function Ge(t){return`<div class="map-wrap">${t.stem}<p class="map-hint">Tap a continent</p></div>`}function ze(t){const l=[...t.word].map((r,o)=>`<span class="spell-slot" data-slot="${o}"></span>`).join(""),i=t.tiles.map((r,o)=>`
      <button class="spell-tile" data-letter="${r}" data-tile="${o}" type="button">${r}</button>`).join("");return`
    <div class="spell-game" data-word="${t.word}">
      <div class="q-stem">${t.stem||""}</div>
      <div class="spell-slots" aria-label="spelling">${l}</div>
      <div class="spell-tiles">${i}</div>
    </div>`}function Re(t,l,i){let r=!1;const o=c=>{r||(r=!0,t.classList.add("is-locked"),De(t),setTimeout(()=>i(c),c?700:1100))};if(l.type==="choice"&&t.querySelectorAll("[data-choice]").forEach(c=>{c.addEventListener("click",()=>{if(r)return;const s=c.dataset.correct==="true";if(M(s?"correct":"wrong"),c.classList.add(s?"is-correct":"is-wrong"),!s){const a=t.querySelector('[data-correct="true"]');a&&a.classList.add("is-correct")}o(s)})}),l.type==="hunt"&&t.querySelectorAll("[data-hunt]").forEach(c=>{c.addEventListener("click",()=>{if(r)return;const s=c.dataset.correct==="true";if(M(s?"correct":"wrong"),c.classList.add(s?"is-correct":"is-wrong"),!s){const a=t.querySelector('[data-correct="true"]');a&&a.classList.add("is-correct")}o(s)})}),l.type==="spell"){let c=0;const s=l.word.toUpperCase();t.querySelectorAll("[data-letter]").forEach(a=>{a.addEventListener("click",()=>{var g,he;if(r)return;const h=a.dataset.letter;if(M("tap"),h===s[c]){const K=t.querySelector(`[data-slot="${c}"]`);K&&(K.textContent=h),a.disabled=!0,a.classList.add("is-used"),c+=1,M("pop"),c>=s.length&&(M("correct"),(g=t.querySelector(".spell-slots"))==null||g.classList.add("is-correct"),o(!0))}else M("wrong"),a.classList.add("is-wrong"),[...s].forEach((K,Oe)=>{const pe=t.querySelector(`[data-slot="${Oe}"]`);pe&&(pe.textContent=K)}),(he=t.querySelector(".spell-slots"))==null||he.classList.add("is-wrong"),o(!1)})})}l.type==="map"&&t.querySelectorAll("[data-id]").forEach(c=>{c.style.cursor="pointer",c.addEventListener("click",()=>{if(r)return;const s=c.getAttribute("data-id")===l.answer;if(M(s?"correct":"wrong"),c.classList.add(s?"is-correct":"is-wrong"),!s){const a=t.querySelector(`[data-id="${l.answer}"]`);a&&a.classList.add("is-correct")}o(s)})})}const e="#2d2150";function n(t,l="illu"){return`<svg viewBox="0 0 160 160" class="${l}" aria-hidden="true">${t}</svg>`}function D(t,l,i="idle"){const r=i==="think"?l-2:l,o=i==="sad"?`<path d="M${t-10} ${l+18} Q${t} ${l+10} ${t+10} ${l+18}" fill="none" stroke="${e}" stroke-width="3" stroke-linecap="round"/>`:`<path d="M${t-10} ${l+12} Q${t} ${l+20} ${t+10} ${l+12}" fill="none" stroke="${e}" stroke-width="3" stroke-linecap="round"/>`;return`
    <circle cx="${t-12}" cy="${l}" r="10" fill="#fff"/>
    <circle cx="${t+12}" cy="${l}" r="10" fill="#fff"/>
    <circle class="pupil" cx="${t-12}" cy="${r}" r="4.5" fill="${e}"/>
    <circle class="pupil" cx="${t+12}" cy="${r}" r="4.5" fill="${e}"/>
    <circle cx="${t-9}" cy="${r-2}" r="1.7" fill="#fff"/>
    <circle cx="${t+15}" cy="${r-2}" r="1.7" fill="#fff"/>
    ${o}
  `}function y(){return'<ellipse cx="80" cy="148" rx="42" ry="8" fill="rgba(45,33,80,.14)"/>'}function w(t,l,i=11,r=7){return`<ellipse cx="${t}" cy="${l}" rx="${i}" ry="${r}" fill="rgba(255,255,255,.38)"/>`}function C(t="idle"){const l=t==="celebrate"?`<g class="illu-wiggle"><ellipse cx="38" cy="78" rx="18" ry="28" fill="#9b7cff" stroke="${e}" stroke-width="3"/><ellipse cx="122" cy="58" rx="18" ry="28" fill="#9b7cff" stroke="${e}" stroke-width="3"/></g>`:`<ellipse cx="40" cy="92" rx="16" ry="26" fill="#9b7cff" stroke="${e}" stroke-width="3"/><ellipse cx="120" cy="92" rx="16" ry="26" fill="#9b7cff" stroke="${e}" stroke-width="3"/>`,i=t==="happy"||t==="celebrate"?`<g class="illu-spin-slow" fill="#ffd56a" stroke="${e}" stroke-width="2">
        <polygon points="20,24 24,34 34,30 26,40 32,50 20,44 8,50 14,40 6,30 16,34"/>
        <polygon points="140,22 144,32 154,28 146,38 152,48 140,42 128,48 134,38 126,28 136,32"/>
      </g>`:"";return n(`
    ${i}
    <ellipse cx="80" cy="148" rx="36" ry="8" fill="rgba(45,33,80,.15)"/>
    <ellipse cx="80" cy="108" rx="46" ry="42" fill="#7c5cff" stroke="${e}" stroke-width="4"/>
    <ellipse cx="80" cy="118" rx="28" ry="26" fill="#ffe27a"/>
    <polygon points="80,104 86,116 74,116" fill="#ff8a3d" stroke="${e}" stroke-width="2"/>
    <circle cx="80" cy="58" r="38" fill="#8b6cff" stroke="${e}" stroke-width="4"/>
    <polygon points="48,28 58,48 42,46" fill="#7c5cff" stroke="${e}" stroke-width="3"/>
    <polygon points="112,28 118,46 102,48" fill="#7c5cff" stroke="${e}" stroke-width="3"/>
    ${D(80,58,t==="encourage"?"idle":t)}
    <ellipse cx="80" cy="74" rx="7" ry="5" fill="#ff8a3d" stroke="${e}" stroke-width="2"/>
    ${l}
  `,`illu mascot-illu ${t==="celebrate"?"illu-wiggle":"illu-bob"}`)}function j(t,l=""){return n(`
    <defs>
      <radialGradient id="g${t.replace("#","")}" cx="35%" cy="30%">
        <stop offset="0%" stop-color="#fff"/>
        <stop offset="55%" stop-color="${t}"/>
        <stop offset="100%" stop-color="${t}"/>
      </radialGradient>
    </defs>
    <ellipse cx="80" cy="138" rx="40" ry="10" fill="rgba(45,33,80,.12)"/>
    <path d="M40 88c0-28 18-58 40-58s40 30 40 58c0 26-18 40-40 40s-40-14-40-40z" fill="url(#g${t.replace("#","")})" stroke="${e}" stroke-width="4"/>
    <ellipse cx="62" cy="70" rx="12" ry="8" fill="rgba(255,255,255,.55)"/>
    ${l?`<text x="80" y="96" text-anchor="middle" font-size="16" font-family="Fredoka, sans-serif" font-weight="700" fill="${e}">${l}</text>`:""}
  `,"illu illu-bob")}function He(){return n(`
    ${y()}
    <rect x="46" y="118" width="12" height="26" rx="5" fill="#f4f1ea" stroke="${e}" stroke-width="3"/>
    <rect x="66" y="120" width="12" height="24" rx="5" fill="#2d2150" stroke="${e}" stroke-width="3"/>
    <rect x="90" y="120" width="12" height="24" rx="5" fill="#f4f1ea" stroke="${e}" stroke-width="3"/>
    <rect x="108" y="118" width="12" height="26" rx="5" fill="#2d2150" stroke="${e}" stroke-width="3"/>
    <path d="M44 128 h10 M64 130 h10 M88 130 h10 M106 128 h10" stroke="#c9b48a" stroke-width="3" stroke-linecap="round"/>
    <ellipse cx="82" cy="102" rx="48" ry="30" fill="#f7f4ee" stroke="${e}" stroke-width="4"/>
    ${w(68,90,14,8)}
    <ellipse cx="58" cy="96" rx="14" ry="12" fill="#2d2150"/>
    <ellipse cx="108" cy="108" rx="16" ry="12" fill="#2d2150"/>
    <ellipse cx="80" cy="128" rx="10" ry="7" fill="#ffb6c8" stroke="${e}" stroke-width="2"/>
    <path d="M126 96 q16 10 4 26" fill="none" stroke="#f4e4c1" stroke-width="7" stroke-linecap="round"/>
    <circle cx="72" cy="58" r="24" fill="#f7f4ee" stroke="${e}" stroke-width="4"/>
    <ellipse cx="48" cy="50" rx="8" ry="11" fill="#f4e4c1" stroke="${e}" stroke-width="3"/>
    <ellipse cx="92" cy="48" rx="8" ry="11" fill="#f4e4c1" stroke="${e}" stroke-width="3"/>
    <path d="M56 36 q-2 -10 8 -8 M80 34 q2 -10 8 -7" fill="none" stroke="#f4e4c1" stroke-width="5" stroke-linecap="round"/>
    <ellipse cx="72" cy="70" rx="16" ry="11" fill="#ffb6c8" stroke="${e}" stroke-width="2.5"/>
    <ellipse cx="66" cy="70" rx="2.2" ry="3" fill="${e}"/>
    <ellipse cx="78" cy="70" rx="2.2" ry="3" fill="${e}"/>
    <circle cx="64" cy="54" r="4.5" fill="#fff"/><circle cx="80" cy="54" r="4.5" fill="#fff"/>
    <circle cx="64" cy="54" r="2.4" fill="${e}"/><circle cx="80" cy="54" r="2.4" fill="${e}"/>
    <circle cx="66" cy="53" r="0.9" fill="#fff"/><circle cx="82" cy="53" r="0.9" fill="#fff"/>
  `,"illu illu-bob")}function Qe(){return n(`
    ${y()}
    <rect x="50" y="120" width="11" height="22" rx="5" fill="#ff9db8" stroke="${e}" stroke-width="3"/>
    <rect x="70" y="122" width="11" height="20" rx="5" fill="#ff9db8" stroke="${e}" stroke-width="3"/>
    <rect x="90" y="122" width="11" height="20" rx="5" fill="#ff9db8" stroke="${e}" stroke-width="3"/>
    <rect x="108" y="120" width="11" height="22" rx="5" fill="#ff9db8" stroke="${e}" stroke-width="3"/>
    <ellipse cx="82" cy="104" rx="46" ry="28" fill="#ffb6c8" stroke="${e}" stroke-width="4"/>
    ${w(66,92,13,7)}
    <ellipse cx="82" cy="112" rx="22" ry="12" fill="#ff8aa8"/>
    <path d="M124 98 q18 12 2 28" fill="none" stroke="#ff8aa8" stroke-width="8" stroke-linecap="round"/>
    <circle cx="70" cy="64" r="26" fill="#ffb6c8" stroke="${e}" stroke-width="4"/>
    <ellipse cx="48" cy="46" rx="11" ry="15" fill="#ff9db8" stroke="${e}" stroke-width="3"/>
    <ellipse cx="90" cy="44" rx="11" ry="15" fill="#ff9db8" stroke="${e}" stroke-width="3"/>
    <ellipse cx="48" cy="48" rx="5" ry="8" fill="#ffd0dc"/>
    <ellipse cx="90" cy="46" rx="5" ry="8" fill="#ffd0dc"/>
    <ellipse cx="70" cy="76" rx="15" ry="11" fill="#ff8aa8" stroke="${e}" stroke-width="3"/>
    <ellipse cx="64" cy="76" rx="2.4" ry="3.2" fill="${e}"/>
    <ellipse cx="76" cy="76" rx="2.4" ry="3.2" fill="${e}"/>
    <circle cx="60" cy="58" r="5" fill="#fff"/><circle cx="80" cy="58" r="5" fill="#fff"/>
    <circle cx="60" cy="58" r="2.6" fill="${e}"/><circle cx="80" cy="58" r="2.6" fill="${e}"/>
    <circle cx="62" cy="56" r="1" fill="#fff"/><circle cx="82" cy="56" r="1" fill="#fff"/>
    <path d="M62 86 q8 6 16 0" fill="none" stroke="${e}" stroke-width="2.5" stroke-linecap="round"/>
  `,"illu illu-bob")}function Ue(){return n(`
    ${y()}
    <path d="M68 132 l6 14 6 -4 6 4 6 -14" fill="#ff8a3d" stroke="${e}" stroke-width="3" stroke-linejoin="round"/>
    <ellipse cx="78" cy="108" rx="34" ry="26" fill="#fffaf0" stroke="${e}" stroke-width="4"/>
    ${w(66,98,10,6)}
    <path d="M52 104 q-18 -8 -8 -30" fill="#ffd56a" stroke="${e}" stroke-width="3" stroke-linecap="round"/>
    <ellipse cx="54" cy="100" rx="12" ry="10" fill="#fff3c4" stroke="${e}" stroke-width="3"/>
    <path d="M98 100 q22 4 18 28 q-8 4 -20 2" fill="#ffe27a" stroke="${e}" stroke-width="3"/>
    <circle cx="92" cy="68" r="24" fill="#fffaf0" stroke="${e}" stroke-width="4"/>
    <path d="M80 48 q6 -16 16 -4 q6 -14 16 2 q4 -8 12 6" fill="#ff3b5c" stroke="${e}" stroke-width="3"/>
    <ellipse cx="108" cy="80" rx="8" ry="6" fill="#ff3b5c" stroke="${e}" stroke-width="2"/>
    <polygon points="112,70 132,76 112,84" fill="#ff8a3d" stroke="${e}" stroke-width="3"/>
    <circle cx="98" cy="64" r="5.5" fill="#fff"/><circle cx="98" cy="64" r="2.8" fill="${e}"/>
    <circle cx="100" cy="63" r="1" fill="#fff"/>
    <path d="M84 76 q8 8 18 2" fill="none" stroke="${e}" stroke-width="2.5" stroke-linecap="round"/>
  `,"illu illu-bob")}function Ye(){return n(`
    ${y()}
    <rect x="58" y="122" width="11" height="24" rx="5" fill="#8a4f24" stroke="${e}" stroke-width="3"/>
    <rect x="76" y="124" width="11" height="22" rx="5" fill="#8a4f24" stroke="${e}" stroke-width="3"/>
    <rect x="96" y="124" width="11" height="22" rx="5" fill="#8a4f24" stroke="${e}" stroke-width="3"/>
    <rect x="112" y="122" width="11" height="24" rx="5" fill="#8a4f24" stroke="${e}" stroke-width="3"/>
    <ellipse cx="92" cy="106" rx="42" ry="26" fill="#c47a3a" stroke="${e}" stroke-width="4"/>
    ${w(78,94,12,7)}
    <path d="M128 100 q18 16 -2 32" fill="#6b3b1f" stroke="${e}" stroke-width="3"/>
    <rect x="46" y="68" width="24" height="44" rx="12" fill="#c47a3a" stroke="${e}" stroke-width="4"/>
    <ellipse cx="40" cy="60" rx="22" ry="16" fill="#c47a3a" stroke="${e}" stroke-width="4"/>
    <ellipse cx="28" cy="64" rx="10" ry="7" fill="#e2b07a"/>
    <path d="M62 46 q18 -26 4 22" fill="#5a3018" stroke="${e}" stroke-width="3"/>
    <path d="M58 52 q12 -18 2 10 M70 58 q10 -14 0 8" fill="#6b3b1f"/>
    <ellipse cx="54" cy="42" rx="6" ry="9" fill="#c47a3a" stroke="${e}" stroke-width="3"/>
    <circle cx="30" cy="56" r="5" fill="#fff"/><circle cx="30" cy="56" r="2.6" fill="${e}"/>
    <circle cx="31.5" cy="55" r="0.9" fill="#fff"/>
    <ellipse cx="22" cy="66" rx="2" ry="1.4" fill="${e}"/>
  `,"illu illu-bob")}function Ke(){return n(`
    ${y()}
    <rect x="54" y="124" width="10" height="20" rx="4" fill="#2d2150" stroke="${e}" stroke-width="3"/>
    <rect x="74" y="126" width="10" height="18" rx="4" fill="#2d2150" stroke="${e}" stroke-width="3"/>
    <rect x="92" y="126" width="10" height="18" rx="4" fill="#2d2150" stroke="${e}" stroke-width="3"/>
    <rect x="108" y="124" width="10" height="20" rx="4" fill="#2d2150" stroke="${e}" stroke-width="3"/>
    <circle cx="50" cy="100" r="20" fill="#f7f7f4" stroke="${e}" stroke-width="3"/>
    <circle cx="110" cy="102" r="20" fill="#f7f7f4" stroke="${e}" stroke-width="3"/>
    <circle cx="80" cy="86" r="30" fill="#f7f7f4" stroke="${e}" stroke-width="3"/>
    <circle cx="62" cy="118" r="16" fill="#f7f7f4" stroke="${e}" stroke-width="3"/>
    <circle cx="100" cy="118" r="16" fill="#f7f7f4" stroke="${e}" stroke-width="3"/>
    <circle cx="80" cy="112" r="18" fill="#fff"/>
    <circle cx="68" cy="54" r="18" fill="#3a2a1a" stroke="${e}" stroke-width="3"/>
    <ellipse cx="52" cy="48" rx="6" ry="10" fill="#3a2a1a" stroke="${e}" stroke-width="2.5"/>
    <ellipse cx="82" cy="46" rx="6" ry="10" fill="#3a2a1a" stroke="${e}" stroke-width="2.5"/>
    <ellipse cx="68" cy="62" rx="8" ry="6" fill="#5a4030"/>
    <circle cx="61" cy="52" r="4.5" fill="#fff"/><circle cx="75" cy="52" r="4.5" fill="#fff"/>
    <circle cx="61" cy="52" r="2.3" fill="${e}"/><circle cx="75" cy="52" r="2.3" fill="${e}"/>
    <ellipse cx="68" cy="64" rx="5" ry="3" fill="#ffb6c8"/>
  `,"illu illu-bob")}function Ve(){return n(`
    ${y()}
    <path d="M62 130 q8 14 16 0 q8 14 16 0" fill="#ff8a3d" stroke="${e}" stroke-width="3"/>
    <ellipse cx="74" cy="108" rx="38" ry="24" fill="#ffe27a" stroke="${e}" stroke-width="4"/>
    ${w(60,98,12,6)}
    <ellipse cx="58" cy="108" rx="14" ry="10" fill="#ffd56a"/>
    <path d="M48 100 q-16 -6 -6 -26" fill="#ffe27a" stroke="${e}" stroke-width="3"/>
    <circle cx="112" cy="76" r="22" fill="#ffe27a" stroke="${e}" stroke-width="4"/>
    <ellipse cx="134" cy="80" rx="16" ry="8" fill="#ff8a3d" stroke="${e}" stroke-width="3"/>
    <ellipse cx="138" cy="76" rx="8" ry="4" fill="#ffb24d"/>
    <circle cx="118" cy="70" r="5.5" fill="#fff"/><circle cx="118" cy="70" r="2.8" fill="${e}"/>
    <circle cx="120" cy="69" r="1" fill="#fff"/>
    <path d="M102 86 q10 8 20 2" fill="none" stroke="${e}" stroke-width="2.5" stroke-linecap="round"/>
  `,"illu illu-bob")}function _e(){return n(`
    ${y()}
    <ellipse cx="118" cy="108" rx="16" ry="8" fill="#c47a3a" stroke="${e}" stroke-width="3"/>
    <ellipse cx="80" cy="112" rx="40" ry="26" fill="#e0a15a" stroke="${e}" stroke-width="4"/>
    ${w(66,100,12,7)}
    <ellipse cx="80" cy="118" rx="18" ry="10" fill="#f0c48a"/>
    <rect x="54" y="124" width="12" height="18" rx="6" fill="#c47a3a" stroke="${e}" stroke-width="3"/>
    <rect x="94" y="124" width="12" height="18" rx="6" fill="#c47a3a" stroke="${e}" stroke-width="3"/>
    <circle cx="80" cy="66" r="28" fill="#e0a15a" stroke="${e}" stroke-width="4"/>
    <ellipse cx="50" cy="58" rx="12" ry="20" fill="#c47a3a" stroke="${e}" stroke-width="3"/>
    <ellipse cx="110" cy="50" rx="12" ry="18" fill="#c47a3a" stroke="${e}" stroke-width="3" transform="rotate(18 110 50)"/>
    ${D(80,64)}
    <ellipse cx="80" cy="80" rx="9" ry="6" fill="#5a3a1a"/>
    <ellipse cx="80" cy="78" rx="4" ry="2.4" fill="#2d2150"/>
    <path d="M74 86 q6 8 12 0" fill="#ff7aa2"/>
    <rect x="64" y="98" width="32" height="8" rx="4" fill="#7c5cff" stroke="${e}" stroke-width="2"/>
  `,"illu illu-bob")}function Je(){return n(`
    ${y()}
    <path d="M118 104 q22 18 2 36" fill="none" stroke="#ffb24d" stroke-width="9" stroke-linecap="round"/>
    <path d="M122 118 q8 4 0 10 M128 128 q6 4 -2 8" stroke="#e08920" stroke-width="2"/>
    <ellipse cx="80" cy="112" rx="34" ry="24" fill="#ffb24d" stroke="${e}" stroke-width="4"/>
    ${w(68,102,10,6)}
    <ellipse cx="80" cy="116" rx="14" ry="8" fill="#ffe0a8"/>
    <circle cx="80" cy="68" r="26" fill="#ffb24d" stroke="${e}" stroke-width="4"/>
    <polygon points="54,54 60,28 76,54" fill="#ffb24d" stroke="${e}" stroke-width="3"/>
    <polygon points="106,54 100,28 84,54" fill="#ffb24d" stroke="${e}" stroke-width="3"/>
    <polygon points="60,50 62,36 70,50" fill="#ffd0dc"/>
    <polygon points="100,50 98,36 90,50" fill="#ffd0dc"/>
    ${D(80,68)}
    <path d="M80 76 l-4 5 8 0 z" fill="#ff7aa2" stroke="${e}" stroke-width="2"/>
    <path d="M56 78 h-18 M56 84 h-16 M104 78 h18 M104 84 h16" stroke="${e}" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M70 88 q10 6 20 0" fill="none" stroke="${e}" stroke-width="2.5"/>
  `,"illu illu-wiggle")}function Ze(){return n(`
    ${y()}
    <ellipse cx="80" cy="124" rx="22" ry="14" fill="#e2b15a" stroke="${e}" stroke-width="3"/>
    <circle cx="80" cy="82" r="50" fill="#d96b24" stroke="${e}" stroke-width="4"/>
    <circle cx="42" cy="58" r="16" fill="#e07a2e"/>
    <circle cx="118" cy="58" r="16" fill="#e07a2e"/>
    <circle cx="40" cy="104" r="15" fill="#c45c18"/>
    <circle cx="120" cy="104" r="15" fill="#c45c18"/>
    <circle cx="80" cy="38" r="16" fill="#ff8a3d"/>
    <circle cx="80" cy="84" r="30" fill="#ffe08a" stroke="${e}" stroke-width="4"/>
    ${w(70,74,10,6)}
    ${D(80,78)}
    <ellipse cx="80" cy="94" rx="9" ry="7" fill="#c47a3a"/>
    <circle cx="77" cy="93" r="1.4" fill="${e}"/><circle cx="83" cy="93" r="1.4" fill="${e}"/>
    <path d="M70 104 q10 8 20 0" fill="none" stroke="${e}" stroke-width="3" stroke-linecap="round"/>
    <path d="M58 92 h-10 M102 92 h10" stroke="${e}" stroke-width="2"/>
  `,"illu illu-bob")}function Xe(){return n(`
    ${y()}
    <rect x="70" y="122" width="14" height="22" rx="6" fill="#9aa3bb" stroke="${e}" stroke-width="3"/>
    <rect x="96" y="122" width="14" height="22" rx="6" fill="#9aa3bb" stroke="${e}" stroke-width="3"/>
    <ellipse cx="92" cy="108" rx="44" ry="28" fill="#b8c0d4" stroke="${e}" stroke-width="4"/>
    ${w(78,96,14,8)}
    <circle cx="58" cy="70" r="28" fill="#b8c0d4" stroke="${e}" stroke-width="4"/>
    <path d="M36 64 q-22 -8 -18 18 q4 16 22 8" fill="#c5cde0" stroke="${e}" stroke-width="3"/>
    <path d="M36 68 q-12 0 -10 12 q2 8 12 4" fill="#e8b8c8"/>
    <ellipse cx="118" cy="58" rx="16" ry="20" fill="#b8c0d4" stroke="${e}" stroke-width="3"/>
    <ellipse cx="118" cy="62" rx="8" ry="12" fill="#e8b8c8"/>
    <path d="M48 88 q-26 22 -6 48 q8 2 12 -8" fill="#9aa3bb" stroke="${e}" stroke-width="3"/>
    <path d="M42 112 q-4 8 6 10" fill="none" stroke="#8b95ad" stroke-width="3"/>
    <path d="M70 86 q8 18 -2 28" fill="#f4f1ea" stroke="${e}" stroke-width="2.5"/>
    <path d="M78 90 q8 16 0 26" fill="#f4f1ea" stroke="${e}" stroke-width="2.5"/>
    <circle cx="50" cy="64" r="6" fill="#fff"/><circle cx="50" cy="64" r="3" fill="${e}"/>
    <circle cx="52" cy="62" r="1.1" fill="#fff"/>
  `,"illu illu-bob")}function et(){return n(`
    ${y()}
    <rect x="70" y="122" width="12" height="22" rx="5" fill="#e2a84a" stroke="${e}" stroke-width="3"/>
    <rect x="90" y="122" width="12" height="22" rx="5" fill="#e2a84a" stroke="${e}" stroke-width="3"/>
    <ellipse cx="86" cy="124" rx="30" ry="16" fill="#f4c96b" stroke="${e}" stroke-width="4"/>
    <rect x="74" y="48" width="22" height="78" rx="11" fill="#f4c96b" stroke="${e}" stroke-width="4"/>
    ${w(82,70,6,16)}
    <ellipse cx="64" cy="68" rx="8" ry="6" fill="#c47a3a"/>
    <ellipse cx="92" cy="86" rx="9" ry="7" fill="#c47a3a"/>
    <ellipse cx="70" cy="102" rx="8" ry="6" fill="#c47a3a"/>
    <ellipse cx="94" cy="114" rx="9" ry="7" fill="#c47a3a"/>
    <ellipse cx="80" cy="38" rx="20" ry="16" fill="#f4c96b" stroke="${e}" stroke-width="4"/>
    <ellipse cx="62" cy="36" rx="7" ry="10" fill="#f4c96b" stroke="${e}" stroke-width="3"/>
    <rect x="70" y="16" width="6" height="16" rx="3" fill="#c47a3a" stroke="${e}" stroke-width="2"/>
    <rect x="86" y="14" width="6" height="16" rx="3" fill="#c47a3a" stroke="${e}" stroke-width="2"/>
    <circle cx="70" cy="16" r="4" fill="#a85d28"/>
    <circle cx="86" cy="14" r="4" fill="#a85d28"/>
    <circle cx="68" cy="36" r="5" fill="#fff"/><circle cx="68" cy="36" r="2.5" fill="${e}"/>
    <ellipse cx="56" cy="44" rx="8" ry="5" fill="#e2b07a"/>
    <path d="M104 56 q8 18 2 36" fill="none" stroke="#c47a3a" stroke-width="4" stroke-linecap="round"/>
  `,"illu illu-bob")}function tt(){return n(`
    ${y()}
    <path d="M44 108 q-18 16 4 28" fill="none" stroke="#c47a3a" stroke-width="8" stroke-linecap="round"/>
    <path d="M116 108 q18 16 -4 28" fill="none" stroke="#c47a3a" stroke-width="8" stroke-linecap="round"/>
    <ellipse cx="80" cy="116" rx="32" ry="22" fill="#c47a3a" stroke="${e}" stroke-width="4"/>
    <circle cx="80" cy="68" r="28" fill="#c47a3a" stroke="${e}" stroke-width="4"/>
    ${w(70,58,10,6)}
    <circle cx="52" cy="60" r="13" fill="#f4d7b0" stroke="${e}" stroke-width="3"/>
    <circle cx="108" cy="60" r="13" fill="#f4d7b0" stroke="${e}" stroke-width="3"/>
    <ellipse cx="80" cy="80" rx="22" ry="18" fill="#f4d7b0"/>
    ${D(80,70)}
    <ellipse cx="80" cy="86" rx="7" ry="5" fill="#e2b07a"/>
    <path d="M70 92 q10 8 20 0" fill="none" stroke="${e}" stroke-width="2.5"/>
  `,"illu illu-wiggle")}function lt(){return n(`
    ${y()}
    <ellipse cx="80" cy="92" rx="32" ry="46" fill="#2d2150" stroke="${e}" stroke-width="4"/>
    ${w(68,70,8,14)}
    <ellipse cx="80" cy="104" rx="20" ry="30" fill="#fffaf4"/>
    <circle cx="80" cy="48" r="20" fill="#2d2150" stroke="${e}" stroke-width="3"/>
    <ellipse cx="80" cy="56" rx="12" ry="8" fill="#fffaf4"/>
    <circle cx="72" cy="46" r="5" fill="#fff"/><circle cx="88" cy="46" r="5" fill="#fff"/>
    <circle cx="72" cy="46" r="2.5" fill="${e}"/><circle cx="88" cy="46" r="2.5" fill="${e}"/>
    <polygon points="80,54 96,62 80,66" fill="#ff8a3d" stroke="${e}" stroke-width="2"/>
    <ellipse cx="46" cy="92" rx="11" ry="18" fill="#ff8a3d" stroke="${e}" stroke-width="3"/>
    <ellipse cx="114" cy="92" rx="11" ry="18" fill="#ff8a3d" stroke="${e}" stroke-width="3"/>
    <path d="M64 136 q8 10 16 0 q8 10 16 0" fill="#ff8a3d" stroke="${e}" stroke-width="3"/>
  `,"illu illu-bob")}function rt(){return n(`
    <ellipse cx="70" cy="148" rx="28" ry="6" fill="rgba(45,33,80,.1)"/>
    <polygon points="112,80 146,52 140,80 146,108" fill="#7c5cff" stroke="${e}" stroke-width="3"/>
    <ellipse cx="76" cy="82" rx="42" ry="26" fill="#5ad2ff" stroke="${e}" stroke-width="4"/>
    ${w(60,72,12,8)}
    <path d="M70 66 q8 16 0 32 M86 64 q8 18 0 36" fill="none" stroke="rgba(255,255,255,.45)" stroke-width="3"/>
    <polygon points="76,56 88,44 96,58" fill="#7c5cff" stroke="${e}" stroke-width="3"/>
    <polygon points="76,108 90,122 98,106" fill="#7c5cff" stroke="${e}" stroke-width="3"/>
    <path d="M48 82 q-8 0 -6 10" fill="none" stroke="#3aa8d4" stroke-width="3"/>
    <circle cx="54" cy="76" r="7" fill="#fff"/><circle cx="54" cy="76" r="3.2" fill="${e}"/>
    <circle cx="56" cy="74" r="1.2" fill="#fff"/>
    <path d="M62 90 q12 8 22 0" fill="none" stroke="${e}" stroke-width="2.5"/>
    <circle cx="118" cy="48" r="5" fill="rgba(255,255,255,.55)" stroke="#cfefff" stroke-width="2"/>
    <circle cx="132" cy="40" r="3.5" fill="rgba(255,255,255,.45)"/>
  `,"illu illu-float")}function it(){return n(`
    ${y()}
    <ellipse cx="52" cy="128" rx="16" ry="8" fill="#3bb354" stroke="${e}" stroke-width="3"/>
    <ellipse cx="108" cy="128" rx="16" ry="8" fill="#3bb354" stroke="${e}" stroke-width="3"/>
    <ellipse cx="80" cy="108" rx="46" ry="26" fill="#4cd964" stroke="${e}" stroke-width="4"/>
    ${w(64,98,12,7)}
    <ellipse cx="80" cy="114" rx="18" ry="9" fill="#2f9e4a"/>
    <circle cx="56" cy="72" r="18" fill="#4cd964" stroke="${e}" stroke-width="4"/>
    <circle cx="104" cy="72" r="18" fill="#4cd964" stroke="${e}" stroke-width="4"/>
    <circle cx="56" cy="70" r="8" fill="#fff"/><circle cx="104" cy="70" r="8" fill="#fff"/>
    <circle cx="56" cy="70" r="4" fill="${e}"/><circle cx="104" cy="70" r="4" fill="${e}"/>
    <circle cx="58" cy="68" r="1.4" fill="#fff"/><circle cx="106" cy="68" r="1.4" fill="#fff"/>
    <path d="M64 104 q16 12 32 0" fill="none" stroke="${e}" stroke-width="3" stroke-linecap="round"/>
    <circle cx="68" cy="100" r="4" fill="#3bb354"/>
    <circle cx="96" cy="102" r="4" fill="#3bb354"/>
  `,"illu illu-bob")}function ct(){return n(`
    ${y()}
    <ellipse cx="80" cy="112" rx="40" ry="26" fill="#8b5a2b" stroke="${e}" stroke-width="4"/>
    ${w(66,100,12,7)}
    <ellipse cx="80" cy="118" rx="16" ry="9" fill="#c48a5a"/>
    <circle cx="80" cy="68" r="28" fill="#8b5a2b" stroke="${e}" stroke-width="4"/>
    <circle cx="52" cy="46" r="13" fill="#8b5a2b" stroke="${e}" stroke-width="3"/>
    <circle cx="108" cy="46" r="13" fill="#8b5a2b" stroke="${e}" stroke-width="3"/>
    <circle cx="52" cy="46" r="6" fill="#e7c9a5"/>
    <circle cx="108" cy="46" r="6" fill="#e7c9a5"/>
    <ellipse cx="80" cy="82" rx="16" ry="12" fill="#e7c9a5"/>
    ${D(80,64)}
    <ellipse cx="80" cy="80" rx="8" ry="6" fill="#5a3a1a"/>
    <path d="M70 90 q10 7 20 0" fill="none" stroke="${e}" stroke-width="2.5"/>
  `,"illu illu-bob")}function ot(){return n(`
    ${y()}
    <path d="M118 104 q20 16 4 32" fill="none" stroke="#ff8a3d" stroke-width="8" stroke-linecap="round"/>
    <ellipse cx="80" cy="112" rx="38" ry="24" fill="#ff8a3d" stroke="${e}" stroke-width="4"/>
    ${w(66,102,10,6)}
    <path d="M60 104 v16 M78 100 v18 M98 104 v16" stroke="${e}" stroke-width="4" stroke-linecap="round"/>
    <ellipse cx="80" cy="118" rx="14" ry="8" fill="#fff6e8"/>
    <circle cx="80" cy="68" r="28" fill="#ff8a3d" stroke="${e}" stroke-width="4"/>
    <polygon points="54,52 58,28 74,52" fill="#ff8a3d" stroke="${e}" stroke-width="3"/>
    <polygon points="106,52 102,28 86,52" fill="#ff8a3d" stroke="${e}" stroke-width="3"/>
    <polygon points="58,48 60,36 68,48" fill="${e}"/>
    <polygon points="102,48 100,36 92,48" fill="${e}"/>
    <path d="M64 50 v16 M80 44 v14 M96 50 v16" stroke="${e}" stroke-width="4" stroke-linecap="round"/>
    ${D(80,66)}
    <ellipse cx="80" cy="82" rx="12" ry="8" fill="#fff6e8"/>
    <path d="M80 78 l-4 5 8 0 z" fill="#2d2150"/>
    <path d="M70 90 q10 6 20 0" fill="none" stroke="${e}" stroke-width="2.5"/>
  `,"illu illu-wiggle")}function st(){return n(`
    ${y()}
    <rect x="60" y="122" width="11" height="22" rx="5" fill="#2d2150" stroke="${e}" stroke-width="3"/>
    <rect x="78" y="124" width="11" height="20" rx="5" fill="#f7f7f4" stroke="${e}" stroke-width="3"/>
    <rect x="98" y="124" width="11" height="20" rx="5" fill="#2d2150" stroke="${e}" stroke-width="3"/>
    <rect x="114" y="122" width="11" height="22" rx="5" fill="#f7f7f4" stroke="${e}" stroke-width="3"/>
    <ellipse cx="94" cy="108" rx="40" ry="24" fill="#f7f7f4" stroke="${e}" stroke-width="4"/>
    <path d="M70 96 v22 M86 92 v26 M104 96 v22 M118 100 v18" stroke="${e}" stroke-width="5" stroke-linecap="round"/>
    <rect x="50" y="70" width="22" height="42" rx="11" fill="#f7f7f4" stroke="${e}" stroke-width="4"/>
    <path d="M58 78 v24 M70 82 v22" stroke="${e}" stroke-width="4"/>
    <ellipse cx="44" cy="62" rx="20" ry="14" fill="#f7f7f4" stroke="${e}" stroke-width="4"/>
    <path d="M50 54 v16 M62 56 v12" stroke="${e}" stroke-width="4"/>
    <path d="M64 44 q16 -20 2 16" fill="#2d2150" stroke="${e}" stroke-width="2"/>
    <circle cx="32" cy="58" r="5" fill="#fff"/><circle cx="32" cy="58" r="2.5" fill="${e}"/>
    <ellipse cx="26" cy="66" rx="7" ry="5" fill="#e8e4dc"/>
  `,"illu illu-bob")}function at(){return n(`
    ${y()}
    <ellipse cx="80" cy="114" rx="38" ry="24" fill="#fff" stroke="${e}" stroke-width="4"/>
    <ellipse cx="56" cy="122" rx="12" ry="10" fill="${e}"/>
    <ellipse cx="104" cy="122" rx="12" ry="10" fill="${e}"/>
    <circle cx="80" cy="68" r="28" fill="#fff" stroke="${e}" stroke-width="4"/>
    ${w(70,58,9,6)}
    <circle cx="52" cy="46" r="13" fill="${e}"/>
    <circle cx="108" cy="46" r="13" fill="${e}"/>
    <ellipse cx="66" cy="68" rx="11" ry="13" fill="${e}"/>
    <ellipse cx="94" cy="68" rx="11" ry="13" fill="${e}"/>
    <circle cx="68" cy="68" r="4.5" fill="#fff"/><circle cx="96" cy="68" r="4.5" fill="#fff"/>
    <circle cx="68" cy="68" r="2.3" fill="${e}"/><circle cx="96" cy="68" r="2.3" fill="${e}"/>
    <ellipse cx="80" cy="84" rx="8" ry="6" fill="#f4f1ea"/>
    <ellipse cx="80" cy="84" rx="4" ry="3" fill="#2d2150"/>
    <path d="M70 92 q10 6 20 0" fill="none" stroke="${e}" stroke-width="2.5"/>
  `,"illu illu-bob")}function nt(){return n(`
    <ellipse cx="70" cy="148" rx="36" ry="6" fill="rgba(45,33,80,.1)"/>
    <path d="M118 78 l28 -18 -8 22 18 16 -30 -4" fill="#4a7fe0" stroke="${e}" stroke-width="3"/>
    <ellipse cx="76" cy="90" rx="52" ry="28" fill="#5b8def" stroke="${e}" stroke-width="4"/>
    ${w(54,80,16,10)}
    <ellipse cx="76" cy="104" rx="22" ry="10" fill="#89b4ff"/>
    <ellipse cx="46" cy="104" rx="16" ry="8" fill="#4a7fe0" stroke="${e}" stroke-width="3"/>
    <circle cx="48" cy="82" r="6" fill="#fff"/><circle cx="48" cy="82" r="3" fill="${e}"/>
    <path d="M40 96 q12 8 28 2" fill="none" stroke="${e}" stroke-width="2.5"/>
    <path d="M58 62 q2 -20 12 -6" fill="none" stroke="#cfe4ff" stroke-width="6" stroke-linecap="round"/>
    <circle cx="64" cy="46" r="4" fill="rgba(255,255,255,.5)"/>
    <circle cx="70" cy="36" r="3" fill="rgba(255,255,255,.4)"/>
  `,"illu illu-float")}function ft(){return n(`
    <path d="M72 36 q-6 -16 2 -24 M88 36 q6 -16 -2 -24" fill="none" stroke="${e}" stroke-width="3" stroke-linecap="round"/>
    <circle cx="74" cy="14" r="3" fill="#ffd56a"/>
    <circle cx="86" cy="14" r="3" fill="#ffd56a"/>
    <ellipse cx="80" cy="84" rx="8" ry="30" fill="#5a3a1a" stroke="${e}" stroke-width="2"/>
    <ellipse cx="48" cy="60" rx="30" ry="24" fill="#c77dff" stroke="${e}" stroke-width="3"/>
    <ellipse cx="112" cy="60" rx="30" ry="24" fill="#c77dff" stroke="${e}" stroke-width="3"/>
    <ellipse cx="50" cy="104" rx="24" ry="18" fill="#7c5cff" stroke="${e}" stroke-width="3"/>
    <ellipse cx="110" cy="104" rx="24" ry="18" fill="#7c5cff" stroke="${e}" stroke-width="3"/>
    <circle cx="46" cy="58" r="10" fill="#ffd56a" stroke="${e}" stroke-width="2"/>
    <circle cx="114" cy="58" r="10" fill="#ffd56a" stroke="${e}" stroke-width="2"/>
    <circle cx="46" cy="58" r="4" fill="#ff8a3d"/>
    <circle cx="114" cy="58" r="4" fill="#ff8a3d"/>
    <circle cx="52" cy="104" r="6" fill="#ffb6c8"/>
    <circle cx="108" cy="104" r="6" fill="#ffb6c8"/>
  `,"illu illu-float")}function dt(){return n(`
    ${y()}
    <ellipse cx="76" cy="96" rx="34" ry="24" fill="#5ad2ff" stroke="${e}" stroke-width="4"/>
    ${w(64,86,10,6)}
    <path d="M58 90 q-20 -22 10 -34 q8 10 4 24" fill="#7c5cff" stroke="${e}" stroke-width="3"/>
    <path d="M88 108 q18 6 16 24 q-12 2 -24 -4" fill="#3eb6e8" stroke="${e}" stroke-width="3"/>
    <circle cx="112" cy="70" r="18" fill="#5ad2ff" stroke="${e}" stroke-width="4"/>
    <polygon points="126,70 146,76 126,84" fill="#ff8a3d" stroke="${e}" stroke-width="3"/>
    <circle cx="116" cy="66" r="5.5" fill="#fff"/><circle cx="116" cy="66" r="2.8" fill="${e}"/>
    <circle cx="118" cy="65" r="1" fill="#fff"/>
    <path d="M54 128 l8 12 8 -4 8 4 8 -12" fill="#ff8a3d" stroke="${e}" stroke-width="3"/>
  `,"illu illu-float")}function ht(){return n(`
    ${y()}
    <ellipse cx="118" cy="118" rx="10" ry="8" fill="#fff" stroke="${e}" stroke-width="3"/>
    <ellipse cx="80" cy="116" rx="32" ry="22" fill="#f7f0e8" stroke="${e}" stroke-width="4"/>
    ${w(68,106,10,6)}
    <circle cx="80" cy="76" r="26" fill="#f7f0e8" stroke="${e}" stroke-width="4"/>
    <ellipse cx="64" cy="36" rx="8" ry="26" fill="#f7f0e8" stroke="${e}" stroke-width="3"/>
    <ellipse cx="96" cy="36" rx="8" ry="26" fill="#f7f0e8" stroke="${e}" stroke-width="3"/>
    <ellipse cx="64" cy="38" rx="4" ry="16" fill="#ffd0dc"/>
    <ellipse cx="96" cy="38" rx="4" ry="16" fill="#ffd0dc"/>
    ${D(80,74)}
    <ellipse cx="80" cy="88" rx="7" ry="5" fill="#ffb6c8"/>
    <path d="M80 90 v6" stroke="${e}" stroke-width="2"/>
    <path d="M70 96 q10 6 20 0" fill="none" stroke="${e}" stroke-width="2.5"/>
  `,"illu illu-bob")}function pt(){return n(`
    ${y()}
    <ellipse cx="124" cy="112" rx="22" ry="12" fill="#ff8a3d" stroke="${e}" stroke-width="3"/>
    <ellipse cx="138" cy="112" rx="8" ry="8" fill="#fff" stroke="${e}" stroke-width="2"/>
    <ellipse cx="80" cy="114" rx="34" ry="22" fill="#ff8a3d" stroke="${e}" stroke-width="4"/>
    ${w(66,104,10,6)}
    <ellipse cx="80" cy="120" rx="16" ry="8" fill="#fff"/>
    <rect x="58" y="126" width="10" height="16" rx="4" fill="#2d2150" stroke="${e}" stroke-width="2"/>
    <rect x="92" y="126" width="10" height="16" rx="4" fill="#2d2150" stroke="${e}" stroke-width="2"/>
    <circle cx="80" cy="72" r="26" fill="#ff8a3d" stroke="${e}" stroke-width="4"/>
    <polygon points="54,60 56,32 74,58" fill="#ff8a3d" stroke="${e}" stroke-width="3"/>
    <polygon points="106,60 104,32 86,58" fill="#ff8a3d" stroke="${e}" stroke-width="3"/>
    <polygon points="58,54 58,40 68,54" fill="#2d2150"/>
    <polygon points="102,54 102,40 92,54" fill="#2d2150"/>
    <ellipse cx="80" cy="86" rx="16" ry="10" fill="#fff"/>
    ${D(80,70)}
    <path d="M80 80 l-4 5 8 0 z" fill="#2d2150"/>
  `,"illu illu-bob")}const S={cow:He,pig:Qe,chicken:Ue,horse:Ye,sheep:Ke,duck:Ve,dog:_e,cat:Je,lion:Ze,elephant:Xe,giraffe:et,monkey:tt,penguin:lt,fish:rt,frog:it,bear:ct,tiger:ot,zebra:st,panda:at,whale:nt,butterfly:ft,bird:dt,rabbit:ht,fox:pt};function ut(){return n(`
    <ellipse cx="80" cy="96" rx="32" ry="36" fill="#ff3b5c" stroke="${e}" stroke-width="4"/>
    <path d="M80 64 q8 -24 20 -20" fill="none" stroke="#4cd964" stroke-width="6" stroke-linecap="round"/>
    <ellipse cx="64" cy="84" rx="10" ry="8" fill="rgba(255,255,255,.35)"/>
  `,"illu illu-bob")}function kt(){return n(`
    <circle cx="80" cy="84" r="36" fill="#ff8a3d" stroke="${e}" stroke-width="4"/>
    <path d="M44 84 h72 M80 48 v72 M56 56 q24 28 48 0 M56 112 q24 -28 48 0" fill="none" stroke="#fff" stroke-width="4"/>
  `,"illu illu-bob")}function yt(){return n(`
    <path d="M48 48 q60 -10 72 64 q-40 18 -70 8 q8 -36  -2 -72z" fill="#ffd56a" stroke="${e}" stroke-width="4"/>
    <path d="M50 50 q8 -10 16 -2" fill="#6b3b1f"/>
  `,"illu illu-bob")}function wt(){return n(`
    <circle cx="80" cy="70" r="14" fill="#7c5cff" stroke="${e}" stroke-width="3"/>
    <circle cx="62" cy="88" r="14" fill="#7c5cff" stroke="${e}" stroke-width="3"/>
    <circle cx="98" cy="88" r="14" fill="#7c5cff" stroke="${e}" stroke-width="3"/>
    <circle cx="80" cy="106" r="14" fill="#6a48e6" stroke="${e}" stroke-width="3"/>
    <path d="M80 56 q8 -18 20 -12" fill="none" stroke="#4cd964" stroke-width="5"/>
  `,"illu illu-bob")}function xt(){return n(`
    <path d="M80 40 c28 8 40 40 0 72 c-40 -32 -28 -64 0 -72z" fill="#ff3b5c" stroke="${e}" stroke-width="4"/>
    <path d="M60 44 h40 l-20 -16z" fill="#4cd964" stroke="${e}" stroke-width="3"/>
    <circle cx="70" cy="70" r="3" fill="#ffd56a"/><circle cx="90" cy="78" r="3" fill="#ffd56a"/>
    <circle cx="78" cy="92" r="3" fill="#ffd56a"/>
  `,"illu illu-bob")}function $t(){return n(`
    <polygon points="80,40 108,128 52,128" fill="#ff8a3d" stroke="${e}" stroke-width="4"/>
    <path d="M70 40 q10 -24 20 0" fill="#4cd964" stroke="${e}" stroke-width="3"/>
  `,"illu illu-bob")}function mt(){return n(`
    <circle cx="80" cy="80" r="26" fill="#ffd56a" stroke="${e}" stroke-width="4"/>
    <g stroke="#ff8a3d" stroke-width="6" stroke-linecap="round">
      <path d="M80 18 v16 M80 126 v16 M18 80 h16 M126 80 h16 M34 34 l12 12 M114 114 l12 12 M34 126 l12 -12 M114 46 l12 -12"/>
    </g>
  `,"illu illu-spin-slow")}function gt(){return n(`
    <path d="M90 30 a46 46 0 1 0 0 100 a36 36 0 1 1 0 -100" fill="#ffe9a8" stroke="${e}" stroke-width="4"/>
    <circle cx="88" cy="70" r="6" fill="#f0d48a"/>
    <circle cx="100" cy="96" r="4" fill="#f0d48a"/>
  `,"illu illu-bob")}function bt(){return n(`
    <rect x="70" y="100" width="20" height="36" rx="4" fill="#8b5a2b" stroke="${e}" stroke-width="3"/>
    <circle cx="80" cy="70" r="36" fill="#4cd964" stroke="${e}" stroke-width="4"/>
    <circle cx="56" cy="84" r="18" fill="#3dbb55"/>
    <circle cx="104" cy="84" r="18" fill="#3dbb55"/>
  `,"illu illu-bob")}function vt(){return n(`
    <path d="M40 100 q20 -70 80 -80 q-10 70 -80 80z" fill="#4cd964" stroke="${e}" stroke-width="4"/>
    <path d="M48 96 q30 -36 64 -64" fill="none" stroke="${e}" stroke-width="3"/>
  `,"illu illu-float")}function Mt(){return n(`
    <ellipse cx="80" cy="110" rx="50" ry="12" fill="#7c5cff" stroke="${e}" stroke-width="4"/>
    <rect x="50" y="50" width="60" height="60" rx="8" fill="#7c5cff" stroke="${e}" stroke-width="4"/>
    <rect x="50" y="86" width="60" height="10" fill="#ffd56a"/>
  `,"illu illu-bob")}function qt(){return n(`
    <rect x="36" y="78" width="88" height="44" rx="8" fill="#f4d7b0" stroke="${e}" stroke-width="4"/>
    <path d="M36 90 q18 -16 36 0 q18 16 36 0 q16 -14 16 0" fill="#ff7ad9" stroke="${e}" stroke-width="3"/>
    <rect x="74" y="46" width="12" height="34" fill="#ffd56a" stroke="${e}" stroke-width="2"/>
    <circle cx="80" cy="42" r="8" fill="#ff3b5c"/>
  `,"illu illu-bob")}function St(){return n(`
    <polygon points="80,24 124,80 80,136 36,80" fill="#ff3b5c" stroke="${e}" stroke-width="4"/>
    <path d="M80 24 L80 136 M36 80 H124" stroke="#fff" stroke-width="3"/>
    <path d="M80 136 q16 16 8 28 q16 8 4 18" fill="none" stroke="#7c5cff" stroke-width="4"/>
  `,"illu illu-float")}function At(){return n(`
    <path d="M28 88 q52 -60 104 0z" fill="#ff3b5c" stroke="${e}" stroke-width="4"/>
    <path d="M80 88 v36 q8 12 18 8" fill="none" stroke="${e}" stroke-width="5" stroke-linecap="round"/>
    <path d="M28 88 q18 16 34 0 q18 16 36 0 q18 16 34 0" fill="#ff7a9c"/>
  `,"illu illu-bob")}function Lt(){return n(`
    <polygon points="80,148 52,84 108,84" fill="#e0a15a" stroke="${e}" stroke-width="4"/>
    <circle cx="80" cy="70" r="28" fill="#ff7ad9" stroke="${e}" stroke-width="4"/>
    <circle cx="80" cy="48" r="18" fill="#fff" stroke="${e}" stroke-width="3"/>
  `,"illu illu-bob")}function Ft(){return n(`
    <ellipse cx="80" cy="70" rx="28" ry="36" fill="#ff3b5c" stroke="${e}" stroke-width="4"/>
    <path d="M80 106 l-6 10 h12z" fill="#ff3b5c" stroke="${e}" stroke-width="2"/>
    <path d="M80 116 q-10 16 0 28" fill="none" stroke="${e}" stroke-width="3"/>
  `,"illu illu-float")}function Et(){return n(`
    <circle cx="80" cy="54" r="16" fill="#ffd56a" stroke="${e}" stroke-width="3"/>
    <circle cx="50" cy="70" r="16" fill="#ff7ad9" stroke="${e}" stroke-width="3"/>
    <circle cx="110" cy="70" r="16" fill="#ff7ad9" stroke="${e}" stroke-width="3"/>
    <circle cx="60" cy="100" r="16" fill="#ff7ad9" stroke="${e}" stroke-width="3"/>
    <circle cx="100" cy="100" r="16" fill="#ff7ad9" stroke="${e}" stroke-width="3"/>
    <rect x="76" y="108" width="8" height="28" fill="#4cd964"/>
  `,"illu illu-bob")}function jt(){return n(`
    <rect x="28" y="70" width="104" height="40" rx="8" fill="#ff3b5c" stroke="${e}" stroke-width="4"/>
    <rect x="78" y="48" width="40" height="28" rx="6" fill="#5ad2ff" stroke="${e}" stroke-width="3"/>
    <circle cx="52" cy="114" r="12" fill="${e}"/><circle cx="114" cy="114" r="12" fill="${e}"/>
    <rect x="36" y="78" width="16" height="16" fill="#ffd56a"/>
  `,"illu illu-bob")}function Tt(){return n(`
    <ellipse cx="80" cy="100" rx="46" ry="20" fill="#c47a3a" stroke="${e}" stroke-width="4"/>
    <ellipse cx="80" cy="92" rx="34" ry="12" fill="#8b5a2b"/>
    <ellipse cx="68" cy="86" rx="10" ry="12" fill="#fff" stroke="${e}" stroke-width="3"/>
    <ellipse cx="92" cy="86" rx="10" ry="12" fill="#fff" stroke="${e}" stroke-width="3"/>
  `,"illu illu-bob")}function Ct(){return n(`
    <circle cx="80" cy="86" r="36" fill="#ff8a3d" stroke="${e}" stroke-width="4"/>
    <path d="M80 50 q10 -16 22 -8" fill="none" stroke="#4cd964" stroke-width="5"/>
    <path d="M80 86 l20 -12 M80 86 l12 20 M80 86 l-22 8" stroke="rgba(255,255,255,.4)" stroke-width="3"/>
  `,"illu illu-bob")}function Nt(){return n(`
    <path d="M80 28 l48 96 h-96z" fill="#ffd56a" stroke="${e}" stroke-width="4"/>
    <path d="M80 40 l36 76 h-72z" fill="#ff8a3d"/>
    <circle cx="80" cy="84" r="7" fill="#ff3b5c"/>
    <circle cx="68" cy="100" r="6" fill="#ff3b5c"/>
    <circle cx="94" cy="104" r="6" fill="#ff3b5c"/>
  `,"illu illu-bob")}function Ot(){return n(`
    <polygon points="30,100 30,60 55,82 80,42 105,82 130,60 130,100" fill="#ffd56a" stroke="${e}" stroke-width="4"/>
    <rect x="30" y="96" width="100" height="16" fill="#ffd56a" stroke="${e}" stroke-width="4"/>
    <circle cx="80" cy="42" r="6" fill="#ff3b5c"/>
  `,"illu illu-bob")}function Wt(){return n(`
    <path d="M28 120 a52 52 0 0 1 104 0" fill="none" stroke="#ff3b5c" stroke-width="10"/>
    <path d="M38 120 a42 42 0 0 1 84 0" fill="none" stroke="#ff8a3d" stroke-width="10"/>
    <path d="M48 120 a32 32 0 0 1 64 0" fill="none" stroke="#ffd56a" stroke-width="10"/>
    <path d="M58 120 a22 22 0 0 1 44 0" fill="none" stroke="#4cd964" stroke-width="10"/>
    <path d="M68 120 a12 12 0 0 1 24 0" fill="none" stroke="#5ad2ff" stroke-width="10"/>
  `,"illu illu-bob")}function Dt(){return n(`
    <ellipse cx="80" cy="100" rx="24" ry="34" fill="#c47a3a" stroke="${e}" stroke-width="4"/>
    <rect x="74" y="28" width="12" height="50" rx="4" fill="#e0a15a" stroke="${e}" stroke-width="3"/>
    <path d="M68 90 q12 10 24 0" fill="none" stroke="${e}" stroke-width="3"/>
  `,"illu illu-bob")}function It(){return n(`
    <path d="M28 100 a52 52 0 0 1 104 0z" fill="#4cd964" stroke="${e}" stroke-width="4"/>
    <path d="M40 100 a40 40 0 0 1 80 0z" fill="#ff5b78"/>
    <circle cx="70" cy="88" r="3" fill="${e}"/><circle cx="90" cy="86" r="3" fill="${e}"/>
    <circle cx="80" cy="96" r="3" fill="${e}"/>
  `,"illu illu-bob")}function Pt(){return n(`
    <circle cx="80" cy="86" r="36" fill="#ff7ad9" stroke="${e}" stroke-width="4"/>
    <path d="M50 70 q30 10 60 0 M48 90 q32 12 64 0 M60 54 q20 40 20 64" fill="none" stroke="#fff" stroke-width="3"/>
    <path d="M110 110 q20 16 8 28" fill="none" stroke="#ff7ad9" stroke-width="6"/>
  `,"illu illu-bob")}function Bt(){return n(`
    <rect x="28" y="48" width="104" height="16" rx="4" fill="#ff3b5c" stroke="${e}" stroke-width="3"/>
    <rect x="32" y="68" width="96" height="16" rx="4" fill="#ff8a3d" stroke="${e}" stroke-width="3"/>
    <rect x="36" y="88" width="88" height="16" rx="4" fill="#ffd56a" stroke="${e}" stroke-width="3"/>
    <rect x="40" y="108" width="80" height="16" rx="4" fill="#4cd964" stroke="${e}" stroke-width="3"/>
  `,"illu illu-bob")}function Gt(){return n(`
    <ellipse cx="80" cy="88" rx="28" ry="38" fill="#fff6d8" stroke="${e}" stroke-width="4"/>
    <ellipse cx="70" cy="76" rx="8" ry="6" fill="rgba(255,255,255,.7)"/>
  `,"illu illu-bob")}function zt(){return n(`
    <rect x="52" y="48" width="56" height="76" rx="10" fill="#ffb24d" stroke="${e}" stroke-width="4"/>
    <rect x="52" y="48" width="56" height="18" fill="#5ad2ff" stroke="${e}" stroke-width="4"/>
    <path d="M80 48 v-16 h16" fill="none" stroke="${e}" stroke-width="4"/>
    <ellipse cx="80" cy="90" rx="16" ry="8" fill="#ff8a3d"/>
  `,"illu illu-bob")}function Rt(){return n(`
    <polygon points="80,24 94,62 134,62 102,86 114,126 80,102 46,126 58,86 26,62 66,62" fill="#ffd56a" stroke="${e}" stroke-width="4"/>
  `,"illu illu-spin-slow")}function Ht(){return n(`
    <rect x="36" y="40" width="88" height="84" rx="8" fill="#5ad2ff" stroke="${e}" stroke-width="4"/>
    <rect x="78" y="40" width="8" height="84" fill="#2d2150"/>
    <rect x="48" y="58" width="22" height="8" rx="3" fill="#fff"/>
    <rect x="90" y="58" width="22" height="8" rx="3" fill="#fff"/>
  `,"illu illu-bob")}const f={apple:ut,ball:kt,banana:yt,grapes:wt,strawberry:xt,carrot:$t,sun:mt,moon:gt,tree:bt,leaf:vt,hat:Mt,kite:St,cake:qt,umbrella:At,icecream:Lt,balloon:Ft,flower:Et,firetruck:jt,nest:Tt,orange:Ct,pizza:Nt,crown:Ot,rainbow:Wt,violin:Dt,watermelon:It,yarn:Pt,xylophone:Bt,egg:Gt,juice:zt,star:Rt,book:Ht};function O(t){return n(`
    <rect x="22" y="22" width="116" height="116" rx="24" fill="#fff6d8" stroke="${e}" stroke-width="4"/>
    <text x="80" y="108" text-anchor="middle" font-size="84" font-family="Nunito, sans-serif" font-weight="900" fill="#7c5cff">${t}</text>
  `,"illu illu-bob")}function F(t){return n(`
    <rect x="22" y="22" width="116" height="116" rx="24" fill="#e8f8ff" stroke="${e}" stroke-width="4"/>
    <text x="80" y="112" text-anchor="middle" font-size="84" font-family="Nunito, sans-serif" font-weight="900" fill="#2d2150">${t}</text>
  `,"illu illu-bob")}function Y(t){const l={usa:`<rect x="20" y="40" width="120" height="80" rx="6" fill="#fff" stroke="${e}" stroke-width="4"/>
      <g fill="#ff3b5c">${[0,16,32,48,64].map(i=>`<rect x="20" y="${40+i}" width="120" height="8"/>`).join("")}
      </g><rect x="20" y="40" width="50" height="40" fill="#3c3b6e"/>`,uk:`<rect x="20" y="40" width="120" height="80" rx="6" fill="#012169" stroke="${e}" stroke-width="4"/>
      <path d="M20 40 L140 120 M140 40 L20 120" stroke="#fff" stroke-width="14"/>
      <path d="M20 40 L140 120 M140 40 L20 120" stroke="#c8102e" stroke-width="6"/>
      <path d="M80 40 v80 M20 80 h120" stroke="#fff" stroke-width="18"/>
      <path d="M80 40 v80 M20 80 h120" stroke="#c8102e" stroke-width="10"/>`,france:`<rect x="20" y="40" width="40" height="80" fill="#0055a4"/><rect x="60" y="40" width="40" height="80" fill="#fff"/><rect x="100" y="40" width="40" height="80" fill="#ef4135"/><rect x="20" y="40" width="120" height="80" rx="6" fill="none" stroke="${e}" stroke-width="4"/>`,japan:`<rect x="20" y="40" width="120" height="80" rx="6" fill="#fff" stroke="${e}" stroke-width="4"/><circle cx="80" cy="80" r="22" fill="#bc002d"/>`,australia:`<rect x="20" y="40" width="120" height="80" rx="6" fill="#012169" stroke="${e}" stroke-width="4"/><polygon points="96,70 100,82 112,82 102,90 106,102 96,94 86,102 90,90 80,82 92,82" fill="#fff"/>`,brazil:`<rect x="20" y="40" width="120" height="80" rx="6" fill="#009b3a" stroke="${e}" stroke-width="4"/><polygon points="80,52 128,80 80,108 32,80" fill="#fedf00"/><circle cx="80" cy="80" r="16" fill="#002776"/>`,egypt:`<rect x="20" y="40" width="120" height="27" fill="#ce1126"/><rect x="20" y="67" width="120" height="26" fill="#fff"/><rect x="20" y="93" width="120" height="27" fill="#000"/><rect x="20" y="40" width="120" height="80" rx="6" fill="none" stroke="${e}" stroke-width="4"/><polygon points="80,72 86,88 74,88" fill="#c09300"/>`,china:`<rect x="20" y="40" width="120" height="80" rx="6" fill="#de2910" stroke="${e}" stroke-width="4"/><polygon points="48,58 52,70 64,70 54,78 58,90 48,82 38,90 42,78 32,70 44,70" fill="#ffde00"/>`,india:`<rect x="20" y="40" width="120" height="27" fill="#ff9933"/><rect x="20" y="67" width="120" height="26" fill="#fff"/><rect x="20" y="93" width="120" height="27" fill="#138808"/><rect x="20" y="40" width="120" height="80" rx="6" fill="none" stroke="${e}" stroke-width="4"/><circle cx="80" cy="80" r="10" fill="none" stroke="#000080" stroke-width="3"/>`,canada:`<rect x="20" y="40" width="120" height="80" rx="6" fill="#fff" stroke="${e}" stroke-width="4"/><rect x="20" y="40" width="28" height="80" fill="#ff0000"/><rect x="112" y="40" width="28" height="80" fill="#ff0000"/><polygon points="80,56 88,72 104,72 92,84 96,100 80,90 64,100 68,84 56,72 72,72" fill="#ff0000"/>`,italy:`<rect x="20" y="40" width="40" height="80" fill="#009246"/><rect x="60" y="40" width="40" height="80" fill="#fff"/><rect x="100" y="40" width="40" height="80" fill="#ce2b37"/><rect x="20" y="40" width="120" height="80" rx="6" fill="none" stroke="${e}" stroke-width="4"/>`,mexico:`<rect x="20" y="40" width="40" height="80" fill="#006847"/><rect x="60" y="40" width="40" height="80" fill="#fff"/><rect x="100" y="40" width="40" height="80" fill="#ce1126"/><rect x="20" y="40" width="120" height="80" rx="6" fill="none" stroke="${e}" stroke-width="4"/><circle cx="80" cy="80" r="10" fill="#8b5a2b"/>`};return n(l[t]||l.usa,"illu illu-bob")}function ie(t){const l={liberty:`<rect x="60" y="110" width="40" height="24" fill="#8aa39a" stroke="${e}" stroke-width="3"/><rect x="72" y="58" width="16" height="54" fill="#6f9b8a" stroke="${e}" stroke-width="3"/><circle cx="80" cy="46" r="14" fill="#6f9b8a" stroke="${e}" stroke-width="3"/><rect x="92" y="28" width="6" height="22" fill="#ffd56a"/>`,eiffel:'<path d="M80 24 L96 132 H64z" fill="none" stroke="#c47a3a" stroke-width="6"/><path d="M68 70 H92 M62 100 H98" stroke="#c47a3a" stroke-width="5"/>',bigben:`<rect x="58" y="28" width="44" height="112" fill="#d8b36a" stroke="${e}" stroke-width="4"/><polygon points="58,28 80,10 102,28" fill="#8b5a2b"/><circle cx="80" cy="70" r="14" fill="#fff" stroke="${e}" stroke-width="3"/>`,pyramid:`<polygon points="80,28 140,128 20,128" fill="#e0c07a" stroke="${e}" stroke-width="4"/><polygon points="80,28 140,128 80,128" fill="#c9a45a"/>`,wall:`<rect x="20" y="72" width="120" height="36" fill="#c9a45a" stroke="${e}" stroke-width="4"/>${[20,44,68,92,116].map(i=>`<rect x="${i}" y="56" width="20" height="18" fill="#d8b36a" stroke="${e}" stroke-width="2"/>`).join("")}<path d="M20 108 q30 -30 60 -8 q30 20 60 -6" fill="none" stroke="#4cd964" stroke-width="6"/>`,opera:`<path d="M30 110 q18 -60 40 -4 q18 -70 40 0 q10 -40 28 4" fill="#f7f4ea" stroke="${e}" stroke-width="4"/><rect x="24" y="108" width="112" height="16" fill="#5ad2ff"/>`,taj:`<ellipse cx="80" cy="70" rx="28" ry="22" fill="#fff" stroke="${e}" stroke-width="3"/><rect x="44" y="80" width="72" height="44" fill="#fff" stroke="${e}" stroke-width="3"/><rect x="28" y="70" width="12" height="54" fill="#fff" stroke="${e}" stroke-width="2"/><rect x="120" y="70" width="12" height="54" fill="#fff" stroke="${e}" stroke-width="2"/>`,fuji:`<polygon points="80,28 140,120 20,120" fill="#7aa0c4" stroke="${e}" stroke-width="4"/><polygon points="80,28 104,70 56,70" fill="#fff"/>`,redeemer:`<rect x="72" y="70" width="16" height="58" fill="#f0e6d0" stroke="${e}" stroke-width="3"/><rect x="36" y="78" width="88" height="12" fill="#f0e6d0" stroke="${e}" stroke-width="3"/><circle cx="80" cy="58" r="14" fill="#f0e6d0" stroke="${e}" stroke-width="3"/><polygon points="20,128 80,96 140,128" fill="#4cd964"/>`,colosseum:`<rect x="28" y="48" width="104" height="72" rx="20" fill="#d8b36a" stroke="${e}" stroke-width="4"/>${[40,64,88,112].map(i=>`<ellipse cx="${i}" cy="84" rx="8" ry="18" fill="#8b5a2b"/>`).join("")}`};return n(`<ellipse cx="80" cy="140" rx="50" ry="8" fill="rgba(45,33,80,.12)"/>${l[t]||l.pyramid}`,"illu illu-bob")}function Se(t){const l={"north-america":"#ff8a3d","south-america":"#4cd964",europe:"#7c5cff",africa:"#ffd56a",asia:"#ff3b5c",oceania:"#5ad2ff",antarctica:"#fff"},i=r=>t===r?'filter="url(#glow)"':"";return`<svg viewBox="0 0 320 180" class="world-map" aria-hidden="true">
    <defs><filter id="glow"><feDropShadow dx="0" dy="0" stdDeviation="4" flood-color="#ffd56a"/></filter></defs>
    <rect x="0" y="0" width="320" height="180" rx="18" fill="#8fd3ff"/>
    <path data-id="north-america" ${i("north-america")} d="M40 38 l50 -8 28 18 -10 32 -40 10 -28 -12z" fill="${l["north-america"]}" stroke="${e}" stroke-width="3"/>
    <path data-id="south-america" ${i("south-america")} d="M78 90 l22 6 8 40 -18 20 -16 -18 -4 -36z" fill="${l["south-america"]}" stroke="${e}" stroke-width="3"/>
    <path data-id="europe" ${i("europe")} d="M150 40 l28 4 6 22 -24 8 -16 -10z" fill="${l.europe}" stroke="${e}" stroke-width="3"/>
    <path data-id="africa" ${i("africa")} d="M148 72 l32 4 10 40 -18 28 -28 -8 -8 -36z" fill="${l.africa}" stroke="${e}" stroke-width="3"/>
    <path data-id="asia" ${i("asia")} d="M186 32 l70 8 18 28 -20 30 -54 8 -28 -20z" fill="${l.asia}" stroke="${e}" stroke-width="3"/>
    <path data-id="oceania" ${i("oceania")} d="M250 110 l28 4 8 16 -22 12 -20 -8z" fill="${l.oceania}" stroke="${e}" stroke-width="3"/>
    <path data-id="antarctica" ${i("antarctica")} d="M70 158 h180 l-20 12 h-140z" fill="${l.antarctica}" stroke="${e}" stroke-width="3"/>
  </svg>`}function Ae(t){return n(t==="farm"?`<rect x="20" y="90" width="120" height="40" fill="#8fd36a"/><polygon points="40,90 80,40 120,90" fill="#ff3b5c" stroke="${e}" stroke-width="3"/><rect x="58" y="70" width="24" height="20" fill="#5ad2ff"/>`:t==="ocean"?'<rect x="16" y="16" width="128" height="128" rx="16" fill="#5ad2ff"/><path d="M20 90 q20 16 40 0 q20 16 40 0 q20 16 40 0" fill="none" stroke="#fff" stroke-width="6"/>':t==="jungle"?'<rect x="16" y="16" width="128" height="128" rx="16" fill="#3dbb55"/><circle cx="50" cy="60" r="24" fill="#4cd964"/><circle cx="110" cy="70" r="28" fill="#2f9e4a"/><rect x="72" y="90" width="16" height="40" fill="#8b5a2b"/>':t==="arctic"?`<rect x="16" y="16" width="128" height="128" rx="16" fill="#d6f3ff"/><polygon points="40,120 70,50 100,120" fill="#fff" stroke="${e}" stroke-width="3"/><polygon points="90,120 120,64 146,120" fill="#eef9ff" stroke="${e}" stroke-width="3"/>`:'<circle cx="80" cy="80" r="40" fill="#ffd56a"/>',"illu")}function Qt(t,l,i){return n(`
    <circle cx="46" cy="70" r="22" fill="${t}" stroke="${e}" stroke-width="4"/>
    <circle cx="114" cy="70" r="22" fill="${l}" stroke="${e}" stroke-width="4"/>
    <text x="80" y="78" text-anchor="middle" font-size="28" font-family="Nunito" font-weight="900" fill="${e}">+</text>
    <path d="M80 92 v12" stroke="${e}" stroke-width="4"/>
    <circle class="illu-pulse" cx="80" cy="128" r="16" fill="${i}" stroke="${e}" stroke-width="4"/>
  `,"illu")}function u(t,l){return`<svg viewBox="0 0 160 160" class="illu" aria-hidden="true">${Array.from({length:l},(r,o)=>{const c=o%5,s=Math.floor(o/5);return`<g transform="translate(${8+c*30} ${12+s*36}) scale(.34)">${t().replace('class="illu illu-bob"',"").replace('class="illu illu-float"',"").replace('class="illu illu-wiggle"',"").replace('class="illu illu-spin-slow"',"")}</g>`}).join("")}</svg>`}function Ut(){return'<svg viewBox="0 0 64 64" class="icon"><rect x="12" y="28" width="40" height="28" rx="8" fill="#2d2150"/><path d="M20 28 v-8 a12 12 0 0 1 24 0 v8" fill="none" stroke="#2d2150" stroke-width="6"/></svg>'}function Yt(t=!0){return`<svg viewBox="0 0 64 64" class="icon star-icon"><polygon points="32,6 40,24 60,24 44,36 50,56 32,44 14,56 20,36 4,24 24,24" fill="${t?"#ffd56a":"transparent"}" stroke="#2d2150" stroke-width="4"/></svg>`}function A(t){return S[t]?S[t]():f[t]?f[t]():t.startsWith("letter-")?O(t.replace("letter-","")):t.startsWith("number-")?F(t.replace("number-","")):t.startsWith("color-")?j(t.replace("color-","")):t.startsWith("flag-")?Y(t.replace("flag-","")):t.startsWith("landmark-")?ie(t.replace("landmark-","")):t.startsWith("habitat-")?Ae(t.replace("habitat-","")):f.star()}const Le=.8,I=10;function Fe(t,l){return l?t/l:0}function ae(t,l){return Math.round(Fe(t,l)*100)}function Ee(t,l=I){return Fe(t,l)>=Le}function je(t,l=I){const i=ae(t,l);return i<Le*100?0:i>=100?3:i>=90?2:1}function m(t){const l=[...t];for(let i=l.length-1;i>0;i-=1){const r=Math.floor(Math.random()*(i+1));[l[i],l[r]]=[l[r],l[i]]}return l}function v(t,l){return m(t).slice(0,l)}function Kt(t){return t.choices?{...t,choices:m(t.choices)}:t}const B=[{id:"red",name:"Red",hex:"#FF3B5C",object:"strawberry"},{id:"blue",name:"Blue",hex:"#5AD2FF",object:"bird"},{id:"yellow",name:"Yellow",hex:"#FFD56A",object:"sun"},{id:"green",name:"Green",hex:"#4CD964",object:"frog"},{id:"orange",name:"Orange",hex:"#FF8A3D",object:"orange"},{id:"purple",name:"Purple",hex:"#7C5CFF",object:"grapes"},{id:"pink",name:"Pink",hex:"#FF7AD9",object:"flower"},{id:"brown",name:"Brown",hex:"#8B5A2B",object:"bear"}],ke=[["A","apple"],["B","ball"],["C","cat"],["D","dog"],["E","egg"],["F","fish"],["G","grapes"],["H","hat"],["I","icecream"],["J","juice"],["K","kite"],["L","leaf"],["M","moon"]],ye=[["N","nest"],["O","orange"],["P","pizza"],["Q","crown"],["R","rainbow"],["S","sun"],["T","tree"],["U","umbrella"],["V","violin"],["W","watermelon"],["X","xylophone"],["Y","yarn"],["Z","zebra"]],P=[{id:"cow",name:"Cow",sound:"moo"},{id:"pig",name:"Pig",sound:"oink"},{id:"chicken",name:"Chicken",sound:"cluck"},{id:"horse",name:"Horse",sound:"neigh"},{id:"sheep",name:"Sheep",sound:"baa"},{id:"duck",name:"Duck",sound:"quack"},{id:"dog",name:"Dog",sound:"woof"},{id:"cat",name:"Cat",sound:"meow"}],U=[{id:"lion",name:"Lion",habitat:"jungle"},{id:"elephant",name:"Elephant",habitat:"jungle"},{id:"giraffe",name:"Giraffe",habitat:"jungle"},{id:"monkey",name:"Monkey",habitat:"jungle"},{id:"tiger",name:"Tiger",habitat:"jungle"},{id:"zebra",name:"Zebra",habitat:"jungle"},{id:"penguin",name:"Penguin",habitat:"arctic"},{id:"whale",name:"Whale",habitat:"ocean"},{id:"panda",name:"Panda",habitat:"jungle"},{id:"fox",name:"Fox",habitat:"jungle"}],W=[{id:"usa",name:"United States",capital:"Washington, D.C.",continent:"north-america",landmark:"liberty",landmarkName:"Statue of Liberty"},{id:"uk",name:"United Kingdom",capital:"London",continent:"europe",landmark:"bigben",landmarkName:"Big Ben"},{id:"france",name:"France",capital:"Paris",continent:"europe",landmark:"eiffel",landmarkName:"Eiffel Tower"},{id:"japan",name:"Japan",capital:"Tokyo",continent:"asia",landmark:"fuji",landmarkName:"Mount Fuji"},{id:"australia",name:"Australia",capital:"Canberra",continent:"oceania",landmark:"opera",landmarkName:"Sydney Opera House"},{id:"brazil",name:"Brazil",capital:"Brasilia",continent:"south-america",landmark:"redeemer",landmarkName:"Christ the Redeemer"},{id:"egypt",name:"Egypt",capital:"Cairo",continent:"africa",landmark:"pyramid",landmarkName:"the Pyramids"},{id:"china",name:"China",capital:"Beijing",continent:"asia",landmark:"wall",landmarkName:"the Great Wall"},{id:"india",name:"India",capital:"New Delhi",continent:"asia",landmark:"taj",landmarkName:"the Taj Mahal"},{id:"canada",name:"Canada",capital:"Ottawa",continent:"north-america",landmark:"liberty",landmarkName:"maple forests"},{id:"italy",name:"Italy",capital:"Rome",continent:"europe",landmark:"colosseum",landmarkName:"the Colosseum"},{id:"mexico",name:"Mexico",capital:"Mexico City",continent:"north-america",landmark:"pyramid",landmarkName:"Chichen Itza"}],Z=[{id:"north-america",name:"North America"},{id:"south-america",name:"South America"},{id:"europe",name:"Europe"},{id:"africa",name:"Africa"},{id:"asia",name:"Asia"},{id:"oceania",name:"Australia / Oceania"},{id:"antarctica",name:"Antarctica"}],ne=[{id:1,title:"Rainbow World",subtitle:"Colors · count 1–5 · first letters",ages:"Ages 3–4",grade:"Preschool",subject:"colours",art:"rainbow",accent:"#FF3B5C"},{id:2,title:"Letter Land A–M",subtitle:"A–M · count 1–5 · first-letter spelling",ages:"Ages 3–5",grade:"Preschool",subject:"alphabet",art:"letter-A",accent:"#7C5CFF"},{id:3,title:"Farm Friends",subtitle:"Farm animals · count 1–10 · first letters",ages:"Ages 4–5",grade:"Pre-K",subject:"animals",art:"cow",accent:"#4CD964"},{id:4,title:"Letter Land N–Z",subtitle:"N–Z · count to 10 · beginning sounds",ages:"Ages 4–5",grade:"Pre-K",subject:"alphabet",art:"zebra",accent:"#FF8A3D"},{id:5,title:"Number Jungle",subtitle:"Count to 20 · add to 5 · CVC spelling",ages:"Ages 5–6",grade:"Kindergarten",subject:"math",art:"star",accent:"#5AD2FF"},{id:6,title:"Wild Safari",subtitle:"Animals · add to 10 · CVC spelling",ages:"Ages 5–6",grade:"Kindergarten",subject:"animals",art:"lion",accent:"#FF8A3D"},{id:7,title:"Math Castle",subtitle:"Add/sub to 20 · CVC & blend spelling",ages:"Ages 6–7",grade:"1st Grade",subject:"math",art:"apple",accent:"#C77DFF"},{id:8,title:"Word Zoo",subtitle:"Sight words · add/sub quiz · habitats",ages:"Ages 6–7",grade:"1st Grade",subject:"alphabet",art:"book",accent:"#4CD964"},{id:9,title:"World Explorers",subtitle:"Flags · add tens to 100 · silent-e spelling",ages:"Ages 7–8",grade:"2nd Grade",subject:"countries",art:"flag-japan",accent:"#5AD2FF"},{id:10,title:"Super Scholars",subtitle:"Capitals · skip count · 2nd-grade spelling",ages:"Ages 7–8",grade:"2nd Grade",subject:"countries",art:"crown",accent:"#FFD56A"}];function T(t,l){const i=[t];l.forEach(o=>{!i.includes(o)&&o>=0&&i.push(o)});let r=0;for(;i.length<4;)i.includes(r)||i.push(r),r+=1;return i.slice(0,4)}function p(t,l,i,r){return Kt({type:"choice",prompt:t,speak:l,stem:i,choices:r.map(o=>({id:o.id,label:o.label,html:o.html,correct:!!o.correct}))})}function b(t,l,i=3){return v(t.filter(r=>(r.id||r[0])!==l),i)}function Vt(){const t=B.map(r=>{const o=b(B,r.id).map(c=>({id:c.id,label:c.name,html:j(c.hex),correct:!1}));return p(`Tap the ${r.name.toUpperCase()} one!`,`Tap the ${r.name} one`,C("think"),[{id:r.id,label:r.name,html:j(r.hex),correct:!0},...o])}),l=B.map(r=>{const o=b(B,r.id).map(c=>({id:c.id,label:c.name,html:j(c.hex),correct:!1}));return p("What color is this?","What color is this?",A(r.object),[{id:r.id,label:r.name,html:j(r.hex,r.name),correct:!0},...o])}),i=v(B,4).map(r=>({type:"hunt",prompt:`Catch the ${r.name} one!`,speak:`Catch the ${r.name} one`,items:m([{id:r.id,html:j(r.hex),correct:!0,label:r.name},...b(B,r.id,5).map(o=>({id:o.id,html:j(o.hex),correct:!1,label:o.name}))])}));return[...t,...l,...i]}function we(t){const l=t.map(([o,c])=>{const s=b(t.map(a=>({id:a[0],pic:a[1]})),o).map(a=>({id:a.id,label:a.id,html:O(a.id),correct:!1}));return p("Which letter starts this picture?",`${c}. Which letter?`,A(c),[{id:o,label:o,html:O(o),correct:!0},...s])}),i=t.map(([o,c])=>{const s=b(t.map(a=>({id:a[1]})),c).map(a=>({id:a.id,label:a.id,html:A(a.id),correct:!1}));return p(`Letter ${o} is for...`,`Letter ${o} is for what?`,O(o),[{id:c,label:c,html:A(c),correct:!0},...s])}),r=v(t,3).map(([o,c])=>({type:"hunt",prompt:`Find the picture for ${o}!`,speak:`Find the picture for letter ${o}`,items:m([{id:c,html:A(c),correct:!0,label:c},...b(t.map(s=>({id:s[1]})),c,5).map(s=>({id:s.id,html:A(s.id),correct:!1,label:s.id}))])}));return[...l,...i,...r]}function _t(){const t=P.map(r=>{const o=b(P,r.id).map(c=>({id:c.id,label:c.name,html:S[c.id](),correct:!1}));return p("Which animal is this?","Which animal is this?",S[r.id](),[{id:r.id,label:r.name,html:`<div class="word-chip">${r.name}</div>`,correct:!0},...o.map(c=>({...c,html:`<div class="word-chip">${c.label}</div>`}))])}),l=P.map(r=>{const o=b(P,r.id).map(c=>({id:c.id,label:c.name,html:S[c.id](),correct:!1}));return p(`Who says “${r.sound}”?`,`Who says ${r.sound}?`,C("happy"),[{id:r.id,label:r.name,html:S[r.id](),correct:!0},...o])}),i=v(P,3).map(r=>({type:"hunt",prompt:`Catch the ${r.name}!`,speak:`Catch the ${r.name}`,items:m([{id:r.id,html:S[r.id](),correct:!0,label:r.name},...b(P,r.id,5).map(o=>({id:o.id,html:S[o.id](),correct:!1,label:o.name}))])}));return[...t,...l,...i]}function Jt(){const t=[];for(let i=1;i<=10;i+=1){const r=i%2===0?f.apple:f.star,o=i%2===0?"apples":"stars",c=T(i,[i-1,i+1,i===4?7:4,i+2,i-2]);t.push(p(`How many ${o}?`,`How many ${o}?`,u(r,i),c.map(s=>({id:`n${s}`,label:String(s),html:F(s),correct:s===i}))))}t.push({type:"hunt",prompt:"Tap the group of 5 stars!",speak:"Tap the group of 5 stars",items:m([{id:"five",html:u(f.star,5),correct:!0,label:"5"},{id:"two",html:u(f.star,2),correct:!1,label:"2"},{id:"seven",html:u(f.apple,7),correct:!1,label:"7"},{id:"three",html:u(f.balloon,3),correct:!1,label:"3"},{id:"nine",html:u(f.apple,9),correct:!1,label:"9"},{id:"one",html:u(f.balloon,1),correct:!1,label:"1"}])});const l=[3,5,8].map(i=>p("Which group has MORE?","Which group has more?",C("think"),m([{id:"more",label:String(i+2),html:u(f.apple,i+2),correct:!0},{id:"less",label:String(i),html:u(f.apple,i),correct:!1},{id:"tiny",label:"1",html:u(f.apple,1),correct:!1},{id:"mid",label:String(i-1),html:u(f.apple,Math.max(1,i-1)),correct:!1}])));return[...t,...l]}function Zt(){const t=U.map(r=>{const o=b(U,r.id).map(c=>({id:c.id,label:c.name,html:S[c.id](),correct:!1}));return p("Which wild animal is this?","Which wild animal is this?",S[r.id](),[{id:r.id,label:r.name,html:`<div class="word-chip">${r.name}</div>`,correct:!0},...o.map(c=>({...c,html:`<div class="word-chip">${c.label}</div>`}))])}),l=[["#FF3B5C","#FFD56A","#FF8A3D","Orange","Red plus yellow makes orange"],["#5AD2FF","#FFD56A","#4CD964","Green","Blue plus yellow makes green"],["#FF3B5C","#5AD2FF","#7C5CFF","Purple","Red plus blue makes purple"]].map(([r,o,c,s,a])=>p("Mix the paints! What color appears?",a,Qt(r,o,c),m([{id:s,label:s,html:j(c,s),correct:!0},{id:"red",label:"Red",html:j("#FF3B5C","Red"),correct:!1},{id:"blue",label:"Blue",html:j("#5AD2FF","Blue"),correct:!1},{id:"yellow",label:"Yellow",html:j("#FFD56A","Yellow"),correct:!1}]))),i=v(U,3).map(r=>({type:"hunt",prompt:`Catch the ${r.name}!`,speak:`Catch the ${r.name}`,items:m([{id:r.id,html:S[r.id](),correct:!0,label:r.name},...b(U,r.id,5).map(o=>({id:o.id,html:S[o.id](),correct:!1,label:o.name}))])}));return[...t,...l,...i]}function Xt(){const t=[[1,2],[2,2],[3,1],[4,2],[5,3],[3,3],[6,2],[4,5]].map(([i,r])=>{const o=i+r,c=T(o,[o+1,o-1,o+2,i,r]);return p(`${i} + ${r} = ?`,`${i} plus ${r} equals what?`,`<div class="equation">${u(f.apple,i)}<span class="plus">+</span>${u(f.apple,r)}</div>`,c.map(s=>({id:`s${s}`,label:String(s),html:F(s),correct:s===o})))}),l=[[5,2],[6,1],[8,3],[7,4],[10,2],[9,5]].map(([i,r])=>{const o=i-r,c=T(o,[o+1,o-1,o+2,i,r]);return p(`${i} − ${r} = ?`,`${i} minus ${r} equals what?`,`<div class="equation">${u(f.balloon,i)}<span class="plus">−</span>${u(f.balloon,r)}</div>`,c.map(s=>({id:`d${s}`,label:String(s),html:F(s),correct:s===o})))});return[...t,...l]}function el(){const t=U.map(r=>{const o=["jungle","ocean","arctic","farm"];return p(`Where does the ${r.name} live?`,`Where does the ${r.name} live?`,S[r.id](),o.map(c=>({id:c,label:c,html:Ae(c),correct:c===r.habitat})))}),l=[["CAT","cat"],["DOG","dog"],["SUN","sun"],["HAT","hat"],["PIG","pig"],["BUS","firetruck"]].map(([r,o])=>{const c=v(["CAP","DOT","SAD","HIT","PEN","BAT"].filter(s=>s!==r),3);return p("Pick the word that matches the picture.","Which word matches this picture?",A(o),m([{id:r,label:r,html:`<div class="word-chip big">${r}</div>`,correct:!0},...c.map(s=>({id:s,label:s,html:`<div class="word-chip big">${s}</div>`,correct:!1}))]))}),i=[["C_T","A","cat",["O","E","I"]],["D_G","O","dog",["A","I","U"]],["S_N","U","sun",["A","E","O"]],["P_G","I","pig",["A","E","O"]]].map(([r,o,c,s])=>p(`Fill in the missing letter: ${r}`,`Fill in the missing letter in ${r.replace("_"," blank ")}`,A(c),m([{id:o,label:o,html:O(o),correct:!0},...s.map(a=>({id:a,label:a,html:O(a),correct:!1}))])));return[...t,...l,...i]}function tl(){const t=W.map(r=>{const o=b(W,r.id).map(c=>({id:c.id,label:c.name,html:Y(c.id),correct:!1}));return p(`Which flag is ${r.name}?`,`Which flag is ${r.name}?`,C("think"),[{id:r.id,label:r.name,html:Y(r.id),correct:!0},...o])}),l=W.filter(r=>r.landmarkName!=="maple forests").map(r=>{const o=b(W.filter(c=>c.landmark!==r.landmark),r.id).map(c=>({id:c.id,label:c.landmarkName,html:ie(c.landmark),correct:!1}));return p(`${r.landmarkName} is in which country?`,`${r.landmarkName} is in which country?`,ie(r.landmark),[{id:r.id,label:r.name,html:`<div class="word-chip">${r.name}</div>`,correct:!0},...o.map(c=>({...c,label:W.find(s=>s.id===c.id).name,html:`<div class="word-chip">${W.find(s=>s.id===c.id).name}</div>`}))])}),i=v(Z.filter(r=>r.id!=="antarctica"),6).map(r=>({type:"map",prompt:`Tap ${r.name} on the map!`,speak:`Tap ${r.name} on the map`,stem:Se(),answer:r.id}));return[...t,...l,...i]}function ll(){const t=W.map(c=>{const s=b(W,c.id).map(a=>({id:a.capital,label:a.capital,html:`<div class="word-chip">${a.capital}</div>`,correct:!1}));return p(`What is the capital of ${c.name}?`,`What is the capital of ${c.name}?`,Y(c.id),[{id:c.capital,label:c.capital,html:`<div class="word-chip">${c.capital}</div>`,correct:!0},...s])}),l=v(W,8).map(c=>{const s=Z.find(h=>h.id===c.continent),a=[...v(Z.filter(h=>h.id!==c.continent),3),s];return p(`${c.name} is on which continent?`,`${c.name} is on which continent?`,Y(c.id),a.map(h=>({id:h.id,label:h.name,html:`<div class="word-chip">${h.name}</div>`,correct:h.id===c.continent})))}),i=[2,5,10].map(c=>{const s=[c,c*2,c*3,"?",c*5],a=c*4,h=T(a,[a+c,a-c,a+1,c]);return p(`Skip count: ${s.join(", ")}`,`Skip count by ${c}. What number is missing?`,u(c===2?f.star:c===5?f.apple:f.balloon,c),h.map(g=>({id:`k${g}`,label:String(g),html:F(g),correct:g===a})))}),r=[[2,3],[2,4],[5,2]].map(([c,s])=>{const a=c*s,h=T(a,[a+2,a-1,c+s,c,s]);return p(`${c} groups of ${s} = ?`,`${c} groups of ${s} equals what?`,`<div class="equation">${Array.from({length:c},()=>u(f.apple,s)).join("")}</div>`,h.map(g=>({id:`p${g}`,label:String(g),html:F(g),correct:g===a})))}),o=v(Z,3).map(c=>({type:"map",prompt:`Tap ${c.name}!`,speak:`Tap ${c.name}`,stem:Se(),answer:c.id}));return[...t,...l,...i,...r,...o]}function R(t,l){const i=[];for(let r=t;r<=l;r+=1){const o=r%2===0?f.apple:f.star,c=r%2===0?"apples":"stars",s=T(r,[r-1,r+1,r+2,Math.max(t,r-2)]);i.push({...p(`How many ${c}?`,`How many ${c}?`,u(o,r),s.map(a=>({id:`n${a}`,label:String(a),html:F(a),correct:a===r}))),maxValue:l})}return i}function X(t){return[2,3,Math.min(5,t-2)].filter(l=>l>0&&l+2<=t).map(l=>({...p("Which group has MORE?","Which group has more?",C("think"),m([{id:"more",label:String(l+2),html:u(f.apple,l+2),correct:!0},{id:"less",label:String(l),html:u(f.apple,l),correct:!1},{id:"tiny",label:"1",html:u(f.apple,1),correct:!1},{id:"mid",label:String(Math.max(1,l-1)),html:u(f.balloon,Math.max(1,l-1)),correct:!1}])),maxValue:t}))}function V(t,l){return t.filter(([i,r])=>i+r<=l).map(([i,r])=>{const o=i+r,c=T(o,[o+1,o-1,o+2,i,r]);return{...p(`${i} + ${r} = ?`,`${i} plus ${r} equals what?`,`<div class="equation">${u(f.apple,i)}<span class="plus">+</span>${u(f.apple,r)}</div>`,c.map(s=>({id:`s${s}`,label:String(s),html:F(s),correct:s===o}))),maxValue:l}})}function _(t,l){return t.filter(([i,r])=>i<=l&&i-r>=0).map(([i,r])=>{const o=i-r,c=T(o,[o+1,o-1,o+2,i,r]);return{...p(`${i} − ${r} = ?`,`${i} minus ${r} equals what?`,`<div class="equation">${u(f.balloon,i)}<span class="plus">−</span>${u(f.balloon,r)}</div>`,c.map(s=>({id:`d${s}`,label:String(s),html:F(s),correct:s===o}))),maxValue:l}})}function xe(){return[[20,10],[40,20],[50,30],[30,10],[60,20]].map(([l,i])=>{const r=l+i,o=T(r,[r+10,r-10,l,i]);return{...p(`${l} + ${i} = ?`,`${l} plus ${i} equals what?`,`<div class="equation"><div class="word-chip big">${l}</div><span class="plus">+</span><div class="word-chip big">${i}</div></div>`,o.map(c=>({id:`t${c}`,label:String(c),html:F(c),correct:c===r}))),maxValue:100}})}function rl(){return[2,5,10].map(t=>{const l=[t,t*2,t*3,"?",t*5],i=t*4,r=T(i,[i+t,i-t,i+1,t]);return{...p(`Skip count: ${l.join(", ")}`,`Skip count by ${t}. What number is missing?`,u(t===2?f.star:t===5?f.apple:f.balloon,t),r.map(o=>({id:`k${o}`,label:String(o),html:F(o),correct:o===i}))),maxValue:50}})}function il(){return[[2,3],[2,4],[5,2]].map(([t,l])=>{const i=t*l,r=T(i,[i+2,i-1,t+l,l]);return{...p(`${t} groups of ${l} = ?`,`${t} groups of ${l} equals what?`,`<div class="equation">${Array.from({length:t},()=>u(f.apple,l)).join("")}</div>`,r.map(o=>({id:`p${o}`,label:String(o),html:F(o),correct:o===i}))),maxValue:10}})}function J(t){return t.map(([l,i])=>{const r=b(t.map(o=>({id:o[0]})),l).map(o=>({id:o.id,label:o.id,html:O(o.id),correct:!1}));return p("Which letter starts this picture?",`What letter does ${i} start with?`,A(i),[{id:l,label:l,html:O(l),correct:!0},...r])})}function H(t){return t.map(({word:l,pic:i,wrong:r})=>p("Spelling quiz: which word matches the picture?","Which word matches this picture?",A(i),m([{id:l,label:l,html:`<div class="word-chip big">${l}</div>`,correct:!0},...r.map(o=>({id:o,label:o,html:`<div class="word-chip big">${o}</div>`,correct:!1}))])))}function ee(t){return t.map(({pattern:l,letter:i,pic:r,wrong:o})=>p(`Spelling quiz: ${l}`,`Fill in the missing letter in ${l.replace("_"," blank ")}`,A(r),m([{id:i,label:i,html:O(i),correct:!0},...o.map(c=>({id:c,label:c,html:O(c),correct:!1}))])))}function G(t,l){return t.map(({word:i,pic:r})=>{const o=[...i.toUpperCase()],c=v(l.filter(s=>!o.includes(s)),2);return{type:"spell",prompt:"Spell this word!",speak:`Spell ${i.toLowerCase()}`,stem:A(r),word:i.toUpperCase(),tiles:m([...o,...c]),maxLetters:i.length}})}const Q=[{word:"CAT",pic:"cat",wrong:["COT","CAP","CUT"]},{word:"DOG",pic:"dog",wrong:["DIG","DOT","DUG"]},{word:"SUN",pic:"sun",wrong:["SON","SIN","SAD"]},{word:"HAT",pic:"hat",wrong:["HIT","HOT","HUT"]},{word:"PIG",pic:"pig",wrong:["PEG","PAG","POD"]},{word:"EGG",pic:"egg",wrong:["AGG","IGG","UG"]}],$e=[{word:"FROG",pic:"frog",wrong:["FOG","FRG","FRAG"]},{word:"TREE",pic:"tree",wrong:["TEE","TRY","TRE"]},{word:"FISH",pic:"fish",wrong:["FESH","FOSH","FAS"]},{word:"NEST",pic:"nest",wrong:["NAST","NOST","NET"]}],cl=[{word:"THE",pic:"book",wrong:["TEH","THA","HTE"]},{word:"AND",pic:"book",wrong:["ADN","NAD","END"]},{word:"YOU",pic:"sun",wrong:["YUO","YOH","UOY"]},{word:"SAID",pic:"book",wrong:["SIAD","SED","SAIDD"]}],me=[{word:"KITE",pic:"kite",wrong:["KIT","KIET","KYTE"]},{word:"CAKE",pic:"cake",wrong:["CAK","CAEK","CAKKE"]},{word:"GAME",pic:"ball",wrong:["GAM","GAEM","GAMEE"]}].map(t=>({...t,wrong:t.wrong.filter(l=>l!==t.word).slice(0,3)}));function te(t,l){return t.map(i=>({...i,skill:l}))}function N(t,l,i,r){return m([...v(te(t,"explore"),r.theme),...v(te(l,"math"),r.math),...v(te(i,"spelling"),r.spelling)])}const ol={1:()=>N(Vt(),[...R(1,5),...X(5)],J([["R","rainbow"],["S","sun"],["B","ball"],["A","apple"],["F","flower"]]),{theme:4,math:3,spelling:3}),2:()=>N(we(ke),R(1,5),J(ke),{theme:4,math:3,spelling:3}),3:()=>N(_t(),[...R(1,10),...X(10)],J(P.map(t=>[t.name[0],t.id])),{theme:4,math:3,spelling:3}),4:()=>N(we(ye),[...R(4,10),...X(10)],[...J(ye),...ee([{pattern:"SU_",letter:"N",pic:"sun",wrong:["T","P","M"]},{pattern:"_EST",letter:"N",pic:"nest",wrong:["M","B","P"]}])],{theme:4,math:3,spelling:3}),5:()=>N(Jt(),[...R(11,20),...V([[1,1],[2,1],[2,2],[3,1],[4,1]],5)],[...H(Q),...G(Q,["B","M","R","L"])],{theme:3,math:4,spelling:3}),6:()=>N(Zt(),[...V([[2,3],[4,2],[5,3],[1,6],[4,4]],10),..._([[8,2],[7,3],[10,1],[6,4]],10)],[...G(Q,["B","N","R","L"]),...H(Q)],{theme:4,math:3,spelling:3}),7:()=>N(Xt(),[...V([[6,7],[8,5],[9,4],[10,8],[7,7]],20),..._([[15,6],[18,9],[14,5],[20,8]],20)],[...G([...Q,...$e],["S","P","L","N"]),...ee([{pattern:"FR_G",letter:"O",pic:"frog",wrong:["A","E","I"]},{pattern:"TR_E",letter:"E",pic:"tree",wrong:["A","O","I"]}])],{theme:3,math:4,spelling:3}),8:()=>N(el(),[...V([[9,8],[7,6],[12,5]],20),..._([[16,7],[19,8],[13,4]],20)],[...H(cl),...G($e,["A","O","U","I"]),...ee([{pattern:"S_ID",letter:"A",pic:"book",wrong:["E","I","O"]}])],{theme:3,math:3,spelling:4}),9:()=>N(tl(),[...xe(),..._([[80,10],[90,20],[70,30]],100)],[...G(me,["O","U","I","A"]),...H(me)],{theme:4,math:3,spelling:3}),10:()=>N(ll(),[...rl(),...il(),...xe()],[...H([{word:"JAPAN",pic:"flag-japan",wrong:["JAPEN","JPN","JAPN"]},{word:"FRANCE",pic:"flag-france",wrong:["FRANS","FRANC","FRNSE"]},{word:"EGYPT",pic:"flag-egypt",wrong:["EJYPT","EGYPTA","EGIPT"]},{word:"ITALY",pic:"flag-italy",wrong:["ITALI","ITLY","ITALYY"]}]),...G([{word:"LION",pic:"lion"},{word:"BOOK",pic:"book"},{word:"KITE",pic:"kite"}],["A","E","U"])],{theme:3,math:4,spelling:3})};function sl(t){return ol[t]().map((i,r)=>({...i,id:`l${t}-q${r+1}`}))}function Te(t){return ne.find(l=>l.id===t)}function al(t,l){const i=t.answers.slice();return i[t.index]=!!l,{...t,answers:i,lastWasWrong:!l,correct:t.correct+(l?1:0),phase:"between"}}function nl(t){const l=t.answers.slice(),i=l[t.index]===!0;return l[t.index]=void 0,{...t,answers:l,lastWasWrong:!1,correct:i?Math.max(0,t.correct-1):t.correct,phase:"play"}}function fl(t,l){return t.index+1>=l?{...t,phase:"results"}:{...t,index:t.index+1,lastWasWrong:!1,phase:"play"}}const Ce="lumi-quest-v1",le=()=>({playerName:"",soundOn:!0,speechOn:!0,unlockedLevel:1,best:{}});function dl(){try{const t=localStorage.getItem(Ce);return t?{...le(),...JSON.parse(t)}:le()}catch{return le()}}function fe(t){localStorage.setItem(Ce,JSON.stringify(t))}function hl(t,l,i,r=I){const o=ae(i,r),c=Ee(i,r),s=je(i,r),a=t.best[l]||{percent:0,stars:0,passed:!1,correct:0},h={percent:Math.max(a.percent,o),stars:Math.max(a.stars,s),passed:a.passed||c,correct:Math.max(a.correct,i)},g={...t,best:{...t.best,[l]:h},unlockedLevel:c?Math.max(t.unlockedLevel,l+1):t.unlockedLevel};return fe(g),{next:g,percent:o,passed:c,stars:s}}function pl(t){const l={...t,unlockedLevel:1,best:{}};return fe(l),l}let L,k=dl(),x="splash",d=null,z=!1;function re(t){k={...k,...t},fe(k),Me(k.soundOn),qe(k.speechOn)}function ul(t){var l,i;L=t,Me(k.soundOn),qe(k.speechOn),document.addEventListener("pointerdown",()=>oe(),{once:!0}),(i=(l=window.speechSynthesis)==null?void 0:l.getVoices)==null||i.call(l),q(),setTimeout(()=>{x=k.playerName?"map":"welcome",q()},1600)}function q(){x==="splash"?L.innerHTML=kl():x==="welcome"?L.innerHTML=yl():x==="map"?L.innerHTML=wl():x==="play"?L.innerHTML=ml():x==="results"?L.innerHTML=gl():x==="parent"&&(L.innerHTML=vl()),Ml()}function kl(){return`
    <section class="screen splash">
      <div class="splash-sun"></div>
      ${C("celebrate")}
      <h1 class="logo">Lumi's Learning Quest</h1>
      <p class="tagline">Play · Learn · Level Up!</p>
    </section>`}function yl(){return`
    <section class="screen welcome">
      <div class="card hero-card">
        ${C("happy")}
        <div class="speech">Hi! I'm Lumi the owl. What should I call you?</div>
        <label class="sr-only" for="name">Your name</label>
        <input id="name" class="name-input" maxlength="16" placeholder="Type your name" value="${k.playerName||""}" autocomplete="nickname" autocapitalize="words" autocorrect="off" spellcheck="false" enterkeyhint="go" inputmode="text" />
        <button class="btn btn-primary" data-action="save-name">Let's play!</button>
      </div>
    </section>`}function de(t){return[1,2,3].map(l=>Yt(l<=t)).join("")}function wl(){const t=k.playerName||"Explorer",l=ne.map(i=>{const r=i.id<=k.unlockedLevel,o=k.best[i.id],c=i.id===Math.min(k.unlockedLevel,10)&&!(o!=null&&o.passed);return`
      <button class="island ${r?"is-open":"is-locked"} ${c?"is-current":""} ${o!=null&&o.passed?"is-done":""}"
        data-level="${i.id}" type="button" ${r?"":"disabled"}>
        <span class="island-badge" style="--accent:${i.accent}">${r?A(i.art):Ut()}</span>
        <span class="island-num">Level ${i.id}</span>
        <strong>${i.title}</strong>
        <small>${i.subtitle} · ${i.ages}</small>
        <span class="island-stars">${de((o==null?void 0:o.stars)||0)}</span>
      </button>`}).join("");return`
    <section class="screen map-screen">
      <header class="topbar">
        <div>
          <p class="hello">Hi, ${Ne(t)}!</p>
          <h1>Your Learning Path</h1>
        </div>
        <div class="top-actions">
          <button class="icon-btn" data-action="toggle-sound" aria-label="Sound">${k.soundOn?"🔊":"🔇"}</button>
          <button class="icon-btn" data-action="toggle-speech" aria-label="Voice">${k.speechOn?"🗣️":"🤫"}</button>
          <button class="text-btn" data-action="parent">Grown-ups</button>
        </div>
      </header>
      <div class="lumi-corner">${C("idle")}</div>
      <p class="path-note">Finish a level with at least <strong>80%</strong> to unlock the next adventure.</p>
      <div class="path">${l}</div>
    </section>`}function xl(){const t=(i,r=12)=>`<div class="firework ${i}">${Array.from({length:r},(o,c)=>`<i style="--i:${c}"></i>`).join("")}</div>`,l=Array.from({length:18},(i,r)=>`<span class="sparkle" style="--s:${r}"></span>`).join("");return`
    <div class="celebrate-fx" aria-hidden="true">
      ${t("fw-a")}
      ${t("fw-b")}
      ${t("fw-c")}
      ${t("fw-d")}
      ${t("fw-e",10)}
      <div class="fw-ring ring-a"></div>
      <div class="fw-ring ring-b"></div>
      <div class="fw-ring ring-c"></div>
      ${l}
    </div>`}function $l(){return`
    <div class="quiz-celebrate" role="dialog" aria-label="Congratulations">
      ${xl()}
      <div class="celebrate-card">
        ${C(d.lastWasWrong?"encourage":"celebrate")}
        <p class="celebrate-kicker">${d.lastWasWrong?"Quiz complete":"You got it!"}</p>
        <h2 class="celebrate-title">Congratulations!</h2>
        <div class="btn-row celebrate-actions">
          <button class="btn btn-primary" data-action="next-quiz">Next</button>
          <button class="btn btn-ghost" data-action="retry-quiz">Retry</button>
        </div>
      </div>
    </div>`}function ml(){const t=Te(d.levelId),l=d.questions[d.index],i=d.phase==="between",r=d.questions.map((o,c)=>{const s=d.answers[c],a=s==null?"":s?"is-yes":"is-no",h=c===d.index?"is-on":"";return`<span class="dot ${a} ${h}"></span>`}).join("");return`
    <section class="screen play-screen" style="--accent:${t.accent}">
      <header class="hud">
        <button class="text-btn" data-action="quit">Map</button>
        <div class="hud-mid">
          <strong>Level ${t.id} · ${t.title}</strong>
          <div class="skill-chip skill-${l.skill||"explore"}">${bl(l.skill)}</div>
          <div class="dots">${r}</div>
        </div>
        <div class="score-chip">⭐ ${d.correct}</div>
      </header>
      <div class="play-body">
        <div class="prompt-row">
          ${C(d.lastWasWrong?"encourage":"idle")}
          <div class="speech">${l.prompt}</div>
          <button class="icon-btn speak-btn" data-action="speak" aria-label="Hear the question">🔊</button>
        </div>
        <div class="game-stage" id="game-stage">${Ie(l)}</div>
        ${i?$l():""}
      </div>
    </section>`}function gl(){const{correct:t,levelId:l}=d,i=ae(t,I),r=Ee(t,I),o=je(t,I),c=Te(l);return`
    <section class="screen results-screen">
      <div class="card results-card">
        ${C(r?"celebrate":"encourage")}
        <h1>${r?"You did it!":"Almost there!"}</h1>
        <p class="result-line">${Ne(k.playerName||"Explorer")} scored <strong>${t}/${I}</strong></p>
        <div class="meter"><span style="width:${i}%"></span></div>
        <p class="percent ${r?"go":"stop"}">${i}% ${r?"· Level passed!":"· Need 80% to pass"}</p>
        <div class="big-stars">${de(o)}</div>
        <p class="fine">${r?`Level ${Math.min(l+1,10)} is unlocked.`:`Keep practicing ${c.title}. You can try again!`}</p>
        <div class="btn-row">
          <button class="btn btn-primary" data-action="${r&&l<10?"next-level":"retry"}">${r&&l<10?"Next level":"Try again"}</button>
          <button class="btn btn-ghost" data-action="to-map">Learning path</button>
        </div>
      </div>
    </section>`}function bl(t){return t==="math"?"Math quiz":t==="spelling"?"Spelling":"Explore"}function vl(){return`
    <section class="screen parent-screen">
      <header class="topbar">
        <button class="text-btn" data-action="to-map">← Back</button>
        <h1>Grown-ups</h1>
      </header>
      <div class="card parent-card">
        <p>Inspired by ABCmouse’s 10-level path, Khan Academy Kids’ friendly coaching, and Duolingo ABC’s short illustrated games.</p>
        <p>Each world stays at its school year: preschool through 2nd grade only. Every level mixes the world theme with <strong>math</strong> and <strong>spelling</strong> games that get harder only up to that grade.</p>
        <p>Kids must score at least <strong>80%</strong> (8/10) to unlock the next level. Stars: 1 at 80%, 2 at 90%, 3 at 100%.</p>
        <div class="table-wrap">
        <table class="progress-table">
          <thead><tr><th>Level</th><th>Stage</th><th>Best</th><th>Status</th><th>Stars</th></tr></thead>
          <tbody>${ne.map(l=>{const i=k.best[l.id];return`<tr>
      <td>${l.id}. ${l.title}</td>
      <td>${l.grade}</td>
      <td>${i?`${i.percent}%`:"—"}</td>
      <td>${i!=null&&i.passed?"Passed":l.id<=k.unlockedLevel?"Unlocked":"Locked"}</td>
      <td>${de((i==null?void 0:i.stars)||0)}</td>
    </tr>`}).join("")}</tbody>
        </table>
        </div>
        <button class="btn btn-ghost danger" data-action="reset">Reset progress</button>
      </div>
    </section>`}function Ml(){L.querySelectorAll("[data-action]").forEach(l=>{l.addEventListener("click",()=>ge(l.dataset.action))}),L.querySelectorAll("[data-level]").forEach(l=>{l.addEventListener("click",()=>ce(Number(l.dataset.level)))});const t=L.querySelector("#name");if(t&&t.addEventListener("keydown",l=>{l.key==="Enter"&&ge("save-name")}),x==="play"&&(d==null?void 0:d.phase)!=="between"){const l=L.querySelector("#game-stage"),i=d.questions[d.index];Re(l,i,Sl),z||se(i.speak||i.prompt),window.onkeydown=r=>{const o=Number(r.key);if(o>=1&&o<=4){const c=l.querySelectorAll("[data-choice]")[o-1];c==null||c.click()}}}else window.onkeydown=null}function ge(t){var l;if(M("tap"),oe(),t==="save-name"){const i=(((l=L.querySelector("#name"))==null?void 0:l.value)||"Explorer").trim().slice(0,16);re({playerName:i||"Explorer"}),x="map",q()}else if(t==="toggle-sound")re({soundOn:!k.soundOn}),q();else if(t==="toggle-speech")re({speechOn:!k.speechOn}),q();else if(t==="parent")x="parent",q();else if(t==="to-map"||t==="quit")x="map",d=null,q();else if(t==="speak"&&d){const i=d.questions[d.index];se(i.speak||i.prompt)}else t==="retry-quiz"&&d?(d=nl(d),z=!1,x="play",q()):t==="next-quiz"&&d?ql():t==="retry"?ce(d.levelId):t==="next-level"?ce(Math.min(d.levelId+1,10)):t==="reset"&&window.confirm("Reset all stars and locked levels?")&&(k=pl(k),x="map",q())}function ce(t){if(t>k.unlockedLevel){M("lock");return}M("whoosh"),d={levelId:t,questions:sl(t),index:0,correct:0,answers:[],lastWasWrong:!1,phase:"play"},x="play",z=!1,q()}function ql(){if(d=fl(d,I),z=!1,d.phase==="results"){const t=hl(k,d.levelId,d.correct);k=t.next,x="results",q(),t.passed?(M("fanfare"),We()):M("wrong");return}x="play",q()}function Sl(t){!d||z||d.phase==="between"||(z=!0,d=al(d,t),x="play",q(),M("star"),se("Congratulations!"))}function Ne(t){return t.replace(/[&<>"']/g,l=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[l])}ul(document.getElementById("app"));
