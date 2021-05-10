import { createContext, ReactNode, useState, useContext } from 'react';

interface ColorsControllerContextData {
  tabName: string;
  theme: boolean;
  page: string;
  setTabActive: (name: string) => void;
  setColorTheme: (toggleTheme: boolean) => void;
  setPageActive: (pageName: string) => void;
}

interface ColorsControllerProviderProps {
  children: ReactNode;
}

const ColorsControllerContext = createContext(
  {} as ColorsControllerContextData,
);

const ColorsControllerProvider: React.FC = ({
  children,
}: ColorsControllerProviderProps) => {
  const [tabName, setTabName] = useState('home');
  const [theme, setTheme] = useState(false);
  const [page, setPage] = useState('signIn');

  const setTabActive = (name: string) => {
    setTabName(name);
  };

  const setColorTheme = (toggleTheme: boolean) => {
    setTheme(toggleTheme);
  };

  const setPageActive = (pageName: string) => {
    setPage(pageName);
  };

  return (
    <ColorsControllerContext.Provider
      value={{
        tabName,
        setTabActive,
        theme,
        setColorTheme,
        page,
        setPageActive,
      }}
    >
      {children}
    </ColorsControllerContext.Provider>
  );
};

function useColorsController(): ColorsControllerContextData {
  const context = useContext(ColorsControllerContext);

  return context;
}

export {
  ColorsControllerProvider,
  ColorsControllerContext,
  useColorsController,
};
