import { FormEvent, useEffect, useState } from 'react';
import { HiArrowRight } from 'react-icons/hi';

import { useAuth } from '../../contexts/AuthContext';
import { useColorsController } from '../../contexts/ColorsControllerContext';

import { LogoIndex, GithubIndex } from '../../utils/SVGController';
import { Loader } from '../../components/Loader';

import styles from '../../styles/pages/SignIn.module.css';

const SignIn: React.FC = () => {
  const { setPageActive, page } = useColorsController();
  const [usernameInput, setUsernameInput] = useState('');
  const { githubAuthProvider, loading } = useAuth();

  const handleInputChange = (value: string) => {
    setUsernameInput(value);
  };

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    if (!usernameInput) {
      e.preventDefault();
      return null;
    }
    e.preventDefault();
    return githubAuthProvider(usernameInput);
  };

  const handleClick = async () => {
    githubAuthProvider(usernameInput);
  };

  useEffect(() => {
    setPageActive('signIn');
  }, [page, setPageActive]);

  return (
    <main className={styles.bodyContainer}>
      <div className={styles.container}>
        <div>
          <LogoIndex />
          <p>Bem-vindo</p>
          <div>
            <GithubIndex />
            <p>
              Faça login com seu Github <br /> para começar
            </p>
          </div>

          <div>
            <form onSubmit={e => handleFormSubmit(e)}>
              <input
                placeholder="Digite seu username"
                onChange={e => handleInputChange(e.target.value)}
              />
              {!usernameInput ? (
                <button disabled type="button">
                  {loading ? (
                    <Loader />
                  ) : (
                    <HiArrowRight size="1.5rem" color="#fff" />
                  )}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleClick}
                  style={{
                    filter: loading && 'brightness(0.9)',
                    cursor: loading && 'not-allowed',
                  }}
                >
                  {loading ? (
                    <Loader />
                  ) : (
                    <HiArrowRight size="1.5rem" color="#fff" />
                  )}
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SignIn ;
