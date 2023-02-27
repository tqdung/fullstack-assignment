import { createContext } from 'react';
import { useEmployee } from '@hooks/useEmployee';

export const EmployeeTableContext = createContext<
  ReturnType<typeof useEmployee>
>({} as ReturnType<typeof useEmployee>);
