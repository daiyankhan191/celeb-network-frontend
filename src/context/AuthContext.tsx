import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

interface Fan {
  id: number;
  name: string;
  email: string;
}

interface AuthContextType {
  user: Fan | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

// ✅ BACKEND URL (hardcoded)
const API_BASE = 'http://localhost:3000';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<Fan | null>(null);
  const router = useRouter();

  const login = async (email: string, password: string) => {
    const res = await axios.post(`${API_BASE}/auth/login`, {
      email,
      password,
      role: 'fan'
    });
    const data = res.data as { token: string; fan: Fan };
    localStorage.setItem('token', data.token);
    setUser(data.fan);
    router.push('/dashboard');
  };

  const register = async (name: string, email: string, password: string) => {
    const res = await axios.post(`${API_BASE}/auth/signup`, {
      name,
      email,
      password,
      role: 'fan'
    });
    const data = res.data as { token: string; fan: Fan };
    localStorage.setItem('token', data.token);
    setUser(data.fan);
    router.push('/dashboard');
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    router.push('/login');
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios
        .get(`${API_BASE}/fans/me`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          const fan = res.data as Fan;
          setUser(fan);
        })
        .catch(() => logout());
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext)!;
