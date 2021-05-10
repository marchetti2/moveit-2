import Head from 'next/head';
import { useEffect } from 'react';

import { Sidebar } from '../../components/SideBar';
import Dashboard from './_dashboard';
import LeaderBeard from './_leaderboard';

import { ChallengesProvider } from '../../contexts/ChallengesContext';
import { CountdownProvider } from '../../contexts/CountdownContext';

import { useColorsController } from '../../contexts/ColorsControllerContext';
import { useAuth } from '../../contexts/AuthContext';

import styles from '../../styles/pages/Main.module.css';

const Main: React.FC = () => {
  const { tabName, setPageActive } = useColorsController();
  const { ranking } = useAuth();

  useEffect(() => {
    ranking();
    setPageActive('main');
  }, []);

  return (
    <ChallengesProvider>
      <CountdownProvider>
        <Head>
          <title>Move.it | Dashboard</title>
        </Head>
        <main className={styles.container}>
          <Sidebar />
          {tabName === 'home' ? <Dashboard /> : <LeaderBeard />}
        </main>
      </CountdownProvider>
    </ChallengesProvider>
  );
};

export default Main;
