import { useCallback, useEffect, useState } from 'react';
import { notification } from 'antd';

import {
  getListEmployee,
  createNewEmployee,
  updateExistingEmployee,
  removeOneEmployee,
} from '@api/employee';

import type { GetListEmployeeParams } from '@api/employee';
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
    async (createData: EmployeeModel) => {
      const loadingId = loading.present({
        title: 'Create Employee data',
        subtitle: 'Please wait for a while',
      });
      try {
        const response = await createNewEmployee({
          name: createData.name,
          email_address: createData.email_address,
          gender: createData.gender,
          phone_number: createData.phone_number,
          cafe_id: createData.cafe_id,
        });
        const created = LodashUtils.get(response, 'data', null);
        const newEmployee = new EmployeeModel({ ...createData, ...created });
        setEmployeeList((prev) => prev.concat([newEmployee]));
        notification.success({ type: 'success', message: 'Successful' });
      } catch (error) {
        notification.error({
          message: LodashUtils.get(
            error,
            'message',
            'Can not update employee information',
          ),
          type: 'error',
        });
      } finally {
        loading.dismiss(loadingId);
      }
    },
    [loading],
  );

  const update = useCallback(
    async (updateData: EmployeeModel) => {
      const loadingId = loading.present({
        title: 'Update Employee data',
        subtitle: 'Please wait for a while',
      });
      try {
        await updateExistingEmployee({
          id: updateData.id,
          name: updateData.name,
          email_address: updateData.email_address,
          gender: updateData.gender,
          phone_number: updateData.phone_number,
          cafe_id: updateData.cafe_id,
        });
        setEmployeeList((prev) =>
          prev.map((employee) =>
            employee.id === updateData.id
              ? new EmployeeModel({ ...employee, ...updateData })
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
