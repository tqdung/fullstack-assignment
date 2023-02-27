import { useCallback, useEffect, useState } from 'react';
import { notification } from 'antd';

import {
  getListEmployee,
  createNewEmployee,
  updateExistingEmployee,
  removeOneEmployee,
} from '@api/employee';

import type {
  GetListEmployeeParams,
  CreateNewEmployeePayload,
  UpdateExistingEmployeePayload,
} from '@api/employee';
import { EmployeeModel } from '@models/employee.model';

import { useGlobalLoading } from '@hooks/useGlobalLoading';
import { LodashUtils } from '@utils/lodash';

export const useEmployee = () => {
  const [employeeList, setEmployeeList] = useState<EmployeeModel[]>([]);
  const loading = useGlobalLoading();

  const fetch = useCallback(
    async (params?: GetListEmployeeParams) => {
      const loadingId = loading.present({
        title: 'Fetching Employee data',
        subtitle: 'Please wait for a while',
      });
      try {
        const response = await getListEmployee(params);
        const employeeList = LodashUtils.get(response, 'data', []);
        setEmployeeList(
          LodashUtils.map(employeeList, (item) => new EmployeeModel(item)),
        );
      } catch (error) {
        notification.error({
          message: LodashUtils.get(
            error,
            'message',
            'Can not get list employee',
          ),
          type: 'error',
          closeIcon: true,
          duration: 3000,
        });
      } finally {
        loading.dismiss(loadingId);
      }
    },
    [loading],
  );

  const create = useCallback(
    async (payload: CreateNewEmployeePayload) => {
      const loadingId = loading.present({
        title: 'Create Employee data',
        subtitle: 'Please wait for a while',
      });
      try {
        const response = await createNewEmployee(payload);
        const newEmployee = LodashUtils.get(response, 'data', null);
        setEmployeeList((prev) =>
          prev.concat([new EmployeeModel(newEmployee)]),
        );
        notification.success({ type: 'success', message: 'Successful' });
      } catch (error) {
        notification.error({
          message: LodashUtils.get(
            error,
            'message',
            'Can not update employee information',
          ),
          type: 'error',
          closeIcon: true,
          duration: 3000,
        });
      } finally {
        loading.dismiss(loadingId);
      }
    },
    [loading],
  );

  const update = useCallback(
    async (payload: UpdateExistingEmployeePayload) => {
      const loadingId = loading.present({
        title: 'Update Employee data',
        subtitle: 'Please wait for a while',
      });
      try {
        await updateExistingEmployee(payload);
        setEmployeeList((prev) =>
          prev.map((employee) =>
            employee.id === payload.id
              ? new EmployeeModel({ ...employee, ...payload })
              : employee,
          ),
        );
        notification.success({ type: 'success', message: 'Successful' });
      } catch (error) {
        notification.error({
          message: LodashUtils.get(
            error,
            'message',
            'Can not update employee information',
          ),
          type: 'error',
          closeIcon: true,
          duration: 3000,
        });
      } finally {
        loading.dismiss(loadingId);
      }
    },
    [loading],
  );

  const remove = useCallback(
    async (employee: EmployeeModel) => {
      const loadingId = loading.present({
        title: 'Removing Employee data',
        subtitle: 'Please wait for a while',
      });
      try {
        await removeOneEmployee(employee.id);
        setEmployeeList((prev) => prev.filter((o) => o.id !== employee.id));
        notification.success({ type: 'success', message: 'Successful' });
      } catch (error) {
        notification.error({
          message: LodashUtils.get(error, 'message', 'Can not remove employee'),
          type: 'error',
          closeIcon: true,
          duration: 3000,
        });
      } finally {
        loading.dismiss(loadingId);
      }
    },
    [loading],
  );

  useEffect(() => {
    fetch();
  }, [fetch]);

  return {
    employeeList,
    create,
    fetch,
    update,
    remove,
  };
};
