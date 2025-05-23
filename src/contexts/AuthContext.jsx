import React, { createContext, useContext, useState, useEffect } from 'react';
import useLocalStorage from '@/hooks/useLocalStorage';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [users, setUsers] = useLocalStorage('registeredUsers', []);
  const [currentUser, setCurrentUser] = useLocalStorage('currentUser', null);
  const navigate = useNavigate();

  const login = (username, password) => {
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
      setCurrentUser({ username: user.username, id: user.id });
      return true;
    }
    return false;
  };

  const register = (username, password) => {
    if (users.find(u => u.username === username)) {
      return { success: false, message: 'Username already exists.' };
    }
    const newUser = { id: `user_${Math.random().toString(36).substr(2, 9)}`, username, password };
    setUsers([...users, newUser]);
    setCurrentUser({ username: newUser.username, id: newUser.id });
    return { success: true, message: 'Registration successful!' };
  };

  const logout = () => {
    setCurrentUser(null);
    navigate('/'); 
  };
  
  useEffect(() => {
    if (currentUser) {
      const userExists = users.some(u => u.id === currentUser.id && u.username === currentUser.username);
      if (!userExists) {
        setCurrentUser(null); 
      }
    }
  }, [users, currentUser, setCurrentUser]);


  return (
    <AuthContext.Provider value={{ currentUser, users, login, register, logout, setCurrentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};