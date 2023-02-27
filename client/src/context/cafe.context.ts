import { createContext } from 'react';
import { useCafe } from '@pages/Cafe/hook';

export const CafeTableContext = createContext<ReturnType<typeof useCafe>>(
  {} as ReturnType<typeof useCafe>,
);
