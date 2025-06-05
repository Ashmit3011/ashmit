// Romantic messages shown on back of each note
const notes = [
  "Every moment with you feels like a beautiful dream come true.",
  "Your smile lights up my world brighter than the stars.",
  "With you, love is not just a word; it’s my favorite song."
];

// Set back side content for each note
document.querySelectorAll('.note').forEach((note, i) => {
  note.querySelector('.note-back').textContent = notes[i];
});

// Create heart SVG element for animation
function createHeartSVG() {
  const svgNS = "http://www.w3.org/2000/svg";
  const heart = document.createElementNS(svgNS, "svg");
  heart.setAttribute("viewBox", "0 0 24 24");
  heart.classList.add("heart");

  const path = document.createElementNS(svgNS, "path");
  path.setAttribute("d", "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z");
  heart.appendChild(path);
  return heart;
}

// Animate multiple hearts floating up in the hearts container
function animateHearts(container) {
  let count = 0;
  const maxHearts = 18;

  const interval = setInterval(() => {
    const heart = createHeartSVG();
    const x = Math.random() * (container.clientWidth - 24);
    heart.style.left = `${x}px`;

    const dur = 1200 + Math.random() * 600;
    heart.style.animationDuration = `${dur}ms`;
    heart.style.animationDelay = `${Math.random() * 300}ms`;

    container.appendChild(heart);

    setTimeout(() => {
      heart.remove();
    }, dur + 300);

    count++;
    if (count >= maxHearts) clearInterval(interval);
  }, 80);
}

// Play a simple pop sound on flip
function playPopSound() {
  if (!window.AudioContext) return;

  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const o = ctx.createOscillator();
    const g = ctx.createGain();

    o.type = "triangle";
    o.frequency.setValueAtTime(800, ctx.currentTime);
    g.gain.setValueAtTime(0.15, ctx.currentTime);

    o.connect(g);
    g.connect(ctx.destination);
    o.start();

    g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
    o.stop(ctx.currentTime + 0.12);
  } catch {}
}

// Create ripple effect at (x,y) inside the note front
function createRipple(noteFront, x, y) {
  const rippleContainer = noteFront.querySelector('.ripple-container');
  if (!rippleContainer) return;

  const ripple = document.createElement('span');
  ripple.classList.add('ripple');

  // Calculate relative position
  const rect = noteFront.getBoundingClientRect();
  const left = x - rect.left;
  const top = y - rect.top;

  ripple.style.left = `${left}px`;
  ripple.style.top = `${top}px`;

  rippleContainer.appendChild(ripple);

  ripple.addEventListener('animationend', () => {
    ripple.remove();
  });
}

// Flip a note, show back and animate hearts & sound
function flipNote(note) {
  if (note.classList.contains('flipped')) return;
  note.classList.add('flipped');
  note.setAttribute('aria-pressed', 'true');
  note.querySelector('.note-front').setAttribute('aria-hidden', 'true');
  note.querySelector('.note-back').setAttribute('aria-hidden', 'false');

  animateHearts(note.querySelector('.hearts-container'));
  playPopSound();
}

// Swipe detection for flipping notes
function detectSwipe(el, callback) {
  let touchstartX = 0;
  let touchstartY = 0;
  let touchendX = 0;
  let touchendY = 0;
  const threshold = 40; // Minimum swipe distance in px
  const restraint = 80; // Maximum vertical deviation

  el.addEventListener('touchstart', e => {
    const touch = e.changedTouches[0];
    touchstartX = touch.screenX;
    touchstartY = touch.screenY;
  }, {passive: true});

  el.addEventListener('touchend', e => {
    const touch = e.changedTouches[0];
    touchendX = touch.screenX;
    touchendY = touch.screenY;

    const distX = touchendX - touchstartX;
    const distY = touchendY - touchstartY;

    if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint) {
      if (distX > 0) {
        callback('right');
      } else {
        callback('left');
      }
    }
  }, {passive: true});
}

// Attach events for click, keyboard, and swipe flipping & ripple effect
document.querySelectorAll('.note').forEach(note => {
  const noteFront = note.querySelector('.note-front');

  function handleFlipEvent(e) {
    if (note.classList.contains('flipped')) return;

    if (e.type === 'click') {
      createRipple(noteFront, e.clientX, e.clientY);
      setTimeout(() => flipNote(note), 150);
    } else if (e.type === 'keydown') {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const rect = noteFront.getBoundingClientRect();
        createRipple(noteFront, rect.left + rect.width/2, rect.top + rect.height/2);
        setTimeout(() => flipNote(note), 150);
      }
    }
  }

  note.addEventListener('click', handleFlipEvent);
  note.addEventListener('keydown', handleFlipEvent);

  detectSwipe(note, (direction) => {
    if (!note.classList.contains('flipped')) {
      const rect = noteFront.getBoundingClientRect();
      createRipple(noteFront, rect.left + rect.width/2, rect.top + rect.height/2);
      setTimeout(() => flipNote(note), 150);
    }
  });
});

// Sparkles background animation creation
const sparkleCount = 40;
const sparkleContainer = document.querySelector('.sparkle');
const svgNS = "http://www.w3.org/2000/svg";

for (let i = 0; i < sparkleCount; i++) {
  const sparkle = document.createElementNS(svgNS, "svg");
  sparkle.setAttribute("width", "12");
  sparkle.setAttribute("height", "12");
  sparkle.style.top = `${Math.random() * 100}vh`;
  sparkle.style.left = `${Math.random() * 100}vw`;
  sparkle.style.animationDuration = `${(1 + Math.random() * 2).toFixed(2)}s`;
  sparkle.style.animationDelay = `${(Math.random() * 3).toFixed(2)}s`;
  sparkle.style.position = "fixed";

  const star = document.createElementNS(svgNS, "circle");
  star.setAttribute("cx", "6");
  star.setAttribute("cy", "6");
  star.setAttribute("r", "1.5");
  star.setAttribute("fill", "#ffc0cb");

  sparkle.appendChild(star);
  sparkleContainer.appendChild(sparkle);
}
