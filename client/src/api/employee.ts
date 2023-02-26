import { GenderEnum } from '@models/employee.model';
import { AxiosInstance } from './axios';

export interface GetListEmployeeParams {
  cafe?: string;
}
export const getListEmployee = (params?: GetListEmployeeParams) => {
  return AxiosInstance.get('/api/employee', { params });
};

export interface CreateNewEmployeePayload {
  name: string;
  email_address: string;
  phone_number: string;
  gender: GenderEnum;
  cafe_id?: string | null;
}
export const createNewEmployee = (payload: CreateNewEmployeePayload) => {
  return AxiosInstance.post('/api/employee', payload);
};

export interface UpdateExistingEmployeePayload
  extends CreateNewEmployeePayload {
  id: string;
}
export const updateExistingEmployee = ({
  id,
  ...rest
}: UpdateExistingEmployeePayload) => {
  return AxiosInstance.put(`/api/employee/${id}`, rest);
};

export const removeOneEmployee = (id: string) => {
  return AxiosInstance.delete(`/api/employee/${id}`);
};
