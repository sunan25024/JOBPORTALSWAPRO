import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import type { User as SupabaseUser } from '@supabase/supabase-js';
import { User } from '../types';
import { toast } from 'react-hot-toast';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, rememberMe?: boolean) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  register: (email: string, password: string, name: string, role: 'applicant' | 'admin') => Promise<void>;
  resendConfirmationEmail: (email: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Convert Supabase user to our User type
  const convertSupabaseUser = (supabaseUser: SupabaseUser, additionalData?: any): User => {
    return {
      id: supabaseUser.id,
      email: supabaseUser.email || '',
      name: additionalData?.name || supabaseUser.user_metadata?.name || supabaseUser.email?.split('@')[0] || 'User',
      role: additionalData?.role || (supabaseUser.email?.includes('admin') ? 'admin' : 'applicant'),
      avatar: supabaseUser.user_metadata?.avatar_url || additionalData?.avatar,
      createdAt: new Date(supabaseUser.created_at),
      emailConfirmed: supabaseUser.email_confirmed_at !== null
    };
  };

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        const convertedUser = convertSupabaseUser(session.user);
        setUser(convertedUser);
      }
      setLoading(false);
    };

    getInitialSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          const convertedUser = convertSupabaseUser(session.user);
          setUser(convertedUser);
          
          // Store user data in localStorage for persistence
          localStorage.setItem('swapro_user', JSON.stringify(convertedUser));
          
          // Redirect based on role
          if (event === 'SIGNED_IN') {
            if (convertedUser.role === 'admin') {
              navigate('/admin');
            } else {
              navigate('/dashboard');
            }
          }
        } else {
          setUser(null);
          localStorage.removeItem('swapro_user');
        }
        setLoading(false);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  const login = async (email: string, password: string, rememberMe = false) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        if (error.message === 'Email not confirmed') {
          throw new Error('Email belum dikonfirmasi. Silakan cek email Anda dan klik link konfirmasi yang dikirimkan.');
        }
        throw new Error(error.message);
      }

      if (data.user) {
        const convertedUser = convertSupabaseUser(data.user);
        setUser(convertedUser);
        
        if (rememberMe) {
          localStorage.setItem('swapro_user', JSON.stringify(convertedUser));
        }
      }
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const loginWithGoogle = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/dashboard`
        }
      });

      if (error) {
        throw new Error(error.message);
      }
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (email: string, password: string, name: string, role: 'applicant' | 'admin') => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            role
          }
        }
      });

      if (error) {
        throw new Error(error.message);
      }

      // Jika user tidak langsung dikonfirmasi (email confirmation diaktifkan)
      if (data.user && !data.user.email_confirmed_at) {
        throw new Error('Akun berhasil dibuat! Silakan cek email Anda dan klik link konfirmasi untuk mengaktifkan akun.');
      }

      if (data.user) {
        const convertedUser = convertSupabaseUser(data.user, { name, role });
        setUser(convertedUser);
        localStorage.setItem('swapro_user', JSON.stringify(convertedUser));
      }
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const resendConfirmationEmail = async (email: string) => {
    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: email
      });

      if (error) {
        throw new Error(error.message);
      }

      toast.success('Email konfirmasi telah dikirim ulang. Silakan cek email Anda.', {
        duration: 6000,
        position: 'top-center',
      });
    } catch (error: any) {
      const errorMessage = error.message || 'Gagal mengirim ulang email konfirmasi';
      toast.error(errorMessage, {
        duration: 4000,
        position: 'top-center',
      });
      throw error;
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        throw new Error(error.message);
      }

      setUser(null);
      localStorage.removeItem('swapro_user');
      navigate('/');
    } catch (error) {
      // Even if there's an error, clear local state
      setUser(null);
      localStorage.removeItem('swapro_user');
      navigate('/');
      console.error('Logout error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      loginWithGoogle,
      register,
      resendConfirmationEmail,
      logout,
      loading
    }}>
      {children}
    </AuthContext.Provider>
  );
};