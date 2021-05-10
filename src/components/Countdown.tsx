import cx from 'classnames';
import { MdPlayArrow, MdClear, MdCheckCircle } from 'react-icons/md';

import { useCountdown } from '../contexts/CountdownContext';

import styles from '../styles/components/Countdown.module.css';

const Countdown: React.FC = () => {
  const {
    isActive,
    hasFinished,
    resetCountdown,
    startCountdown,
    minutes,
    seconds,
    cycleTime,
  } = useCountdown();

  const cycleTimeBar = (cycleTime * 100) / 10;

  const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
  const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');

  return (
    <>
      <div className={styles.countdown}>
        <div>
          <span>{minuteLeft}</span>
          <span>{minuteRight}</span>
        </div>
        <span>:</span>
        <div>
          <span>{secondLeft}</span>
          <span>{secondRight}</span>
        </div>
      </div>

      {hasFinished ? (
        <button type="button" disabled className={styles.startCycleButton}>
          <div>
            Ciclo encerrado
            <MdCheckCircle style={{ color: '#4CD62B', marginLeft: 5 }} />
          </div>
          <div>
            <div style={{ width: '100%' }} />
          </div>
        </button>
      ) : (
        <>
          {isActive ? (
            <button
              type="button"
              className={cx(
                styles.startCycleButton,
                styles.startCycleButtonActive,
              )}
              onClick={resetCountdown}
            >
              <div>
                Abandonar ciclo
                <MdClear style={{ width: 22.5, height: 22.5, marginLeft: 5 }} />
              </div>
              <div className={styles.cicleCount}>
                <div style={{ width: `${cycleTimeBar}%` }} />
              </div>
            </button>
          ) : (
            <button
              type="button"
              className={styles.startCycleButton}
              onClick={startCountdown}
            >
              Iniciar um ciclo
              <MdPlayArrow style={{ width: 20, height: 22.5, marginLeft: 8 }} />
            </button>
          )}
        </>
      )}
    </>
  );
};

export { Countdown };
