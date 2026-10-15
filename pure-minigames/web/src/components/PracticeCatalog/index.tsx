import { useState } from 'react';
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

export interface EyeGame {
  id: string;
  title: string;
  category: string;
}

export const EYE_GAME_CATEGORIES: Array<{
  name: string;
  games: EyeGame[];
}> = [
  {
    name: 'Essentials',
    games: [
      { id: 'skillcheck', title: 'Skill Check', category: 'Essentials' },
      { id: 'lockpick', title: 'Lockpick', category: 'Essentials' },
      { id: 'keypad', title: 'Keypad', category: 'Essentials' },
      { id: 'quicktime', title: 'Quicktime', category: 'Essentials' },
      { id: 'mash', title: 'Mash', category: 'Essentials' },
      { id: 'reaction', title: 'Reaction', category: 'Essentials' },
      { id: 'stacker', title: 'Stacker', category: 'Essentials' },
      { id: 'targets', title: 'Targets', category: 'Essentials' },
    ],
  },
  {
    name: 'Core',
    games: [
      { id: 'livewire', title: 'Live Wire', category: 'Core' },
      { id: 'flatline', title: 'Flatline', category: 'Core' },
      { id: 'deadcalm', title: 'Dead Calm', category: 'Core' },
      { id: 'ghostsignal', title: 'Ghost Signal', category: 'Core' },
      { id: 'steadydose', title: 'Steady Dose', category: 'Core' },
      { id: 'cuttheright', title: 'Cut The Right One', category: 'Core' },
      { id: 'vaultspin', title: 'Vault Spin', category: 'Core' },
      { id: 'bluff', title: 'Bluff', category: 'Core' },
      { id: 'decrypt', title: 'Decrypt', category: 'Core' },
      { id: 'gaslight', title: 'Gaslight', category: 'Core' },
    ],
  },
  {
    name: 'Advanced',
    games: [
      { id: 'overflow', title: 'Overflow', category: 'Advanced' },
      { id: 'breachmatrix', title: 'Breach Matrix', category: 'Advanced' },
      { id: 'daemonrun', title: 'Daemon Run', category: 'Advanced' },
      { id: 'pulse', title: 'Pulse', category: 'Advanced' },
      { id: 'hottrace', title: 'Hot Trace', category: 'Advanced' },
      { id: 'cascade', title: 'Cascade', category: 'Advanced' },
      { id: 'lightsout', title: 'Lights Out', category: 'Advanced' },
      { id: 'slidepuzzle', title: 'Slide Puzzle', category: 'Advanced' },
    ],
  },
  {
    name: 'AAA-Inspired',
    games: [
      { id: 'resonance', title: 'Resonance', category: 'AAA-Inspired' },
      { id: 'intrusion', title: 'Intrusion', category: 'AAA-Inspired' },
      { id: 'override', title: 'Override', category: 'AAA-Inspired' },
      { id: 'animus', title: 'Animus', category: 'AAA-Inspired' },
      { id: 'eaglevision', title: 'Eagle Vision', category: 'AAA-Inspired' },
      { id: 'parry', title: 'Deflect', category: 'AAA-Inspired' },
      { id: 'constellation', title: 'Stargazing', category: 'AAA-Inspired' },
      { id: 'archery', title: 'Longshot', category: 'AAA-Inspired' },
    ],
  },
  {
    name: 'Jobs',
    games: [
      { id: 'fishing', title: 'Fishing', category: 'Jobs' },
      { id: 'mining', title: 'Mining', category: 'Jobs' },
      { id: 'cooking', title: 'Cooking', category: 'Jobs' },
      { id: 'welding', title: 'Welding', category: 'Jobs' },
      { id: 'harvest', title: 'Harvest', category: 'Jobs' },
      { id: 'drilling', title: 'Drilling', category: 'Jobs' },
      { id: 'locksmith', title: 'Locksmith', category: 'Jobs' },
      { id: 'hotwire', title: 'Hotwire', category: 'Jobs' },
      { id: 'crafting', title: 'Crafting', category: 'Jobs' },
      { id: 'lugnuts', title: 'Lug Nuts', category: 'Jobs' },
      { id: 'paintspray', title: 'Paint Booth', category: 'Jobs' },
      { id: 'crane', title: 'Cargo Crane', category: 'Jobs' },
      { id: 'forge', title: 'Blacksmith', category: 'Jobs' },
      { id: 'diving', title: 'Salvage Dive', category: 'Jobs' },
    ],
  },
  {
    name: 'Mechanic',
    games: [
      { id: 'partsort', title: 'Parts Sort', category: 'Mechanic' },
      { id: 'toolbox', title: 'Tool Board', category: 'Mechanic' },
      { id: 'packing', title: 'Crate Packing', category: 'Mechanic' },
      { id: 'beltsort', title: 'Quality Control', category: 'Mechanic' },
    ],
  },
  {
    name: 'Crime',
    games: [
      { id: 'tripwire', title: 'Tripwire', category: 'Crime' },
      { id: 'pickpocket', title: 'Pickpocket', category: 'Crime' },
      { id: 'getaway', title: 'Getaway', category: 'Crime' },
      { id: 'cashcount', title: 'Count The Take', category: 'Crime' },
      { id: 'counterfeit', title: 'Counterfeit', category: 'Crime' },
      { id: 'chopshop', title: 'Chop Shop', category: 'Crime' },
    ],
  },
  {
    name: 'Medical & Rescue',
    games: [
      { id: 'suture', title: 'Suture', category: 'Medical & Rescue' },
      { id: 'bonepin', title: 'Bone Set', category: 'Medical & Rescue' },
      { id: 'vitals', title: 'Vitals', category: 'Medical & Rescue' },
    ],
  },
  {
    name: 'Heist',
    games: [
      { id: 'thermite', title: 'Thermite', category: 'Heist' },
      { id: 'lasergrid', title: 'Laser Grid', category: 'Heist' },
      { id: 'vaultdrill', title: 'Vault Drill', category: 'Heist' },
      { id: 'jammer', title: 'Signal Jammer', category: 'Heist' },
      { id: 'dataheist', title: 'Data Heist', category: 'Heist' },
    ],
  },
  {
    name: 'Police & Forensics',
    games: [
      { id: 'fingerprint', title: 'Fingerprint', category: 'Police & Forensics' },
      { id: 'breathalyzer', title: 'Breathalyzer', category: 'Police & Forensics' },
    ],
  },
  {
    name: 'Drugs & Chemistry',
    games: [
      { id: 'titration', title: 'Titration', category: 'Drugs & Chemistry' },
      { id: 'pillpress', title: 'Pill Press', category: 'Drugs & Chemistry' },
    ],
  },
];

