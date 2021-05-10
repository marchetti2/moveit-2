import { useChallenges } from '../contexts/ChallengesContext';
import { useCountdown } from '../contexts/CountdownContext';

import styles from '../styles/components/ChallengeBox.module.css';

const ChallengeBox: React.FC = () => {
  const {
    activeChallenge,
    completeChallenge,
    resetChallenge,
  } = useChallenges();
  const { resetCountdown, isActive } = useCountdown();

  const handleChallengeSucceeded = () => {
    completeChallenge();
    resetCountdown();
  };

  const handleChallengeFailed = () => {
    resetChallenge();
    resetCountdown();
  };

  const RenderChallengeBox = () => {
    if (isActive) {
      return (
        <div className={styles.challengeLoading}>
          <strong>
            Inicie um ciclo <br /> para receber desafios a <br />
            serem completados
          </strong>
          <div>
            <img src="icons/level-up.svg" alt="Level up" />
            <p>Complete-os e ganhe experiência e avance de leve.</p>
          </div>
        </div>
      );
    }
    if (activeChallenge) {
      return (
        <div className={styles.challengeActive}>
          <div>
            <span>
              <header>Ganhe {activeChallenge.amount} xp</header>
            </span>

            <main>
              {activeChallenge.type === 'body' ? (
                <img src="/icons/body.svg" alt="body" />
              ) : (
                <img src="/icons/eye.svg" alt="body" />
              )}
              <strong>
                {activeChallenge.type === 'body'
                  ? 'Exercite-se'
                  : 'Mova os olhos'}
              </strong>
              <p>{activeChallenge.description}</p>
            </main>
          </div>

          <footer>
            <button
              type="button"
              className={styles.challengeFailedButton}
              onClick={handleChallengeFailed}
            >
              Falhei
            </button>
            <button
              type="button"
              className={styles.challengeSucceededButton}
              onClick={handleChallengeSucceeded}
            >
              Completei
            </button>
          </footer>
        </div>
      );
    }
    return (
      <div className={styles.challengeNotActive}>
        <strong>
          Inicie um ciclo <br /> para receber desafios
        </strong>
        <p>
          <img src="icons/level-up.svg" alt="Level up" />
          Avance de level completando os desafios.
        </p>
      </div>
    );
  };

  return (
    <div className={styles.challengeContainer}>
      <RenderChallengeBox />
    </div>
  );
};

export { ChallengeBox };
