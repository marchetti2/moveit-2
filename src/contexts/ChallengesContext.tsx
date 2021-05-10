import {
  createContext,
  ReactNode,
  useEffect,
  useState,
  useContext,
} from "react";
import firebase from "firebase/app";
import challenges from "../../challenges.json";
import { LevelUpModal } from "../components/LevelUpModal";
import "firebase/auth";

import { api } from "../services/api";
import { useAuth } from "./AuthContext";

interface UserData {
  username: string;
  avatar: string;
  email: string;
  thumbnailUrl: string;
  level: number;
  currentExperience: number;
  totalExperience: number;
  challengesCompleted: number;
}

interface Challenge {
  type: "body" | "eye";
  description: string;
  amount: number;
}

interface ChallengesContextData {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
  totalExperience: number;
  activeChallenge: Challenge;
  experienceToNextLevel: number;
  completeChallenge: () => void;
  startNewChallenge: () => void;
  resetChallenge: () => void;
  closeLevelUpModal: () => void;
}

interface ChallengesProviderProps {
  children: ReactNode;
}

const ChallengesContext = createContext({} as ChallengesContextData);

const ChallengesProvider: React.FC = ({
  children,
}: ChallengesProviderProps) => {
  const { userData } = useAuth();
  const [level, setLevel] = useState(1);
  const [currentExperience, setCurrentExperience] = useState(0);
  const [challengesCompleted, setChallengesCompleted] = useState(0);
  const [totalExperience, setTotalExperience] = useState(0);
  const [activeChallenge, setActiveChallenge] = useState<Challenge>(null);
  const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);

  const experienceToNextLevel = ((level + 1) * 4) ** 2;

  useEffect(() => {
    Notification.requestPermission();
  }, []);

  useEffect(() => {
    async function getData() {
      const { email } = firebase.auth().currentUser;

      const response = await api.get<UserData>("/users", {
        params: {
          email,
        },
      });

      const { data } = response;

      setLevel(data.level);
      setChallengesCompleted(data.challengesCompleted);
      setCurrentExperience(data.currentExperience);
      setTotalExperience(data.totalExperience);
    }
    getData();
  }, []);

  const startNewChallenge = () => {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randomChallengeIndex];

    setActiveChallenge(challenge as Challenge);

    new Audio("/notification.mp3").play();

    const notification = () => {
      return new Notification("Novo desafio 🎉", {
        body: `Valendo ${challenge.amount} de xp!`,
        silent: false,
      });
    };

    if (Notification.permission === "granted") {
      notification();
    }
  };

  const levelUp = async () => {
    setLevel(level + 1);
    setIsLevelUpModalOpen(true);

    await api.patch("/users", {
      email: userData.email,
      level: level + 1,
      thumbnailUrl: `https://moveit-2-five.vercel.app/api/thumbnail.png?level=${level}&totalexperience=${totalExperience}&challengescomplete=${challengesCompleted}`,
    });
  };

  const closeLevelUpModal = () => {
    setIsLevelUpModalOpen(false);
  };

  const completeChallenge = async () => {
    if (!activeChallenge) {
      return;
    }

    const { amount } = activeChallenge;

    let finalExperience = currentExperience + amount;

    if (finalExperience >= experienceToNextLevel) {
      finalExperience -= experienceToNextLevel;
      levelUp();
    }

    setCurrentExperience(finalExperience);
    setChallengesCompleted(challengesCompleted + 1);
    setTotalExperience(totalExperience + amount);
    setActiveChallenge(null);

    await api.patch("/users", {
      email: userData.email,
      totalExperience: totalExperience + amount,
      challengesCompleted: challengesCompleted + 1,
      currentExperience: finalExperience,
    });
  };

  const resetChallenge = () => {
    setActiveChallenge(null);
  };

  return (
    <ChallengesContext.Provider
      value={{
        level,
        currentExperience,
        challengesCompleted,
        totalExperience,
        activeChallenge,
        experienceToNextLevel,
        completeChallenge,
        startNewChallenge,
        resetChallenge,
        closeLevelUpModal,
      }}
    >
      {children}
      {isLevelUpModalOpen && <LevelUpModal />}
    </ChallengesContext.Provider>
  );
};

const useChallenges = (): ChallengesContextData => {
  const context = useContext(ChallengesContext);

  return context;
};

export { ChallengesContext, ChallengesProvider, useChallenges };
