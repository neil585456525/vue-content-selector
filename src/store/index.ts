import { defineStore } from 'pinia';
import { State } from './state.type';
import getCssSelector from 'css-selector-generator';
import { positionSelector } from '@/service/PositionSelector';

let tmpSaveSelector = "";

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
    isShowSectionBg: false,
  } as State),
  actions: {
    startPositionSelector(startCb: () => void = () => { }, successCb: (el: Element) => void = () => { }) {
      positionSelector.setOnSelectedHandler((el: HTMLElement) => {
        successCb(el);
        this.isPreviewChoosing = false;
        const newSelector = getCssSelector(el, { blacklist: [/src/] });
        if (newSelector) {
          this.blockConfig.selector = newSelector;
        }
      })

      tmpSaveSelector = this.blockConfig.selector;
      this.isPreviewChoosing = true;
      this.blockConfig.selector = '';

      positionSelector
        .setInsertPosition(this.blockConfig.insertPosition)
        .startSelector();

      startCb();
    },
    cancelPositionSelector(cancelCb: () => void) {
      this.isPreviewChoosing = false;
      positionSelector.stopSelector();
      this.blockConfig.selector = tmpSaveSelector;

      cancelCb();
    }
  },
});
