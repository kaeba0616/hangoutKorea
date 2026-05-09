import * as SecureStore from 'expo-secure-store';
import { useCallback, useEffect, useState } from 'react';

const TOKEN_KEY = 'hangko.mock.authToken';
const ONBOARDED_KEY = 'hangko.mock.onboarded';

export type AuthStatus = 'loading' | 'unauthenticated' | 'pending-onboarding' | 'authenticated';

async function readKey(key: string) {
  try {
    return await SecureStore.getItemAsync(key);
  } catch {
    return null;
  }
}

async function writeKey(key: string, value: string) {
  try {
    await SecureStore.setItemAsync(key, value);
  } catch {
    // ignore — secure-store may be unavailable in web/dev
  }
}

async function deleteKey(key: string) {
  try {
    await SecureStore.deleteItemAsync(key);
  } catch {
    // ignore
  }
}

export function useMockAuth() {
  const [status, setStatus] = useState<AuthStatus>('loading');

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const [token, onboarded] = await Promise.all([
        readKey(TOKEN_KEY),
        readKey(ONBOARDED_KEY),
      ]);
      if (cancelled) return;
      if (!token) {
        setStatus('unauthenticated');
      } else if (onboarded === 'true') {
        setStatus('authenticated');
      } else {
        setStatus('pending-onboarding');
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const issueToken = useCallback(async () => {
    const token = `mock-${Date.now()}`;
    await writeKey(TOKEN_KEY, token);
    setStatus('pending-onboarding');
  }, []);

  const completeOnboarding = useCallback(async () => {
    await writeKey(ONBOARDED_KEY, 'true');
    setStatus('authenticated');
  }, []);

  const signOut = useCallback(async () => {
    await deleteKey(TOKEN_KEY);
    await deleteKey(ONBOARDED_KEY);
    setStatus('unauthenticated');
  }, []);

  return { status, issueToken, completeOnboarding, signOut };
}
