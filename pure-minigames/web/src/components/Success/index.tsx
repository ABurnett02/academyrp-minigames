import style from './index.module.css';
import { useAppSelector } from '../../store/store';
import { Lottie } from 'lottie-react';
import animation from '../../assests/success.json';
import { useMemo } from 'react';
import audioFile from '../../assests/success.mp3';

const Success = () => {
  const audio = new Audio(audioFile);
  useMemo(() => {
    audio.play();
  }, []);
  return (
    <div className={style.finished}>
      <Lottie
        src={animation}
        autoplay
        style={{ height: 100, width: 100 }}
      />
    </div>
  );
};

export default Success;
