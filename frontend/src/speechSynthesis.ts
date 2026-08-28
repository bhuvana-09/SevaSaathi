import { Language } from './constants';

export function speakText(text: string, lang: Language, onEnd?: () => void) {
  if (!('speechSynthesis' in window)) {
    console.warn('Speech Synthesis API is not supported in this browser.');
    return;
  }

  // Cancel any ongoing speech
  window.speechSynthesis.cancel();

  if (!text.trim()) return;

  const utterance = new SpeechSynthesisUtterance(text);

  const langMap: Record<Language, string> = {
    en: 'en-IN',
    hi: 'hi-IN',
    te: 'te-IN',
  };

  utterance.lang = langMap[lang] || 'en-IN';
  utterance.rate = 0.95; // slightly relaxed reading pace

  if (onEnd) {
    utterance.onend = onEnd;
    utterance.onerror = onEnd;
  }

  // Try to pick a voice matching the language if available
  const voices = window.speechSynthesis.getVoices();
  const matchingVoice = voices.find(
    (v) => v.lang.toLowerCase() === utterance.lang.toLowerCase() || v.lang.startsWith(utterance.lang.slice(0, 2))
  );
  if (matchingVoice) {
    utterance.voice = matchingVoice;
  }

  window.speechSynthesis.speak(utterance);
}

export function stopSpeech() {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}
