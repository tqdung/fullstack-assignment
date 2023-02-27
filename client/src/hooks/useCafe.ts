import { useCallback, useEffect, useState } from 'react';
import { notification } from 'antd';

import {
  getListCafe,
  createNewCafe,
  updateExistingCafe,
  removeOneCafe,
} from '@api/cafe';

import type { GetListCafeParams } from '@api/cafe';
import { CafeModel } from '@models/cafe.model';

import { useGlobalLoading } from '@hooks/useGlobalLoading';

import { LodashUtils } from '@utils/lodash';

export const useCafe = () => {
  const [cafeList, setCafeList] = useState<CafeModel[]>([]);
  const loading = useGlobalLoading();

  const fetch = useCallback(
    async (params?: GetListCafeParams) => {
      const loadingId = loading.present({
        title: 'Fetching Cafe data',
        subtitle: 'Please wait for a while',
      });
      try {
        const response = await getListCafe(params);
        const cafeList = LodashUtils.get(response, 'data', []);
        setCafeList(LodashUtils.map(cafeList, (item) => new CafeModel(item)));
      } catch (error) {
        notification.error({
          message: LodashUtils.get(error, 'message', 'Can not get list cafe'),
          type: 'error',
        });
      } finally {
        loading.dismiss(loadingId);
      }
    },
    [loading],
  );

  const create = useCallback(
    async (createData: CafeModel) => {
      const loadingId = loading.present({
        title: 'Creating Cafe data',
        subtitle: 'Please wait for a while',
      });
      try {
        const response = await createNewCafe({
          name: createData.name,
          description: createData.description,
          location: createData.location,
          logo: createData.logo,
        });
        const created = LodashUtils.get(response, 'data', null);
        const newCafe = new CafeModel({ ...createData, ...created });
        setCafeList((prev) => prev.concat([newCafe]));
        notification.success({ type: 'success', message: 'Successful' });
      } catch (error) {
        notification.error({
          message: LodashUtils.get(
            error,
            'message',
            'Can not update cafe information',
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
    async (updateData: CafeModel) => {
      const loadingId = loading.present({
        title: 'Updating Cafe data',
        subtitle: 'Please wait for a while',
      });
      try {
        await updateExistingCafe({
          id: updateData.id,
          name: updateData.name,
          description: updateData.description,
          location: updateData.location,
          logo: updateData.logo,
        });
        setCafeList((prev) =>
          prev.map((cafe) =>
            cafe.id === updateData.id
              ? new CafeModel({ ...cafe, ...updateData })
              : cafe,
          ),
        );
        notification.success({ type: 'success', message: 'Successful' });
      } catch (error) {
        notification.error({
          message: LodashUtils.get(
            error,
            'message',
            'Can not update cafe information',
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
    async (cafe: CafeModel) => {
      const loadingId = loading.present({
        title: 'Removing Cafe data',
        subtitle: 'Please wait for a while',
      });
      try {
        await removeOneCafe(cafe.id);
        setCafeList((prev) => prev.filter((o) => o.id !== cafe.id));
        notification.success({ type: 'success', message: 'Successful' });
      } catch (error) {
        notification.error({
          message: LodashUtils.get(error, 'message', 'Can not remove cafe'),
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
    cafeList,
    create,
    fetch,
    update,
    remove,
  };
};
