import { useCallback, useEffect, useState } from 'react';
import { notification } from 'antd';

import {
  getListCafe,
  createNewCafe,
  updateExistingCafe,
  removeOneCafe,
} from '@api/cafe';

import type {
  GetListCafeParams,
  CreateNewCafePayload,
  UpdateExistingCafePayload,
} from '@api/cafe';
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
    async (payload: CreateNewCafePayload) => {
      const loadingId = loading.present({
        title: 'Creating Cafe data',
        subtitle: 'Please wait for a while',
      });
      try {
        const response = await createNewCafe(payload);
        const newCafe = LodashUtils.get(response, 'data', null);
        setCafeList((prev) => prev.concat([new CafeModel(newCafe)]));
        notification.success({ type: 'success', message: 'Successful' });
      } catch (error) {
        notification.error({
          message: LodashUtils.get(
            error,
            'message',
            'Can not update cafe information',
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
    async (payload: UpdateExistingCafePayload) => {
      const loadingId = loading.present({
        title: 'Updating Cafe data',
        subtitle: 'Please wait for a while',
      });
      try {
        await updateExistingCafe(payload);
        setCafeList((prev) =>
          prev.map((cafe) =>
            cafe.id === payload.id
              ? new CafeModel({ ...cafe, ...payload })
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
    cafeList,
    create,
    fetch,
    update,
    remove,
  };
};
