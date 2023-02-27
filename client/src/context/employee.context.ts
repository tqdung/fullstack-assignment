import { createContext } from 'react';
import { useEmployee } from '@pages/Employee/hook';

export const EmployeeTableContext = createContext<
  ReturnType<typeof useEmployee>
>({} as ReturnType<typeof useEmployee>);
