import { useEffect } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import { SiTwitter } from "react-icons/si";

import { useChallenges } from "../contexts/ChallengesContext";
import { useColorsController } from "../contexts/ColorsControllerContext";

import styles from "../styles/components/LevelUpModal.module.css";

const LevelUpModal: React.FC = () => {
  const { level, closeLevelUpModal } = useChallenges();

  const { email } = firebase.auth().currentUser;

  const { setPageActive } = useColorsController();

  useEffect(() => {
    setPageActive("modal");
  }, []);

  return (
    <div className={styles.overlay}>
      <div>
        <div className={styles.content}>
          <header>{level}</header>

          <strong>Parabéns</strong>
          <p>Você alcançou um novo level.</p>

          <button type="button" onClick={closeLevelUpModal}>
            <img src="/icons/close.svg" alt="close" />
          </button>
        </div>
        <a
          href={`https://twitter.com/intent/tweet?url=https%3A%2F%2Fmoveit-2-five.vercel.app%2F${email}`}
        >
          <button type="button" className={styles.shareTwitterButton}>
            Compartilhar no Twitter
            <SiTwitter style={{ width: 24, height: 24, marginLeft: 15 }} />
          </button>
        </a>
      </div>
    </div>
  );
};

export { LevelUpModal };
