import {
  createContext,
  ReactNode,
  useEffect,
  useState,
  useContext,
} from 'react';
import { useChallenges } from './ChallengesContext';

interface CountdownProviderProps {
  children: ReactNode;
}

interface CountdownContextData {
  isActive: boolean;
  hasFinished: boolean;
  minutes: number;
  seconds: number;
  cycleTime: number;
  resetCountdown: () => void;
  startCountdown: () => void;
}

let countdownTimeout: NodeJS.Timeout;

const CountdownContext = createContext({} as CountdownContextData);

const CountdownProvider: React.FC = ({ children }: CountdownProviderProps) => {
  const { startNewChallenge } = useChallenges();

  const [time, setTime] = useState(0.1 * 100);
  const [cycleTime, setCycleTime] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);

  useEffect(() => {
    window.onbeforeunload = (): string | void => {
      if (isActive) {
        return 'Você perderá o progresso do countdown até aqui, tem certeza?';
      }
      return null;
    };
  }, [isActive]);

  useEffect(() => {
    if (isActive && time > 0) {
      countdownTimeout = setTimeout(() => {
        setCycleTime(cycleTime + 1);
        setTime(time - 1);
      }, 1000);
    } else if (isActive && time === 0) {
      startNewChallenge();
      setHasFinished(true);
      setIsActive(false);
      setCycleTime(0);
    } else if (!isActive) {
      setCycleTime(0);
    }
  }, [isActive, time]);

  const startCountdown = () => {
    setIsActive(true);
  };

  const resetCountdown = () => {
    clearTimeout(countdownTimeout);
    setIsActive(false);
    setTime(0.1 * 100);
    setHasFinished(false);
  };

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  return (
    <CountdownContext.Provider
      value={{
        isActive,
        resetCountdown,
        hasFinished,
        startCountdown,
        minutes,
        seconds,
        cycleTime,
      }}
    >
      {children}
    </CountdownContext.Provider>
  );
};

const useCountdown = (): CountdownContextData => {
  const context = useContext(CountdownContext);

  return context;
};

export { CountdownContext, CountdownProvider, useCountdown };
