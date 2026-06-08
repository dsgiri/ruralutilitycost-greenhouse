import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';

type HistoryData = Record<string, Record<string, any>>;

interface ContextProps {
  history: HistoryData;
  setHistory: React.Dispatch<React.SetStateAction<HistoryData>>;
  clearHistory: () => void;
}

const CalculationHistoryContext = createContext<ContextProps | undefined>(undefined);

export function CalculationHistoryProvider({ children }: { children: ReactNode }) {
  const [history, setHistory] = useState<HistoryData>(() => {
    try {
      const stored = localStorage.getItem('greenhouse_calculation_history');
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    localStorage.setItem('greenhouse_calculation_history', JSON.stringify(history));
  }, [history]);

  const clearHistory = useCallback(() => {
    setHistory({});
    localStorage.removeItem('greenhouse_calculation_history');
  }, []);

  return (
    <CalculationHistoryContext.Provider value={{ history, setHistory, clearHistory }}>
      {children}
    </CalculationHistoryContext.Provider>
  );
}

export function useCalculationHistory<T>(toolId: string, key: string, initialValue: T): [T, (val: T | ((prev: T) => T)) => void] {
  const context = useContext(CalculationHistoryContext);
  if (!context) throw new Error("useCalculationHistory must be used within CalculationHistoryProvider");

  const { history, setHistory } = context;

  const toolHistory = history[toolId] || {};
  const state: T = toolHistory[key] !== undefined ? toolHistory[key] : initialValue;

  const setState = useCallback((value: T | ((prev: T) => T)) => {
    setHistory(prevHistory => {
      const currentToolHistory = prevHistory[toolId] || {};
      const currentState = currentToolHistory[key] !== undefined ? currentToolHistory[key] : initialValue;
      const nextValue = value instanceof Function ? value(currentState) : value;
      
      return {
        ...prevHistory,
        [toolId]: {
          ...currentToolHistory,
          [key]: nextValue
        }
      };
    });
  }, [setHistory, toolId, key, initialValue]);

  return [state, setState];
}
