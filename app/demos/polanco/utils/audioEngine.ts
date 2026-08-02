'use client';
// High-Fidelity Automotive Exhaust Sound Synthesizer using Web Audio API
// Custom research-backed acoustic parameters for hypercar and luxury marques

export interface AcousticProfile {
  engineType: string;
  idleRpm: number;
  redlineRpm: number;
  cylinders: number;
  firingMultiplier: number;
  harmonics: number[];
  harmonicGains: number[];
  filterType: BiquadFilterType;
  filterCutoffIdle: number;
  filterCutoffRedline: number;
  resonanceQ: number;
  hasTurboSpool: boolean;
  turboFreqRange?: [number, number];
  hasElectricHum?: boolean;
  hasBurblePops: boolean;
  popFreqRange?: [number, number];
  description: string;
}

export const MARQUE_ACOUSTIC_PROFILES: Record<string, AcousticProfile> = {
  // 1. Screaming F1 V12 (Ferrari Purosangue V12 / Lamborghini Revuelto V12)
  'v12-naturally-aspirated': {
    engineType: '6.5L F140 IA Naturally Aspirated V12',
    idleRpm: 950,
    redlineRpm: 9500,
    cylinders: 12,
    firingMultiplier: 6, // 12 cyl / 2 revs
    harmonics: [1, 2, 3, 4, 6, 12],
    harmonicGains: [0.65, 0.5, 0.38, 0.28, 0.22, 0.18],
    filterType: 'bandpass',
    filterCutoffIdle: 420,
    filterCutoffRedline: 4800,
    resonanceQ: 4.2,
    hasTurboSpool: false,
    hasBurblePops: true,
    popFreqRange: [750, 2800],
    description: 'High-pitched 9,500 RPM Formula 1 crescendo with equal-length manifold resonance.'
  },

  // 2. High-Rev Motorsport Flat-6 (Porsche 911 GT3 RS)
  'flat-6-high-rev': {
    engineType: '4.0L High-Revving Flat-6 (9,000 RPM)',
    idleRpm: 950,
    redlineRpm: 9000,
    cylinders: 6,
    firingMultiplier: 3, // 6 cyl / 2 revs
    harmonics: [1, 2, 3, 6, 9],
    harmonicGains: [0.72, 0.52, 0.42, 0.28, 0.18],
    filterType: 'bandpass',
    filterCutoffIdle: 380,
    filterCutoffRedline: 4100,
    resonanceQ: 4.5,
    hasTurboSpool: false,
    hasBurblePops: true,
    popFreqRange: [550, 1600],
    description: 'Legendary 9,000 RPM Motorsport Cup Car howl with 6 individual throttle body induction.'
  },

  // 3. Flat-Plane Twin-Turbo V8 (McLaren 750S Spider / Koenigsegg Jesko Attack)
  'v8-flat-plane-turbo': {
    engineType: '4.0L M840T Twin-Turbo Flat-Plane V8',
    idleRpm: 950,
    redlineRpm: 8500,
    cylinders: 8,
    firingMultiplier: 4,
    harmonics: [1, 2, 4, 8, 16],
    harmonicGains: [0.7, 0.5, 0.35, 0.22, 0.12],
    filterType: 'lowpass',
    filterCutoffIdle: 520,
    filterCutoffRedline: 3900,
    resonanceQ: 3.2,
    hasTurboSpool: true,
    turboFreqRange: [2200, 7500],
    hasBurblePops: true,
    popFreqRange: [900, 3200],
    description: 'Ultra-sharp 180° flat-plane V8 bark with lightning-fast rev inertia & flame overruns.'
  },

  // 4. Cross-Plane AMG V8 Rumble (Mercedes-AMG G63 / Aston Martin DB12)
  'v8-twin-turbo': {
    engineType: '4.0L Handcrafted Twin-Turbo V8',
    idleRpm: 750,
    redlineRpm: 7200,
    cylinders: 8,
    firingMultiplier: 4,
    harmonics: [0.5, 1, 1.5, 2, 3, 4],
    harmonicGains: [0.85, 0.65, 0.45, 0.3, 0.2, 0.12],
    filterType: 'lowpass',
    filterCutoffIdle: 280,
    filterCutoffRedline: 2900,
    resonanceQ: 2.4,
    hasTurboSpool: true,
    turboFreqRange: [1800, 5500],
    hasBurblePops: true,
    popFreqRange: [120, 450],
    description: 'Deep 4.0L cross-plane side-pipe V8 rumble with heavy low-frequency overrun crackles.'
  },

  // 5. Quad-Turbo W16 Thunder (Bugatti Chiron Pur Sport)
  'w16-quad-turbo': {
    engineType: '8.0L Quad-Turbocharged W16',
    idleRpm: 650,
    redlineRpm: 6900,
    cylinders: 16,
    firingMultiplier: 8,
    harmonics: [0.25, 0.5, 1, 2, 4, 8, 16],
    harmonicGains: [0.9, 0.65, 0.45, 0.3, 0.2, 0.12, 0.08],
    filterType: 'lowpass',
    filterCutoffIdle: 220,
    filterCutoffRedline: 2600,
    resonanceQ: 2.0,
    hasTurboSpool: true,
    turboFreqRange: [3500, 12000],
    hasBurblePops: true,
    popFreqRange: [80, 220],
    description: 'Massive 8.0L W16 bass surge with quad-turbo wastegate blow-off flutter.'
  },

  // 6. Heavy W12 Surge (Bentley Continental GT / Flying Spur)
  'w12-twin-turbo': {
    engineType: '6.0L Twin-Turbo W12',
    idleRpm: 600,
    redlineRpm: 6500,
    cylinders: 12,
    firingMultiplier: 6,
    harmonics: [0.5, 1, 2, 3, 6],
    harmonicGains: [0.8, 0.5, 0.3, 0.2, 0.1],
    filterType: 'lowpass',
    filterCutoffIdle: 240,
    filterCutoffRedline: 2400,
    resonanceQ: 2.0,
    hasTurboSpool: true,
    turboFreqRange: [1500, 4800],
    hasBurblePops: false,
    description: 'Effortless 6.0L W12 acoustic wave with velvet low-end torque.'
  },

  // 7. Silent Velvet V12 (Rolls-Royce Cullinan / Phantom / Spectre)
  'v12-velvet-silent': {
    engineType: '6.75L Twin-Turbo V12 Whisper',
    idleRpm: 550,
    redlineRpm: 5500,
    cylinders: 12,
    firingMultiplier: 6,
    harmonics: [0.5, 1, 2],
    harmonicGains: [0.45, 0.2, 0.08],
    filterType: 'lowpass',
    filterCutoffIdle: 180,
    filterCutoffRedline: 1200,
    resonanceQ: 1.2,
    hasTurboSpool: false,
    hasBurblePops: false,
    description: 'Ultra-refined 6.75L V12 whisper with near-zero cabin vibrations.'
  }
};

