import { Language } from './constants';

export interface SpeakResult {
  fallbackNotice: string | null;
}

/**
 * Returns available speechSynthesis voices, waiting for voiceschanged if empty.
 */
export function getVoicesAsync(): Promise<SpeechSynthesisVoice[]> {
  return new Promise((resolve) => {
    if (!('speechSynthesis' in window)) {
      resolve([]);
      return;
    }

    const synth = window.speechSynthesis;
    let voices = synth.getVoices();

    if (voices.length > 0) {
      resolve(voices);
      return;
    }

    const onVoicesChanged = () => {
      voices = synth.getVoices();
      synth.removeEventListener('voiceschanged', onVoicesChanged);
      resolve(voices);
    };

    synth.addEventListener('voiceschanged', onVoicesChanged);

    // Timeout fallback after 600ms in case event doesn't fire
    setTimeout(() => {
      synth.removeEventListener('voiceschanged', onVoicesChanged);
      resolve(synth.getVoices());
    }, 600);
  });
}

/**
 * Speaks text using SpeechSynthesis with voice fallback chain and prefix matching.
 */
export async function speakText(
  text: string,
  requestedLang: Language,
  onEnd?: () => void
): Promise<SpeakResult> {
  if (!('speechSynthesis' in window)) {
    console.warn('Speech Synthesis API is not supported in this browser.');
    return { fallbackNotice: null };
  }

  // Stop any active narration
  window.speechSynthesis.cancel();

  if (!text.trim()) return { fallbackNotice: null };

  const voices = await getVoicesAsync();

  const matchesPrefix = (voice: SpeechSynthesisVoice, prefix: string) => {
    return voice.lang.toLowerCase().startsWith(prefix.toLowerCase());
  };

  let selectedVoice: SpeechSynthesisVoice | undefined = undefined;
  let usedLangCode = 'en-IN';
  let fallbackNotice: string | null = null;

  if (requestedLang === 'te') {
    // 1. Try Telugu voice (e.g., te-IN, te)
    selectedVoice = voices.find((v) => matchesPrefix(v, 'te'));

    if (selectedVoice) {
      usedLangCode = selectedVoice.lang;
      fallbackNotice = null;
    } else {
      // 2. Fallback to Hindi voice (e.g., hi-IN, hi)
      selectedVoice = voices.find((v) => matchesPrefix(v, 'hi'));
      if (selectedVoice) {
        usedLangCode = selectedVoice.lang;
        fallbackNotice = 'Telugu voice not available on this device — reading aloud in Hindi.';
      } else {
        // 3. Fallback to English voice
        selectedVoice = voices.find((v) => matchesPrefix(v, 'en'));
        usedLangCode = selectedVoice ? selectedVoice.lang : 'en-US';
        fallbackNotice = 'Telugu and Hindi voices not available on this device — reading aloud in English.';
      }
    }
  } else if (requestedLang === 'hi') {
    // Try Hindi voice (e.g., hi-IN, hi)
    selectedVoice = voices.find((v) => matchesPrefix(v, 'hi'));

    if (selectedVoice) {
      usedLangCode = selectedVoice.lang;
      fallbackNotice = null; // Hindi voice is present! No false fallback banner.
    } else {
      // Fallback to English voice
      selectedVoice = voices.find((v) => matchesPrefix(v, 'en'));
      usedLangCode = selectedVoice ? selectedVoice.lang : 'en-US';
      fallbackNotice = 'Hindi voice not available on this device — reading aloud in English.';
    }
  } else {
    // English
    selectedVoice = voices.find((v) => matchesPrefix(v, 'en'));
    usedLangCode = selectedVoice ? selectedVoice.lang : 'en-US';
    fallbackNotice = null;
  }

  console.log(`[SpeechSynth] Language: ${requestedLang}, Voice used: ${selectedVoice ? selectedVoice.name : 'default'} (${usedLangCode})`);

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = usedLangCode;
  utterance.rate = 0.95;

  if (selectedVoice) {
    utterance.voice = selectedVoice;
  }

  if (onEnd) {
    utterance.onend = onEnd;
    utterance.onerror = onEnd;
  }

  window.speechSynthesis.speak(utterance);

  return { fallbackNotice };
}

export function stopSpeech() {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}
