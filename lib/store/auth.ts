import { create } from "zustand";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "../supabase";

interface AuthState {
  user: User | null;
  session: Session | null;
  loading: boolean;
  setUser: (user: User | null) => void;
  setSession: (session: Session | null) => void;
  setLoading: (loading: boolean) => void;
  signUp: (email: string, password: string) => Promise<any>;
  signIn: (email: string, password: string) => Promise<any>;
  signOut: () => Promise<any>;
  resetPassword: (email: string) => Promise<any>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  session: null,
  loading: true,
  setUser: (user) => set({ user }),
  setSession: (session) => set({ session }),
  setLoading: (loading) => set({ loading }),
  signUp: async (email: string, password: string) => {
    const response = await supabase.auth.signUp({ email, password });
    if (!response.error && response.data.session) {
      set({
        user: response.data.user,
        session: response.data.session,
      });
    }
    return response;
  },
  signIn: async (email: string, password: string) => {
    const response = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (!response.error && response.data.session) {
      set({
        user: response.data.user,
        session: response.data.session,
      });
    }
    return response;
  },
  signOut: async () => {
    const response = await supabase.auth.signOut();
    if (!response.error) {
      set({ user: null, session: null });
    }
    return response;
  },
  resetPassword: async (email: string) => {
    return supabase.auth.resetPasswordForEmail(email);
  },
}));
