import { useRef, useEffect } from 'react';
import Cookies from 'js-cookie';

import { useColorsController } from '../contexts/ColorsControllerContext';

const Toggle: React.FC = () => {
  const { setColorTheme, theme, page } = useColorsController();
  const checkbox = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setColorTheme(Cookies.get('checkbox') === 'true');
    checkbox.current.checked = Cookies.get('checkbox') === 'true';
  }, []);

  const switchTheme = () => {
    setColorTheme(!theme);
    Cookies.set('checkbox', String(checkbox.current.checked));
  };

  return (
    <>
      <input
        type="checkbox"
        id="switch"
        onChange={switchTheme}
        ref={checkbox}
      />
      <div className="app">
        <label
          className="label"
          htmlFor="switch"
          style={{
            zIndex: page === 'modal' ? 0 : 1,
            display: page === 'thumbnail' ? 'none' : 'flex',
          }}
        >
          <div className="circle">
            <div
              className="crescent"
              style={{
                background: `${
                  theme
                    ? '#121214'
                    : `${page !== 'signIn' ? '#f2f3f5' : '#5965e0'}`
                }`,
              }}
            />
          </div>
        </label>
      </div>
    </>
  );
};

export { Toggle };
