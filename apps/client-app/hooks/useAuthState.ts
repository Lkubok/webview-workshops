import { useState, useCallback, useMemo } from 'react';
import { User, AuthState } from '../types/auth';

export interface AuthStateActions {
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  setTokens: (accessToken: string | null, refreshToken: string | null) => void;
  clearAuthState: () => void;
  updateAuthState: (partial: Partial<AuthState>) => void;
}

export function useAuthState(initialState?: Partial<AuthState>) {
  const [state, setState] = useState<AuthState>({
    user: null,
    isLoading: true,
    accessToken: null,
    refreshTokenValue: null,
    ...initialState,
  });

  const setUser = useCallback((user: User | null) => {
    setState(prev => ({ ...prev, user }));
  }, []);

  const setLoading = useCallback((isLoading: boolean) => {
    setState(prev => ({ ...prev, isLoading }));
  }, []);

  const setTokens = useCallback((accessToken: string | null, refreshTokenValue: string | null) => {
    setState(prev => ({
      ...prev,
      accessToken,
      refreshTokenValue
    }));
  }, []);

  const clearAuthState = useCallback(() => {
    setState({
      user: null,
      isLoading: false,
      accessToken: null,
      refreshTokenValue: null,
    });
  }, []);

  const updateAuthState = useCallback((partial: Partial<AuthState>) => {
    setState(prev => ({ ...prev, ...partial }));
  }, []);

  // Memoize the actions object to prevent infinite re-renders
  const actions = useMemo<AuthStateActions>(() => ({
    setUser,
    setLoading,
    setTokens,
    clearAuthState,
    updateAuthState,
  }), [setUser, setLoading, setTokens, clearAuthState, updateAuthState]);

  return {
    ...state,
    actions,
  };
}