import { CgLogOff } from 'react-icons/cg';

import { useColorsController } from '../contexts/ColorsControllerContext';
import { useAuth } from '../contexts/AuthContext';

import { HomeSideBar, AwardSideBar, LogoSideBar } from '../utils/SVGController';

import styles from '../styles/components/SideBar.module.css';

const Sidebar: React.FC = () => {
  const { setTabActive, tabName } = useColorsController();
  const { logout } = useAuth();

  const handleClick = (name: string) => {
    setTabActive(name);
  };

  return (
    <main className={styles.container}>
      <LogoSideBar />
      <div>
        <div onClick={() => handleClick('home')}>
          <HomeSideBar
            color={tabName === 'home' ? '#5965E0' : '#666666'}
            activeColor={tabName === 'home' ? '#5965E0' : 'none'}
          />
        </div>
        <div onClick={() => handleClick('award')}>
          <AwardSideBar
            color={tabName === 'award' ? '#5965E0' : '#666666'}
            activeColor={tabName === 'award' ? '#5965E0' : 'none'}
          />
        </div>
      </div>
      <CgLogOff size="35px" className={styles.logoff} onClick={logout} />
    </main>
  );
};

export { Sidebar };
