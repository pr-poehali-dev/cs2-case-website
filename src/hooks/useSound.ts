import { useCallback } from 'react';

interface SoundEffects {
  playOpenCase: () => void;
  playWinItem: (rarity: string) => void;
  playHover: () => void;
  playClick: () => void;
}

export const useSound = (): SoundEffects => {
  const playSound = useCallback((frequency: number, duration: number, type: OscillatorType = 'sine') => {
    if (typeof window === 'undefined') return;
    
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
      oscillator.type = type;

      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + duration);
    } catch (error) {
      console.warn('Звуковые эффекты недоступны:', error);
    }
  }, []);

  const playOpenCase = useCallback(() => {
    playSound(200, 0.1);
    setTimeout(() => playSound(300, 0.1), 100);
    setTimeout(() => playSound(400, 0.2), 200);
  }, [playSound]);

  const playWinItem = useCallback((rarity: string) => {
    switch (rarity) {
      case 'legendary':
        playSound(800, 0.3, 'triangle');
        setTimeout(() => playSound(1000, 0.3, 'triangle'), 150);
        setTimeout(() => playSound(1200, 0.5, 'triangle'), 300);
        break;
      case 'epic':
        playSound(600, 0.25, 'sawtooth');
        setTimeout(() => playSound(800, 0.25, 'sawtooth'), 150);
        break;
      case 'rare':
        playSound(500, 0.2, 'square');
        setTimeout(() => playSound(650, 0.2, 'square'), 100);
        break;
      default:
        playSound(400, 0.15);
    }
  }, [playSound]);

  const playHover = useCallback(() => {
    playSound(300, 0.05);
  }, [playSound]);

  const playClick = useCallback(() => {
    playSound(500, 0.1, 'square');
  }, [playSound]);

  return {
    playOpenCase,
    playWinItem,
    playHover,
    playClick
  };
};