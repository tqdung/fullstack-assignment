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

import { LodashUtils } from '@utils/lodash';

export const useEmployee = () => {
  const [employeeList, setEmployeeList] = useState<EmployeeModel[]>([]);

  const fetch = useCallback(async (params?: GetListEmployeeParams) => {
    try {
      const response = await getListEmployee(params);
      const employeeList = LodashUtils.get(response, 'data', []);
      setEmployeeList(
        LodashUtils.map(employeeList, (item) => new EmployeeModel(item)),
      );
    } catch (error) {
      notification.error({
        message: LodashUtils.get(error, 'message', 'Can not get list employee'),
        type: 'error',
        closeIcon: true,
        duration: 3000,
      });
    }
  }, []);

  const create = useCallback(async (payload: CreateNewEmployeePayload) => {
    try {
      const response = await createNewEmployee(payload);
      const newEmployee = LodashUtils.get(response, 'data', null);
      setEmployeeList((prev) => prev.concat([new EmployeeModel(newEmployee)]));
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
    }
  }, []);

  const update = useCallback(async (payload: UpdateExistingEmployeePayload) => {
    try {
      await updateExistingEmployee(payload);
      setEmployeeList((prev) =>
        prev.map((employee) =>
          employee.id === payload.id
            ? new EmployeeModel({ ...employee, ...payload })
            : employee,
        ),
      );
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
    }
  }, []);

  const remove = useCallback(async (employee: EmployeeModel) => {
    try {
      await removeOneEmployee(employee.id);
      setEmployeeList((prev) => prev.filter((o) => o.id !== employee.id));
    } catch (error) {
      notification.error({
        message: LodashUtils.get(error, 'message', 'Can not remove employee'),
        type: 'error',
        closeIcon: true,
        duration: 3000,
      });
    }
  }, []);

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
