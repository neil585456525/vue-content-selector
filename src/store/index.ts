import { defineStore } from 'pinia';
import { State } from './state.type';

export const useMainStore = defineStore({
  id: 'dotta_sdk_main',
  state: () =>
    ({
      // oldPositionData: {
      //   selector: '',
      //   insertPosition: 'bottom',
      // },
      blockConfig: {
        selector: '',
        insertPosition: 'bottom',
        align: 'center',
        width: 100,
      },

      // sourceList: [],
      // sourceNow: '',
      // contentData: {
      //   key: '',
      //   version: 2,
      //   name: '',
      //   main: [],
      // },
      isPreviewChoosing: false,
      isOnFindElLoading: false,
      isShowSectionBg: false,
      // styleConfig: {
      //   align: 'center',
      //   width: 100,
      // },
      isSelectElFalse: false,
    } as State),
  actions: {
    async getEditData() {
      // this.sourceList = await getSourceList();
      // const dataObj = await getSelector();
      // // 紀錄舊狀態用於判斷是否提示儲存
      // if (dataObj) {
      //   Object.assign(this.oldPositionData, {
      //     selector: dataObj.selector,
      //     insertPosition: dataObj.insertPosition,
      //   });
      //   Object.assign(this.positionData, this.oldPositionData);
      //   console.log(dataObj);
      //   if (dataObj.align) this.styleConfig.align = dataObj.align;
      //   if (dataObj.width) this.styleConfig.width = dataObj.width;
      // }
    },
    async saveEditData() {
      // await saveSelector({ ...this.positionData, ...this.styleConfig });
      // if (this.positionData.selector !== this.oldPositionData.selector) {
      //   alert(
      //     '已偵測到區塊位置變更\n\n將自動進行畫面重整以確認選擇位置是否有效，如果重整後找不到區塊，請更換選擇位置'
      //   );
      //   window.location.reload();
      // }
      // Object.assign(this.oldPositionData, this.positionData);
    },
  },
});