export class ExhaustAudioSynthesizer {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private oscillators: OscillatorNode[] = [];
  private gains: GainNode[] = [];
  private mainGain: GainNode | null = null;
  private filter: BiquadFilterNode | null = null;
  private turboOsc: OscillatorNode | null = null;
  private turboGain: GainNode | null = null;
  private currentRpm = 850;
  private profileKey = 'v12-naturally-aspirated';

  private initCtx() {
    if (!this.ctx) {
      const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext;
      this.ctx = new AudioCtxClass();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public start(soundTypeKey: string = 'v12-naturally-aspirated', initialRpm = 850) {
    this.initCtx();
    if (!this.ctx) return;

    if (this.isPlaying) {
      this.stop();
    }

    const profile = MARQUE_ACOUSTIC_PROFILES[soundTypeKey] || MARQUE_ACOUSTIC_PROFILES['v12-naturally-aspirated'];
    this.profileKey = soundTypeKey;
    this.currentRpm = initialRpm;
    this.isPlaying = true;

    const now = this.ctx.currentTime;

    // Master Volume Gain
    this.mainGain = this.ctx.createGain();
    this.mainGain.gain.setValueAtTime(0.01, now);
    this.mainGain.gain.exponentialRampToValueAtTime(0.48, now + 0.15);

    // Biquad Exhaust Filter
    this.filter = this.ctx.createBiquadFilter();
    this.filter.type = profile.filterType;
    this.filter.Q.value = profile.resonanceQ;

    const fundamentalFreq = (initialRpm / 60) * profile.firingMultiplier;
    const filterCutoff = profile.filterCutoffIdle;
    this.filter.frequency.setValueAtTime(filterCutoff, now);

    this.filter.connect(this.mainGain);
    this.mainGain.connect(this.ctx.destination);

    // Create Harmonic Oscillators
    this.oscillators = [];
    this.gains = [];

    profile.harmonics.forEach((harmonicMult, i) => {
      if (!this.ctx || !this.filter) return;
      const osc = this.ctx.createOscillator();
      const gainNode = this.ctx.createGain();

      osc.type = profile.cylinders >= 12 ? 'triangle' : 'sawtooth';
      osc.frequency.setValueAtTime(fundamentalFreq * harmonicMult, now);

      const hGain = profile.harmonicGains[i] || 0.2;
      gainNode.gain.setValueAtTime(hGain, now);

      osc.connect(gainNode);
      gainNode.connect(this.filter);
      osc.start(now);

      this.oscillators.push(osc);
      this.gains.push(gainNode);
    });

    // Turbo Spool Whistle if applicable
    if (profile.hasTurboSpool && profile.turboFreqRange) {
      this.turboOsc = this.ctx.createOscillator();
      this.turboGain = this.ctx.createGain();

      this.turboOsc.type = 'sine';
      this.turboOsc.frequency.setValueAtTime(profile.turboFreqRange[0], now);
      this.turboGain.gain.setValueAtTime(0.02, now);

      this.turboOsc.connect(this.turboGain);
      this.turboGain.connect(this.mainGain);
      this.turboOsc.start(now);
    }
  }

  public updateRpm(newRpm: number) {
    if (!this.ctx || !this.isPlaying) return;

    const profile = MARQUE_ACOUSTIC_PROFILES[this.profileKey] || MARQUE_ACOUSTIC_PROFILES['v12-naturally-aspirated'];
    this.currentRpm = Math.max(profile.idleRpm, Math.min(profile.redlineRpm, newRpm));

    const now = this.ctx.currentTime;
    const fundamentalFreq = (this.currentRpm / 60) * profile.firingMultiplier;

    // Update Harmonic Frequencies
    this.oscillators.forEach((osc, i) => {
      const mult = profile.harmonics[i] || 1;
      osc.frequency.setTargetAtTime(fundamentalFreq * mult, now, 0.04);
    });

    // Update Filter Cutoff based on RPM
    if (this.filter) {
      const rpmRatio = (this.currentRpm - profile.idleRpm) / (profile.redlineRpm - profile.idleRpm);
      const cutoff = profile.filterCutoffIdle + rpmRatio * (profile.filterCutoffRedline - profile.filterCutoffIdle);
      this.filter.frequency.setTargetAtTime(cutoff, now, 0.04);
    }

    // Update Turbo Spool Whistle Pitch
    if (this.turboOsc && this.turboGain && profile.hasTurboSpool && profile.turboFreqRange) {
      const rpmRatio = (this.currentRpm - profile.idleRpm) / (profile.redlineRpm - profile.idleRpm);
      const minFreq = profile.turboFreqRange[0];
      const maxFreq = profile.turboFreqRange[1];
      const turboPitch = minFreq + rpmRatio * (maxFreq - minFreq);
      const turboVol = 0.02 + rpmRatio * 0.08;

      this.turboOsc.frequency.setTargetAtTime(turboPitch, now, 0.05);
      this.turboGain.gain.setTargetAtTime(turboVol, now, 0.05);
    }
  }

  // Trigger Exhaust Overrun Pops & Crackles
  public triggerBurblePops() {
    if (!this.ctx || !this.isPlaying || !this.mainGain) return;

    const profile = MARQUE_ACOUSTIC_PROFILES[this.profileKey] || MARQUE_ACOUSTIC_PROFILES['v12-naturally-aspirated'];
    if (!profile.hasBurblePops) return;

    const minPopFreq = profile.popFreqRange ? profile.popFreqRange[0] : 150;
    const maxPopFreq = profile.popFreqRange ? profile.popFreqRange[1] : 450;

    const now = this.ctx.currentTime;
    const popCount = 5 + Math.floor(Math.random() * 6);

    for (let i = 0; i < popCount; i++) {
      const delay = now + i * (0.035 + Math.random() * 0.045);
      const bufferSize = this.ctx.sampleRate * 0.03;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);

      for (let j = 0; j < bufferSize; j++) {
        data[j] = (Math.random() * 2 - 1) * Math.exp(-j / (bufferSize * 0.2));
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const popFilter = this.ctx.createBiquadFilter();
      popFilter.type = 'bandpass';
      popFilter.frequency.value = minPopFreq + Math.random() * (maxPopFreq - minPopFreq);
      popFilter.Q.value = 2.5;

      const popGain = this.ctx.createGain();
      popGain.gain.setValueAtTime(0.4 + Math.random() * 0.3, delay);
      popGain.gain.exponentialRampToValueAtTime(0.001, delay + 0.04);

      noise.connect(popFilter);
      popFilter.connect(popGain);
      popGain.connect(this.mainGain);

      noise.start(delay);
    }
  }

  public stop() {
    if (!this.ctx || !this.isPlaying) return;

    const now = this.ctx.currentTime;
    if (this.mainGain) {
      this.mainGain.gain.setValueAtTime(this.mainGain.gain.value, now);
      this.mainGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.15);
    }

    setTimeout(() => {
      this.oscillators.forEach(osc => {
        try { osc.stop(); osc.disconnect(); } catch (e) {}
      });
      if (this.turboOsc) {
        try { this.turboOsc.stop(); this.turboOsc.disconnect(); } catch (e) {}
      }
      this.oscillators = [];
      this.gains = [];
      this.isPlaying = false;
    }, 160);
  }
}

export const globalAudioSynthesizer = new ExhaustAudioSynthesizer();
