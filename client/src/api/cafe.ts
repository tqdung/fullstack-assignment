import { AxiosInstance } from './axios';

export interface GetListCafeParams {
  location?: string;
}
export const getListCafe = (params?: GetListCafeParams) => {
  return AxiosInstance.get('/api/cafe', { params });
};

export interface CreateNewCafePayload {
  name: string;
  description: string;
  location: string;
  logo?: string | null;
}
export const createNewCafe = (payload: CreateNewCafePayload) => {
  return AxiosInstance.post('/api/cafe', payload);
};

export interface UpdateExistingCafePayload extends CreateNewCafePayload {
  id: string;
}
export const updateExistingCafe = ({
  id,
  ...rest
}: UpdateExistingCafePayload) => {
  return AxiosInstance.put(`/api/cafe/${id}`, rest);
};

export const removeOneCafe = (id: string) => {
  return AxiosInstance.delete(`/api/cafe/${id}`);
};
