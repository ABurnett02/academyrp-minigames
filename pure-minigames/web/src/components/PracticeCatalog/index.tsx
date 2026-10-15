import style from './index.module.css';

export type BoiiGameId =
  | 'anagram'
  | 'button_mash'
  | 'chip_hack'
  | 'hangman'
  | 'key_drop'
  | 'pincode'
  | 'safe_crack'
  | 'skill_bar'
  | 'skill_circle'
  | 'wire_cut';

export interface BoiiGame {
  id: BoiiGameId;
  title: string;
  description: string;
  data: Record<string, string | number | boolean>;
}

export const BOII_GAMES: BoiiGame[] = [
  {
    id: 'anagram',
    title: 'Anagram',
    description: 'Unscramble the letters before the timer runs out.',
    data: {
      style: 'default',
      loading_time: 5000,
      difficulty: 10,
      guesses: 5,
      timer: 30000,
    },
  },
  {
    id: 'button_mash',
    title: 'Button Mash',
    description: 'Mash the keys to fill the progress bar.',
    data: { style: 'default', difficulty: 3 },
  },
  {
    id: 'chip_hack',
    title: 'Chip Hack',
    description: 'Find the hidden chips using the guiding light.',
    data: {
      style: 'default',
      loading_time: 8000,
      chips: 2,
      timer: 20000,
    },
  },
  {
    id: 'hangman',
    title: 'Hangman',
    description: 'Guess the hidden word before your attempts run out.',
    data: {
      style: 'default',
      loading_time: 5000,
      difficulty: 4,
      guesses: 5,
      timer: 30000,
    },
  },
  {
    id: 'key_drop',
    title: 'Key Drop',
    description: 'Match falling keys with accurate timing.',
    data: {
      style: 'default',
      score_limit: 5,
      miss_limit: 5,
      fall_delay: 1000,
      new_letter_delay: 2000,
    },
  },
  {
    id: 'pincode',
    title: 'Pin Code',
    description: 'Deduce the hidden pin using the clues.',
    data: { style: 'default', difficulty: 4, guesses: 5 },
  },
  {
    id: 'safe_crack',
    title: 'Safe Crack',
    description: 'Rotate the dial and find the combination.',
    data: { style: 'default', difficulty: 5 },
  },
  {
    id: 'skill_bar',
    title: 'Skill Bar',
    description: 'Time your input inside the moving target area.',
    data: {
      style: 'default',
      icon: 'fa-solid fa-paw',
      orientation: 2,
      area_size: 20,
      perfect_area_size: 5,
      speed: 0.5,
      moving_icon: true,
      icon_speed: 3,
    },
  },
  {
    id: 'skill_circle',
    title: 'Skill Circle',
    description: 'Stop the rotating marker in the target zone.',
    data: {
      style: 'default',
      icon: 'fa-solid fa-paw',
      area_size: 4,
      speed: 0.02,
    },
  },
  {
    id: 'wire_cut',
    title: 'Wire Cut',
    description: 'Choose the correct wire before time expires.',
    data: { style: 'default', timer: 60000 },
  },
];

interface PracticeCatalogProps {
  onSelectNumberCounter: () => void;
  onSelectBoiiGame: (game: BoiiGameId) => void;
}

const PracticeCatalog = ({
  onSelectNumberCounter,
  onSelectBoiiGame,
}: PracticeCatalogProps) => (
  <main className={style.page}>
    <header className={style.header}>
      <p className={style.eyebrow}>PRACTICE ARCADE</p>
      <h1>Choose a minigame</h1>
      <p className={style.intro}>
        Practice the games bundled with this project. Choose a game to start.
      </p>
    </header>

    <section className={style.section} aria-labelledby='pure-games-heading'>
      <h2 id='pure-games-heading'>Pure Minigames</h2>
      <div className={style.grid}>
        <button
          className={style.card}
          type='button'
          onClick={onSelectNumberCounter}>
          <span className={style.cardTitle}>Number Counter</span>
          <span className={style.cardDescription}>
            Click the numbers in order while the board changes.
          </span>
          <span className={style.cardAction}>Practice game</span>
        </button>
      </div>
    </section>

    <section className={style.section} aria-labelledby='boii-games-heading'>
      <div className={style.sectionHeading}>
        <h2 id='boii-games-heading'>BOII Minigames</h2>
        <a
          className={style.sourceLink}
          href='https://github.com/boiidevelopment/boii_minigames'
          target='_blank'
          rel='noreferrer'>
          Source (GPL-3.0)
        </a>
      </div>
      <div className={style.grid}>
        {BOII_GAMES.map((game) => (
          <button
            className={style.card}
            type='button'
            key={game.id}
            onClick={() => onSelectBoiiGame(game.id)}>
            <span className={style.cardTitle}>{game.title}</span>
            <span className={style.cardDescription}>{game.description}</span>
            <span className={style.cardAction}>Practice game</span>
          </button>
        ))}
      </div>
    </section>

    <section className={style.external}>
      <div>
        <h2>Ay-eye Minigames</h2>
        <p>
          This project is not bundled here. Visit its upstream preview to
          practice.
        </p>
      </div>
      <div className={style.externalLinks}>
        <a href='https://eye-minigames.vercel.app/' target='_blank' rel='noreferrer'>
          Open preview
        </a>
        <a
          href='https://github.com/invalid0190/eye_minigames'
          target='_blank'
          rel='noreferrer'>
          Source repository
        </a>
      </div>
    </section>
  </main>
);

export default PracticeCatalog;
