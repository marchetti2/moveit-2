import Head from 'next/head';
import { useEffect } from 'react';

import { useAuth } from '../../contexts/AuthContext';

import styles from '../../styles/pages/LeaderBoard.module.css';

const LeaderBeard: React.FC = () => {
  let num = 0;
  const { rankingData, ranking } = useAuth();

  useEffect(() => {
    ranking();
  }, []);

  return (
    <main className={styles.container}>
      <Head>
        <title>Move.it | Ranking</title>
      </Head>
      <div>
        <h1>Leaderboard</h1>
        <div>
          <p>POSIÇÃO</p>
          <p>USUÁRIO</p>
          <p>DESAFIOS</p>
          <p>EXPERIÊNCIA</p>
        </div>
        {rankingData.map(value => {
          return (
            <div key={value.username} className={styles.card}>
              <div>
                <p>{(num += 1)}</p>
              </div>
              <div>
                <div className={styles.profile}>
                  <img src={value.avatar} alt={value.username} />
                  <div>
                    <p>{value.username}</p>
                    <p>
                      <img src="icons/level.svg" alt="Level" />
                      Level {value.level}
                    </p>
                  </div>
                </div>
                <div>
                  <p>
                    <strong>{value.challengesCompleted} </strong>completados
                  </p>
                </div>
                <div>
                  <p>
                    <strong>{value.totalExperience}</strong> xp
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
};

export default LeaderBeard;
