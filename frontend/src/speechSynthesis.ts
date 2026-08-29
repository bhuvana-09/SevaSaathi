import { Language } from './constants';

export interface SpeakResult {
  fallbackNotice: string | null;
}

export function speakText(
  text: string,
  requestedLang: Language,
  onEnd?: () => void
): SpeakResult {
  if (!('speechSynthesis' in window)) {
    console.warn('Speech Synthesis API is not supported in this browser.');
    return { fallbackNotice: null };
  }

  // Cancel any ongoing speech
  window.speechSynthesis.cancel();

  if (!text.trim()) return { fallbackNotice: null };

  const utterance = new SpeechSynthesisUtterance(text);
  const voices = window.speechSynthesis.getVoices();

  // Helper to find a voice by language code
  const findVoice = (langCode: string) => {
    return voices.find(
      (v) =>
        v.lang.toLowerCase() === langCode.toLowerCase() ||
        v.lang.toLowerCase().startsWith(langCode.toLowerCase().slice(0, 2))
    );
  };

  let selectedVoice: SpeechSynthesisVoice | undefined = undefined;
  let usedLangCode = 'en-IN';
  let fallbackNotice: string | null = null;

  if (requestedLang === 'te') {
    selectedVoice = findVoice('te-IN') || findVoice('te');
    if (selectedVoice) {
      usedLangCode = 'te-IN';
    } else {
      // Fallback 1: Try Hindi
      selectedVoice = findVoice('hi-IN') || findVoice('hi');
      if (selectedVoice) {
        usedLangCode = 'hi-IN';
        fallbackNotice = 'Telugu voice not available on this device — reading aloud in Hindi.';
      } else {
        // Fallback 2: Try English
        selectedVoice = findVoice('en-IN') || findVoice('en-US') || findVoice('en');
        usedLangCode = 'en-IN';
        fallbackNotice = 'Telugu/Hindi voices not available on this device — reading aloud in English.';
      }
    }
  } else if (requestedLang === 'hi') {
    selectedVoice = findVoice('hi-IN') || findVoice('hi');
    if (selectedVoice) {
      usedLangCode = 'hi-IN';
    } else {
      // Fallback: Try English
      selectedVoice = findVoice('en-IN') || findVoice('en-US') || findVoice('en');
      usedLangCode = 'en-IN';
      fallbackNotice = 'Hindi voice not available on this device — reading aloud in English.';
    }
  } else {
    selectedVoice = findVoice('en-IN') || findVoice('en-US') || findVoice('en');
    usedLangCode = 'en-IN';
  }

  utterance.lang = usedLangCode;
  utterance.rate = 0.95; // relaxed pace

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
