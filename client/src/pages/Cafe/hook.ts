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

import { LodashUtils } from '@utils/lodash';

export const useCafe = () => {
  const [cafeList, setCafeList] = useState<CafeModel[]>([]);

  const fetch = useCallback(async (params?: GetListCafeParams) => {
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
    }
  }, []);

  const create = useCallback(async (payload: CreateNewCafePayload) => {
    try {
      const response = await createNewCafe(payload);
      const newCafe = LodashUtils.get(response, 'data', null);
      setCafeList((prev) => prev.concat([new CafeModel(newCafe)]));
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
    }
  }, []);

  const update = useCallback(async (payload: UpdateExistingCafePayload) => {
    try {
      await updateExistingCafe(payload);
      setCafeList((prev) =>
        prev.map((cafe) =>
          cafe.id === payload.id
            ? new CafeModel({ ...cafe, ...payload })
            : cafe,
        ),
      );
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
    }
  }, []);

  const remove = useCallback(async (cafe: CafeModel) => {
    try {
      await removeOneCafe(cafe.id);
      setCafeList((prev) => prev.filter((o) => o.id !== cafe.id));
    } catch (error) {
      notification.error({
        message: LodashUtils.get(error, 'message', 'Can not remove cafe'),
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
    cafeList,
    create,
    fetch,
    update,
    remove,
  };
};
