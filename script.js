(() => {
  const intro = document.getElementById('intro');
  const birthday = document.getElementById('birthday');
  const countNumber = document.getElementById('countNumber');
  const countCaption = document.getElementById('countCaption');
  const countProgress = document.getElementById('countProgress');

  // The countdown starts as soon as the page loads.
  const countSteps = [
    { number: '3', caption: 'یه سورپرایز کوچیک در راهه...' },
    { number: '2', caption: 'فقط یه لحظه‌ی دیگه...' },
    { number: '1', caption: 'این یکی مخصوص توئه...' },
    { number: '0', caption: 'با عشق، برای تو 🤍' }
  ];
  let countIndex = 0;
  function showCountStep() {
    const step = countSteps[countIndex];
    countNumber.textContent = step.number;
    countCaption.textContent = step.caption;
    countNumber.classList.remove('pop');
    void countNumber.offsetWidth;
    countNumber.classList.add('pop');
    countProgress.style.width = `${((countIndex + 1) / countSteps.length) * 100}%`;
    countIndex += 1;
    if (countIndex < countSteps.length) {
      window.setTimeout(showCountStep, 850);
    } else {
      window.setTimeout(() => {
        intro.classList.add('leaving');
        birthday.classList.remove('is-hidden');
        window.setTimeout(() => intro.remove(), 1100);
        document.dispatchEvent(new CustomEvent('birthday:site-ready'));
      }, 650);
    }
  }
  showCountStep();

  // Blow the candle out after the flame is brushed several times.
  const flameHit = document.getElementById('flameHit');
  const flame = document.getElementById('flame');
  const smoke = document.getElementById('smoke');
  const realCakeImage = document.getElementById('realCakeImage');
  const cakeHint = document.getElementById('cakeHint');
  const wishMessage = document.getElementById('wishMessage');
  let flameTouches = 0;
  let candleOut = false;
  let lastTouch = 0;
  function brushFlame(event) {
    if (candleOut) return;
    const now = Date.now();
    if (now - lastTouch < 250) return;
    lastTouch = now;
    flameTouches += 1;
    flame.style.transform = `rotate(${flameTouches % 2 ? -20 : 18}deg) scale(${1 + flameTouches * 0.025})`;
    if (flameTouches >= 3) {
      candleOut = true;
      flame.classList.add('is-out');
      document.dispatchEvent(new CustomEvent('birthday:candle-out'));
      if (realCakeImage) realCakeImage.classList.add('candle-extinguished');
      smoke.classList.remove('rise');
      void smoke.offsetWidth;
      smoke.classList.add('rise');
      cakeHint.textContent = 'آرزو کردی؟ پس بذار قشنگ‌ترین اتفاق‌ها شروع بشن ✨';
      wishMessage.classList.add('show');
      document.getElementById('cakeModel').setAttribute('aria-label', 'کیک تولد با شمع خاموش');
    } else {
      cakeHint.innerHTML = `<span class="hint-spark">✦</span> یه بار دیگه... ${3 - flameTouches} بار مونده <span class="hint-spark">✦</span>`;
    }
  }
  flameHit.addEventListener('pointerenter', (event) => {
    if (event.pointerType === 'mouse') brushFlame(event);
  });
  flameHit.addEventListener('click', (event) => {
    // Touch users tap the flame; mouse users trigger it by brushing across it.
    if (event.pointerType && event.pointerType !== 'mouse') brushFlame(event);
  });

  // The gift reacts to three clicks, then releases the three photographs.
  const giftBox = document.getElementById('giftBox');
  const giftCount = document.getElementById('giftCount');
  const giftStatus = document.getElementById('giftStatus');
  const memoryPhotos = document.getElementById('memoryPhotos');
  const giftFinal = document.getElementById('giftFinal');
  let giftClicks = 0;
  function clickGift() {
    if (giftClicks >= 3) return;
    giftClicks += 1;
    giftBox.classList.remove('shake-one', 'shake-two', 'shake-three');
    void giftBox.offsetWidth;
    giftBox.classList.add(`shake-${['one', 'two', 'three'][giftClicks - 1]}`);
    giftBox.dispatchEvent(new CustomEvent('birthday:gift-click', { detail: { count: giftClicks } }));
    if (giftClicks < 3) {
      giftCount.textContent = String(3 - giftClicks);
      giftStatus.textContent = giftClicks === 1 ? 'روبان داره شل می‌شه... دو کلیک دیگه 💙' : 'یه تکون دیگه و کادو باز می‌شه... فقط یکی مونده!';
    } else {
      giftBox.classList.add('open');
      giftCount.textContent = '';
      giftStatus.textContent = 'اینم سه تا خاطره‌ی قشنگ، مخصوص تو 🤍';
      window.setTimeout(() => {
        memoryPhotos.classList.add('revealed');
        giftFinal.classList.add('show');
      }, 500);
    }
  }
  giftBox.addEventListener('click', clickGift);
  giftBox.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      clickGift();
    }
  });

  // Tap any of the revealed photos to view it larger.
  const lightbox = document.getElementById('photoLightbox');
  const lightboxImage = document.getElementById('lightboxImage');
  const lightboxClose = document.getElementById('lightboxClose');
  document.querySelectorAll('.memory-photo').forEach((button) => {
    button.addEventListener('click', () => {
      lightboxImage.src = button.dataset.photo;
      lightbox.classList.add('open');
      lightbox.setAttribute('aria-hidden', 'false');
    });
  });
  function closeLightbox() {
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
  }
  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (event) => { if (event.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeLightbox(); });
})();
