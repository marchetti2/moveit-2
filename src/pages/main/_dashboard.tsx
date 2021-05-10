import { ChallengeBox } from '../../components/ChallengeBox';
import { ExperienceBar } from '../../components/ExperienceBar';
import { Profile } from '../../components/Profile';
import { Countdown } from '../../components/Countdown';
import { CompletedChallenges } from '../../components/CompletedChallenges';

import styles from '../../styles/pages/DashBoard.module.css';

const Dashboard: React.FC = () => {
  return (
    <main className={styles.container}>
      <div>
        <ExperienceBar />
        <section>
          <div className={styles.cycleContainer}>
            <Profile />
            <CompletedChallenges />
            <Countdown />
          </div>
          <ChallengeBox />
        </section>
      </div>
    </main>
  );
};

export default Dashboard ;
