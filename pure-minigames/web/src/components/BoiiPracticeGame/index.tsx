import { useEffect, useRef, useState } from 'react';
import { BOII_GAMES, BoiiGameId } from '../PracticeCatalog';
import style from './index.module.css';

interface BoiiPracticeGameProps {
  gameId: BoiiGameId;
  onBack: () => void;
}

interface GameFinishedMessage {
  source: 'boii-browser-practice';
  action: 'game-finished';
  callback: string;
  success: boolean | string;
}

const BoiiPracticeGame = ({ gameId, onBack }: BoiiPracticeGameProps) => {
  const game = BOII_GAMES.find((item) => item.id === gameId);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [runNumber, setRunNumber] = useState(0);
  const [frameReady, setFrameReady] = useState(false);
  const [result, setResult] = useState<boolean | string | null>(null);

  useEffect(() => {
    const handleMessage = (event: MessageEvent<GameFinishedMessage>) => {
      if (
        event.origin !== window.location.origin ||
        event.source !== iframeRef.current?.contentWindow ||
        event.data?.source !== 'boii-browser-practice' ||
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
        action: 'start_minigame',
        game: game.id,
        data: game.data,
      },
      window.location.origin
    );
    setFrameReady(false);
  }, [frameReady, game, runNumber]);

  if (!game) {
    return null;
  }

  const succeeded =
    result === true || result === 'success' || result === 'perfect';

  return (
    <main className={style.page}>
      <header className={style.toolbar}>
        <button className={style.backButton} type='button' onClick={onBack}>
          Back to games
        </button>
        <div className={style.title}>
          <span className={style.eyebrow}>BOII MINIGAMES</span>
          <h1>{game.title}</h1>
        </div>
        <a
          className={style.sourceLink}
          href='https://github.com/boiidevelopment/boii_minigames'
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
          src={`${import.meta.env.BASE_URL}games/boii/index.html`}
          onLoad={() => setFrameReady(true)}
          allow='autoplay'
        />
      </div>

      {result !== null && (
        <div
          className={`${style.result} ${succeeded ? style.success : style.failure}`}
          role='status'>
          <span>{succeeded ? 'Round complete' : 'Round failed'}</span>
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

export default BoiiPracticeGame;
