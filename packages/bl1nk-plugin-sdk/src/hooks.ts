// packages/bl1nk-plugin-sdk/src/hooks.ts

import { useState, useEffect, useCallback } from 'react';
import { TauriBridge } from './tauri-bridge';

export function useConfig<T>(key: string, defaultValue: T) {
  const [value, setValue] = useState<T>(defaultValue);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    TauriBridge.getConfig(key)
      .then((result) => {
        if (result !== null && result !== undefined) {
          setValue(result as T);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [key]);

  const saveValue = useCallback(async (newValue: T) => {
    await TauriBridge.saveConfig(key, newValue);
    setValue(newValue);
  }, [key]);

  return { value, setValue: saveValue, loading };
}

export function useMCPTool(server: string, tool: string) {
  const [result, setResult] = useState<unknown>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const execute = useCallback(async (params: unknown) => {
    setLoading(true);
    setError(null);
    try {
      const result = await TauriBridge.callTool(server, tool, params);
      setResult(result);
      return result;
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [server, tool]);

  return { execute, result, loading, error };
}

export function useFile(path: string) {
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!path) {
      setLoading(false);
      return;
    }

    TauriBridge.readFile(path)
      .then((result) => {
        setContent(result as string);
      })
      .catch((err) => {
        setError(err as Error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [path]);

  const save = useCallback(async (newContent: string) => {
    await TauriBridge.writeFile(path, newContent);
    setContent(newContent);
  }, [path]);

  return { content, setContent, save, loading, error };
}
