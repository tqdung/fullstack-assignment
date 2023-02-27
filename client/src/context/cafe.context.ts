import { createContext } from 'react';
import { useCafe } from '@hooks/useCafe';

export const CafeTableContext = createContext<ReturnType<typeof useCafe>>(
  {} as ReturnType<typeof useCafe>,
);
