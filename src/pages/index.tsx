import Head from 'next/head';

import { useAuth } from '../contexts/AuthContext';

import Main from './main/_index';
import SignIn from './signIn/_index';

const App: React.FC = () => {
  const { isLogged } = useAuth();

  return (
    <main>
      <Head>
        <title>Move.it 2.0</title>
      </Head>
      {isLogged ? <Main /> : <SignIn />}
    </main>
  );
};

export default App;
