import { defineStore } from 'pinia';
import { State } from './state.type';

export const useMainStore = defineStore({
  id: 'dotta_sdk_main',
  state: () =>
    ({
      blockConfig: {
        selector: '',
        insertPosition: 'bottom',
        align: 'center',
        width: 100,
      },
      isPreviewChoosing: false,
      isOnFindElLoading: false,
      isShowSectionBg: false,
      isSelectElFalse: false,
    } as State),
  actions: {  },
});
