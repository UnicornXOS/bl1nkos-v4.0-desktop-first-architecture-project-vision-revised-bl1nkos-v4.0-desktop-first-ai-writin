// apps/desktop/src-web/components/providers.tsx

'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface AppContextType {
  isOverlay: boolean;
  showOverlay: () => void;
  hideOverlay: () => void;
}

const AppContext = createContext<AppContextType | null>(null);

export function Providers({ children }: { children: ReactNode }) {
  const [isOverlay, setIsOverlay] = useState(false);

  useEffect(() => {
    // Listen for Tauri events
    const handleShowOverlay = () => setIsOverlay(true);
    const handleHideOverlay = () => setIsOverlay(false);

    // In a real app, we would use @tauri-apps/api/event
    // For now, we'll just set up the context
    window.addEventListener('show-overlay', handleShowOverlay);
    window.addEventListener('hide-overlay', handleHideOverlay);

    return () => {
      window.removeEventListener('show-overlay', handleShowOverlay);
      window.removeEventListener('hide-overlay', handleHideOverlay);
    };
  }, []);

  return (
    <AppContext.Provider
      value={{
        isOverlay,
        showOverlay: () => setIsOverlay(true),
        hideOverlay: () => setIsOverlay(false),
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within Providers');
  }
  return context;
}
