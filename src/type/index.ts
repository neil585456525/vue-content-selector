export type BlockConfig = {
  selector: string;
  insertPosition: 'top' | 'bottom';
  align: 'start' | 'center' | 'end';
  width: number;
}

export interface StoreProvider {
  baseZIndex: number;
  blockConfig: BlockConfig;
  isPreviewChoosing: boolean;
  isShowSectionBg: boolean;
  startPositionSelector: (startCb: () => void, successCb: (el: Element) => void) => void;
  cancelPositionSelector: (cancelCb: () => void) => void;
}