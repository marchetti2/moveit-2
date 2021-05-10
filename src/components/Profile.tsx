import { useAuth } from '../contexts/AuthContext';
import { useChallenges } from '../contexts/ChallengesContext';

import styles from '../styles/components/Profile.module.css';

const Profile: React.FC = () => {
  const { userData } = useAuth();
  const { username, avatar } = userData;
  const { level } = useChallenges();

  return (
    <div className={styles.profileContainer}>
      <img src={avatar} alt={username} />
      <div>
        <strong>{username}</strong>
        <p>
          <img src="icons/level.svg" alt="Level" />
          Level {level}
        </p>
      </div>
    </div>
  );
};

export { Profile };
