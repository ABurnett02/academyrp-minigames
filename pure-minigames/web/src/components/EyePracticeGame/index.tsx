import { useEffect, useRef, useState } from 'react';
import { EYE_GAME_CATEGORIES } from '../PracticeCatalog';
import style from './index.module.css';

interface EyePracticeGameProps {
  gameId: string;
  onBack: () => void;
}

interface GameFinishedMessage {
  source: 'eye-browser-practice';
  action: 'game-finished';
  success: boolean;
}

const gameOverrides: Record<string, Record<string, number>> = {
  skillcheck: { rounds: 3 },
  flatline: { rounds: 3 },
  deadcalm: { shots: 3 },
  vaultspin: { tumblers: 3 },
  bluff: { hands: 3 },
};

const EyePracticeGame = ({ gameId, onBack }: EyePracticeGameProps) => {
  const game = EYE_GAME_CATEGORIES.flatMap((category) => category.games).find(
    (item) => item.id === gameId
  );
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [runNumber, setRunNumber] = useState(0);
  const [frameReady, setFrameReady] = useState(false);
  const [result, setResult] = useState<boolean | null>(null);

  useEffect(() => {
    const handleMessage = (event: MessageEvent<GameFinishedMessage>) => {
      if (
        event.origin !== window.location.origin ||
        event.source !== iframeRef.current?.contentWindow ||
        event.data?.source !== 'eye-browser-practice' ||
        event.data.action !== 'game-finished'
      ) {
        return;
      }
      setResult(event.data.success);
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  useEffect(() => {
    if (!game || !frameReady) return;

    iframeRef.current?.contentWindow?.postMessage(
      {
        action: 'open',
        payload: {
          game: game.id,
          difficulty: 2,
          allowCancel: true,
          sound: true,
          volume: 0.5,
          ...gameOverrides[game.id],
        },
      },
      window.location.origin
    );
    setFrameReady(false);
  }, [frameReady, game, runNumber]);

  if (!game) {
    return null;
  }

  return (
    <main className={style.page}>
      <header className={style.toolbar}>
        <button className={style.backButton} type='button' onClick={onBack}>
          Back to games
        </button>
        <div className={style.title}>
          <span className={style.eyebrow}>AY-EYE MINIGAMES · {game.category}</span>
          <h1>{game.title}</h1>
        </div>
        <a
          className={style.sourceLink}
          href='https://github.com/invalid0190/eye_minigames'
          target='_blank'
          rel='noreferrer'>
          Upstream source
        </a>
      </header>

      <div className={style.frameShell}>
        <iframe
          key={runNumber}
          ref={iframeRef}
          className={style.frame}
          title={`${game.title} practice`}
          src={`${import.meta.env.BASE_URL}games/eye/index.html`}
          onLoad={() => setFrameReady(true)}
          allow='autoplay'
        />
      </div>

      {result !== null && (
        <div
          className={`${style.result} ${result ? style.success : style.failure}`}
          role='status'>
          <span>{result ? 'Round complete' : 'Round failed'}</span>
          <button
            className={style.replayButton}
            type='button'
            onClick={() => {
              setFrameReady(false);
              setResult(null);
              setRunNumber((number) => number + 1);
            }}>
            Play again
          </button>
        </div>
      )}
    </main>
  );
};

export default EyePracticeGame;
