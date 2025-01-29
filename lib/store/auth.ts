import { create } from "zustand";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "../supabase";
import * as Linking from "expo-linking";
import { Platform } from "react-native";

// Get the URL prefix for deep linking
const prefix = Platform.select({
  ios: Linking.createURL("auth/callback"),
  android: Linking.createURL("auth/callback"),
  web: "http://localhost:8081/auth/callback",
});

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
  initialize: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  session: null,
  loading: true,
  setUser: (user) => set({ user }),
  setSession: (session) => set({ session }),
  setLoading: (loading) => set({ loading }),

  initialize: async () => {
    try {
      // Check active sessions
      const {
        data: { session },
      } = await supabase.auth.getSession();
      set({
        session,
        user: session?.user ?? null,
        loading: false,
      });

      // Set up auth state change listener
      supabase.auth.onAuthStateChange((_event, session) => {
        set({
          session,
          user: session?.user ?? null,
          loading: false,
        });
      });
    } catch (error) {
      console.error("Error initializing auth:", error);
      set({ loading: false });
    }
  },

  signUp: async (email: string, password: string) => {
    const response = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: prefix,
        data: {
          email,
        },
      },
    });
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
    return supabase.auth.resetPasswordForEmail(email, {
      redirectTo: prefix,
    });
  },
}));
