import React, { createContext, useContext, useState } from 'react';

export type UserType = {
  name: string;
  email: string;
  bio?: string;
  avatarUrl?: string;
  joined?: string;
};

type UserContextType = {
  user: UserType | null;
  setUser: React.Dispatch<React.SetStateAction<UserType | null>>;
};

const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
});

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserType | null>(() => {
    const name = localStorage.getItem('userName') || '';
    const email = localStorage.getItem('userEmail') || '';
    const avatarUrl = localStorage.getItem('userAvatarUrl') || '';
    const bio = localStorage.getItem('userBio') || '';
    const joined = localStorage.getItem('userJoined') || '';
    if (name && email) {
      return { name, email, avatarUrl, bio, joined };
    }
    return null;
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);