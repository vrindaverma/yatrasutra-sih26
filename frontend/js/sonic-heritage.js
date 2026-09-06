let fluteAudio = null;
let fluteTimeout = null;
let countdownInterval = null;

function playSynthesizedFlute(duration = 10) {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    if (ctx.state === 'suspended') ctx.resume();

    // Sacred Tanpura background drone
    const droneGain = ctx.createGain();
    droneGain.gain.setValueAtTime(0.2, ctx.currentTime);
    droneGain.connect(ctx.destination);

    [146.83, 220.00, 293.66].forEach(freq => {
      const droneOsc = ctx.createOscillator();
      droneOsc.type = 'sine';
      droneOsc.frequency.setValueAtTime(freq, ctx.currentTime);
      droneOsc.connect(droneGain);
      droneOsc.start();
      droneOsc.stop(ctx.currentTime + duration);
    });

    // Krishna Bansuri Frequencies (Raag Bhupali / Yaman)
    const SA = 293.66, RE = 329.63, GA = 369.99, PA = 440.00, DHA = 493.88, SA_HI = 587.33, RE_HI = 659.25;
    const notes = [
      { t: 0.3, d: 1.3, f1: PA, f2: PA },
      { t: 1.7, d: 0.7, f1: DHA, f2: DHA },
      { t: 2.5, d: 1.8, f1: SA_HI, f2: SA_HI },
      { t: 4.4, d: 0.6, f1: RE_HI, f2: SA_HI },
      { t: 5.1, d: 1.2, f1: DHA, f2: DHA },
      { t: 6.4, d: 0.9, f1: PA, f2: PA },
      { t: 7.4, d: 0.8, f1: GA, f2: RE },
      { t: 8.3, d: 1.6, f1: SA, f2: SA }
    ];

    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.7, ctx.currentTime);
    masterGain.connect(ctx.destination);

    notes.forEach(n => {
      const startTime = ctx.currentTime + n.t;
      const stopTime = startTime + n.d;

      [1, 2, 3].forEach((harm, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = harm === 1 ? 'sine' : 'triangle';

        osc.frequency.setValueAtTime(n.f1 * harm, startTime);
        osc.frequency.exponentialRampToValueAtTime(Math.max(20, n.f2 * harm), startTime + n.d * 0.7);

        const vol = idx === 0 ? 0.75 : (idx === 1 ? 0.35 : 0.15);
        gain.gain.setValueAtTime(0.001, startTime);
        gain.gain.linearRampToValueAtTime(vol, startTime + 0.1);
        gain.gain.setValueAtTime(vol, stopTime - 0.15);
        gain.gain.exponentialRampToValueAtTime(0.001, stopTime);

        osc.connect(gain);
        gain.connect(masterGain);

        osc.start(startTime);
        osc.stop(stopTime);
      });
    });

    setTimeout(() => {
      try { ctx.close(); } catch(e){}
    }, duration * 1000);
  } catch (e) {
    console.error("Flute synth error:", e);
  }
}

function playKrishnaFlute() {
  if (fluteAudio) {
    try { fluteAudio.pause(); fluteAudio.currentTime = 0; } catch(e){}
  }
  clearTimeout(fluteTimeout);

  let el = document.getElementById('krishnaFlute');
  if (!el) {
    el = new Audio('assets/audio/krishna-flute.wav');
    el.id = 'krishnaFlute';
  }
  fluteAudio = el;
  fluteAudio.currentTime = 0;
  fluteAudio.volume = 1.0;

  let playPromise = fluteAudio.play();
  if (playPromise !== undefined) {
    playPromise.catch((err) => {
      console.warn("Direct audio play prevented, falling back to Web Audio synth:", err);
      playSynthesizedFlute(10);
    });
  }

  // Ensure it stops after 10 seconds
  fluteTimeout = setTimeout(() => {
    if (fluteAudio) {
      try { fluteAudio.pause(); fluteAudio.currentTime = 0; } catch(e){}
    }
  }, 10000);
}

function reveal(){
  const rev = document.getElementById('reveal');
  if (rev) rev.style.display = 'block';

  // Play Krishna's flute for 10 seconds
  playKrishnaFlute();

  // Visual status on the listen button & wave
  const btn = document.querySelector('.listen');
  const wave = document.querySelector('.wave');
  if (btn) {
    let timeLeft = 10;
    btn.innerText = `🪈 Playing Krishna's Flute (${timeLeft}s)`;
    btn.disabled = true;
    if (wave) wave.style.letterSpacing = '6px';

    clearInterval(countdownInterval);
    countdownInterval = setInterval(() => {
      timeLeft--;
      if (timeLeft > 0) {
        btn.innerText = `🪈 Playing Krishna's Flute (${timeLeft}s)`;
      } else {
        clearInterval(countdownInterval);
        btn.innerText = '▶ LISTEN AGAIN';
        btn.disabled = false;
        if (wave) wave.style.letterSpacing = '';
      }
    }, 1000);
  }
}

async function recordSonic(){
 let el=document.getElementById('recordStatus');el.innerText='Saving sonic capsule…';
 try{let x=await API.post('/sonic',{title:'Krishna Flute & Aarti Capsule',location:'Vrindavan • Nidhivan & Yamuna Ghat',note:'Prototype sonic memory'});el.innerText=`Sonic capsule #${x.id} saved to backend ✓`;refreshPassport()}
 catch(e){el.innerText='Backend unavailable — sonic demo not persisted'}
}

