import { FormEvent, useMemo, useState } from 'react';
import { debugData } from './utils/debugData';
import { fetchNui } from './utils/fetchNui';
import { useAppDistpatch, useAppSelector } from './store/store';
import { setConfig, setLanguage, setTheme } from './store/features/configSlice';
import { getThemeVariables } from './utils/getThemeVariables';
import GameHousing from './components/GameHousing';
import { setStartingData } from './store/minigames/numberCountSlice';
import { useNuiEvent } from './hooks/useNuiEvent';
import { setFailedStart } from './store/features/failedSlice';
import { setCurrentGame } from './store/features/currentGame';
import { startGameData } from './types/startGame';
import { isEnvBrowser } from './utils/misc';
import PracticeCatalog, {
  BoiiGameId,
} from './components/PracticeCatalog';
import BoiiPracticeGame from './components/BoiiPracticeGame';
import style from './App.module.css';

debugData([
  {
    action: 'setVisible',
    data: true,
  },
]);

const App = () => {
  const dispatch = useAppDistpatch();
  const numberCounter = useAppSelector((state) => state.numberCounter);
  const [loaded, setLoaded] = useState(false);
  const [selectedPractice, setSelectedPractice] = useState<
    'numberCounter' | BoiiGameId | null
  >(null);

  useMemo(() => {
    const asyncConfig = async () => {
      const themeVariables = await getThemeVariables();
      dispatch(setTheme(themeVariables));
      setLoaded(true);
    };
    asyncConfig();

    fetchNui('getConfig', {}, {})
      .then((config) => {
        dispatch(setConfig(config));
      })
      .catch((err) => {
        console.log(err);
      });

    fetchNui(
      'getLanguage',
      {},
      {
        failed: 'Failed.',
        loadingNextGame: 'Loading Next Game...',
        wrongNumber: 'Wrong Order.',
        tooSlow: 'Too Slow.',
        loadingDevice: 'Loading Device...',
      }
    )
      .then((config) => {
        dispatch(setLanguage(config));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useNuiEvent('startGame', (data) => {
    startGame(data);
  });

  const startGame = (data: startGameData) => {
    const startingData = {
      totalNumbers: data.totalNumbers,
      seconds: data.seconds,
      timesToChangeNumbers: data.timesToChangeNumbers,
      amountOfGames: data.amountOfGames,
      gamesCompleted: 0,
      gameSuccess: false,
      showGame: true,
      incrementByAmount: data.incrementByAmount,
    };
    dispatch(setCurrentGame(data.game));
    dispatch(setFailedStart());
    dispatch(setStartingData(startingData));
  };

  if (!loaded) return null;

  return (
    <>
      {!numberCounter.showGame && isEnvBrowser() && (
        selectedPractice === null ? (
          <PracticeCatalog
            onSelectNumberCounter={() =>
              setSelectedPractice('numberCounter')
            }
            onSelectBoiiGame={setSelectedPractice}
          />
        ) : selectedPractice !== 'numberCounter' ? (
          <BoiiPracticeGame
            gameId={selectedPractice}
            onBack={() => setSelectedPractice(null)}
          />
        ) : (
          <main className={style.practice}>
            <form
              className={style.panel}
              onSubmit={(event: FormEvent<HTMLFormElement>) => {
                event.preventDefault();
                const formData = new FormData(event.currentTarget);
                startGame({
                  game: 'numberCounter',
                  totalNumbers: Number(formData.get('totalNumbers')),
                  seconds: Number(formData.get('seconds')),
                  timesToChangeNumbers: Number(
                    formData.get('timesToChangeNumbers')
                  ),
                  amountOfGames: Number(formData.get('amountOfGames')),
                  incrementByAmount: Number(
                    formData.get('incrementByAmount')
                  ),
                });
              }}>
              <button
                className={style.backButton}
                type='button'
                onClick={() => setSelectedPractice(null)}>
                Back to games
              </button>
              <p className={style.eyebrow}>LOCAL PRACTICE</p>
              <h1>Number Counter</h1>
              <p className={style.description}>
                Choose your round settings, then start practicing.
              </p>
              <div className={style.fields}>
                <label>
                  Numbers in the grid
                  <input
                    type='number'
                    name='totalNumbers'
                    min='2'
                    max='100'
                    defaultValue='12'
                    required
                  />
                </label>
                <label>
                  Time limit (seconds)
                  <input
                    type='number'
                    name='seconds'
                    min='1'
                    defaultValue='20'
                    required
                  />
                </label>
                <label>
                  Number changes
                  <input
                    type='number'
                    name='timesToChangeNumbers'
                    min='1'
                    defaultValue='2'
                    required
                  />
                </label>
                <label>
                  Rounds to win
                  <input
                    type='number'
                    name='amountOfGames'
                    min='1'
                    defaultValue='2'
                    required
                  />
                </label>
                <label>
                  Add numbers after each round
                  <input
                    type='number'
                    name='incrementByAmount'
                    min='0'
                    defaultValue='0'
                    required
                  />
                </label>
              </div>
              <button className={style.startButton} type='submit'>
                Start practice
              </button>
            </form>
          </main>
        )
      )}
      {numberCounter.showGame && <GameHousing />}
    </>
  );
};

export default App;
