import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
  useCallback,
} from "react";

import { api } from "../services/api";

import firebase from "../services/firebase";

interface UserData {
  username: string;
  avatar: string;
  email: string;
  thumbnailUrl: string;
  level: number;
  currentExperience: number;
  totalExperience: number;
  challengesCompleted: number;
}

interface RankingData {
  username: string;
  avatar: string;
  level: number;
  totalExperience: number;
  challengesCompleted: number;
}

type Ranking = Array<RankingData>;

interface AuthContextProps {
  loading: boolean;
  isLogged: boolean;
  userData: UserData;
  rankingData: Ranking;
  githubAuthProvider: (username: string) => void;
  ranking: () => void;
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext({} as AuthContextProps);

const AuthProvider: React.FC = ({ children }: AuthProviderProps) => {
  const [loading, setLoading] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const [userData, setUserData] = useState<UserData>({
    username: "",
    avatar: "",
    email: "",
    thumbnailUrl: "",
    level: 1,
    currentExperience: 0,
    totalExperience: 0,
    challengesCompleted: 0,
  });
  const [rankingData, setRankingData] = useState<Ranking>([
    {
      username: "",
      avatar: "",
      level: 1,
      totalExperience: 0,
      challengesCompleted: 0,
    },
  ]);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        const response = await api.get<UserData>("/users", {
          params: {
            email: user.email,
            hasUser: true,
          },
        });
        const { data } = response;

        setUserData(data);
        return setIsLogged(true);
      }

      return setIsLogged(false);
    });
  }, []);

  const githubAuthProvider = useCallback(async (username: string) => {
    const provider = new firebase.auth.GithubAuthProvider();
    provider.addScope("repo");
    provider.setCustomParameters({
      allow_signup: "false",
      login: username,
    });
    setLoading(true);

    return firebase
      .auth()
      .signInWithPopup(provider)
      .then(async (result) => {
        const { displayName, photoURL, email } = result.user;

        await api
          .post<UserData>("/users", {
            username: displayName || "unknown",
            avatar: photoURL,
            email,
            thumbnailUrl:
              "https://moveit-2-five.vercel.app/api/thumbnail.png?level=1&totalexperience=0&challengescomplete=0",
            level: 1,
            currentExperience: 0,
            totalExperience: 0,
            challengesCompleted: 0,
          })
          .then((response) => {
            const { data } = response;
            setUserData(data);
          });

        setIsLogged(true);
      })
      .catch(() => {
        setLoading(false);
        setIsLogged(false);
      });
  }, []);

  const ranking = useCallback(async () => {
    const response = await api.get<Ranking>("/ranking");
    const users = response.data;
    setRankingData(users);
  }, []);

  const logout = useCallback(() => {
    setLoading(false);
    return firebase
      .auth()
      .signOut()
      .then(() => {
        setIsLogged(false);
      });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        loading,
        isLogged,
        userData,
        rankingData,
        githubAuthProvider,
        ranking,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);

  return context;
};

export { AuthContext, AuthProvider, useAuth };
