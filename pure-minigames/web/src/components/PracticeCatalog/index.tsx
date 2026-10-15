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
        <h2>NP-Minigames hosted games</h2>
        <p>These games open on the third-party NP-Minigames website.</p>
      </div>
      <div className={style.externalLinks}>
        <a
          href='https://nopixel-minigames.vercel.app/word-memory-4-0'
          target='_blank'
          rel='noreferrer'>
          Word Memory (4.0)
        </a>
        <a
          href='https://nopixel-minigames.vercel.app/laptop-4-0'
          target='_blank'
          rel='noreferrer'>
          Laptop - Terminal (4.0)
        </a>
        <a
          href='https://nopixel-minigames.vercel.app/pincracker-4-0'
          target='_blank'
          rel='noreferrer'>
          Fingerprint Scanner - PinCracker (4.0)
        </a>
        <a
          href='https://github.com/sdnitrogen/np-minigames'
          target='_blank'
          rel='noreferrer'>
          Project source (no license file found)
        </a>
      </div>
    </section>

    <section className={style.external}>
      <div>
        <h2>Heist hack practice links</h2>
        <p>
          These independent practice sites open in a new tab. The NoPixel Wiki
          says using these sites while playing on the NoPixel server is
          considered cheating.
        </p>
      </div>
      <div className={style.externalLinks}>
        <a
          href='https://jesper-hustad.github.io/NoPixel-minigame/index'
          target='_blank'
          rel='noreferrer'>
          Laptop Hack
        </a>
        <a
          href='https://sharkiller.ddns.net/nopixel_minigame/thermite/'
          target='_blank'
          rel='noreferrer'>
          Thermite
        </a>
        <a
          href='https://ceoshikhar.github.io/gta5-var-heist-hack/'
          target='_blank'
          rel='noreferrer'>
          VAR
        </a>
        <a
          href='https://sharkiller.ddns.net/nopixel_minigame/casino_generators/'
          target='_blank'
          rel='noreferrer'>
          USB / Hopscotch
        </a>
        <a
          href='https://www.logicgamesonline.com/lightsout/'
          target='_blank'
          rel='noreferrer'>
          Lights Out
        </a>
        <a
          href='https://sharkiller.ddns.net/nopixel_minigame/hackingdevice/'
          target='_blank'
          rel='noreferrer'>
          Security System Hacking Device
        </a>
      </div>
      <p className={style.attribution}>
        <a
          href='https://nopixel.fandom.com/wiki/Heist_Hacks'
          target='_blank'
          rel='noreferrer'>
          Link list and practice-use warning: NoPixel Wiki
        </a>
      </p>
    </section>

    <p className={style.attribution}>
      External links go to independently operated websites. This project does
      not host, embed, or copy their games, code, or assets. Their owners retain
      their rights; links are not an endorsement or permission to reuse their
      content. We have not verified licensing for every destination.
    </p>

    <section className={style.external}>
      <div>
        <h2>Upstream projects</h2>
        <p>View the original resources and project information.</p>
      </div>
      <div className={style.externalLinks}>
        <a
          href='https://github.com/boiidevelopment/boii_minigames'
          target='_blank'
          rel='noreferrer'>
          BOII repository
        </a>
      </div>
    </section>
  </main>
);

export default PracticeCatalog;
