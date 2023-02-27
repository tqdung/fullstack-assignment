import { useCallback, useEffect, useMemo, useState } from 'react';
import { useCustomizedDispatch } from '@redux/hook';
import {
  dismissLoading,
  dismissMultiLoading,
  setLoadingState,
} from '@redux/slices/loadingSlice';
import { Helpers } from '@utils/helper';
import { LodashUtils } from '@utils/lodash';

interface ILoadingConfig {
  title?: string;
  subtitle?: string;
}

export interface IGlobalLoadingAction {
  present: (config?: ILoadingConfig) => string;
  dismiss: (id: string) => void;
}

export const useGlobalLoading = () => {
  const [ids, setListId] = useState<string[]>([]);
  const dispatch = useCustomizedDispatch();

  const present = useCallback(
    (config: ILoadingConfig = {}) => {
      const id = Helpers.generateID();
      setListId((prev) => {
        return [...prev, id];
      });
      dispatch(setLoadingState({ ...config, id }));
      return id;
    },
    [dispatch],
  );

  const dismiss = useCallback(
    (id: string) => {
      dispatch(dismissLoading({ id }));
    },
    [dispatch],
  );

  const clear = useCallback(() => {
    if (!LodashUtils.isEmpty(ids)) {
      dispatch(dismissMultiLoading({ ids }));
    }
  }, [dispatch, ids]);

  useEffect(() => {
    return () => {
      clear();
    };
  }, [clear, ids]);

  return useMemo(() => ({ present, dismiss }), [present, dismiss]);
};
