document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements
  const introOverlay = document.getElementById('intro-overlay');
  const enterBtn = document.getElementById('enter-btn');
  const mainContent = document.getElementById('main-content');
  const bgAudio = document.getElementById('bg-audio');
  const audioToggle = document.getElementById('audio-toggle');
  const vinylIcon = document.getElementById('vinyl-icon');
  const audioStatus = document.getElementById('audio-status');
  
  const waxSeal = document.getElementById('wax-seal');
  const letterPaper = document.getElementById('letter-paper');
  
  const yesBtn = document.getElementById('yes-btn');
  const noBtn = document.getElementById('no-btn');
  const celebrationMsg = document.getElementById('celebration-message');

  // ================= 1. ENTER / AUDIO UNLOCK =================
  enterBtn.addEventListener('click', () => {
    // Reveal main content and fade out overlay
    mainContent.classList.remove('hidden');
    introOverlay.classList.add('fade-out');

    // Attempt to play audio
    bgAudio.play().then(() => {
      vinylIcon.classList.add('spinning');
      audioStatus.textContent = 'Playing...';
    }).catch(err => {
      console.log('Audio playback was prevented:', err);
      audioStatus.textContent = 'Paused';
    });
  });

  // ================= 2. AUDIO PLAY / PAUSE TOGGLE =================
  audioToggle.addEventListener('click', () => {
    if (bgAudio.paused) {
      bgAudio.play();
      vinylIcon.classList.add('spinning');
      audioStatus.textContent = 'Playing...';
    } else {
      bgAudio.pause();
      vinylIcon.classList.remove('spinning');
      audioStatus.textContent = 'Paused';
    }
  });

  // ================= 3. WAX SEAL / LETTER REVEAL =================
  waxSeal.addEventListener('click', () => {
    waxSeal.classList.add('opened');
    letterPaper.classList.add('unblurred');
  });

  // ================= 4. THE EVADING "NO" BUTTON =================
  // If she hovers or touches the 'No' button, it jumps to a random spot
  const moveNoButton = () => {
    const randomX = (Math.random() - 0.5) * 200;
    const randomY = (Math.random() - 0.5) * 100;
    noBtn.style.transform = `translate(${randomX}px, ${randomY}px)`;
  };

  noBtn.addEventListener('mouseenter', moveNoButton);
  noBtn.addEventListener('touchstart', (e) => {
    e.preventDefault();
    moveNoButton();
  });

  // ================= 5. THE "YES" CELEBRATION =================
  yesBtn.addEventListener('click', () => {
    // Hide the buttons and show celebration message
    yesBtn.style.display = 'none';
    noBtn.style.display = 'none';
    celebrationMsg.classList.remove('hidden');

    // Trigger full-screen confetti bursts (with warm red/white tones)
    const duration = 4 * 1000;
    const animationEnd = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#9B2226', '#E8DCDD', '#FFFFFF', '#D90429']
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#9B2226', '#E8DCDD', '#FFFFFF', '#D90429']
      });

      if (Date.now() < animationEnd) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  });
});