interface PracticeCatalogProps {
  onSelectNumberCounter: () => void;
  onSelectBoiiGame: (game: BoiiGameId) => void;
  onSelectEyeGame: (game: string) => void;
}

const PracticeCatalog = ({
  onSelectNumberCounter,
  onSelectBoiiGame,
  onSelectEyeGame,
}: PracticeCatalogProps) => {
  const [search, setSearch] = useState('');
  const query = search.trim().toLowerCase();

  return (
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

      <section className={style.section} aria-labelledby='eye-games-heading'>
        <div className={style.sectionHeading}>
          <div>
            <h2 id='eye-games-heading'>Ay-eye Minigames</h2>
            <p className={style.sectionDescription}>
              All 70 games, bundled with maintainer-confirmed permission.
            </p>
          </div>
          <a
            className={style.sourceLink}
            href='https://github.com/invalid0190/eye_minigames'
            target='_blank'
            rel='noreferrer'>
            Upstream source
          </a>
        </div>
        <label className={style.search}>
          <span>Find an Ay-eye game</span>
          <input
            type='search'
            value={search}
            onChange={(event) => setSearch(event.currentTarget.value)}
            placeholder='Search by name, ID, or category'
          />
        </label>
        {EYE_GAME_CATEGORIES.map((category) => {
          const games = category.games.filter(
            (game) =>
              !query ||
              `${game.title} ${game.id} ${category.name}`
                .toLowerCase()
                .includes(query)
          );

          if (games.length === 0) return null;

          return (
            <div className={style.gameCategory} key={category.name}>
              <h3>{category.name}</h3>
              <div className={style.grid}>
                {games.map((game) => (
                  <button
                    className={style.card}
                    type='button'
                    key={game.id}
                    onClick={() => onSelectEyeGame(game.id)}>
                    <span className={style.cardTitle}>{game.title}</span>
                    <span className={style.cardDescription}>
                      {game.id} · Difficulty 2
                    </span>
                    <span className={style.cardAction}>Practice game</span>
                  </button>
                ))}
              </div>
            </div>
          );
        })}
        {EYE_GAME_CATEGORIES.every(
          (category) =>
            category.games.filter(
              (game) =>
                !query ||
                `${game.title} ${game.id} ${category.name}`
                  .toLowerCase()
                  .includes(query)
            ).length === 0
        ) && <p className={style.noResults}>No games match that search.</p>}
        <p className={style.attribution}>
          <a
            href={`${import.meta.env.BASE_URL}games/eye/BUNDLED-NOTICE.md`}
            target='_blank'
            rel='noreferrer'>
            Ay-eye bundle and permission notice
          </a>
          {' · '}
          <a
            href='https://eye-minigames.vercel.app/'
            target='_blank'
            rel='noreferrer'>
            Upstream preview
          </a>
        </p>
      </section>

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
          <a
            href='https://github.com/invalid0190/eye_minigames'
            target='_blank'
            rel='noreferrer'>
            Ay-eye repository
          </a>
        </div>
      </section>
    </main>
  );
};

export default PracticeCatalog;
