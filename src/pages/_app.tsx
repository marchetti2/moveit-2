import { AppProps } from 'next/app';

import { AuthProvider } from '../contexts/AuthContext';
import { ColorsControllerProvider } from '../contexts/ColorsControllerContext';

import { Toggle } from '../components/Toggle';

import '../styles/globals.css';

const App: React.FC<AppProps> = ({ Component, pageProps }: AppProps) => {
  return (
    <AuthProvider>
      <ColorsControllerProvider>
        <Toggle />
        <Component {...pageProps} />
      </ColorsControllerProvider>
    </AuthProvider>
  );
};

export default App;
